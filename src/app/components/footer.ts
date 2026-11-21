import { Component } from '@angular/core';
import { SITE_CONFIG } from '../data/site.config';

@Component({
  selector: 'nexo-footer',
  template: `
    <footer><div class="container footer-top"><div class="footer-brand"><a href="#inicio" aria-label="Nexo, voltar ao início">nexo</a><p>Boas conexões.<br>Novas possibilidades.</p></div><div class="footer-links"><span>Explore a Nexo</span><a href="#sobre">Quem somos</a><a href="#solucoes">Nossas soluções</a><a href="#processo">Nosso processo</a><a href="#briefing">Prepare seu projeto</a></div><div class="footer-info"><span>Do Brasil, para o seu negócio.</span><p>Soluções sob demanda e atendimento remoto em todo o território nacional.</p><p class="contact-status">Canais oficiais em definição.<br>Use o briefing para organizar sua necessidade.</p></div></div><div class="container footer-bottom"><span>© {{ year }} Nexo. Todos os direitos reservados.</span><a href="#inicio">Voltar ao início</a></div></footer>
  `,
  styleUrl: './footer.scss',
})
export class Footer { readonly year = SITE_CONFIG.year; }
