import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PortalLayout } from '@/components/Layout/PortalLayout';
import { StatCard } from '@/components/StatCard';
import { Search, Package, Send, FolderOpen, ArrowRight } from 'lucide-react';
import { getPortalStats, getRecentProducts } from '@/services/api';
import type { StatsResumo, Product } from '@/types';

export function PortalDashboard() {
  const [stats, setStats] = useState<StatsResumo | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [portalStats, productsData] = await Promise.all([
        getPortalStats(),
        getRecentProducts()
      ]);
      setStats(portalStats.resumo);
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Visao geral do sistema de scraping e grupos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Palavras-chave Ativas"
            value={stats?.palavrasChavesAtivas || 0}
            icon={Search}
            color="blue"
          />
          <StatCard
            title="Produtos na Fila"
            value={stats?.produtosNaFila || 0}
            icon={Package}
            color="orange"
          />
          <StatCard
            title="Mensagens Hoje"
            value={stats?.mensagensEnviadasHoje || 0}
            icon={Send}
            color="green"
          />
          <StatCard
            title="Grupos Ativos"
            value={stats?.gruposAtivos || 0}
            icon={FolderOpen}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Acoes Rapidas</h2>
            </div>
            <div className="space-y-3">
              <Link
                to="/portal/scraper"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Configurar Scraper</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </Link>
              <Link
                to="/portal/sheet"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Ver Planilha</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </Link>
              <Link
                to="/portal/nichos"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Gerenciar Nichos</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estatisticas de Usuarios</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Novos Hoje</span>
                <span className="text-2xl font-bold text-green-600">
                  +{stats?.usuariosNovosHoje || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Sairam Hoje</span>
                <span className="text-2xl font-bold text-red-600">
                  -{stats?.usuariosSairamHoje || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Total de Membros</span>
                <span className="text-2xl font-bold text-blue-600">
                  {stats?.totalMembros || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Produtos Recentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nicho
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Preco
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Desconto
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{product.nicho}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.tipoProduto}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-semibold text-green-600">
                          R$ {product.precoDesconto.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          R$ {product.precoNormal.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                        -{product.desconto}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === 'postado'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {product.status === 'postado' ? 'Postado' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
