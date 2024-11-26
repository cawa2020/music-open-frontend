import { Component, Input, SimpleChanges } from '@angular/core';
import { scaleInOut } from '../../../shared/animations/scaleInOut';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  animations: [scaleInOut]
})
export class ModalComponent {
  @Input({required: true}) triggerOpen!: Subject<boolean>
  public isOpen = false

  constructor() { }

  ngOnInit() {
    this.triggerOpen.subscribe(() => this.isOpen = true)
  }

  hideModal() {
    this.isOpen = false
  }
}
