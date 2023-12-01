import { decoder } from "./constant";

export function readString(dataView: DataView, position: number, length: number): string {
    const end = position + length * 2;
    const string = decoder.decode(dataView.buffer.slice(position, end));
    return string
}

export function readInt32(dataView: DataView, position: number): number {
    const int32 = dataView.getInt32(position, true);
    return int32
}

export function readFloat32(dataView: DataView, position: number): number {
    const float32 = dataView.getFloat32(position, true)
    return float32;
}

export function readBool(dataView: DataView, position: number): boolean {
    const bool = dataView.getUint8(position);
    return Boolean(bool);
}

export function readInt8(dataView: DataView, position: number): number {
    const int8 = dataView.getUint8(position)
    return int8
}

export function searchDeck(dataView: DataView, uint8Ary: Uint8Array, startIndex: number): number {
    let position = startIndex;
    while (position < uint8Ary.length) {
        position = search(uint8Ary, [0x0, 0x0, 0x0, 0x44, 0x6b], position);
        if (position == -1) break;
        position += 9;
        let int = readInt32(dataView, position);
        if (int != 5) continue;
        return position - 4;
    }
    return -1;
}

export function search(array: Uint8Array, search: number[], fromIndex: number = 0): number {
    const searchLen = search.length
    const searchLast = search[searchLen - 1]
    let index = array.indexOf(searchLast, fromIndex + searchLen - 1)

    while (index !== -1) {
        for (let i = searchLen - 1; i > 0; i--) {
            if (search[i - 1] !== array[index - searchLen + i]) {
                const searchIndex = search.lastIndexOf(array[index + 1])
                const offset = searchIndex === -1 ? index + searchLen + 1 : index + searchLen - searchIndex
                index = array.indexOf(searchLast, offset)
                break;
            }
            if (i === 1) return index - searchLen + 1
        }
    }
    return -1
}