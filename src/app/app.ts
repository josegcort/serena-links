import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LinksService } from './core/services/links';

export interface SocialLink {
  name: string;
  value: string;       // URL de redirección
  icon: string;         // nombre de archivo local o URL de imagen
  isIconFile: boolean;  // true = archivo local en assets/icons, false = URL externa
  isVisible: boolean;      // controla si el link se muestra en la UI
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
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
  getIconSrc(link: SocialLink): string {
    if (!link?.icon) return '';
    return link.isIconFile ? `${this.localIconsPath}${link.icon}` : link.icon;
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
}