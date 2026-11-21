import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Header } from './components/header';
import { Services } from './components/services';
import { Journey } from './components/journey';
import { Briefing } from './components/briefing';
import { Home } from './pages/home';
import { SITE_CONFIG } from './data/site.config';

function root<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function fillBriefing(fixture: ComponentFixture<Briefing>): void {
  const fields = [
    ['#business', 'Ateliê de projetos'],
    ['#objective', 'Quero organizar as solicitações e acompanhar o atendimento em uma plataforma.'],
  ];
  for (const [selector, value] of fields) {
    const control = root(fixture).querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);
    if (!control) throw new Error(`Campo ausente: ${selector}`);
    control.value = value;
    control.dispatchEvent(new Event('input', { bubbles: true }));
  }
  const select = root(fixture).querySelector<HTMLSelectElement>('#service');
  if (!select) throw new Error('Seletor ausente');
  select.value = 'software';
  select.dispatchEvent(new Event('change', { bubbles: true }));
  root(fixture).querySelector<HTMLFormElement>('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  fixture.detectChanges();
}

describe('Nexo: estrutura e navegação', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [App, Header, Home], providers: [provideRouter([])] }));

  it('oferece link para pular conteúdo e landmarks de navegação', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(root(fixture).querySelector('.skip-link')?.getAttribute('href')).toBe('#conteudo');
    expect(root(fixture).querySelector('main')?.id).toBe('conteudo');
    expect(root(fixture).querySelector('nav')?.getAttribute('aria-label')).toBe('Navegação principal');
    expect(root(fixture).querySelector('footer')).toBeTruthy();
  });

  it('anuncia abertura e fecha o menu após navegar', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const button = root(fixture).querySelector<HTMLButtonElement>('.menu-toggle');
    button?.click();
    fixture.detectChanges();
    expect(button?.getAttribute('aria-expanded')).toBe('true');
    root(fixture).querySelector<HTMLAnchorElement>('nav a[href="#solucoes"]')?.click();
    fixture.detectChanges();
    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(root(fixture).querySelector('nav')?.classList.contains('open')).toBe(false);
  });

  it('fecha o menu com Escape e devolve foco ao controle', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const button = root(fixture).querySelector<HTMLButtonElement>('.menu-toggle');
    button?.click();
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });

  it('mostra um único h1, sete soluções e exemplos identificados como ilustração', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    expect(root(fixture).querySelectorAll('h1')).toHaveLength(1);
    expect(root(fixture).querySelectorAll('.service-list article')).toHaveLength(7);
    expect(root(fixture).querySelector('.applications')?.textContent).toContain('Exemplos ilustrativos');
    expect(root(fixture).querySelector('.planning-document')?.textContent).toContain('Ilustrativo');
  });

  it('leva a solução escolhida no catálogo para o briefing', async () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    root(fixture).querySelector<HTMLButtonElement>('#service-button-ia')?.click();
    fixture.detectChanges();
    root(fixture).querySelector<HTMLAnchorElement>('#service-panel-ia a')?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(root(fixture).querySelector<HTMLSelectElement>('#service')?.value).toBe('ia');
    const select = root(fixture).querySelector<HTMLSelectElement>('#service');
    if (!select) throw new Error('Seletor ausente');
    select.value = 'software';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    root(fixture).querySelector<HTMLAnchorElement>('#service-panel-ia a')?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(select.value).toBe('ia');
  });
});

describe('Nexo: exploração de soluções', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Services, Journey] }));

  it('abre e fecha detalhes com estado acessível e mantém somente um painel aberto', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    const button = root(fixture).querySelector<HTMLButtonElement>('#service-button-software');
    button?.click();
    fixture.detectChanges();
    expect(button?.getAttribute('aria-expanded')).toBe('true');
    expect(root(fixture).querySelector<HTMLElement>('#service-panel-software')?.hidden).toBe(false);
    expect(root(fixture).querySelector<HTMLElement>('#service-panel-presenca')?.hidden).toBe(true);
    button?.click();
    fixture.detectChanges();
    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(root(fixture).querySelector<HTMLElement>('#service-panel-software')?.hidden).toBe(true);
  });

  it('atualiza a conexão explorada e o botão pressionado', () => {
    const fixture = TestBed.createComponent(Journey);
    fixture.detectChanges();
    const buttons = root(fixture).querySelectorAll<HTMLButtonElement>('.journey-options button');
    buttons[3].click();
    fixture.detectChanges();
    expect(buttons[3].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
    expect(root(fixture).querySelector('.journey-content')?.textContent).toContain('Veja o negócio com mais clareza.');
    expect(root(fixture).querySelectorAll('[aria-pressed="true"]')).toHaveLength(1);
  });
});

