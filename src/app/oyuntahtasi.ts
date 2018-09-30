import { Yer, YerState } from './yer';
import { Tash, At, Fil, Kale, AltPiyon, UstPiyon, Oyuncu, Hamlecinsi } from './tash';
import { Terrain } from './terrain';

class SeciliYer {
    public i: number;
    public j: number;
}

const TURSAYACILIMIT = 5;

export class OyunTahtasi {
    public yerler: Yer[][];
    private _seciliyer: SeciliYer;
    private _oyuncu = Oyuncu.siyah;
    private _turSayaci = 0;

    // Oyun alanindaki butun ayni cins taslar tek bir yere point ettigi için pointer kaybetmemeye ozen goster
    private AltAt = new At(Oyuncu.siyah);
    private ustAt = new At(Oyuncu.beyaz);
    private AltKale = new Kale(Oyuncu.siyah);
    private ustKale = new Kale(Oyuncu.beyaz);
    private AltFil = new Fil(Oyuncu.siyah);
    private ustFil = new Fil(Oyuncu.beyaz);
    private ustPiyon = new UstPiyon(Oyuncu.beyaz);
    private AltPiyon = new AltPiyon(Oyuncu.siyah);

    private gelenSiraListesi = [
        { ta: null, te: '|__|' },
        { ta: this.ustPiyon, te: '|__|' },
        { ta: this.ustKale, te: '|__|' },
        { ta: this.ustAt, te: '|__|' },
        { ta: this.ustFil, te: '|__|' }
    ];

    constructor(x: number, y: number) {
        this.yerler = new Array<Array<Yer>>();
        for (let i = 0; i < x; i++) {
            this.yerler.push(new Array<Yer>());
            for (let j = 0; j < y; j++) {
                let tash = null;
                if (i === 1) {
                    tash = this.ustPiyon;
                } else if (i === 6) {
                    tash = this.AltPiyon;
                } else if (i === 0 && (j === 0 || j === 7)) {
                    tash = this.ustKale;
                } else if (i === 7 && (j === 0 || j === 7)) {
                    tash = this.AltKale;
                } else if (i === 0 && (j === 1 || j === 6)) {
                    tash = this.ustAt;
                } else if (i === 7 && (j === 1 || j === 6)) {
                    tash = this.AltAt;
                } else if (i === 0 && (j === 2 || j === 5)) {
                    tash = this.ustFil;
                } else if (i === 7 && (j === 2 || j === 5)) {
                    tash = this.AltFil;
                }
                const terrain = new Terrain('|__|');
                this.yerler[i].push(new Yer(tash, terrain));
            }
        }
    }

    seciliyerIsaretle(oyuncu: Oyuncu) {
        const seciliYer = this.yerler[this._seciliyer.i][this._seciliyer.j];
        // isaretleme
        seciliYer.setHighlight(1);
        const tash = seciliYer.getTash();
        if (tash) {
            const hamleler = tash.getHamleler();
            for (const hamle of hamleler) {
                for (let k = 1; k <= hamle.tekrar; k++) {
                    const hedefI = this._seciliyer.i + (hamle.i * k);
                    const hedefJ = this._seciliyer.j + (hamle.j * k);
                    if (hedefI >= 0 && hedefI < this.yerler.length && hedefJ >= 0 && hedefJ < this.yerler[hedefI].length) {
                        // TODO su kosullari yeniden yaz
                        if (this.yerler[hedefI][hedefJ].getTash()
                            && this.yerler[hedefI][hedefJ].getTash().oyuncu !== oyuncu) {
                            if (hamle.cins === Hamlecinsi.yeme || hamle.cins === Hamlecinsi.yiyerekyurume) {
                                this.yerler[hedefI][hedefJ].setHighlight(YerState.yeme);
                                break;
                            } else {
                                // TODO burada problemeler çikacak
                            }
                        } else if (this.yerler[hedefI][hedefJ].getTash() === null) {
                            if (hamle.cins === Hamlecinsi.yurume || hamle.cins === Hamlecinsi.yiyerekyurume) {
                                this.yerler[hedefI][hedefJ].setHighlight(YerState.yurume);
                            } else {
                                // TODO burada sirf yeme hareketinin birden fazla tekrar etmesine dair problemeler çikacak
                            }
                        } else {
                            this.yerler[hedefI][hedefJ].setHighlight(YerState.bos);
                            break;
                        }
                    }
                }
            }
        }
    }

    oyunAlaniYurut() {
        const siraUzunlugu = this.yerler[0].length;
        // TODO Bu fonksiyon soktugun parçayi atamana izin veriyor unutma
        this.yerler.pop();
        const yeniSira = new Array<Yer>();
        for (let i = 0; i < siraUzunlugu; i++) {
            let j = 0;
            while (Math.random() > 0.5 && j < 4) {
                j++;
            }
            const tash = this.gelenSiraListesi[j].ta;
            const terrain = new Terrain(this.gelenSiraListesi[j].te);
            yeniSira.push(new Yer(tash, terrain));
        }
        this.yerler.unshift(yeniSira);
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

    get oyuncu(): Oyuncu {
        return this._oyuncu;
    }

    set oyuncu(oyuncu: Oyuncu) {
        this._oyuncu = oyuncu;
    }

    get turSayaci(): number {
        return this._turSayaci;
    }

    set turSayaci(turSayaci: number) {
        this._turSayaci = turSayaci;
    }

    yerTiklama(i, j) {
        // oyuncu yetki kontrolu
        if (this.yerler[i][j].getTash() && this.yerler[i][j].getTash().oyuncu === this.oyuncu) {
            this.secimleriTemizle();
            this.seciliyer = { i: i, j: j };
            this.seciliyerIsaretle(this.oyuncu);
        } else if (this.yerler[i][j].getHighlight() === YerState.yurume
            || this.yerler[i][j].getHighlight() === YerState.yeme) {
            // eger getHighlight degeri 2 veya 3 ise zaten bir tas seçlidir bunu varsaydim.
            const hamleEden = this.yerler[this.seciliyer.i][this.seciliyer.j].getTash();
            // hamle eden tasi baslangiç noktasinda tahtadan kaldir
            this.yerler[this.seciliyer.i][this.seciliyer.j].setTash(null);
            // hamle eden tasi bitis noktasinda tahtaya geri yerlestir
            this.yerler[i][j].setTash(hamleEden);
            this.secimleriTemizle();
            if (this.turDondur()) {
                this.oyunAlaniYurut();
            }
        }
    }

    // hamleden hamleye oyun kontrolunu oyuncudan oyuncuya aktarir.
    // belli hamlede bir tur dondurur oyun alaninin ilerlemesine karar verir
    turDondur(): boolean {
        if (this.oyuncu === Oyuncu.siyah) {
            this.oyuncu = Oyuncu.beyaz;
        } else if (this.oyuncu === Oyuncu.beyaz) {
            this.oyuncu = Oyuncu.siyah;
        } else {
            this.oyuncu = Oyuncu.beyaz;
        }

        this.turSayaci++;

        if (this.turSayaci > TURSAYACILIMIT) {
            this.turSayaci = 0;
            return true;
        } else {
            return false;
        }

    }
}
