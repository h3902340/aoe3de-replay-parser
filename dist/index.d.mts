interface Replay {
    exeVersion: number;
    setting: GameSetting;
    players: Player[];
    teams: Team[];
}
interface GameSetting {
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

/**
 * Parse the entire replay to get a Replay object.
 * @param fileArrayBuffer provide the array buffer of age3Yrec file
 * @returns return a replay with game infos
 */
declare function parseReplay(fileArrayBuffer: ArrayBuffer): Replay;
declare function parseChat(fileArrayBuffer: ArrayBuffer): Message[];

export { parseChat, parseReplay };
