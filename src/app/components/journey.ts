import { Component, computed, signal } from '@angular/core';
import { JOURNEY } from '../data/content';

@Component({
  selector: 'nexo-journey',
  template: `
    <section id="jornada" class="section journey" aria-labelledby="journey-heading">
      <div class="container">
        <div class="section-heading"><h2 id="journey-heading">Uma necessidade agora.<br>Novas possibilidades depois.</h2><p>As soluções da Nexo se conectam. Explore um caminho possível para entender como cada frente pode ampliar a próxima.</p></div>
        <div class="journey-layout">
          <div class="journey-options" role="group" aria-label="Explore as conexões entre soluções">
            @for (step of steps; track step.title; let i = $index) {
              <button type="button" [attr.aria-pressed]="selected() === i" (click)="selected.set(i)"><span class="node" aria-hidden="true"></span>{{ step.title }}<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 5 5-5 5"/></svg></button>
            }
          </div>
          <div class="journey-content" aria-live="polite" aria-atomic="true">
            <span class="connection-label">{{ current().title }}</span>
            <h3>{{ current().heading }}</h3><p>{{ current().description }}</p>
            <ul>@for (tag of current().tags; track tag) { <li>{{ tag }}</li> }</ul>
            <div class="connection-example"><span>Uma conexão possível</span><p>{{ current().connection }}</p></div>
          </div>
        </div>
        <p class="journey-note">Você escolhe o ponto de partida. Essa jornada é uma possibilidade, não uma sequência obrigatória.</p>
      </div>
    </section>
  `,
  styleUrl: './journey.scss',
})
export class Journey {
  readonly steps = JOURNEY;
  readonly selected = signal(0);
  readonly current = computed(() => this.steps[this.selected()]);
}
