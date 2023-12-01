import { inflateRaw } from "pako";
import { Message } from "./dataStructures";
import { readInt32, readInt8, readString, search } from "./util";
import { headerLength } from "./constant";

export function parseChat(fileArrayBuffer: ArrayBuffer): Message[] {
    let uint8Ary: Uint8Array = inflateRaw(fileArrayBuffer.slice(headerLength));
    let dataView: DataView = new DataView(uint8Ary.buffer);
    let chat: Message[] = [];
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
                position = search(uint8Ary, searchBytes, position)
                continue
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
    }
    return chat;
}