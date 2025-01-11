import { Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { ModalContent, ModalService } from '../../services/modal.service';
import { manualSclaeInOut } from '../../../shared/animations/scaleInOut';
import { CommonModule } from '@angular/common';
import { manualFadeInOut } from '../../../shared/animations/fadeInOut';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule],
  animations: [manualSclaeInOut, manualFadeInOut],
})
export class ModalComponent {
  private modalService = inject(ModalService)

  public modalContent: ModalContent<any> | null = null
  public readonly isHidden$ = this.modalService.isHidden$
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer: ViewContainerRef | null = null;

  ngAfterViewInit() {
    this.modalService.modalContent$.subscribe((content) => {
      this.modalContent = content
      if (!this.modalContainer || !this.modalContent) return

      this.modalContainer.clear();
      const componentRef = this.modalContainer.createComponent(this.modalContent.component);

      if (this.modalContent.inputs) Object.assign(componentRef.instance, this.modalContent.inputs);
    })
  }

  hideModal() {
    this.modalService.closeModal()
  }
}
