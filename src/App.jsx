import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import Home from "./Page/Home";
import ConnectWallet from "./components/ConnectWallet";
import Admin from "./components/Admin";

const queryClient = new QueryClient();

function Navigation() {
  return (
    <nav className="flex gap-6 p-4  rounded-lg shadow-sm mb-6">
      <Link
        to="/"
        className="text-[#98C1D9] hover:text-blue-400 font-medium transition-colors"
      >
        Home
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

// Create a wrapper component that conditionally renders ConnectWallet
function AppContent() {
  const location = useLocation();
  const showConnectWallet = location.pathname === "/admin";
  
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {showConnectWallet && <ConnectWallet />}
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </div>
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
