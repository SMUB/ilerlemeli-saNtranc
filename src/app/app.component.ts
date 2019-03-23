import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi';
import { style } from 'typestyle';
import { Yer, YerState } from './yer';

@Component({
  selector: 'app-root',
  template: `
    <div class="{{board}}">
     <div *ngFor="let yer of yerFlatten(); let i = index" class="{{highlightStyle(yer)}}" (click)="yerTiklama(i,j)">       
          <div class="{{icerik}}">{{ yer.getTerrain().getResim() }}</div>
         <img *ngIf="yer.getTash()" class="{{icerik}}" [src]='yer.getTash().getResim()'>
     </div>
    </div>
  `
})
export class AppComponent implements OnInit {

  gosterge = style({ outline: 'black 1px solid' });
  yurume = style({ outline: 'blue 1px solid' });
  yeme = style({ outline: 'red 1px solid' });
  icerik = style({ position: 'absolute' });
  board = style({
    display: 'inline-grid',
    gridTemplateColumns: '12.5vh 12.5vh 12.5vh 12.5vh 12.5vh 12.5vh 12.5vh 12.5vh',
    gridTemplateRows: '12.5vh 12.5vh 12.5vh 12.5vh 12.5vh 12.5vh 12.5vh 12.5vh'
  })

  oyuntahtasi: OyunTahtasi;

  constructor() { }

  ngOnInit() {
    this.oyuntahtasi = new OyunTahtasi(8, 8);
  }

  // Grid automagically places its first children in consecutive cells, yer matrix is flattened to an array
  yerFlatten() {
    return this.oyuntahtasi.yerler.reduce((a, c) => a.concat(c))
  }

  // Back calculate matrix position of a piece assuming 8x8 original dimensions see yerFlatten comment
  yerBuildup(index) {
    return { i: Math.trunc(index / 8), j: index % 8 }
  }

  yerTiklama(index) {
    // game engine understands 2D coordinates, angular loop returns a linear index, see function comment
    let { i, j } = this.yerBuildup(index);
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
