import { Yer, YerState } from './yer';
import { Tas, At, Fil, Kale, AltPiyon, UstPiyon, Oyuncu, Hamlecinsi } from './tas';
import { Terrain } from './terrain';

class SeciliYer {
    public i: number;
    public j: number;
}

class ReelHamle {
    // cikisYer zaten tas bilgisini iceriyor. oncelik icin ordan data cek
    public cikisYer: Yer;
    public hedefI: number;
    public hedefJ: number;
    public hamlecinsi: Hamlecinsi;
}

const TURSAYACILIMIT = 2;

// Insan oyuncu siyahtır ve alttan yukari yurur
export class OyunTahtasi {
    public yerler: Yer[][];
    private _seciliyer: SeciliYer;
    private _turSayaci = TURSAYACILIMIT;

    // Oyun alanindaki butun ayni cins taslar tek bir yere point ettigi icin pointer kaybetmemeye ozen goster
    private AltAt = new At(Oyuncu.siyah);
    private UstAt = new At(Oyuncu.beyaz);
    private AltKale = new Kale(Oyuncu.siyah);
    private UstKale = new Kale(Oyuncu.beyaz);
    private AltFil = new Fil(Oyuncu.siyah);
    private UstFil = new Fil(Oyuncu.beyaz);
    private UstPiyon = new UstPiyon(Oyuncu.beyaz);
    private AltPiyon = new AltPiyon(Oyuncu.siyah);

    private gelenSiraListesi = [
        { ta: null, te: '|__|' },
        { ta: this.UstPiyon, te: '|__|' },
        { ta: this.UstKale, te: '|__|' },
        { ta: this.UstAt, te: '|__|' },
        { ta: this.UstFil, te: '|__|' }
    ];

    constructor(x: number, y: number) {
        this.yerler = new Array<Array<Yer>>();
        for (let i = 0; i < x; i++) {
            this.yerler.push(new Array<Yer>());
            for (let j = 0; j < y; j++) {
                let tash = null;
                if (i === 1) {
                    tash = this.UstPiyon;
                } else if (i === 6) {
                    tash = this.AltPiyon;
                } else if (i === 0 && (j === 0 || j === 7)) {
                    tash = this.UstKale;
                } else if (i === 7 && (j === 0 || j === 7)) {
                    tash = this.AltKale;
                } else if (i === 0 && (j === 1 || j === 6)) {
                    tash = this.UstAt;
                } else if (i === 7 && (j === 1 || j === 6)) {
                    tash = this.AltAt;
                } else if (i === 0 && (j === 2 || j === 5)) {
                    tash = this.UstFil;
                } else if (i === 7 && (j === 2 || j === 5)) {
                    tash = this.AltFil;
                }
                const terrain = new Terrain('|__|');
                this.yerler[i].push(new Yer(tash, terrain));
            }
        }
    }

    oyuncuHamlesiIsle(cikisYeri: Yer, i: number, j: number, oyuncu: Oyuncu) {
        const reelHamleler = this.hedefYerlerIsaretle(cikisYeri, i, j, oyuncu);
        for (const hamle of reelHamleler) {
            if (hamle.hamlecinsi === Hamlecinsi.yurume) {
                this.yerler[hamle.hedefI][hamle.hedefJ].setHighlight(YerState.yurume);
            } else if (hamle.hamlecinsi === Hamlecinsi.yeme) {
                this.yerler[hamle.hedefI][hamle.hedefJ].setHighlight(YerState.yeme);
            }
        }
    }

