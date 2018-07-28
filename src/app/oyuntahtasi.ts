import { Yer } from './yer';
import { Tash } from './tash';
import { Terrain } from './terrain';

class SeciliYer {
    public i: number;
    public j: number;
}

export class OyunTahtasi {
    public yerler: Yer[][];
    private _seciliyer: SeciliYer;

    constructor(x: number, y: number) {
        this.yerler = new Array<Array<Yer>>();
        for (let i = 0; i < x; i++) {
            this.yerler.push(new Array<Yer>());
            for (let j = 0; j < y; j++) {
                const tash = new Tash(' ♘ ');
                const terrain = new Terrain('|__|');
                this.yerler[i].push(new Yer(tash, terrain));
            }
        }
    }

    seciliyerİsaretle() {
        const seciliYer = this.yerler[this._seciliyer.i][this._seciliyer.j];
        seciliYer.setHighlight(true);
        const tash = seciliYer.getTash();
        if (tash) {
            const hamleler = tash.getHamleler()[0];
            this.yerler[this._seciliyer.i + hamleler.i][this._seciliyer.j + hamleler.j].yurumeHighlight = true;
        }
    }

    secimleriTemizle() {
        for (const satir of this.yerler) {
            for (const sutun of satir) {
                sutun.setHighlight(false);
                sutun.yurumeHighlight = false;
            }
        }
    }

    get seciliyer(): SeciliYer {
        return this._seciliyer;
    }

    set seciliyer(seciliyer: SeciliYer) {
        this._seciliyer = seciliyer;
    }
}
