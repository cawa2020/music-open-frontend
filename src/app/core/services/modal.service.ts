import { Injectable, ComponentRef, Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CLOSE_ANIMATION_TIME } from '../../shared/animations/scaleInOut';

export interface ModalContent<T> {
  component: Type<T>;
  inputs?: Partial<T>;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalContentSubject$ = new BehaviorSubject<ModalContent<any> | null>(null)
  public modalContent$ = this.modalContentSubject$.asObservable()
  public readonly isHidden$ = new BehaviorSubject<boolean>(true)

  openModal<T>(component: Type<T>, inputs?: Partial<T>): void {
    this.modalContentSubject$.next({ component, inputs })
    this.isHidden$.next(false)
  }

  closeModal() {
    this.modalContentSubject$.next(null)

    setTimeout(() => {
      this.isHidden$.next(true);
    }, CLOSE_ANIMATION_TIME);
  }
}
