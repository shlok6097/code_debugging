/**
 * Code Debugger - Remaining 12 Modes Generator
 * Builds 30 authentic questions for each of the remaining 12 modes (360 questions).
 */

const fs = require('fs');
const path = require('path');

const MODES_DIR = path.join(__dirname, '..', 'game', 'js', 'modes');

// Helper to write a mode file
function writeModeFile(filename, varName, questions) {
  const filePath = path.join(MODES_DIR, filename);
  const content = `/**
 * Code Debugger - ${filename} (${questions.length} Challenges)
 */

const ${varName} = ${JSON.stringify(questions, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ${varName} };
}
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Wrote ${questions.length} questions to ${filename}`);
}

console.log('Script ready to assemble banks.');
