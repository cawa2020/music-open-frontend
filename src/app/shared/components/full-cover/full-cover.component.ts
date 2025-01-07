import { Component, inject, Input } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-full-cover',
  standalone: true,
  imports: [],
  templateUrl: './full-cover.component.html',
  styleUrl: './full-cover.component.css'
})
export class FullCoverComponent {
  private modal = inject(ModalService)
  @Input() img!: string

  hideModal() {
    this.modal.closeModal()
  }
}
