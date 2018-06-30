import { Yer } from './yer';
import { Tash } from './tash';
import { Terrain } from './terrain';

export class OyunTahtasi {
    public yerler: Yer[][];

    constructor(x: number, y: number) {
        this.yerler = new Array<Array<Yer>>();
        for (let i = 0; i < x; i++) {
            this.yerler.push(new Array<Yer>());
            for (let j = 0; j < y; j++) {
                const tash = new Tash('asdfdfdasdfdfas');
                const terrain = new Terrain('sadffasdfdfga');
                this.yerler[i].push(new Yer(tash, terrain));
            }
        }
    }
}
