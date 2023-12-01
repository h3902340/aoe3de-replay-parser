import { Team } from "./dataStructures";
import { search, readInt32, readString } from "./util";

export function parseTeam(dataView: DataView, uint8Ary: Uint8Array): Team[] {
    let teams: Team[] = [];
    let seachBytes = [0x54, 0x45];
    let position = 0;
    while (true) {
        position = search(uint8Ary, seachBytes, position);
        if (position == -1) break;
        position += 6;
        const key = readInt32(dataView, position);
        position += 4;
        if (key == 12) {
            const teamId = readInt32(dataView, position);
            position += 4;
            let stringLength = readInt32(dataView, position);
            position += 4;
            const teamName = readString(dataView, position, stringLength);
            position += stringLength * 2;
            let members: number[] = [];
            const teamMembersCount = readInt32(dataView, position);
            position += 4;
            for (let i = 0; i < teamMembersCount; i++) {
                const slotId = readInt32(dataView, position);
                position += 4;
                members.push(slotId);
            }
            teams.push({
                id: teamId,
                name: teamName,
                members: members
            })
        }
    }
    return teams;
}