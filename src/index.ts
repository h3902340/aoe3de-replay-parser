import { inflateRaw } from "pako";
import { Deck, GameSetting, Player, Replay } from "./dataStructures";

const englishRegex: RegExp = /^[A-Za-z0-9_]*$/;
const headerLength: number = 10;
const decoder = new TextDecoder('utf-16');
let dataView: DataView;
let uint8Ary: Uint8Array;
/**
 * Parse the entire replay to get a Replay object.
 * @param fileArrayBuffer provide the array buffer of age3Yrec file
 * @returns return a replay with game infos
 */
export function parseReplay(fileArrayBuffer: ArrayBuffer): Replay {
    uint8Ary = inflateRaw(fileArrayBuffer.slice(headerLength));
    dataView = new DataView(uint8Ary.buffer);
    let position = 273;
    let stringLength = readInt32(position);
    const exeInfo = readString(position, stringLength);
    let version: number = Number(exeInfo.split(' ')[1]);
    let dictionary = scanAllFields();
    let gameSetting: GameSetting = {
        allowCheats: dictionary['gameallowcheats'],
        blockade: dictionary['gameblockade'],
        playerCount: dictionary['gamenumplayers'],
        difficulty: dictionary['gamedifficulty'],
        startingAge: dictionary['gamestartingage'],
        endingAge: dictionary['gameendingage'],
        isTreaty: dictionary['gamestartwithtreaty'],
        allowTradeMonopoly: dictionary['gametrademonopoly'],
        gameType: dictionary['gametype'],
        mapCRC: dictionary['gamefilecrc'],
        mapName: dictionary['gamefilename'],
        mapSet: dictionary['gamefilenameext'],
        freeForAll: dictionary['gamefreeforall'],
        hostTime: dictionary['gamehosttime'],
        koth: dictionary['gamekoth'],
        latency: dictionary['gamelatency'],
        mapSetName: dictionary['gamemapname'],
        mapResource: dictionary['gamemapresources'],
        radomSeed: dictionary['gamerandomseed'],
        gameSpeed: dictionary['gamespeed'],
    }

    let players: Player[] = [];
    for (let i = 1; i <= gameSetting.playerCount; i++) {
        let player: Player = {
            aiPersonality: dictionary[`gameplayer${i}aipersonality`],
            avatarId: dictionary[`gameplayer${i}avatarid`],
            civId: dictionary[`gameplayer${i}civ`],
            civIsRandom: dictionary[`gameplayer${i}civwasrandom`],
            clan: dictionary[`gameplayer${i}clan`],
            color: dictionary[`gameplayer${i}color`],
            explorerName: dictionary[`gameplayer${i}explorername`],
            explorerSkinId: dictionary[`gameplayer${i}explorerskinid`],
            handicap: dictionary[`gameplayer${i}handicap`],
            homecityFileName: dictionary[`gameplayer${i}hcfilename`],
            homecityLevel: dictionary[`gameplayer${i}hclevel`],
            homecityName: dictionary[`gameplayer${i}homecityname`],
            slotId: dictionary[`gameplayer${i}id`],
            playerName: dictionary[`gameplayer${i}name`],
            initialDecks: [],
        }
        players.push(player);
    }

    // initial decks
    players.sort((a, b) => a.slotId - b.slotId);
    let deckIndex: number = 0;
    let allDecks = searchAllDecks();
    for (let i = 0; i < players.length; i++) {
        let initialDecks: Deck[] = [];
        let previousDeckId: number = allDecks[0].deckId;
        while (deckIndex < allDecks.length) {
            if (allDecks[deckIndex].deckId < previousDeckId) {
                break;
            }
            if (allDecks[deckIndex].deckName == '*') {
                break;
            }
            initialDecks.push(allDecks[deckIndex]);
            previousDeckId = allDecks[deckIndex].deckId;
            deckIndex++;
        }
        while (deckIndex < allDecks.length) {
            if (allDecks[deckIndex].deckId == 0) {
                break;
            }
            deckIndex++;
        }
        players[i].initialDecks = initialDecks;
    }

    let replay: Replay = {
        exeVersion: version,
        setting: gameSetting,
        players: players,
    }

    return replay;
}

