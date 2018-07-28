import { Tash } from './tash';
import { Terrain } from './terrain';

export class Yer {
    private tash: Tash;
    private highlight: number;
    private terrain: Terrain;

    constructor(tash: Tash | null, terrain: Terrain) {
        this.tash = tash;
        this.terrain = terrain;
        // 0 boş, 1 işaretleme, 2 yürüme, 3 yeme
        this.highlight = 0;
    }

    getTash(): Tash {
        return this.tash;
    }

    setTash(tash: Tash | null) {
        this.tash = tash;
    }

    getTerrain(): Terrain {
        return this.terrain;
    }

    setTerrain(terrain: Terrain) {
        this.terrain = terrain;
    }

    setHighlight(highlight: number) {
        this.highlight = highlight;
    }

    getHighlight(): number {
        return this.highlight;
    }
}
