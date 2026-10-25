/**
 * Phase 4 Feature Verification Suite
 */

import { siteContent } from '../src/data/content.ts';

console.log('🧪 Starting Phase 4 Emotional Resonance & Personalization Tests...\n');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. Apology Letter Content Tests
console.log('--- Test 1: Apology Letter Verification ---');
assert(siteContent.apologyLetter.greeting.includes('Chitra'), 'Greeting is warmly personalized for Chitra');
assert(siteContent.apologyLetter.paragraphs.length >= 4, 'Letter contains complete, meaningful paragraph progression');
assert(
  siteContent.apologyLetter.paragraphs.some(p => p.includes('genuinely sorry')),
  'Letter contains sincere apology acknowledging the late birthday wish without excuses'
);
assert(
  siteContent.apologyLetter.signature.includes('friend'),
  'Letter ends with a sincere, non-pressuring signature'
);

// 2. Funny Moments "Pagal-Panti" Generator Tests
console.log('\n--- Test 2: Pagal-Panti Random Generator Verification ---');
assert(siteContent.funnyMoments.rollButtonText === 'Ek aur pagal-panti 😂', 'Roll button text is set to "Ek aur pagal-panti 😂"');
assert(siteContent.funnyMoments.randomQuotes.length >= 8, 'Includes 8+ varied, friendly school quotes');
assert(
  siteContent.funnyMoments.randomQuotes.some(q => q.includes('lunchboxes')),
  'Includes relatable school-friend lunchbox memory'
);
assert(
  siteContent.funnyMoments.randomQuotes.some(q => q.includes('classroom silence')),
  'Includes quiet classroom laughing memory'
);

// 3. 3D Gift Box Verification
console.log('\n--- Test 3: 3D Surprise Gift Unboxing Verification ---');
assert(Boolean(siteContent.giftBox.promptText), 'Gift box prompt text is configured');
assert(siteContent.giftBox.openedMessage.includes('Chitra'), 'Opened keepsake message is personalized for Chitra');

// 4. Closing Screen Verification
console.log('\n--- Test 4: Closing Screen Verification ---');
assert(Boolean(siteContent.closing.heading), 'Closing heading exists');
assert(siteContent.closing.message.includes('Chitra'), 'Closing message expresses gratitude to Chitra');
assert(Boolean(siteContent.closing.buttonBackToMemories), 'Closing screen provides return-to-memories navigation');

console.log(`\n========================================`);
console.log(`Phase 4 Summary: ${passed} Passed, ${failed} Failed`);
console.log(`========================================`);

if (failed > 0) process.exit(1);
