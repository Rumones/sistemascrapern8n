import { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/Layout/PortalLayout';
import { KeywordTable } from '@/components/KeywordTable';
import { Plus } from 'lucide-react';
import {
  getScraperKeywords,
  createScraperKeyword,
  updateScraperKeyword,
  deleteScraperKeyword
} from '@/services/api';
import type { ScraperKeyword } from '@/types';

export function PortalScraperConfig() {
  const [keywords, setKeywords] = useState<ScraperKeyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    keyword: '',
    amazon: true,
    shopee: true,
    mercadoLivre: true,
    magalu: false
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    try {
      const data = await getScraperKeywords();
      setKeywords(data);
    } catch (error) {
      console.error('Erro ao carregar palavras-chave:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newKeyword = await createScraperKeyword({
        keyword: formData.keyword,
        sites: {
          amazon: formData.amazon,
          shopee: formData.shopee,
          mercadoLivre: formData.mercadoLivre,
          magalu: formData.magalu
        },
        active: true
      });

      setKeywords([...keywords, newKeyword]);
      setFormData({
        keyword: '',
        amazon: true,
        shopee: true,
        mercadoLivre: true,
        magalu: false
      });
    } catch (error) {
      console.error('Erro ao adicionar palavra-chave:', error);
      alert('Erro ao adicionar palavra-chave');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const keyword = keywords.find((k) => k.id === id);
      if (!keyword) return;

      const updated = await updateScraperKeyword(id, { active: !keyword.active });
      setKeywords(keywords.map((k) => (k.id === id ? updated : k)));
    } catch (error) {
      console.error('Erro ao atualizar palavra-chave:', error);
      alert('Erro ao atualizar palavra-chave');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta palavra-chave?')) return;

    try {
      await deleteScraperKeyword(id);
      setKeywords(keywords.filter((k) => k.id !== id));
    } catch (error) {
      console.error('Erro ao deletar palavra-chave:', error);
      alert('Erro ao deletar palavra-chave');
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Configuracao do Scraper
          </h1>
          <p className="text-gray-600">
            Gerencie as palavras-chave e sites que o scraper vai monitorar
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Adicionar Nova Palavra-chave
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Palavra-chave
              </label>
              <input
                type="text"
                required
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Ex: whey protein, fone bluetooth..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sites para pesquisar
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.amazon}
                    onChange={(e) => setFormData({ ...formData, amazon: e.target.checked })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Amazon</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.shopee}
                    onChange={(e) => setFormData({ ...formData, shopee: e.target.checked })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Shopee</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.mercadoLivre}
                    onChange={(e) =>
                      setFormData({ ...formData, mercadoLivre: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Mercado Livre</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.magalu}
                    onChange={(e) => setFormData({ ...formData, magalu: e.target.checked })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Magalu</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adicionando...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Adicionar Palavra-chave</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Palavras-chave Cadastradas</h2>
          {keywords.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Nenhuma palavra-chave cadastrada ainda</p>
            </div>
          ) : (
            <KeywordTable
              keywords={keywords}
              onToggleActive={handleToggleActive}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
