import { Component, Input } from '@angular/core';
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
  @Input({ required: true }) triggerOpen!: Subject<boolean>
  public isOpen = false

  constructor() { }

  ngOnInit() {
    this.triggerOpen.subscribe((el) => this.isOpen = el)
  }

  hideModal() {
    this.isOpen = false
  }
}
