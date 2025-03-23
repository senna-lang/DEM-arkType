/**
 * ArkType デモアプリケーション
 * 
 * このファイルは、compose.tsとnumberSequence.tsの両方の機能を
 * 実行するためのエントリーポイントです。
 */

import { runExamples as runComposeExamples } from './compose';
import { validateNumberSequence } from './numberSequence';

// compose.tsの使用例を実行
console.log('='.repeat(50));
console.log('連絡先型の使用例');
console.log('='.repeat(50));
runComposeExamples();

// numberSequence.tsの使用例を実行
console.log('\n' + '='.repeat(50));
console.log('数列型の使用例');
console.log('='.repeat(50));

const validSequence = [123, 4567, 89012, 345678, 9999999];
console.log('\n有効な数列:');
validateNumberSequence(validSequence);

const invalidSequence = [123, 456, 1000000000];
console.log('\n無効な数列（9桁の数値を含む）:');
validateNumberSequence(invalidSequence);

console.log('\nデモ終了');
