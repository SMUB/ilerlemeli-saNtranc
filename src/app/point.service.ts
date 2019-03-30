import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LootService {
  private point: number;
  constructor() {
    this.point = 0;
  }
  public getLoot(): Number { return this.point; }
  public setLoot(point): void { this.point = point; }
  // modifier is always positive
  public addloot(point): boolean {
    if (point > 0) {
      this.point += point;
      return true;
    } else {
      return false;
    }
  }
  // modifier is always positive, points shouldn't get below zero
  public deductLoot(point): boolean {
    if (point > 0 && this.point >= point) {
      this.point -= point;
      return true;
    } else {
      return false;
    }
  }
}
