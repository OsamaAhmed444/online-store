import AppRoutes from './routes/AppRoutes.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070809]">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
