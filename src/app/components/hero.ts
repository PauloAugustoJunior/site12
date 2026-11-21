import { Component } from '@angular/core';

@Component({
  selector: 'nexo-hero',
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero-content">
        <h1 id="hero-title">Seu próximo passo merece uma boa conexão.</h1>
        <div class="hero-base">
          <div class="hero-copy"><p>Estratégia, software, dados e inteligência artificial para transformar o que sua empresa precisa no que ela pode fazer.</p><div class="actions"><a class="button primary" href="#briefing">Planejar meu projeto</a><a class="text-link" href="#solucoes">Explorar soluções</a></div><p class="hero-note">Tecnologia sob medida.<br>Atendimento remoto em todo o Brasil.</p></div>
          <aside class="planning-document" aria-label="Exemplo ilustrativo de planejamento de projeto"><div class="document-heading"><span class="document-mark" aria-hidden="true"><svg viewBox="0 0 34 34"><path d="M4 28V6h8l10 22h8V6M4 6l10 22h8L12 6"/></svg></span><span>Mapa de um próximo passo</span><span class="illustrative-label">Ilustrativo</span></div><dl><div><dt>O desafio</dt><dd>Informações espalhadas</dd></div><div><dt>A prioridade</dt><dd>Conectar a operação</dd></div><div><dt>Um caminho possível</dt><dd>Integrações + dados claros</dd></div></dl><p>Primeiro, entender.<br>Depois, construir o que faz sentido.</p></aside>
        </div>
      </div>
      <div class="container hero-bottom"><span>O seu negócio é o ponto de partida.</span><a href="#sobre">Conheça a Nexo <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" stroke-width="1.5"/></svg></a></div>
    </section>
  `,
  styleUrl: './hero.scss',
})
export class Hero {}
