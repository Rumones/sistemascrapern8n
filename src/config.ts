const normalizeUrl = (value?: string) => {
  if (!value) return undefined;
  return value.endsWith('/') ? value.slice(0, -1) : value;
};

const flagToBool = (value?: string) => {
  if (!value) return false;
  return ['sim', 'true', '1', 'yes'].includes(value.trim().toLowerCase());
};

export const appConfig = {
  modoProducao: flagToBool(import.meta.env.VITE_MODO_PRODUCAO),
  modoDev: flagToBool(import.meta.env.VITE_MODO_DEV ?? 'sim'),
  apiBaseUrl: normalizeUrl(import.meta.env.VITE_API_BASE_URL),
  n8nBaseUrl: normalizeUrl(import.meta.env.VITE_N8N_BASE_URL),
  webhookUrl: normalizeUrl(import.meta.env.VITE_WEBHOOK_URL),
  sheetPublicUrl: import.meta.env.VITE_SHEET_PUBLIC_URL,
  portalUser: import.meta.env.VITE_PORTAL_USER ?? 'admin@iniciamazon.com',
  portalPassword: import.meta.env.VITE_PORTAL_PASSWORD ?? 'admin123'
};

export const useMockData = !appConfig.modoProducao || !appConfig.apiBaseUrl;
