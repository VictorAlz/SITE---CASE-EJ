import aiImage from "@/assets/cases/case-chatbot.jpg";
import codeImage from "@/assets/cases/case-dados.jpg";
import hardwareImage from "@/assets/cases/case-containers.jpg";

export const blogPosts = [
  {
    slug: "google-torchtpu-pytorch",
    title: "Google abre o TorchTPU e amplia as opções para desenvolver IA",
    category: "Inteligência artificial",
    date: "2026-10-20",
    image: aiImage,
    imageAlt: "Imagem ilustrativa de tecnologia e inteligência artificial",
    excerpt: "A nova integração aproxima o PyTorch dos chips TPU do Google e amplia o debate sobre hardware para IA.",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com/2026/10/20/google-has-joined-amazon-in-attacking-nvidias-stronghold-with-ai-app-developers/",
    paragraphs: [
      "O Google disponibilizou o TorchTPU como projeto de código aberto. Segundo reportagem da TechCrunch publicada em 20 de outubro, a integração permite executar aplicações PyTorch nos chips Tensor Processing Unit (TPU) da empresa.",
      "A proposta é facilitar a migração de aplicações existentes para esse hardware, reduzindo a necessidade de reescrever o código. A iniciativa acompanha movimentos de outros fornecedores para ampliar as alternativas de infraestrutura para inteligência artificial.",
    ],
    studentTakeaway: "Para quem estuda IA, é uma oportunidade de acompanhar como uma mesma ferramenta de programação se conecta a diferentes tipos de aceleradores. Em projetos acadêmicos, vale comparar compatibilidade, disponibilidade e custos antes de escolher a infraestrutura.",
  },
  {
    slug: "amazon-torchneuron-trainium",
    title: "Amazon anuncia TorchNeuron para levar PyTorch aos chips Trainium",
    category: "Código aberto",
    date: "2026-10-19",
    image: hardwareImage,
    imageAlt: "Imagem ilustrativa de operações e infraestrutura tecnológica",
    excerpt: "A integração busca executar código de IA existente em hardware da AWS com menos mudanças.",
    source: "Amazon",
    sourceUrl: "https://www.aboutamazon.com/news/innovation-at-amazon/torchneuron-pytorch-aws-trainium-chips-ai",
    paragraphs: [
      "A Amazon anunciou o TorchNeuron em 19 de outubro. Segundo a empresa, a ferramenta permite executar código PyTorch nos chips AWS Trainium com uma mudança de configuração, sem reescrever a aplicação.",
      "O anúncio prevê disponibilização sob licença de código aberto na PyTorch Conference de 20 de outubro. A iniciativa procura reduzir a dificuldade de adotar novos chips em projetos de treinamento e execução de modelos de IA.",
    ],
    studentTakeaway: "Estudantes podem acompanhar o projeto e aprender sobre portabilidade de modelos e execução em aceleradores. Acesso ao código aberto não significa infraestrutura gratuita: confira os custos da nuvem antes de experimentar.",
  },
  {
    slug: "python-315-novidades",
    title: "Python 3.15 chega com novas ferramentas e melhorias de desempenho",
    category: "Desenvolvimento",
    date: "2026-10-09",
    image: codeImage,
    imageAlt: "Imagem ilustrativa de análise de dados e programação",
    excerpt: "Importações sob demanda e UTF-8 por padrão estão entre as novidades da versão estável da linguagem.",
    source: "Python Insider",
    sourceUrl: "https://blog.python.org/2026/10/python-3150-final-is-here/",
    paragraphs: [
      "Python 3.15 foi lançado em 9 de outubro de 2026. O anúncio oficial destaca novidades como importações explicitamente adiadas, os tipos internos sentinel e frozendict e o uso de UTF-8 como codificação padrão.",
      "A versão também traz melhorias no compilador JIT experimental, nas mensagens de erro e nas ferramentas de análise de desempenho. Os ganhos variam conforme o sistema e o tipo de aplicação; os números do anúncio não devem ser tratados como garantia para todo projeto.",
    ],
    studentTakeaway: "Antes de atualizar um trabalho ou projeto de pesquisa, confira se as bibliotecas utilizadas suportam a nova versão. Testar em um ambiente isolado é uma forma de explorar as novidades sem comprometer o projeto atual.",
  },
];

export const formatPostDate = (date: string) => new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
}).format(new Date(`${date}T12:00:00Z`));