import { Tas } from './tas';
import { Terrain } from './terrain';

export enum YerState { bos, gosterge, yurume, yeme }

export class Yer {
    private tash?: Tas;
    private highlight: YerState;
    private terrain: Terrain;

    constructor(tash: Tas | null, terrain: Terrain) {
        this.tash = tash;
        this.terrain = terrain;
        this.highlight = YerState.bos;
    }

    getTash(): Tas | null {
        return this.tash;
    }

    setTash(tash: Tas | null) {
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
