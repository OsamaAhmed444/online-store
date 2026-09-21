import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="bg-white dark:bg-[#0c0d0e] min-h-screen text-white flex flex-col">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4">
            
           
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;