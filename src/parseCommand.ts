import { inflateRaw } from "pako";
import { Commands, Message, Resign } from "./dataStructures";
import { readInt32, readInt8, readString, search } from "./util";
import { headerLength } from "./constant";

export function parseCommand(fileArrayBuffer: ArrayBuffer): Commands {
    let uint8Ary: Uint8Array = inflateRaw(fileArrayBuffer.slice(headerLength));
    let dataView: DataView = new DataView(uint8Ary.buffer);
    let chat: Message[] = [];
    let resigns: Resign[] = [];
    let searchBytes = [0x9a, 0x99, 0x99, 0x3d];
    let position = search(uint8Ary, searchBytes) + 142;
    const msgLen = readInt32(dataView, position);
    position += 4;
    // starting messages
    for (let i = 0; i < msgLen; i++) {
        let from = readInt32(dataView, position); // from
        position += 4;
        let to = readInt32(dataView, position); // to
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
            time: 0,
        });
    }

    let duration: number = 0;
    searchBytes = [0x1, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x19];
    while (true) {
        position = search(uint8Ary, searchBytes, position);
        if (position == -1) break;
        position += 113;
        const command = readInt8(dataView, position);
        position += 1;
        let hasCommands = true;
        switch (command) {
            case 33:
            case 65:
            case 161:
            case 193:
                break;
            case 1:
            case 129:
                hasCommands = false;
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
                hasCommands = false;
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
                hasCommands = false;
                break;
            case 47:
            case 175:
            case 207:
                position += 12;
                break;
            case 15:
            case 143:
                position += 12;
                hasCommands = false;
                break;
            case 49:
            case 177:
                position += 36;
                break;
            case 17:
            case 145:
                position += 36;
                hasCommands = false;
                break;
            case 19:
            case 21:
            case 25:
            case 147:
            case 149:
            case 153:
                position += 40;
                hasCommands = false;
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
                hasCommands = false;
                break;
            case 63:
            case 191:
            case 223:
                position += 48;
                break;
            case 31:
            case 159:
                position += 48;
                hasCommands = false;
                break;
            default:
                console.error(`Unknown main command: ${command}`);
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
                time: duration,
            });
        }

        duration += readInt8(dataView, position);
        position += 1;

        let commandsCount = 0;
        if (hasCommands) {
            if ([65, 67, 73, 75, 193, 195, 201, 203, 207, 223].includes(command)) {
                commandsCount = readInt32(dataView, position);
                position += 4;
            } else {
                commandsCount = readInt8(dataView, position);
                position += 1;
            }
            for (let i = 0; i < commandsCount; i++) {
                readInt8(dataView, position);
                position += 1;

                const commandId = readInt32(dataView, position);
                position += 4;

                let shipmentCancel = -1;
                if (commandId === 14) {
                    // TODO: Some civs can send the same card twice at the same time, need a way to identify which copy the player cancelled.
                    let a = readInt32(dataView, position);
                    let b = readInt32(dataView, position + 4);
                    let c = readInt32(dataView, position + 8);
                    if (a != -1) {
                        // cancel shipmentId b
                        shipmentCancel = b;
                    }
                    position += 12;
                }

                readInt8(dataView, position);
                position += 1;
                let playerSlotId = readInt32(dataView, position);
                position += 4;

                readInt32(dataView, position);
                position += 4;
                readInt32(dataView, position);
                position += 4;
                readInt32(dataView, position);
                position += 4;
                const unknown0 = readInt32(dataView, position);
                position += 4;

                if (unknown0 === 1) {
                    readInt32(dataView, position);
                    position += 4;
                } else if (unknown0 !== 0) {
                    console.error('unknown');
                }
                let unknown1 = readInt32(dataView, position);
                position += 4;
                const selectedCount = readInt32(dataView, position);
                position += 4;

                for (let j = 0; j < selectedCount; j++) {
                    readInt32(dataView, position);
                    position += 4;
                }

                let unknown2 = readInt32(dataView, position);
                position += 4;
                position += unknown2 * 12;

                const unknownCount = readInt32(dataView, position);
                position += 4;

                for (let j = 0; j < unknownCount; j++) {
                    readInt8(dataView, position);
                    position += 1;
                }
                readInt8(dataView, position);
                position += 1;
                readInt32(dataView, position);
                position += 4;
                readInt32(dataView, position);
                position += 4;
                readInt32(dataView, position);
                position += 4;
                readInt32(dataView, position);
                position += 4;
                position += 4;

                if (commandId === 0) {
                    position += 24;
                    if (readInt8(dataView, position) === 255) {
                        position += 8;
                    }
                } else if (commandId === 1) {
                    let techId = readInt32(dataView, position);
                    position += 4;
                } else if (commandId === 2) {
                    // sending shipment
                    // TODO: Need to check if player actually can send shipment, this just records the shipment clicking command, might not actually send it.
                    let shipmentId = readInt32(dataView, position + 4);
                    if (unknown1 == 0) {
                        position += 2;
                    } else if (unknown1 == 2) {
                        position += 2;
                    }
                    position += 14;
                } else if (commandId === 3) {
                    let intStr = ''
                    for (let k = 0; k < 11; k++) {
                        intStr += readInt32(dataView, position + k * 4) + ', ';
                    }
                    let protoId = readInt32(dataView, position);
                    // 1518 is deBarbaryCosair, but in fact it's deTorp.
                    if (protoId == 1518) {
                        protoId = 1624;
                    }
                    position += 44;
                } else if (commandId === 4) {
                    position += 25;
                } else if (commandId === 6) {
                    position += 36;
                } else if (commandId === 7) {
                    position += 1;
                } else if (commandId === 9) {
                } else if (commandId === 12) {
                    position += 36;
                    if (unknown1 === 0) {
                        position += 1;
                    }
                } else if (commandId === 13) {
                    position += 12;
                } else if (commandId === 14) {
                    // cancel shipment
                } else if (commandId === 16) {
                    position += 4;
                    const resignSlotId = readInt32(dataView, position);
                    resigns.push({
                        slotId: resignSlotId,
                        time: duration,
                    });
                    position += 4;
                    position += 5;
                } else if (commandId === 18) {
                    position += 4;
                } else if (commandId === 19) {
                    position += 17;
                } else if (commandId === 23) {
                    position += 6;
                } else if (commandId === 24) {
                    position += 12;
                } else if (commandId === 25) {
                    position += 6;
                } else if (commandId === 26) {
                    position += 4;
                } else if (commandId === 34) {
                } else if (commandId === 35) {
                    position += 4;
                } else if (commandId === 37) {
                    position += 5;
                } else if (commandId === 41) {
                    const control1: number = readInt32(dataView, position);
                    position += 4;
                    position += 4;
                    position += 4;
                    position += 8;
                    unknown1 = readInt32(dataView, position);
                    position += 4;
                    if (control1 === 1) {
                        unknown2 = readInt32(dataView, position);
                        position += 4;
                        let unknown3 = -1;
                        if (unknown2 === 1) {
                            unknown3 = readInt32(dataView, position);
                            position += 4;
                        }
                        position += 13;
                    }
                } else if (commandId === 44) {
                    position += 8;
                } else if (commandId === 46) {
                    position += 8;
                } else if (commandId === 48) {
                    position += 9;
                } else if (commandId === 53) {
                    position += 8;
                } else if (commandId === 57) {
                    position += 12;
                } else if (commandId === 58) {
                    position += 4;
                } else if (commandId === 61) {
                    position += 8;
                } else if (commandId === 62) {
                    position += 4;
                } else if (commandId === 63) {
                    position += 16;
                } else if (commandId === 64) {
                } else if (commandId === 65) {
                    position += 4;
                } else if (commandId == 66) {
                    let deckID = readInt32(dataView, position);
                    position += 4;
                    let cardID = readInt32(dataView, position);
                    position += 4;
                } else if (commandId === 67) {
                    position += 12;
                } else if (commandId === 71) {
                    position += 4;
                } else if (commandId === 72) {
                    position += 16;
                } else if (commandId === 73) {
                } else if (commandId === 80) {
                    position += 8;
                }
            }

        }
    }
    return {
        chat: chat,
        resigns: resigns,
    };
}