import { Module, Episode } from './types';

// Banco de dados dos resumos fornecidos
const EPISODE_SUMMARIES = [
  // MÓDULO 1
  [
    "Vender online não é simplesmente postar um produto e esperar que alguém compre. É entender um processo composto por percepção, atenção, desejo e confiança. Nesta aula, o aluno aprende que venda online é uma troca baseada em valor, e que as pessoas compram porque acreditam que aquilo resolverá um problema, aliviará uma dor, dará status ou facilitará a vida delas. O aluno descobre que a internet não é um “atalho fácil”, mas sim um ambiente onde quem entende psicologia, comunicação e experiência do cliente vence. A aula explica como funciona o fluxo completo: chamar atenção, gerar curiosidade, apresentar o valor, provar que funciona, remover objeções e fazer a pessoa sentir que precisa daquilo agora. A venda é apresentada como consequência natural de uma estrutura bem montada — e não como sorte ou improviso.",
    "A lógica que faz alguém comprar não aparece na superfície. O comprador se decide por gatilhos mentais que ele mesmo nem percebe. Nesta aula, o aluno entende a verdadeira anatomia de uma decisão: medo de perder, desejo de ganhar, urgência, identificação, prova social e segurança. É explicado como o cérebro analisa riscos antes de aceitar uma oferta e como o vendedor inteligente reduz esses riscos com clareza e simplicidade. O episódio mostra que quanto mais fácil o comprador entender “por que deveria comprar”, maior a taxa de conversão. Essa lógica invisível é o motor das grandes vendas, e quem domina isso praticamente controla o comportamento do cliente.",
    "Existem dezenas de modelos possíveis: PLR, afiliado, loja virtual, dropshipping, páginas virais, conteúdo de autoridade, tráfego local, serviços digitais, e muito mais. A aula explica cada um de forma clara, com vantagens, desvantagens, nível de dificuldade e o que faz cada tipo funcionar. O aluno aprende o que é necessário para começar em cada modelo e entende que não existe “melhor negócio”, existe o melhor para o momento e recursos da pessoa. No final da aula, o aluno é guiado a identificar o modelo ideal para seu nível atual, sem queimar etapas ou cair em ilusões que atrasam o processo.",
    "A mente é metade do jogo. Nesta aula, o aluno entende por que muitos fracassam antes mesmo de começar: procrastinação, medo de gravar vídeos, vergonha de vender, perfeccionismo, excesso de comparação com outras pessoas, e principalmente, expectativa de resultado rápido demais. A aula ensina como assumir uma postura profissional, entender que vender é ajudar, e que ninguém começa perfeito. O aluno descobre que consistência vence intensidade e que o jogo online é de repetição: testar, ajustar e evoluir. Essa mentalidade reduz ansiedade, aumenta clareza e acelera os primeiros resultados.",
    "Antes de vender, o aluno precisa montar uma base mínima: e-mail organizado, redes sociais configuradas, local seguro para salvar arquivos, ferramentas básicas de design e edição, gerenciador de senhas e domínio/landing page se necessário. A aula explica exatamente o que é essencial e o que é totalmente dispensável no início. Isso evita que o aluno gaste dinheiro ou tempo com coisas que não trazem retorno imediato. Ao final, ele entende quais ferramentas realmente influenciam no resultado e sai com uma estrutura mínima funcional para seguir para os próximos módulos."
  ],
  // MÓDULO 2
  [
    "Criar contas corretamente é o primeiro passo para evitar bloqueios, travamentos ou limitações nas plataformas. Nesta aula, o aluno aprende a configurar TikTok, Instagram, Kwai, e-mails e contas de anúncios com segurança, padrões profissionais e boas práticas. Ele entende por que muitas contas são banidas no início e como seguir um padrão limpo desde o começo. A aula também mostra como separar contas pessoais das profissionais, como criar uma identidade digital sólida e como manter tudo sincronizado e organizado. Essa preparação evita problemas que poderiam prejudicar o crescimento futuro.",
    "Muita gente tem baixo alcance por falta de pequenas configurações. Nesta aula, são reveladas as opções escondidas que influenciam no algoritmo, engajamento e autoridade. Desde otimização de perfil até ajustes em privacidade, acessibilidade, preferências de conteúdo e até formatos de postagem. O aluno entende como deixar suas contas mais “favoráveis” para viralizar e alcançar pessoas certas. Tudo é explicado de forma simples, mostrando o impacto real que pequenos detalhes têm nos resultados.",
    "Aqui o aluno aprende a montar sua identidade completa: foto profissional, biografia estratégica, link organizado, estrutura visual, mensagens automáticas, layout de destaques e coerência entre as redes sociais. A aula mostra como criar aparência de profissional mesmo sendo iniciante. É ensinado que autoridade começa pelo visual — e que um perfil bem montado aumenta a confiança antes mesmo do cliente ver o produto. O aluno termina a aula com um perfil pronto para vender, gerar atenção e transmitir seriedade.",
    "O ambiente de conversão é o conjunto formado por perfil, páginas, mensagens, atendimento e até a forma como o conteúdo é apresentado. Nesta aula, o aluno entende que conversão não é sorte; é ambiente. Ele aprende a reduzir atritos, deixar o processo de compra simples, rápido e confortável. Também aprende como evitar distrações e manter o cliente focado na oferta. Tudo é preparado para que quando a atenção chegar, a venda aconteça com facilidade.",
    "O cliente de hoje não compra igual ao cliente de 10 anos atrás. Ele pesquisa, compara, lê comentários, assiste vídeos, analisa confiança e preço. Nesta aula, o aluno aprende as novas regras do consumidor moderno: velocidade, clareza, conexão, prova, transparência e propósito. A pessoa só compra quando sente que aquilo faz sentido para sua vida. A aula revela como falar com esse cliente, como pensar como ele e como adaptar qualquer produto para atender às necessidades atuais do público digital."
  ],
  // MÓDULO 3
  [
    "Muitas pessoas não vendem porque escolhem produtos ruins. Nesta aula, o aluno aprende como identificar produtos com demanda real, urgência emocional e grande procura. São apresentados critérios como tamanho do problema que o produto resolve, público alvo acessível, facilidade de gravação de vídeos e se o produto permite criar conteúdos infinitos. O aluno sai sabendo exatamente como evitar produtos saturados e como encontrar oportunidades escondidas.",
    "Aqui é ensinado um método seguro para avaliar qualquer produto antes de divulgar. O aluno aprende a analisar concorrência, preço, provas, qualidade, página de vendas, comentários e potencial de viralização. O sistema reduz erros e aumenta as chances de começar com um produto vencedor. A aula também ensina como comparar dois produtos e escolher o que tem maior probabilidade de gerar resultados rápidos e consistentes.",
    "Uma oferta irresistível vende mesmo quando o público não está procurando ativamente. Nesta aula, o aluno aprende os 7 pilares que transformam um simples produto em algo irresistível: promessa clara, valor percebido, diferenciais, bônus, garantia, urgência e prova. É explicado como esses elementos trabalham juntos para tirar o cliente da indecisão e levá-lo para a compra. O aluno termina a aula sabendo construir ofertas extremamente fortes.",
    "Aqui o aluno aprende como se destacar mesmo quando muitos vendem o mesmo produto. Ele descobre como criar ângulos únicos, histórias envolventes, argumentos novos e posicionamento diferenciado. É ensinado a fugir do comum e a transformar um produto simples em algo com narrativa própria. O aluno aprende que diferenciação não é inventar coisas, mas apresentar o mesmo produto de uma forma que ninguém está fazendo.",
    "Nesta aula, o aluno aprende a escrever mensagens, legendas e chamadas que fazem a pessoa parar, prestar atenção e querer saber mais. O foco é ensinar copywriting de uma forma simples, direta e prática: frases curtas, verdades fortes, promessas claras e quebras de padrão. O aluno entende como criar textos que convertem sem parecer forçados. Ele aprende frases que ativam emoção, curiosidade e desejo com naturalidade."
  ],
  // MÓDULO 4
  [
    "Nesta aula, o aluno aprende a transformar conteúdos simples em máquinas de vendas diárias. Ele descobre como criar vídeos que entregam valor, despertam interesse e ao mesmo tempo plantam desejo pela compra. É explicado como equilibrar entretenimento com informação e como transformar cada vídeo em um vendedor funcionando 24h por dia. O aluno passa a entender que não precisa postar muito; precisa postar certo.",
    "Autoridade não exige anos — exige estratégia. Nesta aula, o aluno aprende como construir credibilidade rapidamente usando percepção, consistência e clareza. A pessoa descobre como usar depoimentos, bastidores, explicações rápidas, provas sociais e até modelos visuais para parecer especialista mesmo sendo iniciante. A autoridade acelera vendas e aumenta confiança instantaneamente.",
    "A persuasão mais poderosa é a que não parece persuasão. Nesta aula, o aluno aprende técnicas sutis que fazem o cliente se convencer sozinho: direcionamento, repetição estratégica, intenção escondida, naturalidade e gatilhos emocionais leves. Ele descobre como conduzir o espectador até o ponto da compra sem pressão, sem apelo e sem parecer vendedor. Quando usada corretamente, essa técnica duplica a conversão.",
    "Aqui o aluno recebe estruturas reais utilizadas pelos maiores criadores. Ele aprende como montar aberturas fortes, como prender atenção nos primeiros segundos e como entregar uma mensagem convincente. A aula mostra como adaptar esses roteiros para qualquer produto, estilo ou plataforma. Com isso, fica impossível travar ou ficar sem ideias.",
    "Nem todo mundo quer mostrar o rosto — e tudo bem. Nesta aula, o aluno aprende como criar vídeos virais usando imagens, textos, IA, narração e edições simples. Ele descobre como usar formatos que o algoritmo ama e como transformar qualquer vídeo em algo capaz de alcançar milhares de pessoas. É perfeito para quem é tímido ou não quer se expor."
  ],
  // MÓDULO 5
  [
    "O aluno aprende como funciona cada plataforma, o que o algoritmo prioriza, quais tipos de vídeos viralizam e como construir audiências rapidamente sem gastar nada. É ensinado o horário ideal, a frequência correta e como testar conteúdos de forma inteligente para encontrar o que funciona. O aluno descobre como transformar visualizações em cliques e cliques em vendas.",
    "O tráfego pago é mostrado de um jeito simples e seguro. O aluno aprende como fazer anúncios de baixo orçamento, como escolher o público certo, como analisar métricas iniciais e como evitar os erros que fazem as pessoas perderem dinheiro. A aula mostra como transformar anúncios básicos em vendas diárias sem precisar de técnicas avançadas.",
    "A inteligência artificial permite produzir mais rápido, com mais qualidade e gastando menos energia. Nesta aula, o aluno aprende a utilizar IA para criar roteiros, textos, ideias, capas, anúncios, vídeos e até páginas. A IA se torna uma aliada para multiplicar resultados e aumentar produtividade sem exigir experiência.",
    "Aqui o aluno aprende como transformar 1 vídeo em 10, criando recortes, adaptações, novas versões, mudanças de ângulo e repostagens estratégicas. A aula ensina como dominar o volume inteligente — postar bastante sem perder qualidade. Isso garante mais alcance, mais seguidores e mais chances de viralizar.",
    "A venda diária é consequência de hábitos diários. Nesta aula, o aluno aprende uma rotina simples para manter consistência: criação de conteúdo, análise de dados, estudo rápido, atualização do perfil e otimização da oferta. É mostrado como trabalhar menos, porém com foco, disciplina e repetição estratégica."
  ],
  // MÓDULO 6
  [
    "A primeira venda é a mais difícil — mas também a mais transformadora. Nesta aula, o aluno aprende um passo a passo para gerar o primeiro resultado rapidamente: escolha do ângulo certo, criação dos primeiros vídeos, contato direto com a audiência e ajustes imediatos de posicionamento. É ensinado como criar micro-ofertas e pequenas campanhas para acelerar o processo. O aluno sai entendendo exatamente o que fazer para quebrar essa barreira inicial.",
    "Antes de escalar, tudo precisa estar alinhado. O checklist final reúne os pontos essenciais: perfil, conteúdo, oferta, link, mensagens, prova social, modelo de vídeos e fluxo de vendas. O aluno aprende como revisar tudo com olhos profissionais, identificando falhas que prejudicam resultados. Após essa análise, a estrutura fica sólida e pronta para alto desempenho.",
    "Gargalo é o ponto onde a venda trava. Pode ser na oferta, no vídeo, no link, no atendimento ou até no posicionamento. Nesta aula, o aluno aprende a diagnosticar exatamente onde está o problema. Cada gargalo é explicado com exemplos e correções práticas. A aula ensina que quando um gargalo é corrigido, o crescimento acontece quase automaticamente.",
    "Escalar é vender mais sem trabalhar mais. Aqui o aluno aprende como aumentar audiência, potencializar conteúdo, multiplicar canais de tráfego e otimizar a oferta. A aula mostra sistemas fáceis de aplicar, para que o aluno cresça de forma sustentável. O foco é manter qualidade, aumentar impacto e transformar um negócio pequeno em um negócio estável.",
    "O módulo final entrega um plano direto, claro e prático para 30 dias: o que fazer na primeira semana, como ajustar na segunda, como crescer na terceira e como estabilizar na quarta. O aluno termina o curso com um mapa completo para vender diariamente. Esse plano tira a pessoa do improviso e coloca ela em um ritmo de crescimento constante."
  ]
];

// Função para gerar conteúdo rico e contextual baseado no título
const generateRichContent = (title: string, modId: string, specificSummary: string): any => {
  const isMindset = title.toLowerCase().includes('mentalidade') || title.toLowerCase().includes('invisível');
  const isTechnical = title.toLowerCase().includes('conta') || title.toLowerCase().includes('config') || title.toLowerCase().includes('tráfego');
  
  let steps = [];
  let examples = [];
  let checklist = [];
  let task = "";

  // Lógica de Conteúdo Dinâmico Detalhado (Mantendo para os Steps/Checklist)
  if (isMindset) {
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

  return { summary: specificSummary, steps, examples, checklist, task };
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

export const COURSE_DATA: Module[] = rawModules.map((mod, modIndex) => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  episodes: mod.episodes.map((epTitle, epIndex) => {
    const epId = `episodio-${globalEpCounter}`;
    // Safety check to get summary or fallback
    const specificSummary = EPISODE_SUMMARIES[modIndex]?.[epIndex] || "Conteúdo sendo carregado...";
    
    const episode: Episode = {
      id: epId,
      globalIndex: globalEpCounter,
      title: epTitle,
      moduleId: mod.id,
      content: generateRichContent(epTitle, mod.id, specificSummary)
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