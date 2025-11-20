import { Module, Episode } from './types';

// Função para gerar conteúdo rico e contextual baseado no título
const generateRichContent = (title: string, modId: string): any => {
  const isMindset = title.toLowerCase().includes('mentalidade') || title.toLowerCase().includes('invisível');
  const isTechnical = title.toLowerCase().includes('conta') || title.toLowerCase().includes('config') || title.toLowerCase().includes('tráfego');
  
  let intro = "";
  let explanation = "";
  let steps = [];
  let examples = [];
  let checklist = [];
  let task = "";

  // Lógica de Conteúdo Dinâmico Detalhado
  if (isMindset) {
    intro = `Neste episódio fundamental, vamos desconstruir o conceito de "${title}". A maioria falha não por falta de técnica, mas por falta de alinhamento estratégico e mental.`;
    explanation = `O mercado digital não perdoa amadores. "${title}" não é papo motivacional, é a base da engenharia de vendas. Você precisa entender que vender é transferir confiança. Se você não domina isso internamente, nenhuma ferramenta de tráfego vai salvar sua operação.`;
    steps = [
      "Identifique suas crenças limitantes sobre dinheiro e vendas.",
      "Substitua a mentalidade de 'vendedor chato' pela de 'consultor que resolve problemas'.",
      "Entenda que o 'Não' faz parte da estatística do 'Sim'.",
      "Blinde-se contra opiniões de terceiros que não têm o resultado que você quer."
    ];
    examples = [
      "O iniciante que desiste no primeiro bloqueio do Facebook vs O profissional que já tem contas de contingência.",
      "Pensar que R$ 100,00 num curso é caro, mas R$ 100,00 numa pizza é barato."
    ];
    checklist = [
      "Eliminei distrações do meu ambiente?",
      "Defini minha meta financeira clara?",
      "Entendi que o resultado depende 100% da minha execução?",
      "Estou pronto para falhar e corrigir rápido?"
    ];
    task = "Escreva em um papel 3 motivos pelos quais você VAI dar certo, e 3 coisas que podem te atrapalhar (e como você vai eliminá-las).";
  } else if (isTechnical) {
    intro = `Hora de colocar a mão na massa. O tema "${title}" exige precisão. Um clique errado aqui pode custar dinheiro ou bloquear sua conta.`;
    explanation = `A estrutura técnica é o esqueleto do seu negócio. Sem isso, o músculo (vendas) não se sustenta. Vamos configurar "${title}" seguindo as melhores práticas do mercado atual, focando em segurança e conversão.`;
    steps = [
      "Acesse a plataforma indicada e utilize dados reais (CPF, Endereço).",
      "Faça a verificação de dois fatores (2FA) imediatamente.",
      "Configure os pixels de rastreamento antes de rodar qualquer anúncio.",
      "Teste o fluxo de compra como se você fosse o cliente."
    ];
    examples = [
      "Configuração de Pixel no Facebook Ads.",
      "Validação de domínio na Kiwify/Hotmart.",
      "Esteira de e-mails para recuperação de boleto."
    ];
    checklist = [
      "Conta criada e verificada?",
      "Dados bancários cadastrados?",
      "Link de checkout testado e funcionando?",
      "Pixel disparando evento de 'Initiate Checkout'?"
    ];
    task = "Realize a configuração completa descrita acima e faça uma compra teste (via boleto) para validar o fluxo.";
  } else {
    // General / Strategy
    intro = `Vamos dominar "${title}". Este é um pilar estratégico do método Primeira Venda. Sem dominar isso, você será apenas mais um fazendo barulho na internet.`;
    explanation = `A estratégia por trás de "${title}" baseia-se em entender o comportamento humano. Não vendemos produtos, vendemos transformações. O seu cliente não quer o curso, ele quer o resultado que o curso traz.`;
    steps = [
      "Analise o mercado: Quem já está fazendo isso e como podemos fazer melhor?",
      "Defina sua Big Idea: Qual a promessa única do seu projeto?",
      "Estruture sua oferta: Preço, Garantia e Bônus.",
      "Execute o ciclo PDCA: Planejar, Fazer, Checar, Agir."
    ];
    examples = [
      "Oferta de emagrecimento: Não venda 'dieta', venda 'o corpo do verão sem passar fome'.",
      "Nicho de renda extra: Não venda 'curso de marketing', venda 'liberdade geográfica'."
    ];
    checklist = [
      "Defini meu público-alvo?",
      "A promessa está clara e forte?",
      "Tenho os criativos/textos prontos?",
      "Sei exatamente qual o próximo passo?"
    ];
    task = "Crie um documento no Word/Docs resumindo como você vai aplicar essa estratégia no seu produto nas próximas 24 horas.";
  }

  return { intro, explanation, steps, examples, checklist, task };
};

