"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  parseChat: () => parseChat,
  parseDeck: () => parseDeck,
  parseField: () => parseField,
  parseReplay: () => parseReplay,
  parseTeam: () => parseTeam
});
module.exports = __toCommonJS(src_exports);

// src/parseChat.ts
var import_pako = require("pako");

// src/constant.ts
var headerLength = 10;
var decoder = new TextDecoder("utf-16");
var englishRegex = /^[A-Za-z0-9_]*$/;

// src/util.ts
function readString(dataView, position, length) {
  const end = position + length * 2;
  const string = decoder.decode(dataView.buffer.slice(position, end));
  return string;
}
function readInt32(dataView, position) {
  const int32 = dataView.getInt32(position, true);
  return int32;
}
function readFloat32(dataView, position) {
  const float32 = dataView.getFloat32(position, true);
  return float32;
}
function readBool(dataView, position) {
  const bool = dataView.getUint8(position);
  return Boolean(bool);
}
function readInt8(dataView, position) {
  const int8 = dataView.getUint8(position);
  return int8;
}
function searchDeck(dataView, uint8Ary, startIndex) {
  let position = startIndex;
  while (position < uint8Ary.length) {
    position = search(uint8Ary, [0, 0, 0, 68, 107], position);
    if (position == -1)
      break;
    position += 9;
    let int = readInt32(dataView, position);
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

// src/parseChat.ts
function parseChat(fileArrayBuffer) {
  let uint8Ary = (0, import_pako.inflateRaw)(fileArrayBuffer.slice(headerLength));
  let dataView = new DataView(uint8Ary.buffer);
  let chat = [];
  let searchBytes = [154, 153, 153, 61];
  let position = search(uint8Ary, searchBytes) + 142;
  const msgLen = readInt32(dataView, position);
  position += 4;
  for (let i = 0; i < msgLen; i++) {
    let from = readInt32(dataView, position);
    position += 4;
    let to = readInt32(dataView, position);
    position += 4;
    const bufLen = readInt32(dataView, position);
    position += 4;
    let msg = readString(dataView, position, bufLen);
    position += bufLen * 2;
    position += 1;
    chat.push({
      fromId: from,
      toId: to,
      message: msg,
      time: 0
    });
  }
  let duration = 0;
  searchBytes = [1, 0, 0, 0, 0, 0, 0, 0, 0, 25];
  while (true) {
    position = search(uint8Ary, searchBytes, position);
    if (position == -1)
      break;
    position += 113;
    const command = readInt8(dataView, position);
    position += 1;
    switch (command) {
      case 33:
      case 65:
      case 161:
      case 193:
        break;
      case 1:
      case 129:
        break;
      case 35:
      case 37:
      case 41:
      case 67:
      case 73:
      case 163:
      case 165:
      case 169:
      case 195:
      case 201:
        position += 4;
        break;
      case 3:
      case 5:
      case 9:
      case 131:
      case 133:
      case 137:
        position += 4;
        break;
      case 39:
      case 43:
      case 45:
      case 75:
      case 167:
      case 171:
      case 173:
      case 203:
        position += 8;
        break;
      case 7:
      case 11:
      case 13:
      case 135:
      case 139:
      case 141:
        position += 8;
        break;
      case 47:
      case 175:
      case 207:
        position += 12;
        break;
      case 15:
      case 143:
        position += 12;
        break;
      case 49:
      case 177:
        position += 36;
        break;
      case 17:
      case 145:
        position += 36;
        break;
      case 19:
      case 21:
      case 25:
      case 147:
      case 149:
      case 153:
        position += 40;
        break;
      case 51:
      case 53:
      case 57:
      case 179:
      case 181:
      case 185:
        position += 40;
        break;
      case 55:
      case 59:
      case 61:
      case 183:
      case 187:
      case 189:
        position += 44;
        break;
      case 23:
      case 27:
      case 29:
      case 151:
      case 155:
      case 157:
        position += 44;
        break;
      case 63:
      case 191:
      case 223:
        position += 48;
        break;
      case 31:
      case 159:
        position += 48;
        break;
      default:
        console.error(`Unknown main command: ${command}`);
        position = search(uint8Ary, searchBytes, position);
        continue;
    }
    const messageCount = readInt32(dataView, position);
    position += 4;
    for (let i = 0; i < messageCount; i++) {
      const from = readInt32(dataView, position);
      position += 4;
      const to = readInt32(dataView, position);
      position += 4;
      let bufLen = readInt32(dataView, position);
      position += 4;
      const msg = readString(dataView, position, bufLen);
      position += bufLen * 2;
      position += 1;
      chat.push({
        fromId: from,
        toId: to,
        message: msg,
        time: duration
      });
    }
    duration += readInt8(dataView, position);
    position += 1;
  }
  return chat;
}

// src/parseDeck.ts
function parseDeck(dataView, uint8Ary) {
  let decks = [];
  let position = 0;
  while (true) {
    let currentDeckPosition = position;
    let nextDeckOffset = readInt32(dataView, position);
    position += 4;
    let check = readInt32(dataView, position);
    position += 4;
    if (check != 5) {
      position = searchDeck(dataView, uint8Ary, position);
      if (position == -1)
        break;
      continue;
    }
    let deckId = readInt32(dataView, position);
    position += 4;
    let stringLength = readInt32(dataView, position);
    position += 4;
    let deckName = readString(dataView, position, stringLength);
    position += stringLength * 2;
    var gameId = readInt32(dataView, position);
    position += 4;
    var isDefault = readBool(dataView, position);
    position += 1;
    let unKnownBool = readBool(dataView, position);
    position += 1;
    var cardCount = readInt32(dataView, position);
    position += 4;
    let techIds = [];
    for (let j = 0; j < cardCount; j++) {
      let techId = readInt32(dataView, position);
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

// src/parseField.ts
function parseField(dataView) {
  let dictionary = {};
  let position = 0;
  let endPosition = 2e4;
  let skipCount = 0;
  while (position < endPosition) {
    let word = readString(dataView, position, 1);
    if (englishRegex.test(word)) {
      if (skipCount >= 4) {
        let isNextWord = true;
        let nextWordLength = readInt32(dataView, position - 4);
        let nextWord = readString(dataView, position, nextWordLength);
        for (let char of nextWord) {
          if (!englishRegex.test(char)) {
            isNextWord = false;
            break;
          }
        }
        if (isNextWord) {
          position += nextWord.length * 2;
          let dataType = readInt32(dataView, position);
          position += 4;
          let data;
          switch (dataType) {
            case 1:
              data = readFloat32(dataView, position);
              position += 4;
              dictionary[nextWord] = data;
              break;
            case 2:
              data = readInt32(dataView, position);
              position += 4;
              dictionary[nextWord] = data;
              break;
            case 5:
              let bool = readBool(dataView, position);
              position += 1;
              dictionary[nextWord] = bool;
              break;
            case 9:
              let stringLength = readInt32(dataView, position);
              if (stringLength > 100) {
                position -= 4;
                break;
              }
              position += 4;
              let string = readString(dataView, position, stringLength);
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

// src/parseReplay.ts
var import_pako2 = require("pako");

// src/parseTeam.ts
function parseTeam(dataView, uint8Ary) {
  let teams = [];
  let seachBytes = [84, 69];
  let position = 0;
  while (true) {
    position = search(uint8Ary, seachBytes, position);
    if (position == -1)
      break;
    position += 6;
    const key = readInt32(dataView, position);
    position += 4;
    if (key == 12) {
      const teamId = readInt32(dataView, position);
      position += 4;
      let stringLength = readInt32(dataView, position);
      position += 4;
      const teamName = readString(dataView, position, stringLength);
      position += stringLength * 2;
      let members = [];
      const teamMembersCount = readInt32(dataView, position);
      position += 4;
      for (let i = 0; i < teamMembersCount; i++) {
        const slotId = readInt32(dataView, position);
        position += 4;
        members.push(slotId);
      }
      teams.push({
        id: teamId,
        name: teamName,
        members
      });
    }
  }
  return teams;
}

// src/parseReplay.ts
function parseReplay(fileArrayBuffer) {
  let uint8Ary = (0, import_pako2.inflateRaw)(fileArrayBuffer.slice(headerLength));
  let dataView = new DataView(uint8Ary.buffer);
  let position = 273;
  let stringLength = readInt32(dataView, position);
  const exeInfo = readString(dataView, position, stringLength);
  let version = Number(exeInfo.split(" ")[1]);
  let dictionary = parseField(dataView);
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
      initialDecks: []
    };
    players.push(player);
  }
  players.sort((a, b) => a.slotId - b.slotId);
  let deckIndex = 0;
  let allDecks = parseDeck(dataView, uint8Ary);
  for (let i = 0; i < players.length; i++) {
    let initialDecks = [];
    let previousDeckId = allDecks[0].deckId;
    while (deckIndex < allDecks.length) {
      if (allDecks[deckIndex].deckId < previousDeckId) {
        break;
      }
      if (allDecks[deckIndex].deckName == "*") {
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
  let teams = parseTeam(dataView, uint8Ary);
  let replay = {
    exeVersion: version,
    setting: gameSetting,
    players,
    teams
  };
  return replay;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseChat,
  parseDeck,
  parseField,
  parseReplay,
  parseTeam
});
//# sourceMappingURL=index.js.map