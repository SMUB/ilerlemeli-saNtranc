import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi';
import { style } from 'typestyle';
import { Oyuncu } from './tas';
import { Yer, YerState } from './yer';

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

  oyuntahtasi: OyunTahtasi;

  constructor() { }

  ngOnInit() {
    this.oyuntahtasi = new OyunTahtasi(8, 8);
  }

  yerTiklama(i, j) {
    // oyuncu yetki kontrolu
    this.oyuntahtasi.yerTiklama(i, j);
  }

  highlightStyle(yer: Yer) {
    switch (yer.getHighlight()) {
      case YerState.bos:
        return '';
      case YerState.gosterge:
        return this.gosterge;
      case YerState.yurume:
        return this.yurume;
      case YerState.yeme:
        return this.yeme;
    }
  }
}
