import { useEffect, useState } from 'react';
import { PortalLayout } from '@/components/Layout/PortalLayout';
import { StatCard } from '@/components/StatCard';
import { UserPlus, UserMinus, Users } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getPortalStats } from '@/services/api';
import type { StatsResumo, StatsSeries } from '@/types';

export function PortalStats() {
  const [resumo, setResumo] = useState<StatsResumo | null>(null);
  const [series, setSeries] = useState<StatsSeries | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { resumo: resumoData, series: seriesData } = await getPortalStats();
      setResumo(resumoData);
      setSeries(seriesData);
    } catch (error) {
      console.error('Erro ao carregar estatisticas:', error);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Estatisticas</h1>
          <p className="text-gray-600">Analise o desempenho dos grupos e engajamento</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            title="Novos Usuarios Hoje"
            value={resumo?.usuariosNovosHoje || 0}
            icon={UserPlus}
            color="green"
          />
          <StatCard
            title="Usuarios que Sairam Hoje"
            value={resumo?.usuariosSairamHoje || 0}
            icon={UserMinus}
            color="orange"
          />
          <StatCard
            title="Total de Membros"
            value={resumo?.totalMembros || 0}
            icon={Users}
            color="blue"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Mensagens Enviadas por Dia</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={series?.mensagensPorDia || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="data"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="mensagens"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Mensagens"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Entradas vs Saidas de Usuarios
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={series?.usuariosPorDia || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="data"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="entradas" fill="#10b981" name="Entradas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saidas" fill="#ef4444" name="Saidas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Integrar com dados reais do n8n
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Para conectar estas estatisticas com dados reais do Telegram/WhatsApp:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Configure webhooks do n8n para capturar eventos de entrada/saida de usuarios</li>
              <li>Armazene os eventos em um banco de dados (Supabase, PostgreSQL, etc)</li>
              <li>
                Crie endpoints no n8n para retornar as estatisticas agregadas
              </li>
              <li>
                Substitua as funcoes em <code className="bg-gray-200 px-2 py-1 rounded">src/services/api.ts</code> por chamadas HTTP reais
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
