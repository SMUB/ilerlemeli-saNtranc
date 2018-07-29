import { Yer, YerState } from './yer';
import { Tash, At, AltPiyon, Fil, Kale, Vezir, ÜstPiyon, Şah, Oyuncu, Hamlecinsi } from './tash';
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
                let tash = new Tash('', null);
                if (i === 1) {
                    tash = new ÜstPiyon(' ♙ ', Oyuncu.beyaz);
                } else if (i === 6) {
                    tash = new AltPiyon(' ♟ ', Oyuncu.siyah);
                } else if (i === 0 && (j === 0 || j === 7)) {
                    tash = new Kale(' ♖ ', Oyuncu.beyaz);
                } else if (i === 7 && (j === 0 || j === 7)) {
                    tash = new Kale(' ♜ ', Oyuncu.siyah);
                } else if (i === 0 && (j === 1 || j === 6)) {
                    tash = new At(' ♘ ', Oyuncu.beyaz);
                } else if (i === 7 && (j === 1 || j === 6)) {
                    tash = new At(' ♞ ', Oyuncu.siyah);
                } else if (i === 0 && (j === 2 || j === 5)) {
                    tash = new Fil(' ♗ ', Oyuncu.beyaz);
                } else if (i === 7 && (j === 2 || j === 5)) {
                    tash = new Fil(' ♝ ', Oyuncu.siyah);
                } else if (i === 0 && j === 3) {
                    tash = new Vezir(' ♔ ', Oyuncu.beyaz);
                } else if (i === 7 && j === 3) {
                    tash = new Şah(' ♛ ', Oyuncu.siyah);
                } else if (i === 0 && j === 4) {
                    tash = new Şah(' ♕ ', Oyuncu.beyaz);
                } else if (i === 7 && j === 4) {
                    tash = new Vezir(' ♚ ', Oyuncu.siyah);
                }
                const terrain = new Terrain('|__|');
                this.yerler[i].push(new Yer(tash, terrain));
            }
        }
    }

    seciliyerİsaretle(oyuncu: Oyuncu) {
        const seciliYer = this.yerler[this._seciliyer.i][this._seciliyer.j];
        // işaretleme
        seciliYer.setHighlight(1);
        const tash = seciliYer.getTash();
        if (tash) {
            const hamleler = tash.getHamleler();
            for (const hamle of hamleler) {
                for (let k = 1; k <= hamle.tekrar; k++) {
                    const hedefI = this._seciliyer.i + (hamle.i * k);
                    const hedefJ = this._seciliyer.j + (hamle.j * k);
                    if (hedefI >= 0 && hedefI < this.yerler.length && hedefJ >= 0 && hedefJ < this.yerler[hedefI].length) {
                        // TODO şu koşulları yeniden yaz
                        if (this.yerler[hedefI][hedefJ].getTash().oyuncu
                            && this.yerler[hedefI][hedefJ].getTash().oyuncu !== oyuncu) {
                            if (hamle.cins === Hamlecinsi.yeme || hamle.cins === Hamlecinsi.yiyerekyürüme) {
                                this.yerler[hedefI][hedefJ].setHighlight(YerState.yeme);
                                break;
                            } else {
                                // TODO burada problemeler çıkacak
                            }
                        } else if (this.yerler[hedefI][hedefJ].getTash().oyuncu === null) {
                            if (hamle.cins === Hamlecinsi.yürüme || hamle.cins === Hamlecinsi.yiyerekyürüme) {
                                this.yerler[hedefI][hedefJ].setHighlight(YerState.yürüme);
                            } else {
                                // TODO burada sırf yeme hareketinin birden fazla tekrar etmesine dair problemeler çıkacak
                            }
                        } else {
                            this.yerler[hedefI][hedefJ].setHighlight(YerState.boş);
                            break;
                        }
                    }
                }
            }
        }
    }

    secimleriTemizle() {
        for (const satir of this.yerler) {
            for (const sutun of satir) {
                // temizle
                sutun.setHighlight(0);
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
