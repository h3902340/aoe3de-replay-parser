import * as fs from 'fs';
import path from 'path';
import { parseChat } from '../dist';

test('chat', () => {
    let buffer = fs.readFileSync(path.join(__dirname, "../recs/dutch_vs_russia_more_than_1_hour_long.age3Yrec"));
    let chat = parseChat(buffer);
    console.log(chat);
    expect(chat).toBeDefined();
}, 5);