#!/usr/bin/env python3
"""
Code Debugger - Comprehensive Repository & Game Validator
Validates manifest, mode banks, question count (510 total: 30 x 17), schema, and files.
"""

import json
import os
import re
import sys

def main():
    print("====================================================")
    print("  CODE DEBUGGER - REPOSITORY INTEGRITY VALIDATOR")
    print("====================================================")

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    errors = []

    # 1. Check game.json
    game_json_path = os.path.join(root_dir, 'game.json')
    if not os.path.exists(game_json_path):
        errors.append("Missing game.json manifest")
    else:
        with open(game_json_path, 'r', encoding='utf-8') as f:
            manifest = json.load(f)
        required_keys = ['id', 'name', 'version', 'description', 'author', 'category', 'difficulty', 'minPlayers', 'maxPlayers', 'entry', 'thumbnail']
        for k in required_keys:
            if k not in manifest:
                errors.append(f"game.json missing required key: {k}")
        if manifest.get('id') != 'code-debugger':
            errors.append(f"game.json id mismatch: expected 'code-debugger', got '{manifest.get('id')}'")
        print("✓ game.json manifest schema valid")

    # 2. Check thumbnail
    thumb_path = os.path.join(root_dir, 'thumbnail.png')
    if not os.path.exists(thumb_path) or os.path.getsize(thumb_path) == 0:
        errors.append("thumbnail.png missing or empty")
    else:
        print(f"✓ thumbnail.png present ({os.path.getsize(thumb_path)} bytes)")

    # 3. Check README.md
    readme_path = os.path.join(root_dir, 'README.md')
    if not os.path.exists(readme_path) or os.path.getsize(readme_path) < 100:
        errors.append("README.md missing or too short")
    else:
        with open(readme_path, 'r', encoding='utf-8') as f:
            readme_text = f.read()
        if "Campus Connect" not in readme_text:
            errors.append("README.md must mention Campus Connect")
        print("✓ README.md documentation verified")

    # 4. Check game directory files
    expected_files = [
        'game/index.html',
        'game/css/style.css',
        'game/js/question-bank.js',
        'game/js/session-generator.js',
        'game/js/questions.js',
        'game/js/scoring.js',
        'game/js/timer.js',
        'game/js/campus-connect.js',
        'game/js/storage.js',
        'game/js/game.js',
        'game/js/main.js'
    ]
    for rel_path in expected_files:
        full_p = os.path.join(root_dir, rel_path)
        if not os.path.exists(full_p):
            errors.append(f"Missing essential file: {rel_path}")
    print(f"✓ All {len(expected_files)} game core files verified on disk")

    # 5. Check all 17 mode files
    modes_dir = os.path.join(root_dir, 'game/js/modes')
    expected_mode_files = [
        'beginner-starters.js',
        'bug-hunt.js',
        'fix-the-code.js',
        'output-detective.js',
        'runtime-rescue.js',
        'time-complexity.js',
        'off-by-one.js',
        'infinite-loop.js',
        'null-pointer.js',
        'memory-leak.js',
        'recursion-rescue.js',
        'sql-bug.js',
        'api-debugger.js',
        'concurrency-crash.js',
        'algorithm-bug.js',
        'security-bug.js',
        'debugging-boss.js'
    ]

    all_ids = set()
    total_questions = 0
    all_languages = set()

    for mfile in expected_mode_files:
        mpath = os.path.join(modes_dir, mfile)
        if not os.path.exists(mpath):
            errors.append(f"Missing mode file: {mfile}")
            continue
        with open(mpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        ids = re.findall(r'id:\s*["\']([^"\']+)["\']', content)
        langs = re.findall(r'language:\s*["\']([^"\']+)["\']', content)
        corrects = re.findall(r'correctOption:\s*(\d+)', content)
        diffs = re.findall(r'difficulty:\s*(\d+)', content)

        if len(ids) != 30:
            errors.append(f"Mode file {mfile} has {len(ids)} questions; expected exactly 30")
        
        for qid in ids:
            if qid in all_ids:
                errors.append(f"Duplicate question ID found: {qid} in {mfile}")
            all_ids.add(qid)
        
        for c in corrects:
            if int(c) not in [0, 1, 2, 3]:
                errors.append(f"Invalid correctOption {c} in {mfile}")

        for d in diffs:
            if int(d) < 1 or int(d) > 10:
                errors.append(f"Invalid difficulty {d} in {mfile}")

        for l in langs:
            all_languages.add(l)

        total_questions += len(ids)
        print(f"  ✓ {mfile:25s} : {len(ids)} questions verified")

    print(f"\n✓ Total Questions in Bank: {total_questions} across {len(expected_mode_files)} modules (Expected 510)")
    if total_questions != 510:
        errors.append(f"Total questions count mismatch: {total_questions} != 510")

    print(f"✓ Languages detected across bank: {', '.join(sorted(all_languages))}")
    for req_lang in ['Python', 'C++', 'Java', 'JavaScript', 'SQL']:
        if req_lang not in all_languages:
            errors.append(f"Missing language: {req_lang}")

    if errors:
        print("\n❌ VALIDATION ERRORS FOUND:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("\n====================================================")
        print("  ALL 510 QUESTIONS & MODES VALIDATED SUCCESSFULLY!")
        print("====================================================\n")
        sys.exit(0)

if __name__ == '__main__':
    main()
