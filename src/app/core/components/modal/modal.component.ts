import { Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { ModalContent, ModalService } from '../../services/modal.service';
import { CLOSE_ANIMATION_TIME, manualSclaeInOut } from '../../../shared/animations/scaleInOut';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule],
  animations: [manualSclaeInOut],
})
export class ModalComponent {
  private modalService = inject(ModalService)
  
  public modalContent: ModalContent<any> | null = null
  public readonly isHidden$ = new BehaviorSubject<boolean>(true);
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer: ViewContainerRef | null = null;

  ngAfterViewInit() {
    this.modalService.contentChanges$.subscribe(() => {
      console.log(this.modalContainer)
      this.modalContent = this.modalService.getModalContent()
      if (!this.modalContainer || !this.modalContent) return

      this.modalContainer.clear();
      const componentRef = this.modalContainer.createComponent(this.modalContent.component);

      if (this.modalContent.inputs) Object.assign(componentRef.instance, this.modalContent.inputs);
      this.isHidden$.next(false)
    })
  }

  showModal() {
    this.isHidden$.next(false);
  }

  hideModal() {
    this.modalContent = null;

    setTimeout(() => {
      this.isHidden$.next(true);
    }, CLOSE_ANIMATION_TIME);
  }
}
