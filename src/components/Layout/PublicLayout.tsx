import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Package className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">IniciAmazon</span>
            </Link>
            <Link
              to="/portal/login"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Portal Admin
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2024 IniciAmazon. Todos os direitos reservados.</p>
            <p className="mt-2">
              <Link to="/portal/login" className="text-primary-600 hover:text-primary-700">
                Acesso administrativo
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
