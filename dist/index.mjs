// src/index.ts
import { inflateRaw } from "pako";
var englishRegex = /^[A-Za-z0-9_]*$/;
var headerLength = 10;
var decoder = new TextDecoder("utf-16");
var dataView;
var uint8Ary;
function parseReplay(fileArrayBuffer) {
  uint8Ary = inflateRaw(fileArrayBuffer.slice(headerLength));
  dataView = new DataView(uint8Ary.buffer);
  let position = 273;
  let stringLength = readInt32(position);
  const exeInfo = readString(position, stringLength);
  let version = Number(exeInfo.split(" ")[1]);
  let dictionary = scanAllFields();
  let gameSetting = {
    allowCheats: dictionary["gameallowcheats"],
    blockade: dictionary["gameblockade"],
    playerCount: dictionary["gamenumplayers"],
    difficulty: dictionary["gamedifficulty"],
    startingAge: dictionary["gamestartingage"],
    endingAge: dictionary["gameendingage"],
    isTreaty: dictionary["gamestartwithtreaty"],
    allowTradeMonopoly: dictionary["gametrademonopoly"],
    gameType: dictionary["gametype"],
    mapCRC: dictionary["gamefilecrc"],
    mapName: dictionary["gamefilename"],
    mapSet: dictionary["gamefilenameext"],
    freeForAll: dictionary["gamefreeforall"],
    hostTime: dictionary["gamehosttime"],
    koth: dictionary["gamekoth"],
    latency: dictionary["gamelatency"],
    mapSetName: dictionary["gamemapname"],
    mapResource: dictionary["gamemapresources"],
    radomSeed: dictionary["gamerandomseed"],
    gameSpeed: dictionary["gamespeed"]
  };
  let players = [];
  for (let i = 1; i <= gameSetting.playerCount; i++) {
    let player = {
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
      intialDecks: []
    };
    players.push(player);
  }
  players.sort((a, b) => a.slotId - b.slotId);
  let deckIndex = 0;
  let allDecks = searchAllDecks();
  for (let i = 0; i < players.length; i++) {
    let intialDecks = [];
    let previousDeckId = allDecks[0].deckId;
    while (deckIndex < allDecks.length) {
      if (allDecks[deckIndex].deckId < previousDeckId) {
        break;
      }
      if (allDecks[deckIndex].deckName == "*") {
        break;
      }
      intialDecks.push(allDecks[deckIndex]);
      previousDeckId = allDecks[deckIndex].deckId;
      deckIndex++;
    }
    while (deckIndex < allDecks.length) {
      if (allDecks[deckIndex].deckId == 0) {
        break;
      }
      deckIndex++;
    }
    players[i].intialDecks = intialDecks;
  }
  let replay = {
    exeVersion: version,
    setting: gameSetting,
    players
  };
  return replay;
}
function scanAllFields() {
  let dictionary = {};
  let position = 0;
  let endPosition = 2e4;
  let skipCount = 0;
  while (position < endPosition) {
    let word = readString(position, 1);
    if (englishRegex.test(word)) {
      if (skipCount >= 4) {
        let isNextWord = true;
        let nextWordLength = readInt32(position - 4);
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
          let data;
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
function searchAllDecks() {
  let decks = [];
  let position = 0;
  while (true) {
    let currentDeckPosition = position;
    let nextDeckOffset = readInt32(position);
    position += 4;
    let check = readInt32(position);
    position += 4;
    if (check != 5) {
      position = searchDeck(position);
      if (position == -1)
        break;
      continue;
    }
    let deckId = readInt32(position);
    position += 4;
    let stringLength = readInt32(position);
    position += 4;
    let deckName = readString(position, stringLength);
    position += stringLength * 2;
    var gameId = readInt32(position);
    position += 4;
    var isDefault = readBool(position);
    position += 1;
    let unKnownBool = readBool(position);
    position += 1;
    var cardCount = readInt32(position);
    position += 4;
    let techIds = [];
    for (let j = 0; j < cardCount; j++) {
      let techId = readInt32(position);
      techIds.push(techId);
      position += 4;
    }
    let deck = {
      deckName,
      deckId,
      gameId,
      isDefault,
      cardCount,
      techIds
    };
    decks.push(deck);
    position = currentDeckPosition + nextDeckOffset + 6;
  }
  return decks;
}
function readString(position, length) {
  const end = position + length * 2;
  const string = decoder.decode(dataView.buffer.slice(position, end));
  return string;
}
function readInt32(position) {
  const int32 = dataView.getInt32(position, true);
  return int32;
}
function readFloat32(position) {
  const float32 = dataView.getFloat32(position, true);
  return float32;
}
function readBool(position) {
  const bool = dataView.getUint8(position);
  return Boolean(bool);
}
function searchDeck(startIndex) {
  let position = startIndex;
  while (position < uint8Ary.length) {
    position = search(uint8Ary, [0, 0, 0, 68, 107], position);
    if (position == -1)
      break;
    position += 9;
    let int = readInt32(position);
    if (int != 5)
      continue;
    return position - 4;
  }
  return -1;
}
function search(array, search2, fromIndex = 0) {
  const searchLen = search2.length;
  const searchLast = search2[searchLen - 1];
  let index = array.indexOf(searchLast, fromIndex + searchLen - 1);
  while (index !== -1) {
    for (let i = searchLen - 1; i > 0; i--) {
      if (search2[i - 1] !== array[index - searchLen + i]) {
        const searchIndex = search2.lastIndexOf(array[index + 1]);
        const offset = searchIndex === -1 ? index + searchLen + 1 : index + searchLen - searchIndex;
        index = array.indexOf(searchLast, offset);
        break;
      }
      if (i === 1)
        return index - searchLen + 1;
    }
  }
  return -1;
}
export {
  parseReplay
};
//# sourceMappingURL=index.mjs.map