
import { Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/LandingPage";
import Resume from "./pages/user/Resume";
import CoverLetter from "./pages/user/CoverLetter";
import Footer from "./components/sections/Footer";
import Navbar from './components/sections/Navbar';
import { Toaster } from 'sonner';
import CoverLetterGenPage from './pages/user/CoverLetterGenerator';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/user/Home';
import { useUser } from '@supabase/auth-helpers-react';
import UserNav from './components/sections/UserNav';
import SavedLettersPage from './pages/user/SavedLetters';
import AccountSettings from './pages/user/AccountSettings';

export default function App() {
  const user = useUser();
  return (
    <main className="overflow-hidden bg9">
      <Toaster richColors position="top-right" />
      { user ? <UserNav /> :<Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/resume-analyzer" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
        <Route path="/cover-letter-analyzer" element={<ProtectedRoute><CoverLetter /></ProtectedRoute>} />
        <Route path="/cover-letter-generator" element={<ProtectedRoute><CoverLetterGenPage /></ProtectedRoute>} />
        <Route path="/saved" element={<ProtectedRoute><SavedLettersPage /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        
      </Routes>
      <Footer />
    </main>
    
  );
}

