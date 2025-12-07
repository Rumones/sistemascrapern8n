import { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/Layout/PortalLayout';
import { NichoForm } from '@/components/NichoForm';
import { NichoTable } from '@/components/NichoTable';
import { getNichos, createNicho, updateNicho, deleteNicho } from '@/services/api';
import type { Nicho } from '@/types';

export function PortalNichos() {
  const [nichos, setNichos] = useState<Nicho[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNicho, setEditingNicho] = useState<Nicho | null>(null);

  useEffect(() => {
    loadNichos();
  }, []);

  const loadNichos = async () => {
    try {
      const data = await getNichos();
      setNichos(data);
    } catch (error) {
      console.error('Erro ao carregar nichos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Omit<Nicho, 'id'>) => {
    try {
      if (editingNicho) {
        const updated = await updateNicho(editingNicho.id, data);
        setNichos(nichos.map((n) => (n.id === editingNicho.id ? updated : n)));
        setEditingNicho(null);
      } else {
        const newNicho = await createNicho(data);
        setNichos([...nichos, newNicho]);
      }
    } catch (error) {
      console.error('Erro ao salvar nicho:', error);
      alert('Erro ao salvar nicho');
    }
  };

  const handleEdit = (nicho: Nicho) => {
    setEditingNicho(nicho);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingNicho(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este nicho?')) return;

    try {
      await deleteNicho(id);
      setNichos(nichos.filter((n) => n.id !== id));
      if (editingNicho?.id === id) {
        setEditingNicho(null);
      }
    } catch (error) {
      console.error('Erro ao deletar nicho:', error);
      alert('Erro ao deletar nicho');
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
            Nichos & Grupos
          </h1>
          <p className="text-gray-600">
            Gerencie os nichos e links dos grupos do Telegram e WhatsApp
          </p>
        </div>

        <NichoForm nicho={editingNicho} onSubmit={handleSubmit} onCancel={handleCancelEdit} />

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nichos Cadastrados</h2>
          {nichos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Nenhum nicho cadastrado ainda</p>
            </div>
          ) : (
            <NichoTable nichos={nichos} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Observacoes Importantes
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Links dos grupos:</strong> Certifique-se de que os links de convite dos
              grupos estejam corretos e validos. Links invalidos podem prejudicar a experiencia
              dos usuarios.
            </p>
            <p>
              <strong>Tipos de produtos:</strong> Liste os principais tipos de produtos de forma
              clara para ajudar os usuarios a escolherem o nicho certo.
            </p>
            <p>
              <strong>Sincronizacao:</strong> As alteracoes feitas aqui sao refletidas
              imediatamente na pagina publica. Os dados sao sincronizados automaticamente.
            </p>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
