import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class ModalComponent {
  visible = signal(false);
  imageSrc = ''

  open(imageSrc: string): void {
    this.imageSrc = 'images/'+imageSrc;
    this.visible.set(true);
  }

  close(): void {
    this.imageSrc = '';
    this.visible.set(false);
  }
}
