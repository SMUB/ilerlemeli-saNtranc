import { Yer, YerState } from './yer';
import { Tash, At, Fil, Kale, AltPiyon, ÜstPiyon, Oyuncu, Hamlecinsi } from './tash';
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
    private _turSayacı = 0;

    // Oyun alanındaki bütün aynı cins taşlar tek bir yere point ettiği için pointer kaybetmemeye özen göster
    private AltAt = new At(Oyuncu.siyah);
    private ÜstAt = new At(Oyuncu.beyaz);
    private AltKale = new Kale(Oyuncu.siyah);
    private ÜstKale = new Kale(Oyuncu.beyaz);
    private AltFil = new Fil(Oyuncu.siyah);
    private ÜstFil = new Fil(Oyuncu.beyaz);
    private ÜstPiyon = new ÜstPiyon(Oyuncu.beyaz);
    private AltPiyon = new AltPiyon(Oyuncu.siyah);

    private gelenSıraListesi = [
        { ta: null, te: '|__|' },
        { ta: this.ÜstPiyon, te: '|__|' },
        { ta: this.ÜstKale, te: '|__|' },
        { ta: this.ÜstAt, te: '|__|' },
        { ta: this.ÜstFil, te: '|__|' }
    ];

    constructor(x: number, y: number) {
        this.yerler = new Array<Array<Yer>>();
        for (let i = 0; i < x; i++) {
            this.yerler.push(new Array<Yer>());
            for (let j = 0; j < y; j++) {
                let tash = null;
                if (i === 1) {
                    tash = this.ÜstPiyon;
                } else if (i === 6) {
                    tash = this.AltPiyon;
                } else if (i === 0 && (j === 0 || j === 7)) {
                    tash = this.ÜstKale;
                } else if (i === 7 && (j === 0 || j === 7)) {
                    tash = this.AltKale;
                } else if (i === 0 && (j === 1 || j === 6)) {
                    tash = this.ÜstAt;
                } else if (i === 7 && (j === 1 || j === 6)) {
                    tash = this.AltAt;
                } else if (i === 0 && (j === 2 || j === 5)) {
                    tash = this.ÜstFil;
                } else if (i === 7 && (j === 2 || j === 5)) {
                    tash = this.AltFil;
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
            const tash = this.gelenSıraListesi[j].ta;
            const terrain = new Terrain(this.gelenSıraListesi[j].te);
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

    get oyuncu(): Oyuncu {
        return this._oyuncu;
    }

    set oyuncu(oyuncu: Oyuncu) {
        this._oyuncu = oyuncu;
    }

    get turSayacı(): number {
        return this._turSayacı;
    }

    set turSayacı(turSayacı: number) {
        this._turSayacı = turSayacı;
    }

    yerTiklama(i, j) {
        // oyuncu yetki kontrolü
        if (this.yerler[i][j].getTash() && this.yerler[i][j].getTash().oyuncu === this.oyuncu) {
            this.secimleriTemizle();
            this.seciliyer = { i: i, j: j };
            this.seciliyerİsaretle(this.oyuncu);
        } else if (this.yerler[i][j].getHighlight() === YerState.yürüme
            || this.yerler[i][j].getHighlight() === YerState.yeme) {
            // eğer getHighlight değeri 2 veya 3 ise zaten bir taş seçlidir bunu varsaydım.
            const hamleEden = this.yerler[this.seciliyer.i][this.seciliyer.j].getTash();
            // hamle eden taşı başlangıç noktasında tahtadan kaldır
            this.yerler[this.seciliyer.i][this.seciliyer.j].setTash(null);
            // hamle eden taşı bitiş noktasında tahtaya geri yerleştir
            this.yerler[i][j].setTash(hamleEden);
            this.secimleriTemizle();
            if (this.turDöndür()) {
                this.oyunAlanıYürüt();
            }
        }
    }

    // hamleden hamleye oyun kontrolünü oyuncudan oyuncuya aktarır.
    // belli hamlede bir tur döndürür oyun alanının ilerlemesine karar verir
    turDöndür(): boolean {
        if (this.oyuncu === Oyuncu.siyah) {
            this.oyuncu = Oyuncu.beyaz;
        } else if (this.oyuncu === Oyuncu.beyaz) {
            this.oyuncu = Oyuncu.siyah;
        } else {
            this.oyuncu = Oyuncu.beyaz;
        }

        this.turSayacı++;

        if (this.turSayacı > TURSAYACILIMIT) {
            this.turSayacı = 0;
            return true;
        } else {
            return false;
        }

    }
}
