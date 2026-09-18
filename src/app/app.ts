import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LinksService } from './core/services/links';
import { LazyImgDirective } from './core/directives/lazy-img.directive';
import { ModalComponent } from './components/modal/modal.component';

export interface SocialLink {
  name: string;
  value: string;       // URL de redirección
  icon: string;         // nombre de archivo local o URL de imagen
  isIconFile: boolean;  // true = archivo local en assets/icons, false = URL externa
  isVisible: boolean;      // controla si el link se muestra en la UI
  isModal: boolean;      // controla si mostrar en un modal o un link de redireccion
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [CommonModule, LazyImgDirective, ModalComponent],
})
export class App {

  links$: Observable<SocialLink[]>;

  /** Carpeta donde se buscan los íconos locales cuando isIconFile = true */
  private readonly localIconsPath = 'icons/';

  /** Nombres de links cuyo ícono falló al cargar, para mostrar el fallback */
  private erroredIcons = new Set<string>();

  constructor(private linksService: LinksService) {
    this.links$ = this.linksService.getLinks();
  }

  /** Devuelve la ruta final del ícono, sea archivo local o URL externa */
  getIconSrc(link: SocialLink, isLazy: boolean): string {
    if (!link?.icon) return '';
    return link.isIconFile ? `${this.localIconsPath}${isLazy ? '' : 'tiny-'}${link.icon}` : link.icon;
  }

  hasIconError(name: string): boolean {
    return this.erroredIcons.has(name);
  }

  onIconError(name: string): void {
    this.erroredIcons.add(name);
  }

  trackByName(_index: number, link: SocialLink): string {
    return link.name;
  }

  openModal(image: string): void {
    console.log('Abrir modal con imagen:', image);
  }
}