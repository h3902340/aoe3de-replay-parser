export interface Replay {
    setting: GameSetting,
    players: Player[],
}

export interface GameSetting {
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
}