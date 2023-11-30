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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// index.ts
var aoe3de_replay_parser_exports = {};
__export(aoe3de_replay_parser_exports, {
  parseReplay: () => parseReplay
});
module.exports = __toCommonJS(aoe3de_replay_parser_exports);
var import_pako = require("pako");
var englishRegex = /^[A-Za-z0-9_]*$/;
var headerLength = 10;
var decoder = new TextDecoder("utf-16");
var dataView;
function parseReplay(file) {
  return __async(this, null, function* () {
    let arrayBuffer = yield file.arrayBuffer();
    const uint8Ary = (0, import_pako.inflateRaw)(arrayBuffer.slice(headerLength));
    dataView = new DataView(uint8Ary.buffer);
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
        playerName: dictionary[`gameplayer${i}name`]
      };
      players.push(player);
    }
    let replay = {
      setting: gameSetting,
      players
    };
    return replay;
  });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseReplay
});
//# sourceMappingURL=index.js.map