import { Edit2, Trash2 } from 'lucide-react';
import type { Nicho } from '@/types';

interface NichoTableProps {
  nichos: Nicho[];
  onEdit: (nicho: Nicho) => void;
  onDelete: (id: string) => void;
}

export function NichoTable({ nichos, onEdit, onDelete }: NichoTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titulo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descricao
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipos de Produtos
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acoes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {nichos.map((nicho) => (
              <tr key={nicho.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {nicho.titulo}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                  {nicho.descricao}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                  {nicho.tiposDeProdutos}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(nicho)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(nicho.id)}
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
