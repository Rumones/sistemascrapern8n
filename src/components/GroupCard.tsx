import { MessageCircle, Send } from 'lucide-react';
import type { Nicho } from '@/types';

interface GroupCardProps {
  nicho: Nicho;
}

export function GroupCard({ nicho }: GroupCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{nicho.titulo}</h3>
      <p className="text-gray-600 text-sm mb-4">{nicho.descricao}</p>
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-xs text-gray-500 mb-1 font-medium">Tipos de produtos:</p>
        <p className="text-sm text-gray-700">{nicho.tiposDeProdutos}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={nicho.telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
        >
          <Send className="w-4 h-4" />
          <span>Telegram</span>
        </a>
        <a
          href={nicho.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
