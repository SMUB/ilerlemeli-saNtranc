import { Component } from '@angular/core';
import { OyunTahtasi } from './oyuntahtasi.service';
import { style as style2 } from 'typestyle';
import { Yer, YerState } from './yer';
import { PiecesService } from './pieces.service';
import { PointService } from './point.service';
import { LootService } from './loot.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  AnimationMetadata
} from '@angular/animations';

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
      <div [@boardmove]="i" *ngFor="let yer of yerFlatten(); let i = index" id="{{'C'+i}}" class="cell" (click)="yerTiklama(i)">
        <img class="{{cellStyle}}"  [src]= 'yer.getTerrain().getResim()' />
        <div class="{{cellStyle}}{{highlightStyle(yer)}}" ></div>
        <img @pieceMoveFade *ngIf="yer.getTash()" class="piece {{icerik}}" [src]='yer.getTash().getResim()' />
      </div>
      <div class="{{counterBar}}">
        <img [@grab]="remainingTurns()" class="{{hands3}}"  src="./assets/prototip2countdown-graphic.png" />
      </div>
    </div>,
    
  `,
  providers: [/*PiecesService, LootService, OyunTahtasi*/],
  animations: [
    trigger('grab', [
      state('3', style({
        bottom: '0vh'
      })),
      state('2', style({
        bottom: '4vh'
      })),
      state('1', style({
        bottom: '8vh'
      })),
      transition('3 => 2', [
        animate('1s')
      ]),
      transition('2 => 1', [
        animate('1s')
      ]),
      transition('1 => 3', [
        animate('3s', keyframes([
          style({ bottom: '8vh', offset: 0.0 }),
          style({ bottom: '15vh', offset: 0.8 }),
          style({ bottom: '0vh', offset: 1 })
        ]))
      ]),
    ]),
    trigger('pieceMoveFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ]),
    trigger('boardmove', [
      ...(
        () => {
          let stateArr = new Array<AnimationMetadata>();
          for (let i = 0; i < 64; i++) {
            stateArr.push(
              state(i.toString(),
                style({
                  gridColumn: ((i % 8) + 2 + 1).toString(),
                  gridRow: (Math.trunc(i / 8) + 2).toString()
                })
              )
            );
          }
          return stateArr;
        }
      )(),
      transition(':enter', [
        animate('3s'),
      ]),
      transition(':leave', [
        animate('5s'),
      ]),
      transition('* => *', [
        animate('3s', keyframes([
          style({ offset: 0.0 }),
          style({ offset: 0.8 }),
          style({ offset: 1 })
        ])),
      ])
    ])
  ]
})
export class AppComponent {

  gosterge = style2({ backgroundColor: 'black', opacity: 1 });
  yurume = style2({ backgroundColor: 'blue', opacity: 0.45 });
  yeme = style2({ backgroundColor: 'red', opacity: 0.45 });
  icerik = style2({ position: 'absolute', width: cellSize, height: cellSize });
  cellStyle = style2({ position: 'absolute', width: '12vh', height: '12vh' });
  board = style2({
    display: 'inline-grid',
    gridTemplateColumns: `12vh ${this.cellSizeMulti()}  12vh`,
    gridTemplateRows: `${this.cellSizeMulti()} 12vh`
  });
  displayBlock = style2({ display: 'block', width: '2vh', height: '2vh' });
  displayInherit = style2({ width: '2vh', height: '2vh' });
  border00 = style2({ gridRow: '1', gridColumn: '2' });
  border01 = style2({ gridRow: '1', gridColumn: '3', width: '96vh', height: '2vh' });
  border02 = style2({ gridRow: '1', gridColumn: '11', width: '2vh', height: '2vh' });
  border10 = style2({ gridRow: '2', gridColumn: '2', width: '2vh', height: '96vh' });
  border12 = style2({ gridRow: '2', gridColumn: '11', width: '2vh', height: '96vh' });
  border20 = style2({ gridRow: '10', gridColumn: '2', width: '2vh', height: '2vh' });
  border21 = style2({ gridRow: '10', gridColumn: '3', width: '96vh', height: '2vh' });
  border22 = style2({ gridRow: '10', gridColumn: '11', width: '2vh', height: '2vh' });
  leftSidebar0 = style2({ gridRow: '2', gridColumn: '1', width: '12vh', height: '12vh' });
  leftSidebar1 = style2({ gridRow: '3', gridColumn: '1', width: '12vh', height: '12vh' });
  rightSidebar0 = style2({ gridRow: '2', gridColumn: '12', width: '12vh', height: '12vh' });
  rightSidebar1 = style2({ gridRow: '3', gridColumn: '12', width: '12vh', height: '12vh' });
  rightSidebar2 = style2({ gridRow: '4', gridColumn: '12', width: '12vh', height: '12vh' });
  rightSidebar3 = style2({ gridRow: '5', gridColumn: '12', width: '12vh', height: '12vh' });
  counterBar = style2({ gridRow: '10', gridColumn: '3', width: '96vh', height: '2vh' });
  hands3 = style2({ position: 'relative', width: '95vh' });
  innerBoardStyles: String[];

  constructor(
    private lootService: LootService,
    private pointService: PointService,
    public oyuntahtasi: OyunTahtasi
  ) { }

  borderSize = new Array(48);
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
