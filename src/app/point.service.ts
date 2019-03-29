import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private point: number;
  constructor() {
    this.point = 0;
  }
  public getPoint(): Number { return this.point; }
  public setPoint(point): void { this.point = point; }
  // modifier is always positive
  public addPoint(point): boolean {
    if (point > 0) {
      this.point += point;
      return true;
    } else {
      return false;
    }
  }
  // modifier is always positive, points shouldn't get below zero
  public deductPoint(point): boolean {
    if (point > 0 && this.point >= point) {
      this.point -= point;
      return true;
    } else {
      return false;
    }
  }
}
