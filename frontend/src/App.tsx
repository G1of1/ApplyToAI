
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import CoverLetter from "./pages/CoverLetter";
import Footer from "./components/sections/Footer";
import Navbar from './components/sections/Navbar';
import { Toaster } from 'sonner';
import CoverLetterGenPage from './pages/CoverLetterGenerator';

export default function App() {
  
  return (
    <main className="overflow-hidden bg9">
      <Toaster richColors position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-analyzer" element={<Resume />} />
        <Route path="/cover-letter-analyzer" element={<CoverLetter />} />
        <Route path="/cover-letter-generator" element={<CoverLetterGenPage />} />
      </Routes>
      <Footer />
    </main>
    
  );
}

