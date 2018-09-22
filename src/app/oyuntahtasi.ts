import { Yer, YerState } from './yer';
import { Tash, AltAt, AltFil, AltKale, ÜstFil, ÜstKale, ÜstAt, AltPiyon, ÜstPiyon, Oyuncu, Hamlecinsi } from './tash';
import { Terrain } from './terrain';

const gelenSıraListesi = [
    { ta: '', te: '|__|' },
    { ta: './assets/-1.png', te: '|__|' },
    { ta: './assets/-2.png', te: '|__|' },
    { ta: './assets/-3.png', te: '|__|' },
    { ta: './assets/-4.png', te: '|__|' }
];

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
                let tash = null;
                if (i === 1) {
                    tash = new ÜstPiyon(Oyuncu.beyaz);
                } else if (i === 6) {
                    tash = new AltPiyon(Oyuncu.siyah);
                } else if (i === 0 && (j === 0 || j === 7)) {
                    tash = new ÜstKale(Oyuncu.beyaz);
                } else if (i === 7 && (j === 0 || j === 7)) {
                    tash = new AltKale(Oyuncu.siyah);
                } else if (i === 0 && (j === 1 || j === 6)) {
                    tash = new ÜstAt(Oyuncu.beyaz);
                } else if (i === 7 && (j === 1 || j === 6)) {
                    tash = new AltAt(Oyuncu.siyah);
                } else if (i === 0 && (j === 2 || j === 5)) {
                    tash = new ÜstFil(Oyuncu.beyaz);
                } else if (i === 7 && (j === 2 || j === 5)) {
                    tash = new AltFil(Oyuncu.siyah);
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
                        if (this.yerler[hedefI][hedefJ].getTash()
                            && this.yerler[hedefI][hedefJ].getTash().oyuncu !== oyuncu) {
                            if (hamle.cins === Hamlecinsi.yeme || hamle.cins === Hamlecinsi.yiyerekyürüme) {
                                this.yerler[hedefI][hedefJ].setHighlight(YerState.yeme);
                                break;
                            } else {
                                // TODO burada problemeler çıkacak
                            }
                        } else if (this.yerler[hedefI][hedefJ].getTash() === null) {
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

    oyunAlanıYürüt() {
        const sıraUzunluğu = this.yerler[0].length;
        // TODO Bu fonksiyon söktüğün parçayı atamana izin veriyor unutma
        this.yerler.pop();
        const yeniSıra = new Array<Yer>();
        for (let i = 0; i < sıraUzunluğu; i++) {
            let j = 0;
            while (Math.random() > 0.5 && j < 4) {
                j++;
            }
            const tash = new Tash(gelenSıraListesi[j].ta, gelenSıraListesi[j].ta === '' ? null : Oyuncu.beyaz);
            const terrain = new Terrain(gelenSıraListesi[j].te);
            yeniSıra.push(new Yer(tash, terrain));
        }
        this.yerler.unshift(yeniSıra);
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
