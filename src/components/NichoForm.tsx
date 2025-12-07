import { useState, useEffect } from 'react';
import type { Nicho } from '@/types';

interface NichoFormProps {
  nicho?: Nicho | null;
  onSubmit: (data: Omit<Nicho, 'id'>) => void;
  onCancel: () => void;
}

export function NichoForm({ nicho, onSubmit, onCancel }: NichoFormProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tiposDeProdutos: '',
    telegramLink: '',
    whatsappLink: ''
  });

  useEffect(() => {
    if (nicho) {
      setFormData({
        titulo: nicho.titulo,
        descricao: nicho.descricao,
        tiposDeProdutos: nicho.tiposDeProdutos,
        telegramLink: nicho.telegramLink,
        whatsappLink: nicho.whatsappLink
      });
    }
  }, [nicho]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!nicho) {
      setFormData({
        titulo: '',
        descricao: '',
        tiposDeProdutos: '',
        telegramLink: '',
        whatsappLink: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {nicho ? 'Editar Nicho' : 'Criar Novo Nicho'}
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titulo do Nicho
        </label>
        <input
          type="text"
          required
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          placeholder="Ex: Saude & Beleza"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descricao
        </label>
        <textarea
          required
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          rows={3}
          placeholder="Breve descricao do nicho"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipos de Produtos
        </label>
        <input
          type="text"
          required
          value={formData.tiposDeProdutos}
          onChange={(e) => setFormData({ ...formData, tiposDeProdutos: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          placeholder="Ex: whey, creatina, vitaminas, skincare"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link do Telegram
        </label>
        <input
          type="url"
          required
          value={formData.telegramLink}
          onChange={(e) => setFormData({ ...formData, telegramLink: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          placeholder="https://t.me/seu_grupo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link do WhatsApp
        </label>
        <input
          type="url"
          required
          value={formData.whatsappLink}
          onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          placeholder="https://chat.whatsapp.com/seu_link"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {nicho ? 'Atualizar' : 'Criar Nicho'}
        </button>
        {nicho && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
