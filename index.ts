import { inflateRaw } from "pako";
import { GameSetting, Player, Replay } from "./dataStructures";

const englishRegex: RegExp = /^[A-Za-z0-9_]*$/;
const headerLength: number = 10;
const decoder = new TextDecoder('utf-16');
let dataView: DataView;
/**
 * Parse the entire replay to get a Replay object.
 * @param fileArrayBuffer provide the array buffer of age3Yrec file
 * @returns return a replay with game infos
 */
export function parseReplay(fileArrayBuffer: ArrayBuffer): Replay {
    const uint8Ary = inflateRaw(fileArrayBuffer.slice(headerLength));
    dataView = new DataView(uint8Ary.buffer);
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
            playerName: dictionary[`gameplayer${i}name`]
        }
        players.push(player);
    }

    let replay: Replay = {
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