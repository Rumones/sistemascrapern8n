import { Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import type { ScraperKeyword } from '@/types';

interface KeywordTableProps {
  keywords: ScraperKeyword[];
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function KeywordTable({ keywords, onToggleActive, onDelete }: KeywordTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Palavra-chave
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sites Selecionados
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acoes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {keywords.map((keyword) => (
              <tr key={keyword.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {keyword.keyword}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {keyword.sites.amazon && (
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded">
                        Amazon
                      </span>
                    )}
                    {keyword.sites.shopee && (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">
                        Shopee
                      </span>
                    )}
                    {keyword.sites.mercadoLivre && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">
                        Mercado Livre
                      </span>
                    )}
                    {keyword.sites.magalu && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                        Magalu
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      keyword.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {keyword.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onToggleActive(keyword.id)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title={keyword.active ? 'Desativar' : 'Ativar'}
                    >
                      {keyword.active ? (
                        <ToggleRight className="w-5 h-5" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(keyword.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Deletar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
