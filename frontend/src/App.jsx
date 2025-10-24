// src/App.jsx
import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from '../src/Pages/Home';
import { MoviesPage } from '../src/Pages/MoviesPage';
import { Login } from '../src/Pages/Login';
import { Register } from '../src/Pages/Register';
import { AdminDashboard } from './pages/Admin/Dashboard/AdminDashboard'; 
import AddMovieForm from './Pages/Admin/add-movie-form.jsx'; // <-- added import
import { MovieDetail } from '../src/Pages/movieDetailPage';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = ['/login', '/register'].includes(location.pathname);
  if (hideLayout) return <>{children}</>;
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }
 
  if (!user || !user.isAdmin) {
    console.log(user)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<MoviesPage />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/add-movie" element={<AddMovieForm />} /> {/* <-- new admin route */}
              </Route>

              <Route path="/movie/:id" element={
                <ProtectedRoute>
                  <MovieDetail />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}