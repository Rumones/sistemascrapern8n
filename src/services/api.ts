import type { Nicho, ScraperKeyword, Product, StatsResumo, StatsSeries } from '@/types';
import { appConfig, useMockData } from '@/config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ensureApiBaseUrl = () => {
  if (!appConfig.apiBaseUrl) {
    throw new Error('API base URL nao configurada nas variaveis de ambiente');
  }
  return appConfig.apiBaseUrl;
};

const buildApiUrl = (path: string) => `${ensureApiBaseUrl()}${path}`;

async function fetchFromApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Erro ao acessar ${path}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function preferApi<T>(apiCall: () => Promise<T>, mockCall: () => Promise<T>): Promise<T> {
  if (useMockData) {
    return mockCall();
  }

  try {
    return await apiCall();
  } catch (error) {
    console.warn('Falha ao consultar API, usando dados locais', error);
    return mockCall();
  }
}

let nichos: Nicho[] = [
  {
    id: 'saude-beleza',
    titulo: 'Saude & Beleza',
    descricao: 'Ofertas focadas em saude, bem-estar e cuidados pessoais',
    tiposDeProdutos: 'whey, creatina, vitaminas, skincare, perfumes, maquiagem',
    telegramLink: 'https://t.me/iniciamazon_saude',
    whatsappLink: 'https://chat.whatsapp.com/iniciamazon_saude'
  },
  {
    id: 'gadgets-tech',
    titulo: 'Gadgets & Tecnologia',
    descricao: 'Ofertas de eletronicos, acessorios e tecnologia',
    tiposDeProdutos: 'fones, carregadores, cabos, mousepads, teclados, webcams',
    telegramLink: 'https://t.me/iniciamazon_tech',
    whatsappLink: 'https://chat.whatsapp.com/iniciamazon_tech'
  },
  {
    id: 'casa-cozinha',
    titulo: 'Casa & Cozinha',
    descricao: 'Ofertas para sua casa, cozinha e organizacao',
    tiposDeProdutos: 'panelas, organizadores, decoracao, utensilios, eletrodomesticos',
    telegramLink: 'https://t.me/iniciamazon_casa',
    whatsappLink: 'https://chat.whatsapp.com/iniciamazon_casa'
  },
  {
    id: 'geral',
    titulo: 'Grupo Geral',
    descricao: 'Todas as ofertas de todos os nichos em um so lugar',
    tiposDeProdutos: 'todos os tipos de produtos e ofertas',
    telegramLink: 'https://t.me/iniciamazon_geral',
    whatsappLink: 'https://chat.whatsapp.com/iniciamazon_geral'
  }
];

let scraperKeywords: ScraperKeyword[] = [
  {
    id: '1',
    keyword: 'whey protein',
    sites: { amazon: true, shopee: true, mercadoLivre: true, magalu: false },
    active: true
  },
  {
    id: '2',
    keyword: 'creatina',
    sites: { amazon: true, shopee: true, mercadoLivre: true, magalu: true },
    active: true
  },
  {
    id: '3',
    keyword: 'fone bluetooth',
    sites: { amazon: true, shopee: true, mercadoLivre: true, magalu: true },
    active: true
  },
  {
    id: '4',
    keyword: 'air fryer',
    sites: { amazon: true, shopee: false, mercadoLivre: true, magalu: true },
    active: true
  },
  {
    id: '5',
    keyword: 'skincare serum',
    sites: { amazon: true, shopee: true, mercadoLivre: false, magalu: false },
    active: false
  }
];

const recentProducts: Product[] = [
  {
    id: 'p1',
    nicho: 'Saude & Beleza',
    tipoProduto: 'Whey Protein',
    precoDesconto: 89.90,
    precoNormal: 149.90,
    desconto: 40,
    status: 'postado',
    titulo: 'Whey Protein Concentrado 900g',
    link: 'https://amazon.com.br/produto1',
    dataEncontrado: '2024-01-15T10:30:00'
  },
  {
    id: 'p2',
    nicho: 'Gadgets & Tecnologia',
    tipoProduto: 'Fone Bluetooth',
    precoDesconto: 129.90,
    precoNormal: 299.90,
    desconto: 57,
    status: 'postado',
    titulo: 'Fone Bluetooth Premium com Cancelamento de Ruido',
    link: 'https://shopee.com.br/produto2',
    dataEncontrado: '2024-01-15T09:15:00'
  },
  {
    id: 'p3',
    nicho: 'Casa & Cozinha',
    tipoProduto: 'Air Fryer',
    precoDesconto: 349.90,
    precoNormal: 599.90,
    desconto: 42,
    status: 'pendente',
    titulo: 'Air Fryer 5L Digital',
    link: 'https://mercadolivre.com.br/produto3',
    dataEncontrado: '2024-01-15T11:45:00'
  },
  {
    id: 'p4',
    nicho: 'Saude & Beleza',
    tipoProduto: 'Creatina',
    precoDesconto: 59.90,
    precoNormal: 89.90,
    desconto: 33,
    status: 'postado',
    titulo: 'Creatina Monohidratada 300g',
    link: 'https://amazon.com.br/produto4',
    dataEncontrado: '2024-01-15T08:20:00'
  },
  {
    id: 'p5',
    nicho: 'Gadgets & Tecnologia',
    tipoProduto: 'Carregador Rapido',
    precoDesconto: 39.90,
    precoNormal: 79.90,
    desconto: 50,
    status: 'pendente',
    titulo: 'Carregador Rapido USB-C 65W',
    link: 'https://shopee.com.br/produto5',
    dataEncontrado: '2024-01-15T12:00:00'
  }
];

