import { Tash } from './tash';
import { Terrain } from './terrain';

export enum YerState { bos, gosterge, yurume, yeme }

export class Yer {
    private tash?: Tash;
    private highlight: YerState;
    private terrain: Terrain;

    constructor(tash: Tash | null, terrain: Terrain) {
        this.tash = tash;
        this.terrain = terrain;
        this.highlight = YerState.bos;
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
