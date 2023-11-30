interface Replay {
    setting: GameSetting;
    players: Player[];
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
}

/**
 * Parse the entire replay to get a Replay object.
 * @param fileArrayBuffer provide the array buffer of age3Yrec file
 * @returns return a replay with game infos
 */
declare function parseReplay(fileArrayBuffer: ArrayBuffer): Replay;

export { parseReplay };
