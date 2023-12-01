import { englishRegex } from "./constant";
import { readString, readInt32, readFloat32, readBool } from "./util";

export function parseField(dataView: DataView): { [k: string]: any } {
    let dictionary: { [k: string]: any } = {};
    let position = 0;
    let endPosition = 20000; // the position of the fields won't exceed this number
    let skipCount: number = 0;
    while (position < endPosition) {
        let word = readString(dataView, position, 1);
        if (englishRegex.test(word)) {
            if (skipCount >= 4) {
                let isNextWord = true;
                let nextWordLength: number = readInt32(dataView, position - 4);
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
                    let data: any;
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
                                // if stringLength is very long, it's most likely not a field.
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