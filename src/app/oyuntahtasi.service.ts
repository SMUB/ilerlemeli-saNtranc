import { Injectable } from '@angular/core';
import { Yer, YerState } from './yer';
import { At, Fil, Kale, AltPiyon, UstPiyon, Oyuncu, Hamlecinsi, LootBox, Tas } from './tas';
import { Terrain } from './terrain';
import { PiecesService } from './pieces.service';
import { PointService } from './point.service';
import { LootService } from './loot.service';

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

const TURSAYACILIMIT = 3;

@Injectable({
    providedIn: 'root',
})
// Insan oyuncu siyahtir ve alttan yukari yurur
export class OyunTahtasi {
    public yerler: Yer[][];
    private _seciliyer: SeciliYer;
    private _turSayaci = TURSAYACILIMIT;
    private additionalLineCounter = 0;
    private pieceToBuy: Tas = null;

    // Oyun alanindaki butun ayni cins taslar tek bir yere point ettigi icin pointer kaybetmemeye ozen goster
    private AltAt = new At(Oyuncu.siyah);
    private UstAt = new At(Oyuncu.beyaz);
    private AltKale = new Kale(Oyuncu.siyah);
    private UstKale = new Kale(Oyuncu.beyaz);
    private AltFil = new Fil(Oyuncu.siyah);
    private UstFil = new Fil(Oyuncu.beyaz);
    private UstPiyon = new UstPiyon(Oyuncu.beyaz);
    private AltPiyon = new AltPiyon(Oyuncu.siyah);
    private LootBox = new LootBox();

    private pieceChooser(tip) {
        switch (tip) {
            case -1:
                return this.UstPiyon;
            case 1:
                return this.AltPiyon;
            case -2:
                return this.UstKale;
            case 2:
                return this.AltKale;
            case -3:
                return this.UstAt;
            case 3:
                return this.AltAt;
            case -4:
                return this.UstFil;
            case 4:
                return this.AltFil;
            case -7:
                return this.LootBox;
            default:
                return null;
        }
    }

    constructor(private piecesService: PiecesService,
        private lootService: LootService,
        private pointService: PointService) {
        this.deploy();
    }

    deploy() {
        const placements = this.piecesService.firstDeployment();
        const x = placements.length;
        const y = placements[0].length;
        this.yerler = new Array<Array<Yer>>();
        for (let i = 0; i < x; i++) {
            this.yerler.push(new Array<Yer>());
            for (let j = 0; j < y; j++) {
                const tash = this.pieceChooser(placements[i][j]);
                //  TODO extract function
                let holder = './assets/beyazKare.png';
                if (i % 2 !== j % 2) { holder = './assets/siyahKare.png'; }
                const terrain = new Terrain(holder);
                this.yerler[i].push(new Yer(tash, terrain));
            }
        }
    }

