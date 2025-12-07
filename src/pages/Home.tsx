import { useEffect, useState } from 'react';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import { GroupCard } from '@/components/GroupCard';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';
import { getNichos } from '@/services/api';
import type { Nicho } from '@/types';

export function Home() {
  const [nichos, setNichos] = useState<Nicho[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <PublicLayout>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Ofertas em Tempo Real nos Seus Grupos
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Receba as melhores ofertas de Amazon, Shopee, Mercado Livre e Magalu
              diretamente no seu Telegram ou WhatsApp. Automacao inteligente
              trabalhando 24/7 para voce economizar.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-600" />
                <span>100% Automatizado</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <span>Melhores Descontos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" />
                <span>Atualizacao em Tempo Real</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Escolha Seu Nicho de Interesse
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Entre nos grupos especializados ou no grupo geral para receber todas as ofertas
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Carregando grupos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
              {nichos.map((nicho) => (
                <GroupCard key={nicho.id} nicho={nicho} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Como Funciona?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Entre no Grupo
              </h4>
              <p className="text-gray-600">
                Escolha seu nicho favorito e entre no grupo do Telegram ou WhatsApp
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Receba Ofertas
              </h4>
              <p className="text-gray-600">
                Nossa automacao encontra e envia as melhores ofertas em tempo real
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Economize Dinheiro
              </h4>
              <p className="text-gray-600">
                Compre produtos com descontos incriveis de ate 70% off
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
