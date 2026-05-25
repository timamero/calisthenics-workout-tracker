import csv
import json
import os
import re

# Define validation sets based on Supabase Enums
VALID_MUSCLES = {
    "chest",
    "glutes",
    "hamstrings",
    "quadriceps",
    "shoulders",
    "biceps",
    "triceps",
    "calves",
    "latissimus dorsi",
    "abs",
    "obliques",
    "lower back",
    "upper back",
    "rhomboid",
    "full body",
    "core",
    "forearms",
    "inner thighs",
    "outer thighs",
}

VALID_EQUIPMENT = {
    "pull up bar",
    "parallettes",
    "parallel bars",
    "gymnastic rings",
    "barbell",
    "suspension trainer",
    "ab roller",
    "speed rope",
    "weighted vest",
    "box",
    "bench",
    "resistance bands",
    "none",
    "ankle weights",
    "dip belt",
    "dumbbells",
    "kettlebell",
    "medicine ball",
    "nordic strap",
    "sliders",
}

VALID_EMPHASIS = {"plyometrics", "mobility", "power", "endurance", "strength"}
VALID_DIFFICULTY = {"beginner", "intermediate", "advanced", "elite"}
VALID_SOURCE = {"manual", "ai_generated", "default"}
VALID_TRACKING = {"reps", "time", "rpe", "set progressions"}


def clean_and_parse_array(val, valid_set=None, field_name=""):
    """Converts a comma-separated string into a JSON array
    string and validates enums."""
    if not val or val.strip() == "":
        return "[]"

    # Split by comma, strip whitespace, and normalize to lowercase
    items = [item.strip().lower() for item in val.split(",") if item.strip()]

    # Validate against allowed enum sets if provided
    if valid_set:
        for item in items:
            if item not in valid_set:
                raise ValueError(
                    f"Invalid value '{item}' for enum field '{field_name}'"
                )

    return json.dumps(items)


def parse_instructions(val):
    """Splits instruction steps cleanly using regex and packages
    them into a JSON array."""
    if not val or val.strip() == "":
        return "[]"

    # Cleans up odd smart quotes that sometimes show up in text exports
    cleaned_val = val.replace("”", '"').replace("“", '"').strip()

    # Split on commas that are followed by a step number (e.g., ", 2. ")
    steps = re.split(r",\s*(?=\d+\.)", cleaned_val)

    # Strip whitespace and lingering quotes from individual steps
    steps = [step.strip().strip('"').strip("'") for step in steps if step.strip()]
    return json.dumps(steps)


def validate_enum_value(val, valid_set, field_name):
    """Validates a single string value against an enum set."""
    normalized = val.strip().lower() if val else ""
    if normalized not in valid_set:
        raise ValueError(f"Invalid value '{val}' for enum field '{field_name}'")
    return normalized


def transform_csv(input_file, output_file):
    if not os.path.exists(input_file):
        print(f"Error: Input file '{input_file}' not found.")
        return

    # Define the exact column order expected by the valid Supabase CSV target
    target_headers = [
        "id",
        "name",
        "target_muscles",
        "required_equipment",
        "emphasis",
        "difficulty",
        "tags",
        "instructions",
        "default_tracking_types",
        "video_url",
        "source",
        "updated_at",
        "created_at",
        "default_set_progression_id",
    ]

    successful_rows = []
    failed_rows = []

    # 'utf-8-sig' handles and strips the explicit BOM character automatically (\ufeff)
    with open(input_file, mode="r", encoding="utf-8-sig") as infile:
        reader = csv.DictReader(infile)

        # Normalize incoming headers to lowercase to avoid
        # "Instructions" vs "instructions" issues
        reader.fieldnames = [field.strip().lower() for field in reader.fieldnames]

        for index, row in enumerate(
            reader, start=2
        ):  # Header is row 1, data starts at row 2
            try:
                transformed_row = {}

                # Pass-through fields
                transformed_row["id"] = row.get("id", "").strip()
                transformed_row["name"] = row.get("name", "").strip()
                transformed_row["video_url"] = row.get("video_url", "").strip()
                transformed_row["updated_at"] = row.get("updated_at", "").strip()
                transformed_row["created_at"] = row.get("created_at", "").strip()
                transformed_row["default_set_progression_id"] = row.get(
                    "default_set_progression_id", ""
                ).strip()

                # Process and validate array fields
                transformed_row["target_muscles"] = clean_and_parse_array(
                    row.get("target_muscles"), VALID_MUSCLES, "target_muscles"
                )
                transformed_row["required_equipment"] = clean_and_parse_array(
                    row.get("required_equipment"), VALID_EQUIPMENT, "required_equipment"
                )
                transformed_row["default_tracking_types"] = clean_and_parse_array(
                    row.get("default_tracking_types"),
                    VALID_TRACKING,
                    "default_tracking_types",
                )
                transformed_row["tags"] = clean_and_parse_array(row.get("tags"))

                # Custom parse instructions
                transformed_row["instructions"] = parse_instructions(
                    row.get("instructions")
                )

                # Process and validate single enum fields
                transformed_row["emphasis"] = validate_enum_value(
                    row.get("emphasis"), VALID_EMPHASIS, "emphasis"
                )
                transformed_row["difficulty"] = validate_enum_value(
                    row.get("difficulty"), VALID_DIFFICULTY, "difficulty"
                )
                transformed_row["source"] = validate_enum_value(
                    row.get("source", "default"), VALID_SOURCE, "source"
                )

                successful_rows.append(transformed_row)

            except Exception as e:
                failed_rows.append(
                    {
                        "row_number": index,
                        "exercise_id": row.get("id", "Unknown"),
                        "exercise_name": row.get("name", "Unknown"),
                        "error": str(e),
                    }
                )

    # Write processed data to the new CSV
    with open(output_file, mode="w", encoding="utf-8", newline="") as outfile:
        writer = csv.DictWriter(outfile, fieldnames=target_headers)
        writer.writeheader()
        for row in successful_rows:
            writer.writerow(row)

    # Output Summary Metrics
    print("\n" + "=" * 40)
    print("TRANSFORMATION REPORT")
    print("=" * 40)
    print(f"Successfully processed rows: {len(successful_rows)}")
    print(f"Failed rows:                 {len(failed_rows)}")
    print("=" * 40)

    if failed_rows:
        print("\nDETAILED FAILURE LIST:")
        for fail in failed_rows:
            print(f"""- [Row {fail['row_number']}] ID
                  : {fail['exercise_id']} | Name: '{fail['exercise_name']}'""")
            print(f"  Reason: {fail['error']}\n")


if __name__ == "__main__":
    input_csv = input(
        "Enter the path to the input CSV file (e.g., exercises.csv): "
    ).strip()
    output_csv = input(
        "Enter the name for the new output CSV file (e.g., transformed_exercises.csv): "
    ).strip()

    transform_csv(input_csv, output_csv)
