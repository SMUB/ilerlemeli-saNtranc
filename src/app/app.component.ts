import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi';
import { style } from 'typestyle';
import { Oyuncu } from './tash';
import { Yer } from './yer';

@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let satir of oyuntahtasi.yerler; let i = index" class="row">
      <div *ngFor="let yer of satir; let j = index"
      class="col {{highlightStyle(yer)}}"
      (click)="yerTiklama(i,j)">
        <div class="{{icerik}}">{{ yer.getTerrain().getResim() }}</div>
        <div class="{{icerik}}">{{ yer.getTash().getResim() }}</div>
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

  oyuntahtasi: OyunTahtasi;

  ngOnInit() {
    this.oyuntahtasi = new OyunTahtasi(8, 8);
  }

  yerTiklama(i, j) {
    // oyuncu yetki kontrolü
    if (this.oyuntahtasi.yerler[i][j].getTash().oyuncu === this.oyuncu) {
      this.oyuntahtasi.secimleriTemizle();
      this.oyuntahtasi.seciliyer = { i: i, j: j };
      this.oyuntahtasi.seciliyerİsaretle(this.oyuncu);
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
}
