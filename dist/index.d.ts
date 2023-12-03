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

declare function parseChat(fileArrayBuffer: ArrayBuffer): Message[];

declare function parseDeck(dataView: DataView, uint8Ary: Uint8Array): Deck[];

declare function parseField(dataView: DataView): {
    [k: string]: any;
};

declare function parseReplay(fileArrayBuffer: ArrayBuffer): Replay;

declare function parseTeam(dataView: DataView, uint8Ary: Uint8Array): Team[];

export { parseChat, parseDeck, parseField, parseReplay, parseTeam };
