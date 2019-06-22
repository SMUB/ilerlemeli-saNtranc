import { Component, OnInit } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi.service';
import { style } from 'typestyle';
import { Yer, YerState } from './yer';
import { PiecesService } from './pieces.service';
import { PointService } from './point.service';
import { LootService } from './loot.service';

const cellSize = '12vh';

@Component({
  selector: 'app-root',
  template: `
    <div id="board" class="{{board}}">
      <img class="{{leftSidebar0}}" src="./assets/beyazKare.png" />
      <div id="point" class="{{leftSidebar0}} {{displayInherit}}">
        score: {{pointService.getPoint()}}
      </div>
      <img class="{{leftSidebar1}}" src="./assets/beyazKare.png" />
      <div class="{{leftSidebar1}} {{displayInherit}}">
        remainig turns: {{remainingTurns()}}
      </div>
      <img class="{{rightSidebar0}}" src="./assets/beyazKare.png" />
      <div class="{{rightSidebar0}} {{displayInherit}}">
        resources: {{lootService.getLoot()}}
      </div>
      <img class="{{rightSidebar1}}" src="./assets/beyazKare.png" />
      <img class="{{rightSidebar1}}" src="./assets/2.png" (click)="onClickRook()" />
      <div class="{{rightSidebar1}} {{displayInherit}}">
        price: 2
      </div>
      <img class="{{rightSidebar2}}" src="./assets/beyazKare.png" />
      <img class="{{rightSidebar2}}" src="./assets/3.png" (click)="onClickKnight()" />
      <div class="{{rightSidebar2}} {{displayInherit}}">
        price: 3
      </div>
      <img class="{{rightSidebar3}}" src="./assets/beyazKare.png" />
      <img class="{{rightSidebar3}}" src="./assets/4.png" (click)="onClickBishop()" />
      <div class="{{rightSidebar3}} {{displayInherit}}">
        price: 4
      </div>
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
      <div *ngFor="let yer of yerFlatten(); let i = index" id="{{'C'+i}}" class="{{innerBoardStyles[i]}}" (click)="yerTiklama(i)">
        <img class="{{cellStyle}}"  [src]= 'yer.getTerrain().getResim()' />
        <div class="{{cellStyle}}{{highlightStyle(yer)}}" ></div>
        <img *ngIf="yer.getTash()" class="piece {{icerik}}" [src]='yer.getTash().getResim()' />
      </div>
    </div>
  `,
  providers: [/*PiecesService, LootService, OyunTahtasi*/]
})
export class AppComponent implements OnInit {

  gosterge = style({ backgroundColor: 'black', opacity: 1 });
  yurume = style({ backgroundColor: 'blue', opacity: 0.45 });
  yeme = style({ backgroundColor: 'red', opacity: 0.45 });
  icerik = style({ position: 'absolute', width: cellSize, height: cellSize });
  cellStyle = style({ position: 'absolute', width: '12vh', height: '12vh' });
  board = style({
    display: 'inline-grid',
    gridTemplateColumns: `12vh ${this.cellSizeMulti()}  12vh`,
    gridTemplateRows: this.cellSizeMulti()
  });
  displayBlock = style({ display: 'block', width: '2vh', height: '2vh' });
  displayInherit = style({ width: '2vh', height: '2vh' });
  border00 = style({ gridRow: '1', gridColumn: '2' });
  border01 = style({ gridRow: '1', gridColumn: '3', width: '96vh', height: '2vh' });
  border02 = style({ gridRow: '1', gridColumn: '11', width: '2vh', height: '2vh' });
  border10 = style({ gridRow: '2', gridColumn: '2', width: '2vh', height: '96vh' });
  border12 = style({ gridRow: '2', gridColumn: '11', width: '2vh', height: '96vh' });
  border20 = style({ gridRow: '10', gridColumn: '2', width: '2vh', height: '2vh' });
  border21 = style({ gridRow: '10', gridColumn: '3', width: '96vh', height: '2vh' });
  border22 = style({ gridRow: '10', gridColumn: '11', width: '2vh', height: '2vh' });
  leftSidebar0 = style({ gridRow: '2', gridColumn: '1', width: '12vh', height: '12vh' });
  leftSidebar1 = style({ gridRow: '3', gridColumn: '1', width: '12vh', height: '12vh' });
  rightSidebar0 = style({ gridRow: '2', gridColumn: '12', width: '12vh', height: '12vh' });
  rightSidebar1 = style({ gridRow: '3', gridColumn: '12', width: '12vh', height: '12vh' });
  rightSidebar2 = style({ gridRow: '4', gridColumn: '12', width: '12vh', height: '12vh' });
  rightSidebar3 = style({ gridRow: '5', gridColumn: '12', width: '12vh', height: '12vh' });

  innerBoardStyles: String[];

  constructor(
    private lootService: LootService,
    private pointService: PointService,
    public oyuntahtasi: OyunTahtasi
  ) { }

  borderSize = new Array(48);
  ngOnInit() {
    // this.oyuntahtasi = new OyunTahtasi(this.piecesService, this.lootService, this.pointService);
    this.innerBoardStyles = [];
    for (let i = 0; i < 64; i++) {
      this.innerBoardStyles.push(
        style(
          {
            gridColumn: ((i % 8) + 2 + 1).toString(),
            gridRow: (Math.trunc(i / 8) + 2).toString()
          }
        )
      );
    }
  }

  // Grid automagically places its first children in consecutive cells, yer matrix is flattened to an array
  yerFlatten() {
    return this.oyuntahtasi.yerler.reduce((a, c) => a.concat(c));
  }

  // Back calculate matrix position of a piece assuming 8x8 original dimensions see yerFlatten comment
  yerBuildup(index) {
    return { i: Math.trunc(index / 8), j: index % 8 };
  }

  yerTiklama(index) {
    // game engine understands 2D coordinates, angular loop returns a linear index, see function comment
    const { i, j } = this.yerBuildup(index);
    // console.log(i, j);
    // oyuncu yetki kontrolu
    this.oyuntahtasi.yerTiklama(i, j);
  }

  highlightStyle(yer: Yer): string {
    switch (yer.getHighlight()) {
      case YerState.bos:
        return '';
      case YerState.gosterge:
        return ' ' + this.gosterge;
      case YerState.yurume:
        return ' ' + this.yurume;
      case YerState.yeme:
        return ' ' + this.yeme;
    }
  }

  cellSizeMulti(): string {
    let grid = '2vh ';
    for (let i = 0; i < 8; i++) {
      grid += cellSize + ' ';
    }
    return grid + '2vh';
  }

  remainingTurns(): string {
    return this.oyuntahtasi.turSayaci.toString();
  }

  onClickRook() {
    this.oyuntahtasi.buyModeRook();
  }

  onClickKnight() {
    this.oyuntahtasi.buyModeKnight();
  }

  onClickBishop() {
    this.oyuntahtasi.buyModeBishop();
  }


}
