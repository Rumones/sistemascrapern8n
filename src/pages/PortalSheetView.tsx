import { PortalLayout } from '@/components/Layout/PortalLayout';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { getSheetPublicUrl } from '@/services/api';

export function PortalSheetView() {
  const sheetUrl = getSheetPublicUrl();

  const handleOpenInNewTab = () => {
    window.open(sheetUrl, '_blank');
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Planilha em Tempo Real
            </h1>
            <p className="text-gray-600">
              Visualize todos os produtos encontrados pelo scraper
            </p>
          </div>
          <button
            onClick={handleOpenInNewTab}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Abrir no Google Sheets</span>
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Informacao</h3>
              <p className="text-sm text-blue-700">
                Esta planilha e atualizada automaticamente pelo n8n sempre que o scraper encontra
                novos produtos com descontos relevantes. Voce pode abrir a planilha completa no
                Google Sheets para ter acesso a todas as funcionalidades.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="aspect-video sm:aspect-[16/10] lg:aspect-[16/9] w-full">
            <iframe
              src={sheetUrl}
              className="w-full h-full"
              title="Google Sheets - Produtos"
              style={{ minHeight: '600px' }}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Como integrar sua planilha real
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>1.</strong> Crie uma planilha no Google Sheets para armazenar os produtos
            </p>
            <p>
              <strong>2.</strong> Configure o n8n para adicionar os produtos encontrados nesta
              planilha
            </p>
            <p>
              <strong>3.</strong> Torne a planilha publica (visualizacao) ou compartilhe com
              permissao de visualizacao
            </p>
            <p>
              <strong>4.</strong> Substitua a URL em <code className="bg-gray-200 px-2 py-1 rounded">src/services/api.ts</code> na funcao{' '}
              <code className="bg-gray-200 px-2 py-1 rounded">getSheetPublicUrl()</code>
            </p>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
