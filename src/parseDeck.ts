import { Deck } from "./dataStructures";
import { readInt32, searchDeck, readString, readBool } from "./util";

export function parseDeck(dataView: DataView, uint8Ary: Uint8Array): Deck[] {
    let decks: Deck[] = [];
    let position = 0;
    while (true) {
        let currentDeckPosition: number = position;
        let nextDeckOffset: number = readInt32(dataView, position);
        position += 4;
        let check: number = readInt32(dataView, position);
        position += 4;
        if (check != 5) {
            // if check isn't 5, it's not a deck
            position = searchDeck(dataView, uint8Ary, position);
            if (position == -1) break;
            continue;
        }
        let deckId: number = readInt32(dataView, position);
        position += 4;
        let stringLength: number = readInt32(dataView, position);
        position += 4;
        let deckName: string = readString(dataView, position, stringLength);
        position += stringLength * 2;
        var gameId = readInt32(dataView, position);
        position += 4;
        var isDefault = readBool(dataView, position);
        position += 1;
        let unKnownBool = readBool(dataView, position);
        position += 1;
        var cardCount = readInt32(dataView, position);
        position += 4;
        let techIds: number[] = [];
        for (let j = 0; j < cardCount; j++) {
            let techId = readInt32(dataView, position);
            techIds.push(techId);
            position += 4;
        }

        let deck: Deck = {
            deckName: deckName,
            deckId: deckId,
            gameId: gameId,
            isDefault: isDefault,
            cardCount: cardCount,
            techIds: techIds,
        };
        decks.push(deck);
        position = currentDeckPosition + nextDeckOffset + 6;
    }
    return decks;
}