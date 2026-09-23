#!/usr/bin/env python3
"""
Code Debugger - High-Quality Modular Question Bank Generator
Generates 17 mode modules containing exactly 30 authentic debugging questions each
(510 total questions) across Python, C++, Java, JavaScript, and SQL.
"""

import json
import os
import sys

MODES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'game', 'js', 'modes')
os.makedirs(MODES_DIR, exist_ok=True)

# Definition of the 17 mode banks
MODE_SPECS = [
    ("beginner_starters", "beginner-starters.js", "Beginner Starter Challenges"),
    ("bug_hunt", "bug-hunt.js", "Bug Hunt Challenges"),
    ("fix_the_code", "fix-the-code.js", "Fix The Code Challenges"),
    ("output_detective", "output-detective.js", "Output Detective Challenges"),
    ("runtime_rescue", "runtime-rescue.js", "Runtime Rescue Challenges"),
    ("time_complexity", "time-complexity.js", "Time Complexity Trap Challenges"),
    ("memory_leak", "memory-leak.js", "Memory Leak Hunter Challenges"),
    ("off_by_one", "off-by-one.js", "Off-by-One Challenges"),
    ("infinite_loop", "infinite-loop.js", "Infinite Loop Challenges"),
    ("null_pointer", "null-pointer.js", "Null Pointer Hunt Challenges"),
    ("recursion_rescue", "recursion-rescue.js", "Recursion Rescue Challenges"),
    ("sql_bug", "sql-bug.js", "SQL Bug Hunt Challenges"),
    ("api_debugger", "api-debugger.js", "API Debugger Challenges"),
    ("concurrency_crash", "concurrency-crash.js", "Concurrency Crash Challenges"),
    ("algorithm_bug", "algorithm-bug.js", "Algorithm Bug Hunter Challenges"),
    ("security_bug", "security-bug.js", "Security Bug Hunt Challenges"),
    ("debugging_boss", "debugging-boss.js", "Debugging Boss Challenges"),
]

print(f"Target directory: {MODES_DIR}")