export async function getNichos(): Promise<Nicho[]> {
  return preferApi(
    () => fetchFromApi<Nicho[]>('/nichos'),
    async () => {
      await delay(300);
      return [...nichos];
    }
  );
}

export async function createNicho(data: Omit<Nicho, 'id'>): Promise<Nicho> {
  return preferApi(
    () => fetchFromApi<Nicho>('/nichos', { method: 'POST', body: JSON.stringify(data) }),
    async () => {
      await delay(400);
      const newNicho: Nicho = {
        ...data,
        id: `nicho-${Date.now()}`
      };
      nichos.push(newNicho);
      return newNicho;
    }
  );
}

export async function updateNicho(id: string, data: Partial<Nicho>): Promise<Nicho> {
  return preferApi(
    () => fetchFromApi<Nicho>(`/nichos/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    async () => {
      await delay(400);
      const index = nichos.findIndex(n => n.id === id);
      if (index === -1) throw new Error('Nicho nao encontrado');
      nichos[index] = { ...nichos[index], ...data };
      return nichos[index];
    }
  );
}

export async function deleteNicho(id: string): Promise<void> {
  return preferApi(
    () => fetchFromApi<void>(`/nichos/${id}`, { method: 'DELETE' }),
    async () => {
      await delay(300);
      nichos = nichos.filter(n => n.id !== id);
    }
  );
}

export async function getScraperKeywords(): Promise<ScraperKeyword[]> {
  return preferApi(
    () => fetchFromApi<ScraperKeyword[]>('/keywords'),
    async () => {
      await delay(300);
      return [...scraperKeywords];
    }
  );
}

export async function createScraperKeyword(data: Omit<ScraperKeyword, 'id'>): Promise<ScraperKeyword> {
  return preferApi(
    () => fetchFromApi<ScraperKeyword>('/keywords', { method: 'POST', body: JSON.stringify(data) }),
    async () => {
      await delay(400);
      const newKeyword: ScraperKeyword = {
        ...data,
        id: `kw-${Date.now()}`
      };
      scraperKeywords.push(newKeyword);
      return newKeyword;
    }
  );
}

export async function updateScraperKeyword(id: string, data: Partial<ScraperKeyword>): Promise<ScraperKeyword> {
  return preferApi(
    () => fetchFromApi<ScraperKeyword>(`/keywords/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    async () => {
      await delay(400);
      const index = scraperKeywords.findIndex(k => k.id === id);
      if (index === -1) throw new Error('Palavra-chave nao encontrada');
      scraperKeywords[index] = { ...scraperKeywords[index], ...data };
      return scraperKeywords[index];
    }
  );
}

export async function deleteScraperKeyword(id: string): Promise<void> {
  return preferApi(
    () => fetchFromApi<void>(`/keywords/${id}`, { method: 'DELETE' }),
    async () => {
      await delay(300);
      scraperKeywords = scraperKeywords.filter(k => k.id !== id);
    }
  );
}

export async function getRecentProducts(): Promise<Product[]> {
  return preferApi(
    () => fetchFromApi<Product[]>('/products'),
    async () => {
      await delay(300);
      return [...recentProducts];
    }
  );
}

export async function getStatsResumo(): Promise<StatsResumo> {
  return preferApi(
    () => fetchFromApi<StatsResumo>('/stats/resumo'),
    async () => {
      await delay(400);
      return {
        palavrasChavesAtivas: scraperKeywords.filter(k => k.active).length,
        produtosNaFila: recentProducts.filter(p => p.status === 'pendente').length,
        mensagensEnviadasHoje: 127,
        gruposAtivos: nichos.length,
        usuariosNovosHoje: 23,
        usuariosSairamHoje: 5,
        totalMembros: 1847
      };
    }
  );
}

export async function getStatsSeries(): Promise<StatsSeries> {
  return preferApi(
    () => fetchFromApi<StatsSeries>('/stats/series'),
    async () => {
      await delay(400);
      return {
        mensagensPorDia: [
          { data: '2024-01-09', mensagens: 95 },
          { data: '2024-01-10', mensagens: 112 },
          { data: '2024-01-11', mensagens: 88 },
          { data: '2024-01-12', mensagens: 134 },
          { data: '2024-01-13', mensagens: 121 },
          { data: '2024-01-14', mensagens: 98 },
          { data: '2024-01-15', mensagens: 127 }
        ],
        usuariosPorDia: [
          { data: '2024-01-09', entradas: 18, saidas: 4 },
          { data: '2024-01-10', entradas: 25, saidas: 7 },
          { data: '2024-01-11', entradas: 15, saidas: 3 },
          { data: '2024-01-12', entradas: 31, saidas: 9 },
          { data: '2024-01-13', entradas: 22, saidas: 6 },
          { data: '2024-01-14', entradas: 19, saidas: 5 },
          { data: '2024-01-15', entradas: 23, saidas: 5 }
        ]
      };
    }
  );
}

export function getSheetPublicUrl(): string {
  return appConfig.sheetPublicUrl ?? 'https://docs.google.com/spreadsheets/d/1example_sheet_id/edit?usp=sharing';
}
