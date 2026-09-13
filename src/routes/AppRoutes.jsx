import { Routes, Route } from 'react-router-dom'
import Team from '../pages/Team'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>Online Store</div>} />
      <Route path="/team" element={<Team />} />
    </Routes>
  )
}

export default AppRoutes
