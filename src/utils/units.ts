import { NoSubstitutionTemplateLiteral } from "typescript";
import { backendPath } from "./definitions";
import { darkenColor } from "./shared-fun";

export type Unit = {
	unitNumber: number;
	description: string;
	background: string;
	textColor: string;
	border: string;
	tiles: Tile[];
};

export type RawUnit = {
	id: number,
	name: string,
	lessons: any[]
}

export type Tile =
	| {
		type: "star" | "dumbbell" | "book" | "trophy" | "fast-forward";
		description: string;
	}
	| { type: "treasure" };

export type TileType = Tile["type"];

export const colors: readonly string[] = [
	"#007FFF", "#32CD32", "#FF6B6B", "#FFD700", "#9900FF", "#008080", "#FF4500", "#00FF7F", "#4169E1", "#FF69B4"
] 

// MARK: Utility functions
/// @TODO implement for sections
export async function createUnits(identifier: string): Promise<Unit[]> {
	return await fetch(`${backendPath}/course/${identifier}`)
		.then(res => res.json())
		.then((res: RawUnit[]): Unit[] => {
			let counter = 0;

            console.log(res)

			return res.map((val: RawUnit): Unit => ({
                unitNumber: val.id,
                description: val.name,
                background: colors[counter]!,
                textColor: colors[counter]!,
                border: darkenColor(colors[counter++]!, 0.8),
                tiles: [{ type: 'fast-forward', description: '' } as Tile].concat(val.lessons.map((lesson): Tile => {
                    var type: "star" | "dumbbell" | "book" | "trophy" | "fast-forward" = 'star'
                    switch (lesson.type) {
                        case 'lesson': type = 'star'; break
                        case 'personal_training': type = 'dumbbell'; break
                        case 'review': type = 'trophy'; break
                    }

                    return {
                        type: type,
                        description: lesson.name
                    }
                })).filter((tile) => val.id != 1 || tile.type != 'fast-forward')
            }))
		});
}