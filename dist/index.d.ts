type CivInfo = {
    name: string;
    urlCircle: string;
    urlRectanle: string;
    urlLeft: string;
    idCiv: number;
    homecityJson: string;
};

interface Replay {
    exeVersion: number;
    setting: GameSetting;
    players: Player[];
    teams: Team[];
}
interface GameSetting {
    gameName: string;
    allowCheats: boolean;
    blockade: boolean;
    playerCount: number;
    difficulty: number;
    startingAge: number;
    endingAge: number;
    isTreaty: boolean;
    allowTradeMonopoly: boolean;
    gameType: number;
    mapCRC: number;
    mapName: string;
    mapInfo: MapInfo;
    mapSet: string;
    freeForAll: boolean;
    hostTime: number;
    koth: boolean;
    latency: number;
    mapSetName: string;
    mapResource: number;
    radomSeed: number;
    gameSpeed: number;
}
interface Player {
    aiPersonality: string;
    avatarId: string;
    civId: number;
    civInfo: CivInfo;
    civIsRandom: boolean;
    clan: string;
    color: number;
    explorerName: string;
    explorerSkinId: number;
    handicap: number;
    homecityFileName: string;
    homecityLevel: number;
    homecityName: string;
    slotId: number;
    playerName: string;
    initialDecks: Deck[];
}
interface Team {
    id: number;
    name: string;
    members: number[];
}
interface Deck {
    deckName: string;
    deckId: number;
    gameId: number;
    isDefault: boolean;
    cardCount: number;
    techIds: number[];
}
interface Message {
    fromId: number;
    toId: number;
    message: string;
    time: number;
}
interface MapInfo {
    id: number;
    idStr: string;
    displayNameID: string;
    details: string;
    imagepath: string;
    isLarge?: boolean;
}

declare function parseChat(fileArrayBuffer: ArrayBuffer): Message[];

declare function parseDeck(dataView: DataView, uint8Ary: Uint8Array): Deck[];

declare function parseField(dataView: DataView): {
    [k: string]: any;
};

declare function parseReplay(fileArrayBuffer: ArrayBuffer): Replay;

declare function parseTeam(dataView: DataView, uint8Ary: Uint8Array): Team[];

export { type CivInfo, type Deck, type GameSetting, type Message, type Player, type Replay, type Team, parseChat, parseDeck, parseField, parseReplay, parseTeam };
