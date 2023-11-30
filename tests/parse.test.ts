import * as fs from 'fs';
import { parseReplay } from '../src';
import path from 'path';

test('adds two numbers correctly', () => {
    let buffer = fs.readFileSync(path.join(__dirname, "../dutch_vs_ethiopia.age3Yrec"));
    let replay = parseReplay(buffer);
    expect(replay).toBeDefined();
});