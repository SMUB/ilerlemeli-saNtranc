import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('AppComponent', () => {
  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
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
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Inject test layout 
    app.oyuntahtasi.piecesService.pieceSequence = [
      [-3, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [-2, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [-3, 0, 0, 0, 0, 0, 0, 0],
      [-4, 0, 0, 0, 0, 0, 0, 0],
      [-2, 0, -2, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0]
    ];
    app.oyuntahtasi.deploy()
  }));

  it('should highlight pawn and movements', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    let pawnPositionTransparencyLayerClasses = compiled.querySelector('#C57').querySelector('div').className.split(' ');
    expect(pawnPositionTransparencyLayerClasses.length).toEqual(1);
    app.yerTiklama(57);
    fixture.detectChanges();
    // check if pawn position middle layer has a second class name after being clicked
    pawnPositionTransparencyLayerClasses = compiled.querySelector('#C57').querySelector('div').className.split(' ');
    expect(pawnPositionTransparencyLayerClasses.length).toEqual(2);
    let pawnMovePositionTransparencyLayerClasses;
    for (let i = 0; i < 64; i++) {
      if (i === 48 || i === 49 || i === 50 || i === 57) {
        pawnMovePositionTransparencyLayerClasses = compiled.querySelector(`#C${i}`).querySelector('div').className.split(' ');
        expect(pawnMovePositionTransparencyLayerClasses.length).toEqual(2);
      } else {
        pawnMovePositionTransparencyLayerClasses = compiled.querySelector(`#C${i}`).querySelector('div').className.split(' ');
        expect(pawnMovePositionTransparencyLayerClasses.length).toEqual(1);
      }

    }
  }));

  it('should move zombie bishop when human lower left pawn moves', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    // select sacrifical pawn
    app.yerTiklama(57);
    // move pawn one forward
    app.yerTiklama(49);
    // re render and check if he is consumed by bishop
    fixture.detectChanges();
    let pieceContentOfCell = compiled.querySelector(`#C49`).querySelector('.piece');
    let fileName = pieceContentOfCell.attributes.getNamedItem('src').value;
    expect(fileName).toEqual('./assets/-4.png');
  }));

  it('should move zombie knight when human upper left pawn moves', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    // select sacrifical pawn
    app.yerTiklama(25);
    // move pawn one forward
    app.yerTiklama(17);
    // re render and check if he is consumed by bishop
    fixture.detectChanges();
    let pieceContentOfCell = compiled.querySelector(`#C17`).querySelector('.piece');
    let fileName = pieceContentOfCell.attributes.getNamedItem('src').value;
    expect(fileName).toEqual('./assets/-3.png');
  }));

  it('should move zombie rook when human lower middle pawn moves', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    // select sacrifical pawn
    app.yerTiklama(59);
    // move pawn one forward
    app.yerTiklama(51);
    // re render and check if he is consumed by bishop
    fixture.detectChanges();
    let pieceContentOfCell = compiled.querySelector(`#C51`).querySelector('.piece');
    let fileName = pieceContentOfCell.attributes.getNamedItem('src').value;
    expect(fileName).toEqual('./assets/-2.png');
    // perform secondary check to make sure other rooks didn't move     
    expect(compiled.querySelector(`#C51`).querySelector('.piece').attributes.getNamedItem('src').value).toEqual('./assets/-2.png');
    expect(compiled.querySelector(`#C16`).querySelector('.piece').attributes.getNamedItem('src').value).toEqual('./assets/-2.png');
  }));
});