    oyuncuHamlesiIsle(cikisYeri: Yer, i: number, j: number, oyuncu: Oyuncu) {
        const reelHamleler = this.hedefYerlerIsaretle(cikisYeri, i, j, oyuncu);
        cikisYeri.setHighlight(YerState.gosterge);
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
            throw new Error('tas oyuncuya ait degil veya tas yok');
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
                            // TODO kordinatlari once varolan arraylerde ara
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

    // When no legal moves are found returns null
    yapayZeka(): ReelHamle | null {
        // TODO en temizi sahadaki beyaz oyuncu taslarinin listesini tutmak
        const hamleler = new Array<ReelHamle>();
        let muadilHamleler = new Array<ReelHamle>();

        // Collect all possible movements for all white pieces in play
        for (const i in this.yerler) {
            for (const j in this.yerler[i]) {
                if (this.yerler[i][j].getTash() && this.yerler[i][j].getTash().oyuncu === Oyuncu.beyaz) {
                    // TODO i ve j nin integer olacagi esasen garanti degil
                    hamleler.push(...this.hedefYerlerIsaretle(this.yerler[i][j], parseInt(i, 10), parseInt(j, 10), Oyuncu.beyaz));
                }
            }
        }

        // Look for white piece moves that will remove a black piece from board
        let filtreHamleler = hamleler.filter(hamle => hamle.hamlecinsi === Hamlecinsi.yeme);

        // If there are no moves that immediately remove a black piece replace empty array with possible moves
        if (filtreHamleler.length <= 0) {
            filtreHamleler = hamleler.filter(hamle => hamle.hamlecinsi === Hamlecinsi.yurume);
        }

        // Assuming there are any legal moves at all pick a random one and make a shortlist of all moves that also end up in the same target
        if (filtreHamleler.length > 0) {
            const index = Math.floor(Math.random() * filtreHamleler.length);
            const nominalI = filtreHamleler[index].hedefI;
            const nominalJ = filtreHamleler[index].hedefJ;
            muadilHamleler = filtreHamleler.filter(hamle => hamle.hedefI === nominalI && hamle.hedefJ === nominalJ);
        }

        // Among the shortlisted moves, find the move that has the highest ranking moving piece
        let priorityMoves;
        // is there any bishops?
        if (muadilHamleler.find(value => value.cikisYer.getTash() instanceof Fil)) {
            //then filter all bishops
            priorityMoves = muadilHamleler.filter(move => move.cikisYer.getTash() instanceof Fil);
        } else if (muadilHamleler.find(value => value.cikisYer.getTash() instanceof At)) {
            priorityMoves = muadilHamleler.filter(move => move.cikisYer.getTash() instanceof At);
        } else if (muadilHamleler.find(value => value.cikisYer.getTash() instanceof Kale)) {
            priorityMoves = muadilHamleler.filter(move => move.cikisYer.getTash() instanceof Kale);
        } else if (muadilHamleler.find(value => value.cikisYer.getTash() instanceof UstPiyon)) {
            priorityMoves = muadilHamleler.filter(move => move.cikisYer.getTash() instanceof UstPiyon);
        } else {
            // if somehow list is empty return null
            return null;
        }
        // pick a random element
        return priorityMoves[Math.floor(Math.random() * priorityMoves.length)];
    }

    oyunAlaniYurut() {
        const siraUzunlugu = this.yerler[0].length;
        // TODO Bu fonksiyon soktugun parcayi atamana izin veriyor unutma
        this.yerler.pop();
        const nextLine = this.piecesService.getNextLine();
        const yeniSira = new Array<Yer>();
        this.additionalLineCounter++;
        for (let i = 0; i < siraUzunlugu; i++) {
            const tash = this.pieceChooser(nextLine[i]);
            //  TODO extract function
            let holder = './assets/beyazKare.png';
            if (this.additionalLineCounter % 2 !== i % 2) { holder = './assets/siyahKare.png'; }
            const terrain = new Terrain(holder);

            yeniSira.push(new Yer(tash, terrain));
        }
        this.yerler.unshift(yeniSira);
    }

    secimleriTemizle() {
        for (const satir of this.yerler) {
            for (const sutun of satir) {
                // temizle
                sutun.setHighlight(YerState.bos);
            }
        }
    }

    yerTiklama(i, j) {

        if (this.yerler[i][j].getTash()
            && this.yerler[i][j].getTash().oyuncu === Oyuncu.siyah) { // When human player clicks on one of their own pieces
            this.secimleriTemizle();
            this.seciliyer = { i: i, j: j }; // TODO bunu yoketmenin bi yolunu dusun
            this.oyuncuHamlesiIsle(this.yerler[i][j], i, j, Oyuncu.siyah);
        } else if (this.pieceToBuy !== null &&
            !this.yerler[i][j].getTash()) { // When human player is in a buy mode and clicks an empty position
            if (this.lootService.deductLoot(
                this.pieceToBuy.getPoint())) { // Try to deduct cost of piece from total loot, if successfull place piece
                this.yerler[i][j].setTash(this.pieceToBuy); // set piece pointer form piece to be bought, effectively makng a new image

            } else { // if buying fails
                // todo
            }
            this.pieceToBuy = null; // exit buy mode
        } else if (this.yerler[i][j].getHighlight() === YerState.yurume
            || this.yerler[i][j].getHighlight() === YerState.yeme) {
            // eger getHighlight degeri 2 veya 3 ise zaten bir tas seclidir bunu varsaydim.
            const hamleEden = this.yerler[this.seciliyer.i][this.seciliyer.j].getTash();
            // hamle eden tasi baslangic noktasinda tahtadan kaldir
            this.yerler[this.seciliyer.i][this.seciliyer.j].setTash(null);
            // If the target position has a lootbox notify lootbox service
            if (this.yerler[i][j].getTash() !== null) {
                const point = this.yerler[i][j].getTash().getPoint();
                if (this.yerler[i][j].getTash() instanceof LootBox) {
                    // each lootbox is worth 1 point
                    this.lootService.addloot(point);
                } else {
                    this.pointService.addPoint(point);
                }
            }
            // hamle eden tasi bitis noktasinda tahtaya geri yerlestir
            this.yerler[i][j].setTash(hamleEden);
            this.secimleriTemizle();
            // yapay zeka burda hamle eder
            const karsiHamle = this.yapayZeka();
            // AI can return a null value it means AI will pass its turn. Which means player gets to move again on the same board
            if (karsiHamle) {
                this.yerler[karsiHamle.hedefI][karsiHamle.hedefJ].setTash(karsiHamle.cikisYer.getTash());
                karsiHamle.cikisYer.setTash(null);
            }

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
        this.turSayaci--;
        if (this.turSayaci === 0) {
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

    buyModeBishop() { this.pieceToBuy = this.AltFil; }
    buyModeKnight() { this.pieceToBuy = this.AltAt; }
    buyModeRook() { this.pieceToBuy = this.AltKale; }
    buyModeOff() { this.pieceToBuy = null; }
}
