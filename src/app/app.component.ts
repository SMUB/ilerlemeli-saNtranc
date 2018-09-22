import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi';
import { style } from 'typestyle';
import { Oyuncu } from './tash';
import { Yer, YerState } from './yer';

const TURSAYACILIMIT = 5;
@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let satir of oyuntahtasi.yerler; let i = index" class="row">
      <div *ngFor="let yer of satir; let j = index"
      class="col {{highlightStyle(yer)}}"
      (click)="yerTiklama(i,j)">
        <div class="{{icerik}}">{{ yer.getTerrain().getResim() }}</div>
        <img *ngIf="yer.getTash()" class="{{icerik}}" [src]='yer.getTash().getResim()'>
      </div>
    </div>
  `,
  styles: ['.row { height: 100px; }']
})
export class AppComponent implements OnInit {

  gosterge = style({ outline: 'black 1px solid' });

  yurume = style({ outline: 'blue 1px solid' });

  yeme = style({ outline: 'red 1px solid' });

  icerik = style({ position: 'absolute' });

  oyuncu = Oyuncu.siyah;

  turSayacı = 0;

  oyuntahtasi: OyunTahtasi;

  constructor() { }

  ngOnInit() {
    this.oyuntahtasi = new OyunTahtasi(8, 8);
  }

  yerTiklama(i, j) {
    // oyuncu yetki kontrolü
    if (this.oyuntahtasi.yerler[i][j].getTash() && this.oyuntahtasi.yerler[i][j].getTash().oyuncu === this.oyuncu) {
      this.oyuntahtasi.secimleriTemizle();
      this.oyuntahtasi.seciliyer = { i: i, j: j };
      this.oyuntahtasi.seciliyerİsaretle(this.oyuncu);
    } else if (this.oyuntahtasi.yerler[i][j].getHighlight() === YerState.yürüme
      || this.oyuntahtasi.yerler[i][j].getHighlight() === YerState.yeme) {
      // eğer getHighlight değeri 2 veya 3 ise zaten bir taş seçlidir bunu varsaydım.
      const hamleEden = this.oyuntahtasi.yerler[this.oyuntahtasi.seciliyer.i][this.oyuntahtasi.seciliyer.j].getTash();
      // hamle eden taşı başlangıç noktasında tahtadan kaldır
      this.oyuntahtasi.yerler[this.oyuntahtasi.seciliyer.i][this.oyuntahtasi.seciliyer.j].setTash(null);
      // hamle eden taşı bitiş noktasında tahtaya geri yerleştir
      this.oyuntahtasi.yerler[i][j].setTash(hamleEden);
      this.oyuntahtasi.secimleriTemizle();
      if (this.turDöndür()) {
        this.oyuntahtasi.oyunAlanıYürüt();
      }
    }
  }

  highlightStyle(yer: Yer) {
    switch (yer.getHighlight()) {
      case 0:
        return '';
      case 1:
        return this.gosterge;
      case 2:
        return this.yurume;
      case 3:
        return this.yeme;
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
