import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should have oyuntahtasi', async(() => {
    expect(app.oyuntahtasi).toBeDefined();
  }));

  it(`should have piecesService`, async(() => {
    expect(app.pointService).toBeDefined();
  }));

  it('should render scoreboard', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#point')).toBeDefined();
  }));

  it('should render gameboard', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#board')).toBeDefined();
  }));
});

describe('Game mechanics', () => {
  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Inject test layout 
    app.oyuntahtasi.piecesService.pieceSequence = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [-2, -3, -4, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1]
    ];
    app.oyuntahtasi.deploy()
  }));

  it('should highlight pawn', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#C63')).toBeDefined();
    let pawnPositionTransparencyLayerClasses = compiled.querySelector('#C63').querySelector('div').className.split(' ');
    expect(pawnPositionTransparencyLayerClasses.length).toEqual(1);
    app.yerTiklama(63);
    fixture.detectChanges();
    // check if pawn position middle layer has a second class name after being clicked
    pawnPositionTransparencyLayerClasses = compiled.querySelector('#C63').querySelector('div').className.split(' ');
    expect(pawnPositionTransparencyLayerClasses.length).toEqual(2);
    let pawnMovePositionTransparencyLayerClasses;
    for (let i = 0; i < 64; i++) {
      if (i === 54 || i === 55 || i === 63) {
        pawnMovePositionTransparencyLayerClasses = compiled.querySelector(`#C${i}`).querySelector('div').className.split(' ');
        expect(pawnMovePositionTransparencyLayerClasses.length).toEqual(2);
      } else {
        pawnMovePositionTransparencyLayerClasses = compiled.querySelector(`#C${i}`).querySelector('div').className.split(' ');
        expect(pawnMovePositionTransparencyLayerClasses.length).toEqual(1);
      }

    }
  }));

  it('should move zombie bishop when human pawn moves', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#C63')).toBeDefined();
    // select pawn
    app.yerTiklama(63);
    // move pawn one forward
    app.yerTiklama(55);
    // re render
    fixture.detectChanges();
    for (let i = 0; i < 64; i++) {
      if (i === 19) { // bishop replaced bait pawn
        let pieceContentOfCell = compiled.querySelector(`#C${i}`).querySelector('.piece');
        let fileName = pieceContentOfCell.attributes.getNamedItem('src').value;
        expect(fileName).toEqual('./assets/-4.png');
      } else if (i === 55) { // manipulation pawn should be in new position
        let pieceContentOfCell = compiled.querySelector(`#C${i}`).querySelector('.piece');
        let fileName = pieceContentOfCell.attributes.getNamedItem('src').value;
        expect(fileName).toEqual('./assets/1.png');
      } else if (i === 63) { // manipulation pawn should not be in
        let pieceContentOfCell = compiled.querySelector(`#C${i}`).querySelector('.piece');
        expect(pieceContentOfCell).toBeNull();
      }

    }
  }));
});
