import { Tash } from './tash';
import { Terrain } from './terrain';

export enum YerState { boş, işaretleme, yürüme, yeme }

export class Yer {
    private tash?: Tash;
    private highlight: YerState;
    private terrain: Terrain;

    constructor(tash: Tash | null, terrain: Terrain) {
        this.tash = tash;
        this.terrain = terrain;
        // 0 boş, 1 işaretleme, 2 yürüme, 3 yeme
        this.highlight = YerState.boş;
    }

    getTash(): Tash | null {
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

    setHighlight(highlight: YerState) {
        this.highlight = highlight;
    }

    getHighlight(): YerState {
        return this.highlight;
    }
}
