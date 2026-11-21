import { Component, ElementRef, signal, viewChild } from '@angular/core';

@Component({
  selector: 'nexo-header',
  template: `
    <header>
      <div class="container header-inner">
        <a class="brand" href="#inicio" aria-label="Nexo, início" (click)="closeMenu()">
          <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M4 28V6h8l10 22h8V6M4 6l10 22h8L12 6" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/></svg>
          <span>nexo</span>
        </a>
        <button #menuButton class="menu-toggle" type="button" [attr.aria-expanded]="menuOpen()" aria-controls="main-navigation" (click)="menuOpen.update(toggle)">
          {{ menuOpen() ? 'Fechar' : 'Menu' }}
          <span class="menu-lines" [class.open]="menuOpen()" aria-hidden="true"><i></i><i></i></span>
        </button>
        <nav id="main-navigation" aria-label="Navegação principal" [class.open]="menuOpen()">
          <a href="#sobre" (click)="closeMenu()">A Nexo</a>
          <a href="#solucoes" (click)="closeMenu()">Soluções</a>
          <a href="#jornada" (click)="closeMenu()">Conexões</a>
          <a href="#processo" (click)="closeMenu()">Como trabalhamos</a>
          <a href="#briefing" class="nav-cta" (click)="closeMenu()">Planejar meu projeto</a>
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.scss',
  host: { '(document:keydown.escape)': 'escapeMenu()' },
})
export class Header {
  readonly menuOpen = signal(false);
  readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  readonly toggle = (value: boolean): boolean => !value;
  closeMenu(): void { this.menuOpen.set(false); }
  escapeMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu();
      this.menuButton()?.nativeElement.focus();
    }
  }
}