function scanAllFields(): { [k: string]: any } {
    let dictionary: { [k: string]: any } = {};
    let position = 0;
    let endPosition = 20000; // the position of the fields won't exceed this number
    let skipCount: number = 0;
    while (position < endPosition) {
        let word = readString(position, 1);
        if (englishRegex.test(word)) {
            if (skipCount >= 4) {
                let isNextWord = true;
                let nextWordLength: number = readInt32(position - 4);
                let nextWord = readString(position, nextWordLength);
                for (let char of nextWord) {
                    if (!englishRegex.test(char)) {
                        isNextWord = false;
                        break;
                    }
                }
                if (isNextWord) {
                    position += nextWord.length * 2;
                    let dataType = readInt32(position);
                    position += 4;
                    let data: any;
                    switch (dataType) {
                        case 1:
                            data = readFloat32(position);
                            position += 4;
                            dictionary[nextWord] = data;
                            break;
                        case 2:
                            data = readInt32(position);
                            position += 4;
                            dictionary[nextWord] = data;
                            break;
                        case 5:
                            let bool = readBool(position);
                            position += 1;
                            dictionary[nextWord] = bool;
                            break;
                        case 9:
                            let stringLength = readInt32(position);
                            if (stringLength > 100) {
                                position -= 4;
                                // if stringLength is very long, it's most likely not a field.
                                break;
                            }
                            position += 4;
                            let string = readString(position, stringLength);
                            position += stringLength * 2;
                            dictionary[nextWord] = string;
                            break;
                    }
                } else {
                    position += 2;
                }
                skipCount = 0;
            } else {
                position += 2;
            }
        } else {
            position += 1;
            skipCount += 1;
        }
    }
    return dictionary;
}

function searchAllDecks(): Deck[] {
    let decks: Deck[] = [];
    let position = 0;
    while (true) {
        let currentDeckPosition: number = position;
        let nextDeckOffset: number = readInt32(position);
        position += 4;
        let check: number = readInt32(position);
        position += 4;
        if (check != 5) {
            // if check isn't 5, it's not a deck
            position = searchDeck(position);
            if (position == -1) break;
            continue;
        }
        let deckId: number = readInt32(position);
        position += 4;
        let stringLength: number = readInt32(position);
        position += 4;
        let deckName: string = readString(position, stringLength);
        position += stringLength * 2;
        var gameId = readInt32(position);
        position += 4;
        var isDefault = readBool(position);
        position += 1;
        let unKnownBool = readBool(position);
        position += 1;
        var cardCount = readInt32(position);
        position += 4;
        let techIds: number[] = [];
        for (let j = 0; j < cardCount; j++) {
            let techId = readInt32(position);
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

function readString(position: number, length: number): string {
    const end = position + length * 2;
    const string = decoder.decode(dataView.buffer.slice(position, end));
    return string
}

function readInt32(position: number): number {
    const int32 = dataView.getInt32(position, true);
    return int32
}

function readFloat32(position: number): number {
    const float32 = dataView.getFloat32(position, true)
    return float32;
}

function readBool(position: number): boolean {
    const bool = dataView.getUint8(position);
    return Boolean(bool);
}

function readInt8(position: number): number {
    const int8 = dataView.getUint8(position)
    return int8
}

function searchDeck(startIndex: number): number {
    let position = startIndex;
    while (position < uint8Ary.length) {
        position = search(uint8Ary, [0x0, 0x0, 0x0, 0x44, 0x6b], position);
        if (position == -1) break;
        position += 9;
        let int = readInt32(position);
        if (int != 5) continue;
        return position - 4;
    }
    return -1;
}

function search(array: Uint8Array, search: number[], fromIndex: number = 0): number {
    const searchLen = search.length
    const searchLast = search[searchLen - 1]
    let index = array.indexOf(searchLast, fromIndex + searchLen - 1)

    while (index !== -1) {
        for (let i = searchLen - 1; i > 0; i--) {
            if (search[i - 1] !== array[index - searchLen + i]) {
                const searchIndex = search.lastIndexOf(array[index + 1])
                const offset = searchIndex === -1 ? index + searchLen + 1 : index + searchLen - searchIndex
                index = array.indexOf(searchLast, offset)
                break;
            }
            if (i === 1) return index - searchLen + 1
        }
    }
    return -1
}