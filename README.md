# IniciAmazon

Sistema de scraping e distribuicao automatica de ofertas de produtos da Amazon, Shopee, Mercado Livre e Magalu para grupos do Telegram e WhatsApp.

## Sobre o Projeto

O IniciAmazon e uma plataforma que automatiza a busca e distribuicao de ofertas de produtos online. O sistema utiliza automacao via n8n para fazer scraping de multiplos sites de e-commerce e envia as melhores ofertas para grupos segmentados por nicho no Telegram e WhatsApp.

## Stack Tecnologica

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Charts:** Recharts
- **Icons:** Lucide React

## Estrutura do Projeto

```
src/
├── components/
│   ├── Layout/
│   │   ├── PublicLayout.tsx      # Layout da pagina publica
│   │   └── PortalLayout.tsx      # Layout do portal administrativo
│   ├── GroupCard.tsx              # Card de grupo na pagina publica
│   ├── StatCard.tsx               # Card de estatistica
│   ├── KeywordTable.tsx           # Tabela de palavras-chave do scraper
│   ├── NichoForm.tsx              # Formulario de nichos
│   └── NichoTable.tsx             # Tabela de nichos
├── contexts/
│   └── AuthContext.tsx            # Context de autenticacao
├── pages/
│   ├── Home.tsx                   # Pagina publica inicial
│   ├── PortalLogin.tsx            # Login do portal
│   ├── PortalDashboard.tsx        # Dashboard do portal
│   ├── PortalScraperConfig.tsx    # Configuracao do scraper
│   ├── PortalSheetView.tsx        # Visualizacao da planilha
│   ├── PortalStats.tsx            # Estatisticas com graficos
│   └── PortalNichos.tsx           # Gerenciamento de nichos
├── router/
│   ├── index.tsx                  # Configuracao de rotas
│   └── ProtectedRoute.tsx         # Componente de rota protegida
├── services/
│   └── api.ts                     # Servicos de API (HTTP + fallback local)
├── types/
│   └── index.ts                   # Definicoes de tipos TypeScript
├── App.tsx                        # Componente principal
├── main.tsx                       # Ponto de entrada
└── index.css                      # Estilos globais
```

## Como Rodar o Projeto

### Requisitos

- Node.js >= 18 (recomendado Node 20 LTS). O Vite 5 depende de recursos de ES Modules como `top-level await` que nao existem em versões mais antigas do Node. Se voce usar **nvm**, basta executar `nvm install` na raiz do projeto (arquivo `.nvmrc`) para alinhar a versao. O `npm install` falhara automaticamente em maquinas com Node mais antigo, exibindo a versao detectada e instrucoes de atualizacao.

### Configuracao (.env)

O projeto traz um arquivo `.env` ja preenchido com valores de exemplo. Ajuste-o antes de publicar para producao:

- `VITE_MODO_PRODUCAO`: defina como `sim` para consumir a API real e sair do modo simulado.
- `VITE_MODO_DEV`: mantenha `sim` enquanto estiver testando localmente com os dados de exemplo.
- `VITE_API_BASE_URL`: URL base da sua API/backend.
- `VITE_N8N_BASE_URL` e `VITE_WEBHOOK_URL`: endpoints do n8n e webhooks usados pelo scraper.
- `VITE_SHEET_PUBLIC_URL`: URL publica da planilha do Google Sheets.
- `VITE_PORTAL_USER` / `VITE_PORTAL_PASSWORD`: credenciais iniciais do portal (frontend). Altere-as imediatamente em producao.
- Variaveis `DB_*`: caminho e credenciais usadas pelos scripts locais de criacao do banco.

### Instalacao

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O projeto estara disponivel em `http://localhost:5173`

### Build de Producao

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

### Banco de dados local

Para criar ou atualizar o banco SQLite usado pelos workflows locais, rode:

```bash
npm run setup:db
```

O caminho do arquivo e definido em `DB_FILE` no `.env` (padrao: `./data/iniciamazon.sqlite`).

## Credenciais de Teste

Para acessar o portal administrativo:

- **Email:** admin@iniciamazon.com
- **Senha:** admin123

## Funcionalidades

### Pagina Publica (/)

- Secao hero explicativa
- Listagem de grupos por nicho
- Links diretos para Telegram e WhatsApp
- Design responsivo e moderno

### Portal Administrativo (/portal)

#### Dashboard
- Cards com estatisticas gerais
- Tabela de produtos recentes
- Acoes rapidas para outras secoes

#### Configuracao do Scraper
- Formulario para adicionar palavras-chave
- Selecao de sites para pesquisa (Amazon, Shopee, Mercado Livre, Magalu)
- Gerenciamento de palavras-chave (ativar/desativar, deletar)

