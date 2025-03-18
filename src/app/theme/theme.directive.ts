import { Directive, ElementRef, Inject, OnInit, OnDestroy, Optional, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { THEME_SERVICE, ThemeConfig } from '../layout/layout.module';

@Directive({
  selector: '[appTheme]',
  standalone: true,
  providers: []
})
export class ThemeDirective implements OnInit, OnDestroy {

  private themeName = 'dark';
  private themServiceSubscription: Subscription = new Subscription();
  // themService = inject
  constructor(private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document,
              @Inject(THEME_SERVICE) private themService: ThemeConfig
            ) { }

  ngOnInit(): void {
    this.updateTheme(this.themeName);
    this.themServiceSubscription = this.themService.getActiveTheme()
      .subscribe((themeName: any) => {
        this.themeName = themeName;
        this.updateTheme(this.themeName);
      });
  }

  updateTheme(themeName: any): void {
    const element:HTMLElement = this.document.body;
    const theme = themeName === 'dark' ? 'light' : 'dark'
    element.classList.add(themeName);
    element.classList.remove(theme);
  }

  ngOnDestroy(): void {
    if (this.themServiceSubscription) {
      this.themServiceSubscription.unsubscribe();
    }
  }

}
