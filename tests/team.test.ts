import * as fs from 'fs';
import { parseReplay } from '../src';
import path from 'path';

test('team', () => {
    let buffer = fs.readFileSync(path.join(__dirname, "../recs/dutch_imperial.age3Yrec"));
    let replay = parseReplay(buffer);
    console.log(replay);
    expect(replay).toBeDefined();
    for (let i = 0; i < replay.players.length; i++) {
        expect(replay.players[i].initialDecks.length).toBeGreaterThan(0);
    }
}, 5);