    // Onceden ayiklanmis sadece bir oyuncunun taslarini barindiran Array kullanir
    // Insan oyuncu icin o anda secili tasin olmasi yeterlidir.
    /// TODO oyuncu parametresini sil
    hedefYerlerIsaretle(cikisYeri: Yer, i: number, j: number, oyuncu: Oyuncu): ReelHamle[] {
        // isaretleme
        const reelHamleler = new Array<ReelHamle>();
        if (cikisYeri.getTash()
            && cikisYeri.getTash().oyuncu !== oyuncu) {
            throw new Error('tas oyuncuya ait degil veya taş yok');
        }
        const tash = cikisYeri.getTash();
        const potansiyelHamleler = tash.getHamleler();
        for (const hamle of potansiyelHamleler) {
            for (let k = 1; k <= hamle.tekrar; k++) {
                const hedefI = i + (hamle.i * k);
                const hedefJ = j + (hamle.j * k);
                if (hedefI >= 0 && hedefI < this.yerler.length && hedefJ >= 0 && hedefJ < this.yerler[hedefI].length) {
                    // TODO su kosullari yeniden yaz
                    if (this.yerler[hedefI][hedefJ].getTash()
                        && this.yerler[hedefI][hedefJ].getTash().oyuncu !== oyuncu) {
                        if (hamle.cins === Hamlecinsi.yeme || hamle.cins === Hamlecinsi.yiyerekyurume) {
                            // TODO kordinatları önce varolan arraylerde ara
                            reelHamleler.push({
                                cikisYer: cikisYeri,
                                hedefI: hedefI,
                                hedefJ: hedefJ,
                                hamlecinsi: Hamlecinsi.yeme
                            } as ReelHamle);
                            break;
                        } else {
                            // TODO burada problemler cikacak
                        }
                    } else if (this.yerler[hedefI][hedefJ].getTash() === null) {
                        if (hamle.cins === Hamlecinsi.yurume || hamle.cins === Hamlecinsi.yiyerekyurume) {
                            reelHamleler.push({
                                cikisYer: cikisYeri,
                                hedefI: hedefI,
                                hedefJ: hedefJ,
                                hamlecinsi: Hamlecinsi.yurume
                            } as ReelHamle);
                        } else {
                            // TODO burada sirf yeme hareketinin birden fazla tekrar etmesine dair problemeler cikacak
                        }
                    } else if (this.yerler[hedefI][hedefJ].getTash()
                        && this.yerler[hedefI][hedefJ].getTash().oyuncu === oyuncu) {
                        // TODO sorun cikabilir burası bloklu yerlerin işlenmesi gereken yer
                        break;
                    }
                }
            }
        }
        return reelHamleler;
    }

