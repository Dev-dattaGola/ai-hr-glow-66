
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnhancedAuthProvider } from "@/contexts/EnhancedAuthContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
// Removed legacy Auth import to avoid unused import and ensure ModernAuth is used for /auth
// import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import ModernAuth from "./pages/ModernAuth";
import EnhancedIndex from "./pages/EnhancedIndex";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EnhancedAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<EnhancedIndex />} />
            {/* Route /auth to ModernAuth to ensure it uses EnhancedAuthContext */}
            <Route path="/auth" element={<ModernAuth />} />
            <Route path="/login" element={<ModernAuth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </EnhancedAuthProvider>
  </QueryClientProvider>
);

export default App;
