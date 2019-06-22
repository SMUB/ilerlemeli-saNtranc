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
      [-2, -3, -4, 0, 0, -4, -3, -2],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [2, 3, 4, 0, 0, 4, 3, 2]
    ];
  }

  public firstDeployment(): Number[][] {
    const holder = [];
    for (let i = 0; i < 8; i++) {
      holder.unshift(this.pieceSequence.pop());
    }
    return holder;
  }

  public getNextLine(): Number[] {
    return this.pieceSequence.pop();
  }
}
