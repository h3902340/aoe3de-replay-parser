// src/constant.ts
var headerLength = 10;
var decoder = new TextDecoder("utf-16");
var englishRegex = /^[A-Za-z0-9_]*$/;
var civToInfo = /* @__PURE__ */ new Map([
  [1 /* Spanish */, { name: "Spanish", urlCircle: "flag_hc_spanish.png", urlRectanle: "Flag_Spanish.png", urlLeft: "postgame_flag_spanish.png", idCiv: 1, homecityJson: "homecityspanish" }],
  [2 /* British */, { name: "British", urlCircle: "flag_hc_british.png", urlRectanle: "Flag_British.png", urlLeft: "postgame_flag_british.png", idCiv: 2, homecityJson: "homecitybritish" }],
  [3 /* French */, { name: "French", urlCircle: "flag_hc_french.png", urlRectanle: "Flag_French.png", urlLeft: "postgame_flag_french.png", idCiv: 3, homecityJson: "homecityfrench" }],
  [4 /* Portuguese */, { name: "Portuguese", urlCircle: "flag_hc_portuguese.png", urlRectanle: "Flag_Portuguese.png", urlLeft: "postgame_flag_portuguese.png", idCiv: 4, homecityJson: "homecityportuguese" }],
  [5 /* Dutch */, { name: "Dutch", urlCircle: "flag_hc_dutch.png", urlRectanle: "Flag_Dutch.png", urlLeft: "postgame_flag_dutch.png", idCiv: 5, homecityJson: "homecitydutch" }],
  [6 /* Russians */, { name: "Russians", urlCircle: "flag_hc_russian.png", urlRectanle: "Flag_Russian.png", urlLeft: "postgame_flag_russian.png", idCiv: 6, homecityJson: "homecityrussians" }],
  [7 /* Germans */, { name: "Germans", urlCircle: "flag_hc_german.png", urlRectanle: "Flag_German.png", urlLeft: "postgame_flag_german.png", idCiv: 7, homecityJson: "homecitygerman" }],
  [8 /* Ottoman */, { name: "Ottoman", urlCircle: "flag_hc_ottoman.png", urlRectanle: "Flag_Ottoman.png", urlLeft: "postgame_flag_ottoman.png", idCiv: 8, homecityJson: "homecityottomans" }],
  [9 /* Haudenosaunee */, { name: "Haudenosaunee", urlCircle: "flag_hc_iroquois.png", urlRectanle: "Flag_Iroquois.png", urlLeft: "postgame_flag_iroquois.png", idCiv: 9, homecityJson: "homecityxpiroquois" }],
  [10 /* Lakota */, { name: "Lakota", urlCircle: "flag_hc_sioux.png", urlRectanle: "Flag_Sioux.png", urlLeft: "postgame_flag_sioux.png", idCiv: 10, homecityJson: "homecityxpsioux" }],
  [11 /* Aztecs */, { name: "Aztecs", urlCircle: "flag_hc_aztec.png", urlRectanle: "Flag_Aztec.png", urlLeft: "postgame_flag_aztec.png", idCiv: 11, homecityJson: "homecityxpaztec" }],
  [12 /* Chinese */, { name: "Chinese", urlCircle: "flag_hc_chinese.png", urlRectanle: "Flag_Chinese.png", urlLeft: "postgame_flag_chinese.png", idCiv: 12, homecityJson: "homecitychinese" }],
  [13 /* Japanese */, { name: "Japanese", urlCircle: "flag_hc_japanese.png", urlRectanle: "Flag_Japanese.png", urlLeft: "postgame_flag_japanese.png", idCiv: 13, homecityJson: "homecityjapanese" }],
  [14 /* Indians */, { name: "Indians", urlCircle: "flag_hc_indian.png", urlRectanle: "Flag_Indian.png", urlLeft: "postgame_flag_indian.png", idCiv: 14, homecityJson: "homecityindians" }],
  [15 /* Inca */, { name: "Inca", urlCircle: "flag_hc_inca.png", urlRectanle: "Flag_Incan.png", urlLeft: "postgame_flag_inca.png", idCiv: 15, homecityJson: "homecitydeinca" }],
  [16 /* Swedes */, { name: "Swedes", urlCircle: "flag_hc_swedish.png", urlRectanle: "Flag_Swedish.png", urlLeft: "postgame_flag_swedish.png", idCiv: 16, homecityJson: "homecityswedish" }],
  [17 /* UnitedStates */, { name: "United States", urlCircle: "flag_hc_american.png", urlRectanle: "Flag_American.png", urlLeft: "postgame_flag_american.png", idCiv: 17, homecityJson: "homecityamericans" }],
  [18 /* Ethiopians */, { name: "Ethiopians", urlCircle: "flag_hc_ethiopian.png", urlRectanle: "Flag_Ethiopian.png", urlLeft: "postgame_flag_ethiopian.png", idCiv: 18, homecityJson: "homecityethiopians" }],
  [19 /* Hausa */, { name: "Hausa", urlCircle: "flag_hc_hausa.png", urlRectanle: "Flag_Hausa.png", urlLeft: "postgame_flag_hausa.png", idCiv: 19, homecityJson: "homecityhausa" }],
  [20 /* Mexicans */, { name: "Mexicans", urlCircle: "flag_hc_mexican.png", urlRectanle: "Flag_Mexican.png", urlLeft: "postgame_flag_mexican.png", idCiv: 20, homecityJson: "homecitymexicans" }],
  [21 /* Italians */, { name: "Italians", urlCircle: "flag_hc_italian.png", urlRectanle: "Flag_Italian.png", urlLeft: "postgame_flag_italian.png", idCiv: 21, homecityJson: "homecityitalians" }],
  [22 /* Maltese */, { name: "Maltese", urlCircle: "flag_hc_maltese.png", urlRectanle: "Flag_Maltese.png", urlLeft: "postgame_flag_maltese.png", idCiv: 22, homecityJson: "homecitymaltese" }]
]);
var civMap = /* @__PURE__ */ new Map([
  [1, 1 /* Spanish */],
  [2, 2 /* British */],
  [3, 3 /* French */],
  [4, 4 /* Portuguese */],
  [5, 5 /* Dutch */],
  [6, 6 /* Russians */],
  [7, 7 /* Germans */],
  [8, 8 /* Ottoman */],
  [15, 9 /* Haudenosaunee */],
  [16, 10 /* Lakota */],
  [17, 11 /* Aztecs */],
  [19, 13 /* Japanese */],
  [20, 12 /* Chinese */],
  [21, 14 /* Indians */],
  [27, 15 /* Inca */],
  [28, 16 /* Swedes */],
  [38, 17 /* UnitedStates */],
  [39, 18 /* Ethiopians */],
  [40, 19 /* Hausa */],
  [42, 20 /* Mexicans */],
  [44, 21 /* Italians */],
  [45, 22 /* Maltese */]
]);

