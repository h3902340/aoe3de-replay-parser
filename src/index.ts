import { inflateRaw } from "pako";
import { Deck, GameSetting, Player, Replay, Team } from "./dataStructures";
import { readInt32, readString } from "./util";
import { headerLength } from "./constant";
import { parseField } from "./parseField";
import { parseTeam } from "./parseTeam";
import { parseDeck } from "./parseDeck";

/**
 * Parse the entire replay to get a Replay object.
 * @param fileArrayBuffer provide the array buffer of age3Yrec file
 * @returns return a replay with game infos
 */
export function parseReplay(fileArrayBuffer: ArrayBuffer): Replay {
    let uint8Ary: Uint8Array = inflateRaw(fileArrayBuffer.slice(headerLength));
    let dataView: DataView = new DataView(uint8Ary.buffer);
    let position = 273;
    let stringLength = readInt32(dataView, position);
    const exeInfo = readString(dataView, position, stringLength);
    let version: number = Number(exeInfo.split(' ')[1]);
    let dictionary = parseField(dataView);
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
    let allDecks: Deck[] = parseDeck(dataView, uint8Ary);
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

    // get teams
    let teams: Team[] = parseTeam(dataView, uint8Ary);

    let replay: Replay = {
        exeVersion: version,
        setting: gameSetting,
        players: players,
        teams: teams,
    }

    return replay;
}