export interface User {
  email: string;
  name: string;
  token?: string;
}

export interface Nicho {
  id: string;
  titulo: string;
  descricao: string;
  tiposDeProdutos: string;
  telegramLink: string;
  whatsappLink: string;
}

export interface ScraperKeyword {
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

export interface Product {
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

export interface StatsResumo {
  palavrasChavesAtivas: number;
  produtosNaFila: number;
  mensagensEnviadasHoje: number;
  gruposAtivos: number;
  usuariosNovosHoje: number;
  usuariosSairamHoje: number;
  totalMembros: number;
}

export interface StatsSeries {
  mensagensPorDia: Array<{
    data: string;
    mensagens: number;
  }>;
  usuariosPorDia: Array<{
    data: string;
    entradas: number;
    saidas: number;
  }>;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
