#!/usr/bin/env python3
"""
Code Debugger - 30 Questions Per Mode Generator
Populates all 16 mode files in game/js/modes/ with 30 rich, authentic debugging challenges each.
"""

import json
import os

MODES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'game', 'js', 'modes')
os.makedirs(MODES_DIR, exist_ok=True)

print("Writing mode banks...")
