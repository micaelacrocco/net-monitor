import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DetailsDevice from "./pages/DetailsDevice";
import DetailsLink from "./pages/DetailsLink";
import NotFound from "./pages/NotFound";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: login */}
        <Route path="/login" element={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            background: '#f6f5f7'
          }}>
            <Auth />
          </div>
        } />
        {/* Rutas protegidas con layout */}
        <Route path="/" element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }>
        {/* Redirección al dashboard si entra a "/" */}
        <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="details/device/:id" element={<DetailsDevice />} />
          <Route path="details/link/:id" element={<DetailsLink />} />
        </Route>
        {/* Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
