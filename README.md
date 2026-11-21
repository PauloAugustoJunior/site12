# Nexo — site12

Site institucional em português brasileiro para a Nexo, empresa de soluções tecnológicas sob demanda para empresas e profissionais em todo o Brasil. Projeto local, sem backend ou publicação executada.

## Executar

Requisitos preparados: Node 24.22.3, npm 12.0.2, Angular/CLI 22.3.0 e TypeScript 6.0.3. Dependências instaladas por `npm ci` antes da implementação.

```bash
PATH=/home/codex/.local/bin:$PATH npm start
# http://localhost:4212

PATH=/home/codex/.local/bin:$PATH npm run build -- --configuration production
PATH=/home/codex/.local/bin:$PATH npm test -- --watch=false
```

Saída de produção: `dist/site12/browser`. O script `start` fixa a porta 4212. SCSS, Router e as configurações estritas existentes foram preservados. A página principal é carregada de forma lazy; rotas desconhecidas retornam para ela. Nenhuma dependência adicionada.

## Conceito e referência

“Conexões com direção”: consultoria premium com hero tipográfico amplo, quadro de prioridades ilustrativo, espaços generosos e narrativa que parte do negócio antes da tecnologia. Paleta azul-gelo, petróleo e cobalto. Hanken Grotesk variável hospedada em `public/fonts/`, com licença SIL OFL em `public/fonts/OFL.txt`. Símbolo, favicon e diagramas SVG originais; não há imagens estáticas que exijam `NgOptimizedImage`.

A referência [Salomão Santos Consultec](https://www.salomaosantosconsultec.com.br/) foi acessada em 21/11/2026 com ferramenta web e análise dos arquivos HTML/CSS públicos. Observações reais: Poppins e Outfit; fundo #f4f6f8, tinta #0f172a e azul #2f5d78; menu com PT/EN, “Mais” e CTA; hero dividido 55/45; metodologia narrada em quatro atos; âncoras, blocos sticky, avaliações, ferramentas e CTA final. O CSS inclui entradas de hero e barra móvel. O tom consultivo orientou a proposta, mas textos, composição, código e assets não foram copiados. Análise detalhada e tokens estão em `DESIGN.md`.

O launcher de contexto da skill impeccable não executou por permissão do arquivo; o contexto e as orientações foram lidos diretamente. Por escopo, não foram produzidos screenshots nem executada publicação. O coordenador executa o QA de navegador sem screenshots. Não foi alegada aprovação em auditoria AXE; o projeto inclui semântica, contraste, teclado, foco visível, estados ARIA e suporte a movimento reduzido.

## Conteúdo e interações

- Navegação com skip link, menu móvel anunciado por `aria-expanded`/`aria-controls`, fechamento após navegação e Escape com retorno de foco.
- Catálogo expansível de sete frentes: presença digital, software, IA, automação e integrações, analytics, engenharia e ciência de dados e consultoria. Uma seleção pode preencher o briefing.
- Jornada explorável com seis conexões possíveis, sem impor sequência obrigatória.
- Apresentação da Nexo, diferenciais, método, exemplos claramente ilustrativos e FAQ com elementos `details` nativos.
- Gerador local de briefing com validação, tratamento de espaços vazios, cópia com alternativa manual e download de `.txt`. Alterar os dados invalida o documento anterior.

## Configuração de contato

`src/app/data/site.config.ts` centraliza `email`, `whatsapp`, `phone` e `address` como `null`, com `status: 'pending'`. Não há contatos inventados ou links sem destino. A mensagem pública explica que os canais estão em definição.

O briefing **não envia** dados. Não usa `fetch`, armazenamento persistente ou backend; permanece em memória durante a visita, e é apagado ao recarregar. O visitante pode guardar uma cópia e compartilhá-la por um canal oficial quando definido. Para ativar contato real futuramente, preencher a configuração com dados confirmados e implementar os links correspondentes; não basta alterar `status`. O site não define domínio/canonical nem perfis sociais porque esses dados não foram fornecidos.

## Arquivos principais

- `src/app/pages/home.*`: narrativa comercial e integração entre componentes.
- `src/app/components/`: cabeçalho, hero, soluções, jornada, briefing e rodapé.
- `src/app/data/content.ts`: conteúdo tipado, separado da apresentação.
- `src/app/data/site.config.ts`: marca e contatos pendentes.
- `src/styles.scss`: fontes locais, tokens, tipografia, foco e regras globais responsivas.
- `src/index.html` e `public/favicon.svg`: SEO em pt-BR e marca autoral.
- `src/app/app.spec.ts`: testes de navegação, seleção, validação e documento local.

## Validação

Build de produção aprovado sem avisos com os budgets originais. Build final: bundle inicial 246,69 kB (69,04 kB de transferência estimada), home lazy 87,99 kB. Testes finais: 14 aprovados em 1 arquivo, duração de 23,65 s; verificam landmarks e skip link, menu/navegação/Escape/foco, único h1, conteúdo ilustrativo, seleção de solução, acordeão, jornada, configuração pendente, validação, geração, invalidação após edição e cópia automática/manual. Lint não está configurado e não foi alegado.

`node_modules`, `dist`, `.angular/cache`, coverage e temporários já estão excluídos pelo `.gitignore`. As configurações preexistentes e `.github/workflows/pages.yml` foram preservados. Não houve push, deploy ou execução do workflow.

Pendências reais: receber os canais de contato oficiais; executar a inspeção de navegador coordenada. Não há clientes, depoimentos, métricas de negócio ou resultados reais inventados.
