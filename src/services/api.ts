import type {
  Nicho,
  ScraperKeyword,
  Product,
  StatsResumo,
  StatsSeries,
  PortalStatsPayload,
  PingResponse
} from '@/types';
import { appConfig } from '@/config';

const N8N_BASE_URL = appConfig.n8nBaseUrl ?? import.meta.env.VITE_N8N_BASE_URL;

const ensureN8nBaseUrl = () => {
  if (!N8N_BASE_URL) {
    throw new Error('URL base do n8n não configurada. Defina VITE_N8N_BASE_URL no .env');
  }
  return N8N_BASE_URL.endsWith('/') ? N8N_BASE_URL.slice(0, -1) : N8N_BASE_URL;
};

const buildN8nUrl = (path: string) => {
  const base = ensureN8nBaseUrl();
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
};

async function fetchFromN8n<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildN8nUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Erro ao acessar n8n em ${path}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Endpoints do n8n (webhooks /webhook/portal/*) expostos por workflows do backend.
 * O backend será finalizado depois, mas o frontend já está pronto para consumir dados reais
 * assim que os webhooks forem publicados no n8n configurado em VITE_N8N_BASE_URL.
 */
export async function pingN8N(): Promise<PingResponse> {
  return fetchFromN8n<PingResponse>('/webhook/portal/ping');
}

export async function getPortalStats(): Promise<PortalStatsPayload> {
  return fetchFromN8n<PortalStatsPayload>('/webhook/portal/stats');
}

export async function getStatsResumo(): Promise<StatsResumo> {
  const data = await getPortalStats();
  return data.resumo;
}

export async function getStatsSeries(): Promise<StatsSeries> {
  const data = await getPortalStats();
  return data.series;
}

export async function getNichos(): Promise<Nicho[]> {
  return fetchFromN8n<Nicho[]>('/webhook/portal/nichos');
}

export async function createNicho(data: Omit<Nicho, 'id'>): Promise<Nicho> {
  return fetchFromN8n<Nicho>('/webhook/portal/nichos', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateNicho(id: string, data: Partial<Nicho>): Promise<Nicho> {
  return fetchFromN8n<Nicho>(`/webhook/portal/nichos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

export async function deleteNicho(id: string): Promise<void> {
  await fetchFromN8n<void>(`/webhook/portal/nichos/${id}`, {
    method: 'DELETE'
  });
}

export async function getScraperKeywords(): Promise<ScraperKeyword[]> {
  return fetchFromN8n<ScraperKeyword[]>('/webhook/portal/keywords');
}

export async function createScraperKeyword(data: Omit<ScraperKeyword, 'id'>): Promise<ScraperKeyword> {
  return fetchFromN8n<ScraperKeyword>('/webhook/portal/keywords', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateScraperKeyword(id: string, data: Partial<ScraperKeyword>): Promise<ScraperKeyword> {
  return fetchFromN8n<ScraperKeyword>(`/webhook/portal/keywords/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

export async function deleteScraperKeyword(id: string): Promise<void> {
  await fetchFromN8n<void>(`/webhook/portal/keywords/${id}`, {
    method: 'DELETE'
  });
}

export async function getRecentProducts(): Promise<Product[]> {
  return fetchFromN8n<Product[]>('/webhook/portal/sheet');
}

export function getSheetPublicUrl(): string {
  return appConfig.sheetPublicUrl ?? 'https://docs.google.com/spreadsheets/d/1example_sheet_id/edit?usp=sharing';
}
