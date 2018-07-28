import { Yer } from './yer';
import { Tash, At, AltPiyon, Fil, Kale, Vezir, ÜstPiyon, Şah } from './tash';
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
                let tash = new Tash('');
                if (i === 1) {
                    tash = new ÜstPiyon(' ♙ ');
                } else if (i === 6) {
                    tash = new AltPiyon(' ♟ ');
                } else if (i === 0 && (j === 0 || j === 7)) {
                    tash = new Kale(' ♖ ');
                } else if (i === 7 && (j === 0 || j === 7)) {
                    tash = new Kale(' ♜ ');
                } else if (i === 0 && (j === 1 || j === 6)) {
                    tash = new At(' ♘ ');
                } else if (i === 7 && (j === 1 || j === 6)) {
                    tash = new At(' ♞ ');
                } else if (i === 0 && (j === 2 || j === 5)) {
                    tash = new Fil(' ♗ ');
                } else if (i === 7 && (j === 2 || j === 5)) {
                    tash = new Fil(' ♝ ');
                } else if (i === 0 && j === 3) {
                    tash = new Vezir(' ♔ ');
                } else if (i === 7 && j === 3) {
                    tash = new Şah(' ♛ ');
                } else if (i === 0 && j === 4) {
                    tash = new Şah(' ♕ ');
                } else if (i === 7 && j === 4) {
                    tash = new Vezir(' ♚ ');
                }
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
            const hamleler = tash.getHamleler();
            for (const hamle of hamleler) {
                this.yerler[this._seciliyer.i + hamle.i][this._seciliyer.j + hamle.j].yurumeHighlight = true;
            }
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
