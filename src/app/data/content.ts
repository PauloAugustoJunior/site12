export type ServiceId = 'presenca' | 'software' | 'ia' | 'automacao' | 'analytics' | 'engenharia' | 'consultoria';
export interface ServiceSelection { readonly id: ServiceId; }
export interface Service {
  readonly id: ServiceId;
  readonly title: string;
  readonly summary: string;
  readonly detail: string;
  readonly deliverables: readonly string[];
}
export const SERVICES: readonly Service[] = [
  { id: 'presenca', title: 'Presença digital', summary: 'Sua empresa bem apresentada. Seu cliente mais perto.', detail: 'Do primeiro contato à compra, desenhamos experiências digitais que explicam sua proposta e facilitam o próximo passo do cliente.', deliverables: ['Sites e landing pages', 'Portais e e-commerce', 'Aplicações web'] },
  { id: 'software', title: 'Software sob medida', summary: 'Uma solução que acompanha a lógica do seu negócio.', detail: 'Criamos e modernizamos sistemas para organizar a operação, conectar equipes e apoiar novas formas de trabalhar.', deliverables: ['Sistemas e plataformas', 'Aplicativos mobile', 'Modernização de software'] },
  { id: 'ia', title: 'Inteligência artificial', summary: 'Inteligência aplicada a tarefas que fazem sentido.', detail: 'Avaliamos onde a IA pode ajudar e construímos soluções com contexto, critérios de uso e supervisão humana adequados ao seu processo.', deliverables: ['Agentes e assistentes', 'Chatbots de atendimento', 'IA aplicada a processos'] },
  { id: 'automacao', title: 'Automações e integrações', summary: 'Menos tarefas repetidas. Mais continuidade na operação.', detail: 'Conectamos ferramentas e automatizamos fluxos para reduzir retrabalho, manter informações alinhadas e dar ritmo à rotina.', deliverables: ['Integração via APIs', 'Fluxos com WhatsApp', 'Conexão entre ferramentas empresariais'] },
  { id: 'analytics', title: 'Dados e analytics', summary: 'Informações claras para decisões mais conscientes.', detail: 'Transformamos dados dispersos em uma visão organizada do negócio, com indicadores relevantes e leitura acessível à sua equipe.', deliverables: ['Dashboards e BI', 'Análise de dados', 'Indicadores de gestão'] },
  { id: 'engenharia', title: 'Engenharia e ciência de dados', summary: 'Uma base consistente para enxergar além.', detail: 'Estruturamos a coleta e a preparação de dados e exploramos modelos analíticos de acordo com a qualidade das fontes e a necessidade do projeto.', deliverables: ['Pipelines e ETL/ELT', 'Modelagem e integração de fontes', 'Predição e machine learning'] },
  { id: 'consultoria', title: 'Consultoria em tecnologia', summary: 'Antes de investir, entenda o melhor caminho.', detail: 'Partimos do seu cenário para avaliar prioridades, desenhar arquitetura e organizar um plano de transformação digital viável.', deliverables: ['Diagnóstico tecnológico', 'Arquitetura de soluções', 'Plano de transformação digital'] },
];

export const JOURNEY = [
  { title: 'Presença', heading: 'Comece por ser encontrado.', description: 'Uma presença digital clara pode ser o primeiro passo para apresentar seu trabalho e receber novas oportunidades.', connection: 'Um formulário do site pode alimentar um fluxo de atendimento.', tags: ['Sites', 'Landing pages', 'E-commerce'] },
  { title: 'Automação', heading: 'Dê espaço ao que exige atenção.', description: 'Identifique atividades repetitivas e transforme-as em fluxos organizados, com regras e pontos de conferência.', connection: 'Uma nova solicitação pode criar tarefas e avisar a equipe responsável.', tags: ['Processos', 'Rotinas', 'Notificações'] },
  { title: 'Integrações', heading: 'Faça as ferramentas conversarem.', description: 'Conecte informações que hoje ficam em sistemas separados e reduza a necessidade de copiar dados de um lugar para outro.', connection: 'Pedidos de uma loja podem ser sincronizados com a operação.', tags: ['APIs', 'WhatsApp', 'Ferramentas'] },
  { title: 'Dados e BI', heading: 'Veja o negócio com mais clareza.', description: 'Reúna fontes e acompanhe indicadores para entender a operação e apoiar decisões com informação organizada.', connection: 'Os dados dos sistemas podem se tornar um painel de acompanhamento.', tags: ['Indicadores', 'Dashboards', 'Pipelines'] },
  { title: 'IA aplicada', heading: 'Transforme contexto em assistência.', description: 'Use bases e processos bem definidos para orientar assistentes, automatizar análises e apoiar sua equipe.', connection: 'Uma base de conhecimento pode dar contexto a um assistente interno.', tags: ['Assistentes', 'Agentes', 'Machine learning'] },
  { title: 'Sistemas', heading: 'Conecte a experiência inteira.', description: 'Quando necessário, reúna processos, integrações e dados em uma plataforma pensada para seu negócio.', connection: 'Um sistema sob medida pode integrar os diferentes pontos da jornada.', tags: ['Plataformas', 'Web', 'Mobile'] },
] as const;

export const PROCESS = [
  { title: 'Entender o contexto', text: 'Conversamos sobre a rotina, os objetivos e o que precisa mudar. O ponto de partida é o seu negócio.' },
  { title: 'Desenhar o caminho', text: 'Organizamos prioridades, escopo, entregas e critérios de aceite. A proposta de orçamento parte desse entendimento.' },
  { title: 'Construir com proximidade', text: 'Desenvolvemos por etapas e validamos as decisões com você, mantendo o avanço do projeto visível.' },
  { title: 'Preparar a continuidade', text: 'Validamos a entrega e orientamos o uso. Suporte e evolução são definidos conforme a necessidade e o escopo contratado.' },
] as const;

export const FAQ = [
  { question: 'Preciso contratar todas as soluções?', answer: 'Não. Cada serviço pode ser contratado separadamente. Se fizer sentido para o seu negócio, podemos conectar novas soluções ao longo do tempo, com escopo próprio para cada etapa.' },
  { question: 'A Nexo atende empresas de qual região ou segmento?', answer: 'Atendemos remotamente pequenas e médias empresas e profissionais liberais em todo o Brasil. O projeto é desenhado para a necessidade de cada negócio, sem um segmento exclusivo.' },
  { question: 'Ainda não sei qual tecnologia preciso. Por onde começo?', answer: 'Comece pelo problema: o que toma tempo, causa retrabalho ou dificulta suas decisões? A consultoria ajuda a traduzir essa necessidade em um caminho técnico e um escopo possível.' },
  { question: 'Como são definidos o prazo e o investimento?', answer: 'Depois de entender objetivos, requisitos, integrações e complexidade, estruturamos uma proposta com escopo, entregas, condições e prazo. Não há um valor único para projetos sob demanda.' },
] as const;
