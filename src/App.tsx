import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PredictPage from './pages/PredictPage';
import DashboardPage from './pages/DashboardPage';
import ModelsPage from './pages/ModelsPage';
import ScenariosPage from './pages/ScenariosPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout showFooter={true}><HomePage /></Layout>} path="/" />
            <Route element={<Layout><AboutPage /></Layout>} path="/about" />
            <Route element={<Layout><PredictPage /></Layout>} path="/predict" />
            <Route element={<Layout><DashboardPage /></Layout>} path="/dashboard" />
            <Route element={<Layout><ModelsPage /></Layout>} path="/models" />
            <Route element={<Layout><ScenariosPage /></Layout>} path="/scenarios" />
            <Route element={<Layout><ContactPage /></Layout>} path="/contact" />
            <Route element={<Layout showFooter={false}><LoginPage /></Layout>} path="/login" />
            <Route element={<Layout showFooter={false}><RegisterPage /></Layout>} path="/register" />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
