import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridTemplateService {
  private headerGrid = new BehaviorSubject<number[][]>([[1, 3], [3, 9], [9, 11]])
  private mainGrid = new BehaviorSubject<number[][]>([[1, 9], [9, 11]])

  constructor() { }

  getHeaderGrid(): BehaviorSubject<number[][]> {
    return this.headerGrid
  }

  getMainGrid(): BehaviorSubject<number[][]> {
    return this.mainGrid
  }

  setHeaderGrid(newGrid: number[][]) {
    this.headerGrid.next(newGrid)
  }

  setMainGrid(newGrid: number[][]) {
    this.mainGrid.next(newGrid)
  }
}
