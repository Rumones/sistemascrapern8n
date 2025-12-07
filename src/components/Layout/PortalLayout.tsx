import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileSpreadsheet,
  BarChart3,
  FolderOpen,
  LogOut,
  Package,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface PortalLayoutProps {
  children: React.ReactNode;
}

export function PortalLayout({ children }: PortalLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/portal/login');
  };

  const menuItems = [
    { path: '/portal', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/portal/scraper', icon: Search, label: 'Configuracao do Scraper' },
    { path: '/portal/sheet', icon: FileSpreadsheet, label: 'Planilha em Tempo Real' },
    { path: '/portal/stats', icon: BarChart3, label: 'Estatisticas' },
    { path: '/portal/nichos', icon: FolderOpen, label: 'Nichos & Grupos' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <Link to="/" className="flex items-center gap-2">
                <Package className="w-7 h-7 text-primary-600" />
                <span className="text-xl font-bold text-gray-900">IniciAmazon</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t">
              <div className="px-4 py-3 mb-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Logado como</p>
                <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b lg:hidden">
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="text-lg font-semibold text-gray-900">Portal</span>
              <div className="w-6" />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