describe('Nexo: briefing local', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Briefing] }));
  afterEach(() => { vi.restoreAllMocks(); });

  it('mantém contatos reais pendentes em uma configuração centralizada', () => {
    expect(SITE_CONFIG.contact.status).toBe('pending');
    expect(SITE_CONFIG.contact.email).toBeNull();
    expect(SITE_CONFIG.contact.whatsapp).toBeNull();
  });

  it('não exibe erros iniciais e valida os campos obrigatórios ao gerar', () => {
    const fixture = TestBed.createComponent(Briefing);
    fixture.detectChanges();
    expect(root(fixture).querySelector('[aria-invalid="true"]')).toBeNull();
    root(fixture).querySelector<HTMLFormElement>('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
    expect(root(fixture).querySelectorAll('[aria-invalid="true"]')).toHaveLength(3);
    expect(root(fixture).querySelector('#business-error')?.textContent).toContain('pelo menos 2 caracteres');
    expect(root(fixture).querySelector('[role="status"]')?.textContent).toContain('Revise os campos');
    expect(root(fixture).querySelector('#briefing-result')).toBeNull();
  });

  it('rejeita conteúdo formado por espaços', () => {
    const fixture = TestBed.createComponent(Briefing);
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({ business: '   ', service: 'software', objective: '                         ', timeframe: 'A definir em conjunto' });
    fixture.componentInstance.generate();
    fixture.detectChanges();
    expect(root(fixture).querySelectorAll('[aria-invalid="true"]')).toHaveLength(2);
    expect(root(fixture).querySelector('#briefing-result')).toBeNull();
  });

  it('gera um documento útil e informa que nenhum envio ocorreu', () => {
    const fixture = TestBed.createComponent(Briefing);
    fixture.detectChanges();
    fillBriefing(fixture);
    const result = root(fixture).querySelector<HTMLTextAreaElement>('#briefing-result');
    expect(result?.value).toContain('Ateliê de projetos');
    expect(result?.value).toContain('Software sob medida');
    expect(result?.value).toContain('não foi enviado');
    expect(root(fixture).querySelector('[role="status"]')?.textContent).toContain('Ele não foi enviado');
  });

  it('invalida o documento gerado quando a necessidade é editada', () => {
    const fixture = TestBed.createComponent(Briefing);
    fixture.detectChanges();
    fillBriefing(fixture);
    const objective = root(fixture).querySelector<HTMLTextAreaElement>('#objective');
    if (!objective) throw new Error('Campo ausente');
    objective.value = 'Agora preciso integrar um aplicativo com o meu sistema atual.';
    objective.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(root(fixture).querySelector('#briefing-result')).toBeNull();
    expect(fixture.componentInstance.generated()).toBe('');
  });

  it('copia o briefing quando o recurso está disponível', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    try {
      const fixture = TestBed.createComponent(Briefing);
      fixture.detectChanges();
      fillBriefing(fixture);
      await fixture.componentInstance.copy();
      expect(writeText).toHaveBeenCalledWith(expect.stringContaining('BRIEFING DE PROJETO — NEXO'));
      expect(fixture.componentInstance.feedback()).toContain('Briefing copiado');
    } finally {
      if (original) Object.defineProperty(navigator, 'clipboard', original);
      else Reflect.deleteProperty(navigator, 'clipboard');
    }
  });

  it('oferece seleção manual quando a cópia automática falha', async () => {
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    try {
      const fixture = TestBed.createComponent(Briefing);
      fixture.detectChanges();
      fillBriefing(fixture);
      await fixture.componentInstance.copy();
      const result = root(fixture).querySelector<HTMLTextAreaElement>('#briefing-result');
      expect(result?.selectionStart).toBe(0);
      expect(result?.selectionEnd).toBe(result?.value.length);
      expect(fixture.componentInstance.feedback()).toContain('use o comando de copiar');
    } finally {
      if (original) Object.defineProperty(navigator, 'clipboard', original);
      else Reflect.deleteProperty(navigator, 'clipboard');
    }
  });
});
