
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from "./pages/Home";
import Header from "./components/sections/Header";
import Resume from "./pages/Resume";
import CoverLetter from "./pages/CoverLetter";
import Footer from "./components/sections/Footer";

export default function App() {
  
  return (
    <main className="overflow-hidden bg9">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-analyzer" element={<Resume />} />
        <Route path="/cover-letter-analyzer" element={<CoverLetter />} />
      </Routes>
      <Footer />
    </main>
    
  );
}

