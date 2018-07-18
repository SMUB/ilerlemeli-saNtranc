import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi';
import { style } from 'typestyle';

const gosterge = style({
  outline: 'black 1px solid'
});

const yurume = style({
  outline: 'blue 1px solid'
});

const icerik = style({
  position: 'absolute'
});

@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let satir of oyuntahtasi.yerler; let i = index" class="row">
      <div *ngFor="let yer of satir; let j = index" [class.${gosterge}]="yer.getHighlight()" [class.${yurume}]="yer.yurumeHighlight"
      class="col" (click)="yerTiklama(i,j)">
        <div class="${icerik}">{{ yer.getTerrain().getResim() }}</div>
        <div class="${icerik}">{{ yer.getTash().getResim() }}</div>
      </div>
    </div>
  `,
  styles: ['.row { height: 100px; }']
})
export class AppComponent implements OnInit {
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

}
