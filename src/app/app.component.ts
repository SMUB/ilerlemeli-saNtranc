import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi';
import { style } from 'typestyle';
import { Yer, YerState } from './yer';
import { PiecesService } from './pieces.service';

const cellSize = '12vh';

@Component({
  selector: 'app-root',
  template: `
    <div class="{{board}}">
      <img class="{{border00}} {{displayInherit}}" src="./assets/00.png" />
      <div class="{{border01}}" >
        <img *ngFor="let yer of borderSize;" class="{{displayInherit}}" src="./assets/01.png" />
      </div>
      <img class="{{border02}}" src="./assets/02.png" />
      <div class="{{border10}}">
        <img *ngFor="let yer of borderSize;" class="{{displayBlock}}" src="./assets/10.png" />
      </div>
      <div class="{{border12}}">
        <img *ngFor="let yer of borderSize;" class="{{displayBlock}}" src="./assets/12.png" />
      </div>
      <img class="{{border20}}" src="./assets/20.png" />
      <div class="{{border21}}" >
        <img *ngFor="let yer of borderSize;" class="{{displayInherit}}" src="./assets/21.png" />
      </div>
      <img class="{{border22}}" src="./assets/22.png" />
      <div *ngFor="let yer of yerFlatten(); let i = index" class="{{innerBoardStyles[i]}}" (click)="yerTiklama(i)">       
        <img class="{{cellStyle}} {{highlightStyle(yer)}}" [src]= 'yer.getTerrain().getResim()' />
        <img *ngIf="yer.getTash()" class="{{icerik}}" [src]='yer.getTash().getResim()' />
      </div>
    </div>
  `,
  providers: [PiecesService]
})
export class AppComponent implements OnInit {

  gosterge = style({ filter: 'brightness(10%)' });
  yurume = style({ filter: 'brightness(10%)' });
  yeme = style({ outline: 'red 1px solid' });
  icerik = style({ position: 'absolute', width: cellSize, height: cellSize });
  cellStyle = style({ position: 'absolute', width: '12vh', height: '12vh' });
  board = style({
    display: 'inline-grid',
    gridTemplateColumns: this.cellSizeMulti(),
    gridTemplateRows: this.cellSizeMulti()
  })
  displayBlock = style({ display: 'block', width: '2vh', height: '2vh' });
  displayInherit = style({ width: '2vh', height: '2vh' });
  border00 = style({ gridRow: '1', gridColumn: '1' })
  border01 = style({ gridRow: '1', gridColumn: '2', width: '96vh', height: '2vh' })
  border02 = style({ gridRow: '1', gridColumn: '10', width: '2vh', height: '2vh' })
  border10 = style({ gridRow: '2', gridColumn: '1', width: '2vh', height: '96vh' })
  border12 = style({ gridRow: '2', gridColumn: '10', width: '2vh', height: '96vh' })
  border20 = style({ gridRow: '10', gridColumn: '1', width: '2vh', height: '2vh' })
  border21 = style({ gridRow: '10', gridColumn: '2', width: '96vh', height: '2vh' })
  border22 = style({ gridRow: '10', gridColumn: '10', width: '2vh', height: '2vh' })

  innerBoardStyles: String[]
  oyuntahtasi: OyunTahtasi;

  constructor(
    private piecesService: PiecesService
  ) { }

  borderSize = new Array(48);
  ngOnInit() {
    this.oyuntahtasi = new OyunTahtasi(this.piecesService);
    this.innerBoardStyles = [];
    for (let i = 0; i < 64; i++) {
      this.innerBoardStyles.push(
        style(
          {
            gridColumn: ((i % 8) + 2).toString(),
            gridRow: (Math.trunc(i / 8) + 2).toString()
          }
        )
      );
    }
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
    console.log(i, j);
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

  cellSizeMulti() {
    let grid = '2vh ';
    for (let i = 0; i < 8; i++) {
      grid += cellSize + ' '
    }
    return grid + '2vh';
  }
}
