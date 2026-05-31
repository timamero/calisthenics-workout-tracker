#!/usr/bin/env python3
"""
display-logs.py — Run a recursive grep for console.log and display results
with colorized, easy-to-read output grouped by file.
"""

import subprocess
import sys
from collections import defaultdict

# ANSI color codes
RESET = "\033[0m"
BOLD = "\033[1m"
DIM = "\033[2m"
RED = "\033[91m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
GREEN = "\033[92m"
MAGENTA = "\033[95m"
WHITE = "\033[97m"
BG_DARK = "\033[48;5;235m"


def run_grep(search_dir: str = ".") -> list[str]:
    cmd = [
        "grep",
        "-rn",  # recursive + line numbers
        "--include=*.js",  # JS files only (adjust as needed)
        "--include=*.ts",
        "--include=*.jsx",
        "--include=*.tsx",
        "--include=*.mjs",
        "--exclude-dir=node_modules",
        "--exclude-dir=.venv",
        "--exclude-dir=.git",
        "--exclude-dir=dist",
        "--exclude-dir=build",
        "console.log",
        search_dir,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout.splitlines()


def parse_lines(raw_lines: list[str]) -> defaultdict:
    """Parse grep output into {filepath: [(line_num, code)]}"""
    grouped = defaultdict(list)
    for line in raw_lines:
        # grep -n output format: filepath:linenum:content
        parts = line.split(":", 2)
        if len(parts) < 3:
            continue
        filepath, lineno, code = parts[0], parts[1], parts[2]
        grouped[filepath].append((lineno, code))
    return grouped


def highlight_console_log(code: str) -> str:
    """Highlight the console.log portion in the code string."""
    return code.replace("console.log", f"{RED}{BOLD}console.log{RESET}")


def print_results(grouped: defaultdict) -> None:
    total_files = len(grouped)
    total_matches = sum(len(v) for v in grouped.values())

    if total_matches == 0:
        print(f"\n{GREEN}✓ No console.log statements found.{RESET}\n")
        return

    # ── Header ──────────────────────────────────────────────────────────
    print()
    print(f"{BG_DARK}{BOLD}{WHITE}  🔍  console.log finder  {RESET}")
    print(
        f"{DIM}  {total_matches} match{'es' if total_matches != 1 else ''} "
        f"across {total_files} file{'s' if total_files != 1 else ''}{RESET}"
    )
    print()

    # ── Per-file results ─────────────────────────────────────────────────
    for filepath, hits in sorted(grouped.items()):
        count = len(hits)
        badge = f"{MAGENTA}[{count}]{RESET}"
        print(f"  {CYAN}{BOLD}{filepath}{RESET}  {badge}")
        print(f"  {DIM}{'─' * 60}{RESET}")

        for lineno, code in hits:
            highlighted = highlight_console_log(code)
            print(f"  {YELLOW}{lineno:>5}{RESET}  {highlighted}")

        print()

    # ── Summary ──────────────────────────────────────────────────────────
    print(f"{DIM}{'─' * 64}{RESET}")
    print(
        f"  {BOLD}Total:{RESET} {RED}{total_matches}{RESET} console.log "
        f"statement{'s' if total_matches != 1 else ''} in "
        f"{CYAN}{total_files}{RESET} file{'s' if total_files != 1 else ''}."
    )
    print()


def main() -> None:
    search_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    raw_lines = run_grep(search_dir)
    grouped = parse_lines(raw_lines)
    print_results(grouped)


if __name__ == "__main__":
    main()
