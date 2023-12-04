import { CivInfo } from "./constant";

export interface Replay {
    exeVersion: number,
    setting: GameSetting,
    players: Player[],
    teams: Team[],
}

export interface GameSetting {
    gameName: string,
    allowCheats: boolean,
    blockade: boolean,
    playerCount: number,
    difficulty: number,
    startingAge: number,
    endingAge: number,
    isTreaty: boolean,
    allowTradeMonopoly: boolean,
    gameType: number,
    mapCRC: number,
    mapName: string,
    mapInfo: MapInfo,
    mapSet: string,
    freeForAll: boolean,
    hostTime: number, // ?
    koth: boolean,
    latency: number, // ?
    mapSetName: string,
    mapResource: number,
    radomSeed: number,
    gameSpeed: number,
}

export interface Player {
    aiPersonality: string,
    avatarId: string,
    civId: number,
    civInfo: CivInfo,
    civIsRandom: boolean,
    clan: string,
    color: number,
    explorerName: string,
    explorerSkinId: number,
    handicap: number,
    homecityFileName: string,
    homecityLevel: number,
    homecityName: string,
    slotId: number,
    playerName: string,
    initialDecks: Deck[],
}

export interface Team {
    id: number,
    name: string,
    members: number[]
}

export interface Deck {
    deckName: string,
    deckId: number,
    gameId: number,
    isDefault: boolean,
    cardCount: number,
    techIds: number[],
}

export interface Message {
    fromId: number,
    toId: number,
    message: string,
    time: number,
}

export interface MapInfo {
    id: number;
    idStr: string;
    displayNameID: string;
    details: string;
    imagepath: string;
    isLarge?: boolean;
}