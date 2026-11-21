import { Component, signal } from '@angular/core';
import { Hero } from '../components/hero';
import { Services } from '../components/services';
import { Journey } from '../components/journey';
import { Briefing } from '../components/briefing';
import { PROCESS, FAQ, ServiceId, ServiceSelection } from '../data/content';

@Component({
  selector: 'nexo-home',
  imports: [Hero, Services, Journey, Briefing],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly process = PROCESS;
  readonly faq = FAQ;
  readonly selectedService = signal<ServiceSelection | null>(null);
  chooseService(id: ServiceId): void { this.selectedService.set({ id }); }
}
