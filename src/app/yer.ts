import { Tash } from './tash';
import { Terrain } from './terrain';

export class Yer {
    private tash: Tash;
    private highlight: boolean;
    private _yurumeHighlight: boolean;
    private terrain: Terrain;

    constructor(tash: Tash | null, terrain: Terrain) {
        this.tash = tash;
        this.terrain = terrain;
        this.highlight = false;
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

    setHighlight(highlight: boolean) {
        this.highlight = highlight;
    }

    getHighlight(): boolean {
        return this.highlight;
    }

    set yurumeHighlight(bool: boolean) {
        this._yurumeHighlight = bool;
    }

    get yurumeHighlight(): boolean {
        return this._yurumeHighlight;
    }
}
