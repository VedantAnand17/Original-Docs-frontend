import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import Home from "./Page/Home";
import ConnectWallet from './components/ConnectWallet';
import Client from './components/Client';
import Admin from './components/Admin';

const queryClient = new QueryClient();

function Navigation() {
  return (
    <nav className="flex gap-6 p-4 bg-[#141432] rounded-lg shadow-sm mb-6">
      <Link 
        to="/" 
        className="text-[#98C1D9] hover:text-blue-400 font-medium transition-colors"
      >
        Home
      </Link>
      <Link 
        to="/client" 
        className="text-[#98C1D9] hover:text-blue-400 font-medium transition-colors"
      >
        Verify Document
      </Link>
      <Link 
        to="/admin" 
        className="text-[#98C1D9] hover:text-blue-400 font-medium transition-colors"
      >
        Register Document
      </Link>
    </nav>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="bg-[#020223] min-h-screen px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <ConnectWallet />
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/client" element={<Client />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