    seciliyerIsaretle(oyuncu: Oyuncu) {
        const seciliYer = this.yerler[this._seciliyer.i][this._seciliyer.j];
        // isaretleme
        seciliYer.setHighlight(YerState.gosterge);
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
                                // TODO burada problemeler cikacak
                            }
                        } else if (this.yerler[hedefI][hedefJ].getTash() === null) {
                            if (hamle.cins === Hamlecinsi.yurume || hamle.cins === Hamlecinsi.yiyerekyurume) {
                                this.yerler[hedefI][hedefJ].setHighlight(YerState.yurume);
                            } else {
                                // TODO burada sirf yeme hareketinin birden fazla tekrar etmesine dair problemeler cikacak
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

    yapayZeka(): ReelHamle {
        // TODO en temizi sahadaki beyaz oyuncu taslarinin listesini tutmak
        const hamleler = new Array<ReelHamle>();
        const yemeHamleler = new Array<ReelHamle>();
        const yurumeHamleler = new Array<ReelHamle>();
        for (const i in this.yerler) {
            for (const j in this.yerler[i]) {
                if (this.yerler[i][j].getTash() && this.yerler[i][j].getTash().oyuncu === Oyuncu.beyaz) {
                    // TODO i ve j nin integer olacağı esasen garanti değil
                    hamleler.push(...this.hedefYerlerIsaretle(this.yerler[i][j], parseInt(i, 10), parseInt(j, 10), Oyuncu.beyaz));
                }
            }
        }
        for (const i in hamleler) {
            if (hamleler[i].hamlecinsi === Hamlecinsi.yeme) {
                yemeHamleler.push(hamleler[i]);
            } else if (hamleler[i].hamlecinsi === Hamlecinsi.yurume) {
                yurumeHamleler.push(hamleler[i]);
            } else {
                throw new Error('Hamlecinsi yanlis.');
            }
        }
        const piyonHamleler = new Array<ReelHamle>();
        const kaleHamleler = new Array<ReelHamle>();
        const atHamleler = new Array<ReelHamle>();
        const filHamleler = new Array<ReelHamle>();


        if (yemeHamleler.length > 0) {
            // TODO sunu fonksiyona gom
            for (const hamle of yemeHamleler) {
                if (hamle.cikisYer.getTash() instanceof UstPiyon) {
                    piyonHamleler.push(hamle);
                } else if (hamle.cikisYer.getTash() instanceof Kale) {
                    kaleHamleler.push(hamle);
                } else if (hamle.cikisYer.getTash() instanceof At) {
                    atHamleler.push(hamle);
                } else if (hamle.cikisYer.getTash() instanceof Fil) {
                    filHamleler.push(hamle);
                } else {
                    throw new Error('instanceof elegi calismadi');
                }
            }
        } else if (yurumeHamleler.length > 0) {
            for (const hamle of yurumeHamleler) {
                if (hamle.cikisYer.getTash() instanceof UstPiyon) {
                    piyonHamleler.push(hamle);
                } else if (hamle.cikisYer.getTash() instanceof Kale) {
                    kaleHamleler.push(hamle);
                } else if (hamle.cikisYer.getTash() instanceof At) {
                    atHamleler.push(hamle);
                } else if (hamle.cikisYer.getTash() instanceof Fil) {
                    filHamleler.push(hamle);
                } else {
                    throw new Error('instanceof elegi calismadi');
                }
            }
        } else {
            throw new Error('yapay zeka kilitlendi');
        }

        if (filHamleler.length > 0) {
            const index = Math.floor(Math.random() * filHamleler.length);
            return filHamleler[index];
        } else if (atHamleler.length > 0) {
            const index = Math.floor(Math.random() * atHamleler.length);
            return atHamleler[index];
        } else if (kaleHamleler.length > 0) {
            const index = Math.floor(Math.random() * kaleHamleler.length);
            return kaleHamleler[index];
        } else if (piyonHamleler.length > 0) {
            const index = Math.floor(Math.random() * piyonHamleler.length);
            return piyonHamleler[index];
        } else {
            throw new Error('burda bisey yanlıs gitti');
        }

    }

    oyunAlaniYurut() {
        const siraUzunlugu = this.yerler[0].length;
        // TODO Bu fonksiyon soktugun parcayi atamana izin veriyor unutma
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

    yerTiklama(i, j) {
        // oyuncu yetki kontrolu
        if (this.yerler[i][j].getTash() && this.yerler[i][j].getTash().oyuncu === Oyuncu.siyah) {
            this.secimleriTemizle();
            this.seciliyer = { i: i, j: j }; // TODO bunu yoketmenin bi yolunu düsün
            this.oyuncuHamlesiIsle(this.yerler[i][j], i, j, Oyuncu.siyah);
        } else if (this.yerler[i][j].getHighlight() === YerState.yurume
            || this.yerler[i][j].getHighlight() === YerState.yeme) {
            // eger getHighlight degeri 2 veya 3 ise zaten bir tas seclidir bunu varsaydim.
            const hamleEden = this.yerler[this.seciliyer.i][this.seciliyer.j].getTash();
            // hamle eden tasi baslangic noktasinda tahtadan kaldir
            this.yerler[this.seciliyer.i][this.seciliyer.j].setTash(null);
            // hamle eden tasi bitis noktasinda tahtaya geri yerlestir
            this.yerler[i][j].setTash(hamleEden);
            this.secimleriTemizle();
            // yapay zeka burda hamle eder
            const karsiHamle = this.yapayZeka();
            this.yerler[karsiHamle.hedefI][karsiHamle.hedefJ].setTash(karsiHamle.cikisYer.getTash());
            karsiHamle.cikisYer.setTash(null);

            if (this.turDondur()) {
                this.oyunAlaniYurut();
            }
        } else {
            this.secimleriTemizle();
        }
    }

    // hamleden hamleye oyun kontrolunu oyuncudan oyuncuya aktarir.
    // belli hamlede bir tur dondurur oyun alaninin ilerlemesine karar verir
    turDondur(): boolean {
        // surayi elle ayarla
        if (this.turSayaci-- === 0) {
            this.turSayaci = TURSAYACILIMIT;
            return true;
        } else {
            return false;
        }
    }

    get seciliyer(): SeciliYer {
        return this._seciliyer;
    }

    set seciliyer(seciliyer: SeciliYer) {
        this._seciliyer = seciliyer;
    }

    get turSayaci(): number {
        return this._turSayaci;
    }

    set turSayaci(turSayaci: number) {
        this._turSayaci = turSayaci;
    }
}
