import { Component, output, signal } from '@angular/core';
import { SERVICES, ServiceId } from '../data/content';

@Component({
  selector: 'nexo-services',
  template: `
    <section id="solucoes" class="section" aria-labelledby="services-heading">
      <div class="container">
        <div class="section-heading"><h2 id="services-heading">A solução certa começa com a pergunta certa.</h2><p>O que sua empresa precisa fazer melhor? Explore nossas frentes de atuação. Você pode começar por uma delas e conectar as demais quando fizer sentido.</p></div>
        <div class="service-list">
          @for (service of services; track service.id) {
            <article [class.active]="expanded() === service.id">
              <h3><button type="button" [id]="'service-button-' + service.id" [attr.aria-expanded]="expanded() === service.id" [attr.aria-controls]="'service-panel-' + service.id" (click)="toggle(service.id)"><span>{{ service.title }}</span><span class="summary">{{ service.summary }}</span><svg class="expand" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/>@if (expanded() !== service.id) { <path d="M12 5v14"/> }</svg></button></h3>
              <div [id]="'service-panel-' + service.id" role="region" [attr.aria-labelledby]="'service-button-' + service.id" [hidden]="expanded() !== service.id" class="service-detail">
                <p>{{ service.detail }}</p>
                <div><ul>@for (item of service.deliverables; track item) { <li>{{ item }}</li> }</ul><a href="#briefing" class="text-link" (click)="selectService.emit(service.id)">Incluir esta solução no briefing</a></div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './services.scss',
})
export class Services {
  readonly services = SERVICES;
  readonly expanded = signal<ServiceId | null>('presenca');
  readonly selectService = output<ServiceId>();
  toggle(id: ServiceId): void { this.expanded.update(current => current === id ? null : id); }
}
