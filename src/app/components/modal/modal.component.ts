import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SocialLink } from '../../app';

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
  value = ''
  copied = signal(false);
  copiedStatus = signal('\u00A0');

  open(link: SocialLink): void {
    this.imageSrc = 'images/' + link.img;
    this.value = link.value;

    this.visible.set(true);
  }

  async copyValue() {
    this.copiedStatus.set('.......');

    try {
      await navigator.clipboard.writeText(String(this.value));
    this.copied.set(true);
      this.copiedStatus.set('Llave copiada.');
    } catch (err) {
      console.error('No se pudo copiar:', err);
      this.copied.set(false);
      this.copiedStatus.set('No se pudo copiar.');
    }

    console.log('Valor copiado al portapapeles:', this.value, this.copiedStatus, this.copied);

  }

  close(): void {
    this.imageSrc = '';
    this.value = '';
    this.copiedStatus = signal('\u00A0');
    this.copied.set(false);
    this.visible.set(false);
  }
}
