import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { PortalLogin } from '@/pages/PortalLogin';
import { PortalDashboard } from '@/pages/PortalDashboard';
import { PortalScraperConfig } from '@/pages/PortalScraperConfig';
import { PortalSheetView } from '@/pages/PortalSheetView';
import { PortalStats } from '@/pages/PortalStats';
import { PortalNichos } from '@/pages/PortalNichos';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/portal/login',
    element: <PortalLogin />
  },
  {
    path: '/portal',
    element: (
      <ProtectedRoute>
        <PortalDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/portal/scraper',
    element: (
      <ProtectedRoute>
        <PortalScraperConfig />
      </ProtectedRoute>
    )
  },
  {
    path: '/portal/sheet',
    element: (
      <ProtectedRoute>
        <PortalSheetView />
      </ProtectedRoute>
    )
  },
  {
    path: '/portal/stats',
    element: (
      <ProtectedRoute>
        <PortalStats />
      </ProtectedRoute>
    )
  },
  {
    path: '/portal/nichos',
    element: (
      <ProtectedRoute>
        <PortalNichos />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
