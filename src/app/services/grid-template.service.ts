import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridTemplateService {
  private headerGrid = new BehaviorSubject<number[][]>([[1, 4], [4, 16], [16, 19]])
  private mainGrid = new BehaviorSubject<number[][]>([[1, 4], [4, 16], [16, 19]])

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