// src/parseChat.ts
import { inflateRaw } from "pako";

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
  let uint8Ary = inflateRaw(fileArrayBuffer.slice(headerLength));
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
import { inflateRaw as inflateRaw2 } from "pako";

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

// src/maps.json
var maps_default = { afarabia: { id: 70, idStr: "afarabia", displayNameID: "105068", details: "105070", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_arabia\\\\arabia_mini" }, afarabialarge: { id: 178, idStr: "afarabialarge", isLarge: true, displayNameID: "105147", details: "105070", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_arabia\\\\arabia_mini_lrg" }, afatlas: { id: 71, idStr: "afatlas", displayNameID: "105003", details: "105005", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_atlas\\\\af_atlas_mini" }, afatlaslarge: { id: 96, idStr: "afatlaslarge", isLarge: true, displayNameID: "105083", details: "105005", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_atlas\\\\af_atlas_mini" }, afcongobasin: { id: 72, idStr: "afcongobasin", displayNameID: "105065", details: "105067", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_congo_basin\\\\congo_basin_mini" }, afcongobasinlarge: { id: 179, idStr: "afcongobasinlarge", isLarge: true, displayNameID: "105149", details: "105067", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_congo_basin\\\\congo_basin_mini" }, afdarfur: { id: 73, idStr: "afdarfur", displayNameID: "105050", details: "105052", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_darfur\\\\af_darfur_mini" }, afdarfurlarge: { id: 74, idStr: "afdarfurlarge", isLarge: true, displayNameID: "105095", details: "105052", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_darfur\\\\af_darfur_mini" }, afdunes: { id: 75, idStr: "afdunes", displayNameID: "105056", details: "105058", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_dunes\\\\dunes_mini" }, afduneslarge: { id: 97, idStr: "afduneslarge", isLarge: true, displayNameID: "105153", details: "105058", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_dunes\\\\dunes_mini" }, "afgold coast": { id: 76, idStr: "afgold coast", displayNameID: "105000", details: "105002", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_gold_coast\\\\af_goldcoast_mini" }, "afgold coastlarge": { id: 98, idStr: "afgold coastlarge", isLarge: true, displayNameID: "105098", details: "105002", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_gold_coast\\\\af_goldcoast_mini" }, "afgreat rift": { id: 77, idStr: "afgreat rift", displayNameID: "105035", details: "105037", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_great_rift\\\\af_greatrift_mini" }, "afgreat riftlarge": { id: 99, idStr: "afgreat riftlarge", isLarge: true, displayNameID: "105101", details: "105037", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_great_rift\\\\af_greatrift_mini" }, afhighlands: { id: 78, idStr: "afhighlands", displayNameID: "105027", details: "105029", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_highlands\\\\af_highlands_mini" }, afhighlandslarge: { id: 100, idStr: "afhighlandslarge", isLarge: true, displayNameID: "105102", details: "105029", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_highlands\\\\af_highlands_mini" }, afhorn: { id: 79, idStr: "afhorn", displayNameID: "105038", details: "105040", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_horn\\\\af_horn_mini" }, afhornlarge: { id: 101, idStr: "afhornlarge", isLarge: true, displayNameID: "105108", details: "105040", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_horn\\\\af_horn_mini" }, afivorycoast: { id: 80, idStr: "afivorycoast", displayNameID: "105074", details: "105076", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_ivory_coast\\\\ivory_coast_mini" }, afivorycoastlarge: { id: 102, idStr: "afivorycoastlarge", isLarge: true, displayNameID: "105146", details: "105076", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_ivory_coast\\\\ivory_coast_mini" }, aflakechad: { id: 81, idStr: "aflakechad", displayNameID: "105044", details: "105046", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_lake_chad\\\\af_lakechad_mini" }, aflakechadlarge: { id: 103, idStr: "aflakechadlarge", isLarge: true, displayNameID: "105113", details: "105046", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_lake_chad\\\\af_lakechad_mini" }, aflakevictoria: { id: 82, idStr: "aflakevictoria", displayNameID: "105059", details: "105061", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_lake_victoria\\\\af_lake_victoria_mini" }, aflakevictorialarge: { id: 177, idStr: "aflakevictorialarge", isLarge: true, displayNameID: "105148", details: "105061", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_lake_victoria\\\\af_lake_victoria_mini" }, aflostsahara: { id: 104, idStr: "aflostsahara", displayNameID: "105009", details: "105011", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_saharan_routes\\\\saharan_routes_lost_mini" }, aflostsaharalarge: { id: 105, idStr: "aflostsaharalarge", isLarge: true, displayNameID: "105151", details: "105011", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_saharan_routes\\\\saharan_routes_lost_mini" }, "afniger delta": { id: 83, idStr: "afniger delta", displayNameID: "105015", details: "105017", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_niger_delta\\\\af_nigerdelta_mini" }, "afniger deltalarge": { id: 106, idStr: "afniger deltalarge", isLarge: true, displayNameID: "105119", details: "105017", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_niger_delta\\\\af_nigerdelta_mini" }, "afniger river": { id: 84, idStr: "afniger river", displayNameID: "105030", details: "105032", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_niger_river\\\\af_nigerriver_mini" }, "afniger riverlarge": { id: 107, idStr: "afniger riverlarge", isLarge: true, displayNameID: "105120", details: "105032", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_niger_river\\\\af_nigerriver_mini" }, "afnile valley": { id: 85, idStr: "afnile valley", displayNameID: "105018", details: "105020", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_nile_valley\\\\af_nilevalley_mini" }, "afnile valleylarge": { id: 86, idStr: "afnile valleylarge", isLarge: true, displayNameID: "105121", details: "105020", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_nile_valley\\\\af_nilevalley_mini" }, afpeppercoast: { id: 87, idStr: "afpeppercoast", displayNameID: "105047", details: "105049", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_pepper_coast\\\\af_peppercoast_mini" }, afpeppercoastlarge: { id: 108, idStr: "afpeppercoastlarge", isLarge: true, displayNameID: "105130", details: "105049", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_pepper_coast\\\\af_peppercoast_mini" }, afsahel: { id: 88, idStr: "afsahel", displayNameID: "105012", details: "105014", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_sahel\\\\sahel_mini" }, afsahellarge: { id: 109, idStr: "afsahellarge", isLarge: true, displayNameID: "105152", details: "105014", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_sahel\\\\sahel_mini" }, afsavanna: { id: 89, idStr: "afsavanna", displayNameID: "105021", details: "105023", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_savanna\\\\af_savanna_mini" }, afsavannalarge: { id: 90, idStr: "afsavannalarge", isLarge: true, displayNameID: "105135", details: "105023", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_savanna\\\\af_savanna_mini" }, afsiwaoasis: { id: 91, idStr: "afsiwaoasis", displayNameID: "105071", details: "105073", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_siwa_oasis\\\\siwa_oasis_mini" }, afsiwaoasislarge: { id: 110, idStr: "afsiwaoasislarge", isLarge: true, displayNameID: "105145", details: "105073", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_siwa_oasis\\\\siwa_oasis_mini" }, afsudd: { id: 92, idStr: "afsudd", displayNameID: "105041", details: "105043", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_sudd\\\\af_sudd_mini" }, afsuddlarge: { id: 111, idStr: "afsuddlarge", isLarge: true, displayNameID: "105136", details: "105043", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_sudd\\\\af_sudd_mini" }, afswahilicoast: { id: 93, idStr: "afswahilicoast", displayNameID: "105062", details: "105064", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_swahili\\\\swahili_mini" }, afswahilicoastlarge: { id: 112, idStr: "afswahilicoastlarge", isLarge: true, displayNameID: "105137", details: "105064", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_swahili\\\\swahili_mini" }, aftassili: { id: 94, idStr: "aftassili", displayNameID: "105024", details: "105026", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_tassili\\\\af_tassili_mini" }, aftassililarge: { id: 113, idStr: "aftassililarge", isLarge: true, displayNameID: "105138", details: "105026", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_tassili\\\\af_tassili_mini" }, aftranssahara: { id: 114, idStr: "aftranssahara", displayNameID: "105006", details: "105008", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_saharan_routes\\\\saharan_routes_mini" }, aftranssaharalarge: { id: 115, idStr: "aftranssaharalarge", isLarge: true, displayNameID: "105150", details: "105008", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_saharan_routes\\\\saharan_routes_mini" }, aftripolitania: { id: 95, idStr: "aftripolitania", displayNameID: "105053", details: "105055", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_tripolitania\\\\af_tripolitania_mini" }, aftripolitanialarge: { id: 116, idStr: "aftripolitanialarge", isLarge: true, displayNameID: "105140", details: "105055", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_tripolitania\\\\af_tripolitania_mini" }, alaska: { id: 49, idStr: "alaska", displayNameID: "90506", details: "90508", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\alaska\\\\alaska_mini" }, alaskalarge: { id: 117, idStr: "alaskalarge", isLarge: true, displayNameID: "105077", details: "90508", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\alaska\\\\alaska_mini" }, amazonia: { id: 1, idStr: "amazonia", displayNameID: "26982", details: "26983", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\amazon\\\\amazon_mini" }, amazonialarge: { id: 118, idStr: "amazonialarge", isLarge: true, displayNameID: "105078", details: "26983", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\amazon\\\\amazon_mini" }, "andes upper": { id: 47, idStr: "andes upper", displayNameID: "90593", details: "90595", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\andes_upper\\\\andes_upper_mini" }, "andes upperlarge": { id: 119, idStr: "andes upperlarge", isLarge: true, displayNameID: "105080", details: "90595", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\andes_upper\\\\andes_upper_mini" }, andes: { id: 2, idStr: "andes", displayNameID: "43635", details: "48448", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\andes\\\\andes_mini" }, andeslarge: { id: 120, idStr: "andeslarge", isLarge: true, displayNameID: "105079", details: "48448", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\andes\\\\andes_mini" }, araucania: { id: 3, idStr: "araucania", displayNameID: "45207", details: "47259", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\auraucania\\\\auraucania_mini" }, araucanialarge: { id: 121, idStr: "araucanialarge", isLarge: true, displayNameID: "105081", details: "47259", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\auraucania\\\\auraucania_mini" }, "arctic territories": { id: 50, idStr: "arctic territories", displayNameID: "90581", details: "90583", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\arctic_territories\\\\arctic_territories_mini" }, "arctic territorieslarge": { id: 122, idStr: "arctic territorieslarge", isLarge: true, displayNameID: "105082", details: "90583", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\arctic_territories\\\\arctic_territories_mini" }, bahia: { id: 123, idStr: "bahia", displayNameID: "105155", details: "105157", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\bahia\\\\bahia_mini" }, bahialarge: { id: 124, idStr: "bahialarge", isLarge: true, displayNameID: "105158", details: "105157", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\bahia\\\\bahia_mini" }, "baja california": { id: 51, idStr: "baja california", displayNameID: "90512", details: "90514", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\baja_california\\\\baja_california_mini" }, "baja californialarge": { id: 125, idStr: "baja californialarge", isLarge: true, displayNameID: "105084", details: "90514", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\baja_california\\\\baja_california_mini" }, bayou: { id: 4, idStr: "bayou", displayNameID: "18912", details: "18786", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\everglades\\\\everglades_mini" }, bayoularge: { id: 126, idStr: "bayoularge", isLarge: true, displayNameID: "105085", details: "18786", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\everglades\\\\everglades_mini" }, bengal: { id: 48, idStr: "bengal", displayNameID: "90515", details: "90517", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\bengal\\\\bengal_mini" }, bengallarge: { id: 127, idStr: "bengallarge", isLarge: true, displayNameID: "105086", details: "90517", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\bengal\\\\bengal_mini" }, borneo: { id: 5, idStr: "borneo", displayNameID: "70047", details: "70046", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\borneo\\\\borneo_mini" }, borneolarge: { id: 128, idStr: "borneolarge", isLarge: true, displayNameID: "105087", details: "70046", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\borneo\\\\borneo_mini" }, california: { id: 6, idStr: "california", displayNameID: "43636", details: "28831", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\california\\\\california_mini" }, californialarge: { id: 129, idStr: "californialarge", isLarge: true, displayNameID: "105088", details: "28831", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\california\\\\california_mini" }, caribbean: { id: 7, idStr: "caribbean", displayNameID: "28832", details: "28833", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\caribbean\\\\caribbean_mini" }, caribbeanlarge: { id: 130, idStr: "caribbeanlarge", isLarge: true, displayNameID: "105089", details: "28833", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\caribbean\\\\caribbean_mini" }, carolina: { id: 8, idStr: "carolina", displayNameID: "18914", details: "26984", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\carolina\\\\carolina_mini" }, carolinalarge: { id: 18, idStr: "carolinalarge", isLarge: true, displayNameID: "43407", details: "26984", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\carolina\\\\carolina_lrg_mini" }, "cascade range": { id: 52, idStr: "cascade range", displayNameID: "90518", details: "90520", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\cascade_range\\\\cascade_range_mini" }, "cascade rangelarge": { id: 131, idStr: "cascade rangelarge", isLarge: true, displayNameID: "105090", details: "90520", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\cascade_range\\\\cascade_range_mini" }, "central plain": { id: 53, idStr: "central plain", displayNameID: "90545", details: "90547", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\central_plains\\\\central_plain_mini" }, "central plainlarge": { id: 132, idStr: "central plainlarge", isLarge: true, displayNameID: "105091", details: "90547", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\central_plains\\\\central_plain_mini" }, centralasia: { id: 248, idStr: "centralasia", displayNameID: "106204", details: "106206", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\central_asia\\\\central_asia_mini" }, centralasialarge: { id: 249, idStr: "centralasialarge", isLarge: true, displayNameID: "106207", details: "106206", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\central_asia\\\\central_asia_mini" }, ceylon: { id: 9, idStr: "ceylon", displayNameID: "70044", details: "70043", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\ceylon\\\\ceylon_mini" }, ceylonlarge: { id: 133, idStr: "ceylonlarge", isLarge: true, displayNameID: "105092", details: "70043", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\ceylon\\\\ceylon_mini" }, colorado: { id: 54, idStr: "colorado", displayNameID: "90578", details: "90580", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\colorado\\\\colorado_mini" }, coloradolarge: { id: 134, idStr: "coloradolarge", isLarge: true, displayNameID: "105093", details: "90580", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\colorado\\\\colorado_mini" }, dakota: { id: 55, idStr: "dakota", displayNameID: "90587", details: "90589", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\dakota\\\\dakota_mini" }, dakotalarge: { id: 135, idStr: "dakotalarge", isLarge: true, displayNameID: "105094", details: "90589", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\dakota\\\\dakota_mini" }, deccan: { id: 10, idStr: "deccan", displayNameID: "63583", details: "63582", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\deccan\\\\deccan_mini" }, deccanlarge: { id: 19, idStr: "deccanlarge", isLarge: true, displayNameID: "68735", details: "69845", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\deccan\\\\deccan_lrg_mini" }, euacropolis: { id: 250, idStr: "euacropolis", displayNameID: "106160", details: "106162", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_acropolis\\\\eu_acropolis_mini" }, euacropolislarge: { id: 251, idStr: "euacropolislarge", isLarge: true, displayNameID: "106163", details: "106162", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_acropolis\\\\eu_acropolis_mini" }, eualps: { id: 180, idStr: "eualps", displayNameID: "106036", details: "106038", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_alps\\\\eu_alps_mini" }, eualpslarge: { id: 181, idStr: "eualpslarge", isLarge: true, displayNameID: "106039", details: "106038", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_alps\\\\eu_alps_mini" }, euanatolia: { id: 182, idStr: "euanatolia", displayNameID: "106032", details: "106034", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_anatolia\\\\eu_anatolia_mini" }, euanatolialarge: { id: 183, idStr: "euanatolialarge", isLarge: true, displayNameID: "106035", details: "106034", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_anatolia\\\\eu_anatolia_mini" }, euarchipelago: { id: 184, idStr: "euarchipelago", displayNameID: "106040", details: "106042", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_archipelago\\\\eu_archipelago_mini" }, euarchipelagolarge: { id: 185, idStr: "euarchipelagolarge", isLarge: true, displayNameID: "106043", details: "106042", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_archipelago\\\\eu_archipelago_mini" }, euarena: { id: 262, idStr: "euarena", displayNameID: "106196", details: "106198", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_black_forest\\\\eu_black_forest_arena_mini" }, euarenalarge: { id: 263, idStr: "euarenalarge", isLarge: true, displayNameID: "106199", details: "106198", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_black_forest\\\\eu_black_forest_arena_mini" }, eubalkans: { id: 186, idStr: "eubalkans", displayNameID: "106044", details: "106046", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_balkan_mountains\\\\eu_balkan_mountains_mini" }, eubalkanslarge: { id: 187, idStr: "eubalkanslarge", isLarge: true, displayNameID: "106047", details: "106046", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_balkan_mountains\\\\eu_balkan_mountains_mini" }, eubaltic: { id: 188, idStr: "eubaltic", displayNameID: "106048", details: "106050", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_baltic\\\\eu_baltic_mini" }, eubalticlarge: { id: 189, idStr: "eubalticlarge", isLarge: true, displayNameID: "106051", details: "106050", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_baltic\\\\eu_baltic_mini" }, eublackforest: { id: 190, idStr: "eublackforest", displayNameID: "106052", details: "106054", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_black_forest\\\\eu_black_forest_mini" }, eublackforestlarge: { id: 191, idStr: "eublackforestlarge", isLarge: true, displayNameID: "106055", details: "106054", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_black_forest\\\\eu_black_forest_mini" }, eubohemia: { id: 192, idStr: "eubohemia", displayNameID: "106124", details: "106126", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_bohemia\\\\eu_bohemia_mini" }, eubohemialarge: { id: 193, idStr: "eubohemialarge", isLarge: true, displayNameID: "106127", details: "106126", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_bohemia\\\\eu_bohemia_mini" }, eubudapest: { id: 194, idStr: "eubudapest", displayNameID: "106156", details: "106158", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_budapest\\\\eu_budapest_mini" }, eubudapestlarge: { id: 195, idStr: "eubudapestlarge", isLarge: true, displayNameID: "106159", details: "106158", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_budapest\\\\eu_budapest_mini" }, eucarpathians: { id: 196, idStr: "eucarpathians", displayNameID: "106148", details: "106150", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_carpathians\\\\eu_carpathians_mini" }, eucarpathianslarge: { id: 197, idStr: "eucarpathianslarge", isLarge: true, displayNameID: "106151", details: "106150", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_carpathians\\\\eu_carpathians_mini" }, eucitizenclash: { id: 264, idStr: "eucitizenclash", displayNameID: "106200", details: "106202", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_eurasian_steppe\\\\eu_eurasian_steppe_survival_mini" }, eucitizenclashlarge: { id: 265, idStr: "eucitizenclashlarge", isLarge: true, displayNameID: "106203", details: "106202", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_eurasian_steppe\\\\eu_eurasian_steppe_survival_mini" }, eucourland: { id: 198, idStr: "eucourland", displayNameID: "106144", details: "106146", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_courland\\\\eu_courland_mini" }, eucourlandlarge: { id: 199, idStr: "eucourlandlarge", isLarge: true, displayNameID: "106147", details: "106146", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_courland\\\\eu_courland_mini" }, eudanishstrait: { id: 200, idStr: "eudanishstrait", displayNameID: "106128", details: "106130", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_danish_straits\\\\eu_danish_strait_mini" }, eudanishstraitlarge: { id: 201, idStr: "eudanishstraitlarge", isLarge: true, displayNameID: "106131", details: "106130", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_danish_straits\\\\eu_danish_strait_mini" }, eudeluge: { id: 240, idStr: "eudeluge", displayNameID: "106012", details: "106015", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hm_deluge\\\\hm_deluge_mini" }, eudnieperbasin: { id: 202, idStr: "eudnieperbasin", displayNameID: "106064", details: "106066", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_dnieper_basin\\\\eu_dnieper_basin_mini" }, eudnieperbasinlarge: { id: 203, idStr: "eudnieperbasinlarge", isLarge: true, displayNameID: "106067", details: "106066", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_dnieper_basin\\\\eu_dnieper_basin_mini" }, eueightyyearswar: { id: 241, idStr: "eueightyyearswar", displayNameID: "106004", details: "106007", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hm_80yw\\\\hm_80yw_mini" }, euengland: { id: 204, idStr: "euengland", displayNameID: "106056", details: "106058", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_england\\\\eu_england_mini" }, euenglandlarge: { id: 205, idStr: "euenglandlarge", isLarge: true, displayNameID: "106059", details: "106058", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_england\\\\eu_england_mini" }, eufinland: { id: 206, idStr: "eufinland", displayNameID: "106108", details: "106110", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_finland\\\\eu_finland_mini" }, eufinlandlarge: { id: 207, idStr: "eufinlandlarge", isLarge: true, displayNameID: "106111", details: "106110", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_finland\\\\eu_finland_mini" }, euforestnothing: { id: 266, idStr: "euforestnothing", displayNameID: "106176", details: "106178", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_black_forest\\\\eu_forest_nothing_mini" }, euforestnothinglarge: { id: 267, idStr: "euforestnothinglarge", isLarge: true, displayNameID: "106179", details: "106178", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_black_forest\\\\eu_forest_nothing_mini" }, eufrance: { id: 208, idStr: "eufrance", displayNameID: "106072", details: "106074", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_france\\\\eu_france_mini" }, eufrancelarge: { id: 209, idStr: "eufrancelarge", isLarge: true, displayNameID: "106075", details: "106074", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_france\\\\eu_france_mini" }, eugreatnorthernwar: { id: 242, idStr: "eugreatnorthernwar", displayNameID: "106020", details: "106023", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hm_gnw\\\\hm_gnw_mini" }, eugreatturkishwar: { id: 243, idStr: "eugreatturkishwar", displayNameID: "106016", details: "106019", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hm_gtw\\\\hm_gtw_mini" }, euhungarianplains: { id: 210, idStr: "euhungarianplains", displayNameID: "106076", details: "106078", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hungarian_plains\\\\eu_hungarian_plains_mini" }, euhungarianplainslarge: { id: 211, idStr: "euhungarianplainslarge", isLarge: true, displayNameID: "106079", details: "106078", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hungarian_plains\\\\eu_hungarian_plains_mini" }, euiberia: { id: 212, idStr: "euiberia", displayNameID: "106080", details: "106082", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_spain\\\\eu_spain_mini" }, euiberialarge: { id: 213, idStr: "euiberialarge", isLarge: true, displayNameID: "106083", details: "106082", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_spain\\\\eu_spain_mini" }, euireland: { id: 214, idStr: "euireland", displayNameID: "106136", details: "106138", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_ireland\\\\eu_ireland_mini" }, euirelandlarge: { id: 215, idStr: "euirelandlarge", isLarge: true, displayNameID: "106139", details: "106138", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_ireland\\\\eu_ireland_mini" }, euitalianwars: { id: 244, idStr: "euitalianwars", displayNameID: "106000", details: "106003", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hm_iw\\\\hm_iw_mini" }, euitaly: { id: 216, idStr: "euitaly", displayNameID: "106088", details: "106090", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_italy\\\\eu_italy_mini" }, euitalylarge: { id: 217, idStr: "euitalylarge", isLarge: true, displayNameID: "106091", details: "106090", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_italy\\\\eu_italy_mini" }, eukarelian: { id: 252, idStr: "eukarelian", displayNameID: "106188", details: "106190", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_karelian_lakes\\\\eu_karelian_lakes_mini" }, eukarelianlarge: { id: 253, idStr: "eukarelianlarge", isLarge: true, displayNameID: "106191", details: "106190", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_karelian_lakes\\\\eu_karelian_lakes_mini" }, eulithuania: { id: 218, idStr: "eulithuania", displayNameID: "106152", details: "106154", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_lithuania\\\\eu_lithuania_mini" }, eulithuanialarge: { id: 219, idStr: "eulithuanialarge", isLarge: true, displayNameID: "106155", details: "106154", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_lithuania\\\\eu_lithuania_mini" }, eulowcountries: { id: 220, idStr: "eulowcountries", displayNameID: "106092", details: "106094", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_low_countries\\\\eu_low_countries_mini" }, eulowcountrieslarge: { id: 221, idStr: "eulowcountrieslarge", isLarge: true, displayNameID: "106095", details: "106094", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_low_countries\\\\eu_low_countries_mini" }, eumediterranean: { id: 268, idStr: "eumediterranean", displayNameID: "106212", details: "106214", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_mediterranean\\\\eu_mediterranean_mini" }, eumediterraneanlarge: { id: 269, idStr: "eumediterraneanlarge", isLarge: true, displayNameID: "106215", details: "106214", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_mediterranean\\\\eu_mediterranean_mini" }, eunapoleonicwars: { id: 245, idStr: "eunapoleonicwars", displayNameID: "106024", details: "106027", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hm_nw\\\\hm_nw_mini" }, eupomerania: { id: 254, idStr: "eupomerania", displayNameID: "106168", details: "106170", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_pomerania\\\\eu_pomerania_mini" }, eupomeranialarge: { id: 255, idStr: "eupomeranialarge", isLarge: true, displayNameID: "106171", details: "106170", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_pomerania\\\\eu_pomerania_mini" }, euportugal: { id: 256, idStr: "euportugal", displayNameID: "106184", details: "106186", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_portugal\\\\eu_portugal_mini" }, euportugallarge: { id: 257, idStr: "euportugallarge", isLarge: true, displayNameID: "106187", details: "106186", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_portugal\\\\eu_portugal_mini" }, eupripetmarshes: { id: 222, idStr: "eupripetmarshes", displayNameID: "106112", details: "106114", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_pripet_marshes\\\\eu_pripet_marshes_mini" }, eupripetmarsheslarge: { id: 223, idStr: "eupripetmarsheslarge", isLarge: true, displayNameID: "106115", details: "106114", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_pripet_marshes\\\\eu_pripet_marshes_mini" }, eupyrenees: { id: 224, idStr: "eupyrenees", displayNameID: "106116", details: "106118", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_pyrenees\\\\eu_pyrenees_mini" }, eupyreneeslarge: { id: 225, idStr: "eupyreneeslarge", isLarge: true, displayNameID: "106119", details: "106118", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_pyrenees\\\\eu_pyrenees_mini" }, eurhine: { id: 258, idStr: "eurhine", displayNameID: "106164", details: "106166", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_rhine\\\\eu_rhine_mini" }, eurhinelarge: { id: 259, idStr: "eurhinelarge", isLarge: true, displayNameID: "106167", details: "106166", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_rhine\\\\eu_rhine_mini" }, eurussoturkwar: { id: 246, idStr: "eurussoturkwar", displayNameID: "106028", details: "106031", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hm_rtw\\\\hm_rtw_mini" }, eusardiniacorsica: { id: 226, idStr: "eusardiniacorsica", displayNameID: "106132", details: "106134", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_corsica_sardinia\\\\eu_corsica_sardinia_mini" }, eusardiniacorsicalarge: { id: 227, idStr: "eusardiniacorsicalarge", isLarge: true, displayNameID: "106135", details: "106134", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_corsica_sardinia\\\\eu_corsica_sardinia_mini" }, eusaxony: { id: 228, idStr: "eusaxony", displayNameID: "106096", details: "106098", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_saxony\\\\eu_saxony_mini" }, eusaxonylarge: { id: 229, idStr: "eusaxonylarge", isLarge: true, displayNameID: "106099", details: "106098", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_saxony\\\\eu_saxony_mini" }, euscandinavia: { id: 230, idStr: "euscandinavia", displayNameID: "106100", details: "106102", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_scandinavia\\\\eu_scandinavia_mini" }, euscandinavialarge: { id: 231, idStr: "euscandinavialarge", isLarge: true, displayNameID: "106103", details: "106102", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_scandinavia\\\\eu_scandinavia_mini" }, euscotland: { id: 232, idStr: "euscotland", displayNameID: "106140", details: "106142", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_scotland\\\\eu_scotland_mini" }, euscotlandlarge: { id: 233, idStr: "euscotlandlarge", isLarge: true, displayNameID: "106143", details: "106142", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_scotland\\\\eu_scotland_mini" }, eusteppe: { id: 234, idStr: "eusteppe", displayNameID: "106068", details: "106070", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_eurasian_steppe\\\\eu_eurasian_steppe_mini" }, eusteppelarge: { id: 235, idStr: "eusteppelarge", isLarge: true, displayNameID: "106071", details: "106070", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_eurasian_steppe\\\\eu_eurasian_steppe_mini" }, eusteppelost: { id: 270, idStr: "eusteppelost", displayNameID: "106220", details: "106222", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_eurasian_steppe\\\\eu_eurasian_steppe_lost_mini" }, eusteppelostlarge: { id: 271, idStr: "eusteppelostlarge", isLarge: true, displayNameID: "106223", details: "106222", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_eurasian_steppe\\\\eu_eurasian_steppe_lost_mini" }, euthirtyyearswar: { id: 247, idStr: "euthirtyyearswar", displayNameID: "106008", details: "106011", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_hm_30yw\\\\hm_30yw_mini" }, euvistulabasin: { id: 236, idStr: "euvistulabasin", displayNameID: "106104", details: "106106", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_vistula_basin\\\\eu_vistula_basin_mini" }, euvistulabasinlarge: { id: 237, idStr: "euvistulabasinlarge", isLarge: true, displayNameID: "106107", details: "106106", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_vistula_basin\\\\eu_vistula_basin_mini" }, euwallachia: { id: 238, idStr: "euwallachia", displayNameID: "106120", details: "106122", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_wallachia\\\\eu_wallachia_mini" }, euwallachialarge: { id: 239, idStr: "euwallachialarge", isLarge: true, displayNameID: "106123", details: "106122", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_wallachia\\\\eu_wallachia_mini" }, "fertile crescent": { id: 56, idStr: "fertile crescent", displayNameID: "90530", details: "90532", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\fertile_crescent\\\\fertile_crescent_mini" }, "fertile crescentlarge": { id: 136, idStr: "fertile crescentlarge", isLarge: true, displayNameID: "105096", details: "90532", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\fertile_crescent\\\\fertile_crescent_mini" }, florida: { id: 57, idStr: "florida", displayNameID: "90533", details: "90535", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\florida\\\\florida_mini" }, floridalarge: { id: 137, idStr: "floridalarge", isLarge: true, displayNameID: "105097", details: "90535", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\florida\\\\florida_mini" }, "gran chaco": { id: 58, idStr: "gran chaco", displayNameID: "90539", details: "90541", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\gran_chaco\\\\gran_chaco_mini" }, "gran chacolarge": { id: 138, idStr: "gran chacolarge", isLarge: true, displayNameID: "105099", details: "90541", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\gran_chaco\\\\gran_chaco_mini" }, "great lakes": { id: 11, idStr: "great lakes", displayNameID: "28851", details: "28852", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\great_lakes\\\\great_lakes_mini" }, "great lakeslarge": { id: 139, idStr: "great lakeslarge", isLarge: true, displayNameID: "105100", details: "28852", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\great_lakes\\\\great_lakes_mini" }, "great plains": { id: 12, idStr: "great plains", displayNameID: "28598", details: "28599", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\great_plains\\\\great_plains_mini" }, "great plainslarge": { id: 20, idStr: "great plainslarge", isLarge: true, displayNameID: "43408", details: "28599", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\great_plains\\\\great_plains_lrg_mini" }, guianas: { id: 140, idStr: "guianas", displayNameID: "105163", details: "105165", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\guianas\\\\guianas_mini" }, guianaslarge: { id: 141, idStr: "guianaslarge", isLarge: true, displayNameID: "105166", details: "105165", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\guianas\\\\guianas_mini" }, himalayas: { id: 13, idStr: "himalayas", displayNameID: "70041", details: "70040", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\himalayas\\\\himalayas_mini" }, himalayaslarge: { id: 142, idStr: "himalayaslarge", isLarge: true, displayNameID: "105103", details: "70040", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\himalayas\\\\himalayas_mini" }, himalayasupper: { id: 14, idStr: "himalayasupper", displayNameID: "70038", details: "70037", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\himalayas\\\\himalayas_upper_mini" }, himalayasupperlarge: { id: 143, idStr: "himalayasupperlarge", isLarge: true, displayNameID: "105104", details: "70037", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\himalayas\\\\himalayas_upper_mini" }, hispaniola: { id: 15, idStr: "hispaniola", displayNameID: "43664", details: "43665", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\hispaniola\\\\hispaniola_mini" }, hispaniolalarge: { id: 144, idStr: "hispaniolalarge", isLarge: true, displayNameID: "105105", details: "43665", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\hispaniola\\\\hispaniola_mini" }, hokkaido: { id: 59, idStr: "hokkaido", displayNameID: "90566", details: "90568", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\hokkaido\\\\hokkaido_mini" }, hokkaidolarge: { id: 145, idStr: "hokkaidolarge", isLarge: true, displayNameID: "105106", details: "90568", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\hokkaido\\\\hokkaido_mini" }, honshu: { id: 16, idStr: "honshu", displayNameID: "70032", details: "70031", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\japan\\\\honshu_mini" }, honshularge: { id: 146, idStr: "honshularge", isLarge: true, displayNameID: "105107", details: "70031", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\japan\\\\honshu_mini" }, honshuregicide: { id: 36, idStr: "honshuregicide", displayNameID: "70035", details: "70034", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\japan\\\\honshu_mini" }, honshuregicidelarge: { id: 147, idStr: "honshuregicidelarge", isLarge: true, displayNameID: "105133", details: "70034", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\japan\\\\honshu_mini" }, indochina: { id: 17, idStr: "indochina", displayNameID: "70029", details: "70028", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\indochina\\\\indochina_mini" }, indochinalarge: { id: 148, idStr: "indochinalarge", isLarge: true, displayNameID: "105109", details: "70028", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\indochina\\\\indochina_mini" }, indonesia: { id: 60, idStr: "indonesia", displayNameID: "90599", details: "90601", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\indonesia\\\\indonesia_mini" }, indonesialarge: { id: 149, idStr: "indonesialarge", isLarge: true, displayNameID: "105110", details: "90601", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\indonesia\\\\indonesia_mini" }, kamchatka: { id: 61, idStr: "kamchatka", displayNameID: "90554", details: "90556", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\kamchatka\\\\kamchatka_mini" }, kamchatkalarge: { id: 150, idStr: "kamchatkalarge", isLarge: true, displayNameID: "105111", details: "90556", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\kamchatka\\\\kamchatka_mini" }, korea: { id: 62, idStr: "korea", displayNameID: "90503", details: "90505", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\korea\\\\korea_mini" }, korealarge: { id: 151, idStr: "korealarge", isLarge: true, displayNameID: "105112", details: "90505", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\korea\\\\korea_mini" }, malaysia: { id: 63, idStr: "malaysia", displayNameID: "90584", details: "90586", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\malaysia\\\\malaysia_mini" }, malaysialarge: { id: 152, idStr: "malaysialarge", isLarge: true, displayNameID: "105114", details: "90586", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\malaysia\\\\malaysia_mini" }, manchuria: { id: 64, idStr: "manchuria", displayNameID: "90560", details: "90562", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\manchuria\\\\manchuria_mini" }, manchurialarge: { id: 153, idStr: "manchurialarge", isLarge: true, displayNameID: "105115", details: "90562", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\manchuria\\\\manchuria_mini" }, mexico: { id: 65, idStr: "mexico", displayNameID: "90590", details: "90592", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\mexico\\\\mexico_mini" }, mexicolarge: { id: 154, idStr: "mexicolarge", isLarge: true, displayNameID: "105116", details: "90592", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\mexico\\\\mexico_mini" }, minasgerais: { id: 155, idStr: "minasgerais", displayNameID: "105159", details: "105161", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\minas_gerais\\\\minas_gerais_mini" }, minasgeraislarge: { id: 156, idStr: "minasgeraislarge", isLarge: true, displayNameID: "105162", details: "105161", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\minas_gerais\\\\minas_gerais_mini" }, mongolia: { id: 27, idStr: "mongolia", displayNameID: "70026", details: "70025", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\mongolia\\\\mongolia_mini" }, mongolialarge: { id: 157, idStr: "mongolialarge", isLarge: true, displayNameID: "105117", details: "70025", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\mongolia\\\\mongolia_mini" }, "new england": { id: 28, idStr: "new england", displayNameID: "28567", details: "34930", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\new_england\\\\new_england_mini" }, "new englandlarge": { id: 158, idStr: "new englandlarge", isLarge: true, displayNameID: "105118", details: "34930", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\new_england\\\\new_england_mini" }, "northwest territory": { id: 29, idStr: "northwest territory", displayNameID: "43637", details: "90605", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\northwest_territory\\\\northwest_territory_mini" }, "northwest territorylarge": { id: 159, idStr: "northwest territorylarge", isLarge: true, displayNameID: "105122", details: "90605", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\northwest_territory\\\\northwest_territory_mini" }, orinoco: { id: 30, idStr: "orinoco", displayNameID: "47120", details: "47121", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\orinoco\\\\orinoco_mini" }, orinocolarge: { id: 160, idStr: "orinocolarge", isLarge: true, displayNameID: "105123", details: "47121", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\orinoco\\\\orinoco_mini" }, ozarks: { id: 31, idStr: "ozarks", displayNameID: "130015", details: "130016", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\ozarks\\\\ozarks_mini" }, ozarkslarge: { id: 161, idStr: "ozarkslarge", isLarge: true, displayNameID: "105124", details: "130016", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\ozarks\\\\ozarks_mini" }, "painted desert": { id: 32, idStr: "painted desert", displayNameID: "45738", details: "45739", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\painteddesert\\\\painted_desert_mini" }, "painted desertlarge": { id: 162, idStr: "painted desertlarge", isLarge: true, displayNameID: "105125", details: "45739", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\painteddesert\\\\painted_desert_mini" }, "pampas sierras": { id: 66, idStr: "pampas sierras", displayNameID: "90569", details: "90571", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\pampas_sierras\\\\pampas_sierras_mini" }, "pampas sierraslarge": { id: 163, idStr: "pampas sierraslarge", isLarge: true, displayNameID: "105127", details: "90571", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\pampas_sierras\\\\pampas_sierras_mini" }, pampas: { id: 33, idStr: "pampas", displayNameID: "26304", details: "30104", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\pampas\\\\pampas_mini" }, pampaslarge: { id: 164, idStr: "pampaslarge", isLarge: true, displayNameID: "105126", details: "30104", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\pampas\\\\pampas_mini" }, panama: { id: 165, idStr: "panama", displayNameID: "105167", details: "105169", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\panama\\\\panama_mini" }, panamalarge: { id: 166, idStr: "panamalarge", isLarge: true, displayNameID: "105170", details: "105169", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\panama\\\\panama_mini" }, "parallel rivers": { id: 67, idStr: "parallel rivers", displayNameID: "90596", details: "90598", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\parallel_rivers\\\\parallel_rivers_mini" }, "parallel riverslarge": { id: 167, idStr: "parallel riverslarge", isLarge: true, displayNameID: "105128", details: "90598", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\parallel_rivers\\\\parallel_rivers_mini" }, patagonia: { id: 34, idStr: "patagonia", displayNameID: "28983", details: "28984", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\patagonia\\\\patagonia_mini" }, patagonialarge: { id: 168, idStr: "patagonialarge", isLarge: true, displayNameID: "105129", details: "28984", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\patagonia\\\\patagonia_mini" }, plymouth: { id: 35, idStr: "plymouth", displayNameID: "130018", details: "130019", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\plymouth\\\\plymouth_mini" }, plymouthlarge: { id: 169, idStr: "plymouthlarge", isLarge: true, displayNameID: "105131", details: "130019", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\plymouth\\\\plymouth_mini" }, punjab: { id: 68, idStr: "punjab", displayNameID: "90509", details: "90511", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\punjab\\\\punjab_mini" }, punjablarge: { id: 170, idStr: "punjablarge", isLarge: true, displayNameID: "105132", details: "90511", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\punjab\\\\punjab_mini" }, rockies: { id: 37, idStr: "rockies", displayNameID: "28828", details: "28829", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\rockies\\\\rockies_mini" }, rockieslarge: { id: 171, idStr: "rockieslarge", isLarge: true, displayNameID: "105134", details: "28829", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\rockies\\\\rockies_mini" }, saguenay: { id: 38, idStr: "saguenay", displayNameID: "90548", details: "90550", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\saguenay\\\\saguenay_mini" }, saguenaylarge: { id: 21, idStr: "saguenaylarge", isLarge: true, displayNameID: "43410", details: "90550", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\saguenay\\\\saguenay_lrg_mini" }, siberia: { id: 39, idStr: "siberia", displayNameID: "70021", details: "70020", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\siberia\\\\siberia_mini" }, siberialarge: { id: 22, idStr: "siberialarge", isLarge: true, displayNameID: "70022", details: "70023", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\siberia\\\\siberia_lrg_mini" }, silkroad: { id: 40, idStr: "silkroad", displayNameID: "70012", details: "70011", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\silk_road\\\\silk_road_mini" }, silkroadlarge: { id: 23, idStr: "silkroadlarge", isLarge: true, displayNameID: "68737", details: "70014", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\silk_road\\\\silk_road_lrg_mini" }, sonora: { id: 41, idStr: "sonora", displayNameID: "28834", details: "28835", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\sonora\\\\sonora_mini" }, sonoralarge: { id: 24, idStr: "sonoralarge", isLarge: true, displayNameID: "43405", details: "28835", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\sonora\\\\sonora_lrg_mini" }, texas: { id: 42, idStr: "texas", displayNameID: "25996", details: "25997", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\texas\\\\texas_mini" }, texasfrontier: { id: 172, idStr: "texasfrontier", displayNameID: "105171", details: "105173", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\texas\\\\texas_mini" }, texasfrontierlarge: { id: 173, idStr: "texasfrontierlarge", isLarge: true, displayNameID: "105174", details: "105173", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\texas\\\\texas_lrg_mini" }, texaslarge: { id: 25, idStr: "texaslarge", isLarge: true, displayNameID: "43409", details: "25997", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\texas\\\\texas_lrg_mini" }, unknown: { id: 43, idStr: "unknown", displayNameID: "45466", details: "45467", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\unknown\\\\unknown_mini" }, unknownlarge: { id: 174, idStr: "unknownlarge", isLarge: true, displayNameID: "105141", details: "45467", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\unknown\\\\unknown_mini" }, unknownlost: { id: 272, idStr: "unknownlost", displayNameID: "106216", details: "106218", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\unknown\\\\unknown_lost_mini" }, unknownlostlarge: { id: 273, idStr: "unknownlostlarge", isLarge: true, displayNameID: "106219", details: "106218", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\unknown\\\\unknown_lost_mini" }, unknownsm: { id: 274, idStr: "unknownsm", displayNameID: "106224", details: "106226", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\unknown\\\\unknown_survival_mini" }, unknownsmlarge: { id: 275, idStr: "unknownsmlarge", isLarge: true, displayNameID: "106227", details: "106226", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\unknown\\\\unknown_survival_mini" }, yamal: { id: 260, idStr: "yamal", displayNameID: "106180", details: "106182", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\yamal\\\\yamal_mini" }, yamallarge: { id: 261, idStr: "yamallarge", isLarge: true, displayNameID: "106183", details: "106182", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\yamal\\\\yamal_mini" }, "yellow riverdry": { id: 44, idStr: "yellow riverdry", displayNameID: "63574", details: "63573", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\yellow_river\\\\yellow_river_mini" }, "yellow riverlarge": { id: 26, idStr: "yellow riverlarge", isLarge: true, displayNameID: "68736", details: "69846", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\yellow_river\\\\yellow_river_lrg_mini" }, yucatan: { id: 45, idStr: "yucatan", displayNameID: "26956", details: "26957", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\yucatan\\\\yucatan_mini" }, yucatanlarge: { id: 175, idStr: "yucatanlarge", isLarge: true, displayNameID: "105143", details: "26957", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\yucatan\\\\yucatan_mini" }, yukon: { id: 46, idStr: "yukon", displayNameID: "26196", details: "26197", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\yukon\\\\yukon_mini" }, yukonlarge: { id: 176, idStr: "yukonlarge", isLarge: true, displayNameID: "105144", details: "26197", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\yukon\\\\yukon_mini" }, afeyeofthesahara: { id: 276, idStr: "afeyeofthesahara", displayNameID: "106228", details: "106230", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_dunes\\\\dunes_eye_mini" }, afeyeofthesaharalarge: { id: 277, idStr: "afeyeofthesaharalarge", isLarge: true, displayNameID: "106231", details: "106230", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\af_dunes\\\\dunes_eye_mini" }, eucaucasus: { id: 278, idStr: "eucaucasus", displayNameID: "106060", details: "106062", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_caucasus\\\\eu_caucasus_mini" }, eucaucasuslarge: { id: 279, idStr: "eucaucasuslarge", isLarge: true, displayNameID: "106063", details: "106062", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_caucasus\\\\eu_caucasus_mini" }, eumuscovy: { id: 280, idStr: "eumuscovy", displayNameID: "106172", details: "106174", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_muscovy\\\\eu_muscovy_mini" }, eumuscovylarge: { id: 281, idStr: "eumuscovylarge", isLarge: true, displayNameID: "106175", details: "106174", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_muscovy\\\\eu_muscovy_mini" }, euwales: { id: 282, idStr: "euwales", isLarge: false, displayNameID: "106192", details: "106194", imagepath: "resources\\\\images\\\\icons\\\\random_map\\\\eu_wales\\\\eu_wales_mini" } };

// src/parseReplay.ts
var mapInfos = maps_default;
function parseReplay(fileArrayBuffer) {
  let uint8Ary = inflateRaw2(fileArrayBuffer.slice(headerLength));
  let dataView = new DataView(uint8Ary.buffer);
  let position = 273;
  let stringLength = readInt32(dataView, position);
  const exeInfo = readString(dataView, position, stringLength);
  let version = Number(exeInfo.split(" ")[1]);
  let dictionary = parseField(dataView);
  let mapName = dictionary["gamefilename"];
  let gameSetting = {
    gameName: dictionary["gamename"],
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
    mapName,
    mapInfo: mapInfos[mapName],
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
    let civId = dictionary[`gameplayer${i}civ`];
    let civ = civMap.get(civId);
    let civInfo = civToInfo.get(civ);
    let player = {
      aiPersonality: dictionary[`gameplayer${i}aipersonality`],
      avatarId: dictionary[`gameplayer${i}avatarid`],
      civId,
      civInfo,
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
export {
  parseChat,
  parseDeck,
  parseField,
  parseReplay,
  parseTeam
};
//# sourceMappingURL=index.mjs.map