#### Planilha em Tempo Real
- Visualizacao em iframe da planilha do Google Sheets
- Botao para abrir no Google Sheets
- Instrucoes de integracao

#### Estatisticas
- Graficos de mensagens enviadas por dia (linha)
- Graficos de entradas vs saidas de usuarios (barras)
- Cards com resumo de usuarios

#### Nichos & Grupos
- CRUD completo de nichos
- Formulario para criar/editar
- Tabela com listagem
- Configuracao de links do Telegram e WhatsApp

## Integracao com Dados Reais

O frontend passa a consumir sua API real quando `VITE_MODO_PRODUCAO=sim` **e** `VITE_API_BASE_URL` apontar para o backend. Nessa configuracao, as rotas esperadas sao:

- `POST /auth/login` para autenticar (usado em `src/contexts/AuthContext.tsx`). Deve responder com `{ email, name, token }`.
- `GET/POST/PATCH/DELETE /nichos` para gerenciar nichos.
- `GET/POST/PATCH/DELETE /keywords` para palavras-chave do scraper.
- `GET /products` para listar produtos recentes.
- `GET /stats/resumo` e `GET /stats/series` para preencher os graficos do dashboard.

Se a API estiver offline ou voce manter `VITE_MODO_DEV=sim`, o app continua exibindo os dados de exemplo locais como contingencia.

### Planilha em Tempo Real

Defina `VITE_SHEET_PUBLIC_URL` com a URL real do Google Sheets para a iframe de planilha em `src/services/api.ts`.

### Webhooks n8n e disparos

Configure `VITE_N8N_BASE_URL` e `VITE_WEBHOOK_URL` com os caminhos do seu n8n para conectar os fluxos de scraping e distribuicao de mensagens.

## Fluxo de Automacao (n8n)

O fluxo completo de automacao com n8n deve incluir:

1. **Scraper:** Workflow que pesquisa periodicamente nos sites configurados
2. **Filtro:** Identifica produtos com descontos relevantes
3. **Armazenamento:** Salva produtos na planilha do Google Sheets
4. **Distribuicao:** Envia mensagens formatadas para os grupos certos
5. **Estatisticas:** Captura eventos de usuarios e armazena para analise

## Personalizacao

### Cores

As cores principais estao configuradas em `tailwind.config.js`. Para mudar o tema:

```javascript
colors: {
  primary: {
    // Sua paleta de cores
  }
}
```

### Grupos Iniciais

Os grupos sao carregados dinamicamente da API. Para alterar os grupos iniciais mockados, edite o array `nichos` em `src/services/api.ts`.

## Estrutura de Dados

### Nicho
```typescript
interface Nicho {
  id: string;
  titulo: string;
  descricao: string;
  tiposDeProdutos: string;
  telegramLink: string;
  whatsappLink: string;
}
```

### Palavra-chave do Scraper
```typescript
interface ScraperKeyword {
  id: string;
  keyword: string;
  sites: {
    amazon: boolean;
    shopee: boolean;
    mercadoLivre: boolean;
    magalu: boolean;
  };
  active: boolean;
}
```

### Produto
```typescript
interface Product {
  id: string;
  nicho: string;
  tipoProduto: string;
  precoDesconto: number;
  precoNormal: number;
  desconto: number;
  status: 'postado' | 'pendente';
  titulo: string;
  link: string;
  dataEncontrado: string;
}
```

## Arquitetura de Integracao Sugerida

```
┌─────────────────┐
│   React App     │ ← Voce esta aqui
└────────┬────────┘
         │ HTTP
         ↓
┌─────────────────┐
│      n8n        │ ← Orquestrador
│   (Workflows)   │
└────────┬────────┘
         │
    ┌────┴────┬─────────────┬──────────┐
    ↓         ↓             ↓          ↓
┌───────┐ ┌────────┐ ┌──────────┐ ┌────────┐
│Amazon │ │Shopee  │ │Mercado   │ │Magalu  │
│       │ │        │ │Livre     │ │        │
└───────┘ └────────┘ └──────────┘ └────────┘
                     ↓
              ┌──────────────┐
              │Google Sheets │
              └──────────────┘
                     ↓
         ┌───────────┴───────────┐
         ↓                       ↓
   ┌──────────┐          ┌────────────┐
   │ Telegram │          │  WhatsApp  │
   │  Groups  │          │   Groups   │
   └──────────┘          └────────────┘
```

## Melhorias Futuras

- [ ] Sistema de notificacoes em tempo real
- [ ] Dashboard com metricas de conversao
- [ ] Filtros avancados de produtos
- [ ] Historico de ofertas
- [ ] Sistema de tags para produtos
- [ ] Agendamento de postagens
- [ ] Multi-idioma
- [ ] Tema escuro
- [ ] Exportacao de relatorios

## Licenca

Este projeto e de uso livre para fins educacionais e comerciais.