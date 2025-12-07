PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS nichos (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  tipos_de_produtos TEXT,
  telegram_link TEXT,
  whatsapp_link TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scraper_keywords (
  id TEXT PRIMARY KEY,
  keyword TEXT NOT NULL,
  site_amazon INTEGER DEFAULT 0,
  site_shopee INTEGER DEFAULT 0,
  site_mercado_livre INTEGER DEFAULT 0,
  site_magalu INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  nicho_id TEXT,
  tipo_produto TEXT,
  preco_desconto REAL,
  preco_normal REAL,
  desconto REAL,
  status TEXT,
  titulo TEXT,
  link TEXT,
  data_encontrado DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (nicho_id) REFERENCES nichos(id)
);

CREATE TABLE IF NOT EXISTS stats_cache (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  total_mensagens_hoje INTEGER DEFAULT 0,
  total_grupos INTEGER DEFAULT 0,
  total_usuarios INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO stats_cache (id, total_mensagens_hoje, total_grupos, total_usuarios)
VALUES (1, 0, 0, 0);
