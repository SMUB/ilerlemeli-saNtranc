import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi';
import { style } from 'typestyle';

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

  icerik = style({ position: 'absolute' });

  title = 'app';
  oyuntahtasi: OyunTahtasi;

  ngOnInit() {
    this.oyuntahtasi = new OyunTahtasi(8, 8);
  }

  yerTiklama(i, j) {
    this.oyuntahtasi.secimleriTemizle();
    this.oyuntahtasi.seciliyer = { i: i, j: j };
    this.oyuntahtasi.seciliyerİsaretle();
  }

  highlightStyle(yer) {
    if (yer.getHighlight()) {
      return this.gosterge.toString();
    } else if (yer.yurumeHighlight) {
      return this.yurume.toString();
    }
  }

}
