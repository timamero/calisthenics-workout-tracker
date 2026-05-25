export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      emphasis_inactive: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      equipments_inactive: {
        Row: {
          id: number
          is_supplemental: boolean | null
          name: string
        }
        Insert: {
          id?: number
          is_supplemental?: boolean | null
          name: string
        }
        Update: {
          id?: number
          is_supplemental?: boolean | null
          name?: string
        }
        Relationships: []
      }
      exercises: {
        Row: {
          created_at: string
          default_set_progression_id: number | null
          default_tracking_types:
            | Database["public"]["Enums"]["tracking_type"][]
            | null
          difficulty: Database["public"]["Enums"]["difficulty_type"]
          emphasis: Database["public"]["Enums"]["emphasis_type"]
          id: number
          instructions: string[]
          name: string
          required_equipment: Database["public"]["Enums"]["equipment"][] | null
          source: Database["public"]["Enums"]["source"]
          tags: string[]
          target_muscles: Database["public"]["Enums"]["muscles"][]
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          default_set_progression_id?: number | null
          default_tracking_types?:
            | Database["public"]["Enums"]["tracking_type"][]
            | null
          difficulty: Database["public"]["Enums"]["difficulty_type"]
          emphasis: Database["public"]["Enums"]["emphasis_type"]
          id?: number
          instructions: string[]
          name: string
          required_equipment?: Database["public"]["Enums"]["equipment"][] | null
          source?: Database["public"]["Enums"]["source"]
          tags: string[]
          target_muscles: Database["public"]["Enums"]["muscles"][]
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          default_set_progression_id?: number | null
          default_tracking_types?:
            | Database["public"]["Enums"]["tracking_type"][]
            | null
          difficulty?: Database["public"]["Enums"]["difficulty_type"]
          emphasis?: Database["public"]["Enums"]["emphasis_type"]
          id?: number
          instructions?: string[]
          name?: string
          required_equipment?: Database["public"]["Enums"]["equipment"][] | null
          source?: Database["public"]["Enums"]["source"]
          tags?: string[]
          target_muscles?: Database["public"]["Enums"]["muscles"][]
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_default_set_progression_id_fkey"
            columns: ["default_set_progression_id"]
            isOneToOne: false
            referencedRelation: "set_progressions"
            referencedColumns: ["id"]
          },
        ]
      }
      leverages_assists: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: number
          name: string
          type: Database["public"]["Enums"]["leverage_assist"]
          updated_at: string | null
          value_int_difficulty_direction:
            | Database["public"]["Enums"]["sort_direction"]
            | null
          value_int_unit: Database["public"]["Enums"]["unit"] | null
          value_options: string[] | null
          value_type: Database["public"]["Enums"]["leverage_assist_value_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order: number
          id?: number
          name: string
          type: Database["public"]["Enums"]["leverage_assist"]
          updated_at?: string | null
          value_int_difficulty_direction?:
            | Database["public"]["Enums"]["sort_direction"]
            | null
          value_int_unit?: Database["public"]["Enums"]["unit"] | null
          value_options?: string[] | null
          value_type: Database["public"]["Enums"]["leverage_assist_value_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["leverage_assist"]
          updated_at?: string | null
          value_int_difficulty_direction?:
            | Database["public"]["Enums"]["sort_direction"]
            | null
          value_int_unit?: Database["public"]["Enums"]["unit"] | null
          value_options?: string[] | null
          value_type?: Database["public"]["Enums"]["leverage_assist_value_type"]
        }
        Relationships: []
      }
      muscle_groups_inactive: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          current_fitness_test: Json | null
          goal: string | null
          id: number
          initial_fitness_test: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          current_fitness_test?: Json | null
          goal?: string | null
          id?: number
          initial_fitness_test: Json
          updated_at: string
          user_id?: string
        }
        Update: {
          current_fitness_test?: Json | null
          goal?: string | null
          id?: number
          initial_fitness_test?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      progression_exercises_inactive: {
        Row: {
          category: string
          id: number
          level: number | null
          name: string
          progression: string | null
          progression_id: number
          purpose: string
        }
        Insert: {
          category: string
          id?: number
          level?: number | null
          name: string
          progression?: string | null
          progression_id: number
          purpose: string
        }
        Update: {
          category?: string
          id?: number
          level?: number | null
          name?: string
          progression?: string | null
          progression_id?: number
          purpose?: string
        }
        Relationships: [
          {
            foreignKeyName: "progression_exercises_progression_id_fkey"
            columns: ["progression_id"]
            isOneToOne: false
            referencedRelation: "progressions_inactive"
            referencedColumns: ["id"]
          },
        ]
      }
      progressions_inactive: {
        Row: {
          description: string
          difficulty: string
          id: number
          name: string
          prerequisites: string[]
        }
        Insert: {
          description: string
          difficulty: string
          id?: number
          name: string
          prerequisites: string[]
        }
        Update: {
          description?: string
          difficulty?: string
          id?: number
          name?: string
          prerequisites?: string[]
        }
        Relationships: []
      }
      set_progressions: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: number
          measure_instructions: string | null
          name: string
          type: Database["public"]["Enums"]["set_progression_type"]
          updated_at: string | null
          value_int_difficulty_direction:
            | Database["public"]["Enums"]["sort_direction"]
            | null
          value_int_unit: Database["public"]["Enums"]["unit"] | null
          value_options: string[] | null
          value_type: Database["public"]["Enums"]["set_progression_value_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order: number
          id?: number
          measure_instructions?: string | null
          name: string
          type?: Database["public"]["Enums"]["set_progression_type"]
          updated_at?: string | null
          value_int_difficulty_direction?:
            | Database["public"]["Enums"]["sort_direction"]
            | null
          value_int_unit?: Database["public"]["Enums"]["unit"] | null
          value_options?: string[] | null
          value_type: Database["public"]["Enums"]["set_progression_value_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: number
          measure_instructions?: string | null
          name?: string
          type?: Database["public"]["Enums"]["set_progression_type"]
          updated_at?: string | null
          value_int_difficulty_direction?:
            | Database["public"]["Enums"]["sort_direction"]
            | null
          value_int_unit?: Database["public"]["Enums"]["unit"] | null
          value_options?: string[] | null
          value_type?: Database["public"]["Enums"]["set_progression_value_type"]
        }
        Relationships: []
      }
      test_table: {
        Row: {
          id: number
          names: string | null
        }
        Insert: {
          id?: number
          names?: string | null
        }
        Update: {
          id?: number
          names?: string | null
        }
        Relationships: []
      }
      workout_builds: {
        Row: {
          created_at: string
          description: string | null
          estimated_duration: string | null
          goal: Database["public"]["Enums"]["goal"] | null
          id: number
          notes: string | null
          source: Database["public"]["Enums"]["source"] | null
          status: Database["public"]["Enums"]["status"]
          title: string | null
          updated_at: string | null
          user_id: string | null
          workout_data: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          estimated_duration?: string | null
          goal?: Database["public"]["Enums"]["goal"] | null
          id?: number
          notes?: string | null
          source?: Database["public"]["Enums"]["source"] | null
          status?: Database["public"]["Enums"]["status"]
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          workout_data?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          estimated_duration?: string | null
          goal?: Database["public"]["Enums"]["goal"] | null
          id?: number
          notes?: string | null
          source?: Database["public"]["Enums"]["source"] | null
          status?: Database["public"]["Enums"]["status"]
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          workout_data?: Json | null
        }
        Relationships: []
      }
      workout_logs: {
        Row: {
          created_at: string
          date: string
          description: string | null
          duration: string
          goal: Database["public"]["Enums"]["goal"] | null
          id: number
          notes: string | null
          rpe: number | null
          status: Database["public"]["Enums"]["status"]
          title: string | null
          updated_at: string | null
          user_id: string
          workout_build_id: number | null
          workout_data: Json
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          duration: string
          goal?: Database["public"]["Enums"]["goal"] | null
          id?: number
          notes?: string | null
          rpe?: number | null
          status?: Database["public"]["Enums"]["status"]
          title?: string | null
          updated_at?: string | null
          user_id?: string
          workout_build_id?: number | null
          workout_data: Json
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          duration?: string
          goal?: Database["public"]["Enums"]["goal"] | null
          id?: number
          notes?: string | null
          rpe?: number | null
          status?: Database["public"]["Enums"]["status"]
          title?: string | null
          updated_at?: string | null
          user_id?: string
          workout_build_id?: number | null
          workout_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_workout_build_id_fkey"
            columns: ["workout_build_id"]
            isOneToOne: false
            referencedRelation: "workout_builds"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_type: "beginner" | "intermediate" | "advanced" | "elite"
      emphasis_type:
        | "plyometrics"
        | "mobility"
        | "power"
        | "endurance"
        | "strength"
      equipment:
        | "pull up bar"
        | "parallettes"
        | "parallel bars"
        | "gymnastic rings"
        | "barbell"
        | "suspension trainer"
        | "ab roller"
        | "speed rope"
        | "weighted vest"
        | "box"
        | "bench"
        | "resistance bands"
        | "none"
        | "ankle weights"
        | "dip belt"
        | "dumbbells"
        | "kettlebell"
        | "medicine ball"
        | "nordic strap"
        | "sliders"
      goal: "function" | "endurance" | "hypertrophy" | "strength" | "power"
      leverage_assist: "leverage" | "assist"
      leverage_assist_value_type: "int" | "options"
      leverages_assist_value_type: "int" | "options"
      muscles:
        | "chest"
        | "glutes"
        | "hamstrings"
        | "quadriceps"
        | "shoulders"
        | "biceps"
        | "triceps"
        | "calves"
        | "latissimus dorsi"
        | "abs"
        | "obliques"
        | "lower back"
        | "upper back"
        | "rhomboid"
        | "full body"
        | "core"
        | "forearms"
        | "inner thighs"
        | "outer thighs"
      set_progression_type: "challenge" | "assist"
      set_progression_value_type: "int" | "options"
      sort_direction: "ascending" | "descending"
      source: "manual" | "ai_generated" | "default"
      status: "draft" | "finalized" | "archived"
      tracking_type: "reps" | "time" | "rpe" | "set progressions"
      unit: "lb" | "kg" | "in" | "cm" | "m" | "ft" | "deg"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      difficulty_type: ["beginner", "intermediate", "advanced", "elite"],
      emphasis_type: [
        "plyometrics",
        "mobility",
        "power",
        "endurance",
        "strength",
      ],
      equipment: [
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
      ],
      goal: ["function", "endurance", "hypertrophy", "strength", "power"],
      leverage_assist: ["leverage", "assist"],
      leverage_assist_value_type: ["int", "options"],
      leverages_assist_value_type: ["int", "options"],
      muscles: [
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
      ],
      set_progression_type: ["challenge", "assist"],
      set_progression_value_type: ["int", "options"],
      sort_direction: ["ascending", "descending"],
      source: ["manual", "ai_generated", "default"],
      status: ["draft", "finalized", "archived"],
      tracking_type: ["reps", "time", "rpe", "set progressions"],
      unit: ["lb", "kg", "in", "cm", "m", "ft", "deg"],
    },
  },
} as const
