import { Directive, ElementRef, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'img[appLazyImg]',
  standalone: true
})
export class LazyImgDirective implements OnInit {
  @Input() appLazyImg!: string;
  @Input() placeholder!: string;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    const img = this.el.nativeElement;

    if (this.placeholder) {
      img.src = this.placeholder;
      img.style.filter = 'blur(0px)';
      img.style.transform = 'scale(1.05)';
      img.style.transition = 'filter 0.6s ease, transform 0.6s ease';
    }

    // Solo ejecuta en el browser, no en SSR
    if (!isPlatformBrowser(this.platformId)) return;

    const hd = new Image();
    hd.src = this.appLazyImg;
    hd.onload = () => {
      img.src = this.appLazyImg;
      img.style.filter = 'blur(0)';
      img.style.transform = 'scale(1)';
    };
  }
}