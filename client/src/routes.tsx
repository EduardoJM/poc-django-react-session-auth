import { lazy } from "react"
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="" Component={Dashboard} />
    </Routes>
  )
}
