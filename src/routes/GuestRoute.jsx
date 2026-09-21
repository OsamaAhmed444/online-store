import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function GuestRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}
