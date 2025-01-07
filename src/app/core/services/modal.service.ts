import { Injectable, ComponentRef, Type } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalContent<T> {
  component: Type<T>;
  inputs?: Partial<T>;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalContent: ModalContent<any> | null = null
  public contentChanges$ = new Subject()

  getModalContent() {
    return this.modalContent
  }

  openModal<T>(component: Type<T>, inputs?: Partial<T>): void {
    this.modalContent = { component, inputs }
    this.contentChanges$.next(1)
  }

  closeModal() {
    this.modalContent = null
    this.contentChanges$.next(1)
  }
}