const rawModules = [
  {
    id: "modulo-1",
    title: "MÓDULO 1 — Fundamentos da Venda Online",
    description: "A base sólida para quem quer começar do zero.",
    episodes: [
      "O que realmente é vender online",
      "A lógica invisível por trás das vendas",
      "Tipos de negócios e qual começar",
      "Mentalidade que impede ou acelera",
      "O kit essencial do iniciante"
    ]
  },
  {
    id: "modulo-2",
    title: "MÓDULO 2 — Estrutura Preparatória",
    description: "Configurando sua máquina de vendas.",
    episodes: [
      "Criando contas da forma certa",
      "Configurações ocultas que iniciantes ignoram",
      "Estrutura mínima profissional",
      "Ambiente pronto para conversão",
      "Entendendo o cliente moderno"
    ]
  },
  {
    id: "modulo-3",
    title: "MÓDULO 3 — Produto e Oferta Imbatível",
    description: "O segredo dos produtos que se vendem sozinhos.",
    episodes: [
      "Como escolher produtos que vendem",
      "Sistema de análise definitiva",
      "Os 7 elementos de uma oferta irresistível",
      "Diferenciação estratégica",
      "Copywriting simples e matador"
    ]
  },
  {
    id: "modulo-4",
    title: "MÓDULO 4 — Conteúdo, Vídeos e Persuasão",
    description: "Atraindo a atenção certa.",
    episodes: [
      "Conteúdo que vende todos os dias",
      "Autoridade em 7 dias",
      "Persuasão invisível",
      "Modelos de roteiros prontos",
      "Vídeos virais sem aparecer"
    ]
  },
  {
    id: "modulo-5",
    title: "MÓDULO 5 — Tráfego e Viralização",
    description: "Trazendo pessoas para sua oferta.",
    episodes: [
      "Tráfego orgânico (TikTok, Instagram, Kwai)",
      "Tráfego pago inicial para iniciantes",
      "IA para acelerar resultados",
      "Multiplicação de conteúdo",
      "Rotina diária para vender"
    ]
  },
  {
    id: "modulo-6",
    title: "MÓDULO 6 — Primeira Venda e Escala",
    description: "Do zero ao primeiro lucro e além.",
    episodes: [
      "Como garantir sua primeira venda",
      "Checklist final",
      "Corrigindo gargalos",
      "Sistema de escala simples",
      "Plano de 30 dias para grandes resultados"
    ]
  }
];

let globalEpCounter = 1;

export const COURSE_DATA: Module[] = rawModules.map((mod) => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  episodes: mod.episodes.map((epTitle) => {
    const epId = `episodio-${globalEpCounter}`;
    const episode: Episode = {
      id: epId,
      globalIndex: globalEpCounter,
      title: epTitle,
      moduleId: mod.id,
      content: generateRichContent(epTitle, mod.id)
    };
    globalEpCounter++;
    return episode;
  })
}));

export const TOTAL_EPISODES = 30;

export const FAQ_DATA = [
  { q: "É para iniciantes?", a: "Sim, absolutamente. Desenhado para quem nunca vendeu nada online." },
  { q: "Preciso aparecer?", a: "Não. O Módulo 4 ensina estratégias 'dark' para vender sem mostrar o rosto." },
  { q: "Funciona sem investir?", a: "Sim. O foco inicial é tráfego orgânico e estratégias de custo zero." },
  { q: "Quanto tempo para ver resultado?", a: "Depende da sua dedicação. Alunos aplicados vendem na primeira semana." },
  { q: "Como recebo o curso?", a: "O acesso é imediato através desta plataforma web premium." },
  { q: "Posso acessar no celular?", a: "Sim, o site é 100% responsivo e otimizado para mobile." },
  { q: "Tem suporte?", a: "Sim, suporte dedicado via comunidade exclusiva." },
  { q: "O curso expira?", a: "Não, o acesso é vitalício." },
  { q: "Quais plataformas posso vender?", a: "Ensinamos Kiwify, Hotmart, Eduzz e Monetizze." },
  { q: "Posso acessar offline?", a: "O curso é online para garantir que o conteúdo esteja sempre atualizado." }
];