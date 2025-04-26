import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import Home from "./Page/Home";
import ConnectWallet from "./components/ConnectWallet";
import Admin from "./components/Admin";
import Logo from './components/Logo';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="flex gap-6">
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
      </div>
    </nav>
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
          {showConnectWallet && <div className="mt-16"><ConnectWallet /></div>} {/* Added mt-16 */}
          <main className="pt-16"> {/* Already has pt-16 */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
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
