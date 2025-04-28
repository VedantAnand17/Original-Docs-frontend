import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import Home from "./Page/Home";
import ConnectWallet from "./components/ConnectWallet";
import Admin from "./components/Admin";
import Logo from './components/Logo';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

const queryClient = new QueryClient();

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };
  
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-500"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex gap-6">
            <Link
              to="/"
              className={`text-gray-700 hover:text-blue-500 font-medium transition-colors ${
                location.pathname === '/' ? 'text-blue-500' : ''
              }`}
            >
              Verify
            </Link>
            <Link
              to="/admin"
              className={`text-gray-700 hover:text-blue-500 font-medium transition-colors ${
                location.pathname === '/admin' ? 'text-blue-500' : ''
              }`}
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile navigation with animation */}
        <motion.div 
          className="md:hidden"
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen && (
            <div className="py-2">
              <motion.div 
                className="flex flex-col space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/"
                  className={`px-4 py-2 text-gray-700 hover:text-blue-500 font-medium transition-colors ${
                    location.pathname === '/' ? 'text-blue-500 bg-gray-50' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Verify
                </Link>
                <Link
                  to="/admin"
                  className={`px-4 py-2 text-gray-700 hover:text-blue-500 font-medium transition-colors ${
                    location.pathname === '/admin' ? 'text-blue-500 bg-gray-50' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}

function AppContent() {
  const location = useLocation();
  const showConnectWallet = location.pathname === "/admin";
  
  return (
    <>
      <div className="min-h-screen px-4 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <Navigation />
          {showConnectWallet && <div className="mt-16"><ConnectWallet /></div>}
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              {/* Redirect all unused routes to '/' */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
