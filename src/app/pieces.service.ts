import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PiecesService {
  private pieceSequence: Number[][];

  constructor() {
    this.pieceSequence = [
      [0, 0, 0, -7, 0, 0, 0, 0],
      [0, 0, -7, 0, 0, 0, 0, 0],
      [0, -7, 0, 0, 0, 0, 0, 0],
      [-7, 0, 0, 0, 0, 0, 0, 0],
      [-7, -7, -7, -7, -7, -7, -7, -7],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [3, 3, 3, 0, 0, 3, 3, 3]
    ]
  }

  public firstDeployment(): Number[][] {
    let holder = [];
    for (let i = 0; i < 8; i++) {
      holder.unshift(this.pieceSequence.pop());
    }
    return holder;
  }

  public getNextLine(): Number[] {
    return this.pieceSequence.pop();
  }
}
