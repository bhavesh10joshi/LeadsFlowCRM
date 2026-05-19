import './App.css';
import type { ReactNode } from 'react';
import { Login } from './Pages/Login';
import { SignUp } from './Pages/SignUp';
import { LeadsDashboard } from './Pages/LeadsDashboard';
import { LeadDetailsDashboard } from './Pages/LeadDetailsDashboard';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

interface RouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: RouteProps) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/LeadFlow/User/Login" replace />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: RouteProps) {
  const token = localStorage.getItem("token");
  
  if (token) {
    return <Navigate to="/LeadFlow/User/Dashboard" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            localStorage.getItem("token") 
              ? <Navigate to="/LeadFlow/User/Dashboard" replace /> 
              : <Navigate to="/LeadFlow/User/Login" replace />
          } 
        />

        <Route path="/LeadFlow/User/Login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/LeadFlow/User/SignUp" element={<PublicRoute><SignUp /></PublicRoute>} />

        <Route 
          path="/LeadFlow/User/Dashboard" 
          element={
            <ProtectedRoute>
              <LeadsDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/LeadFlow/User/Lead/:id" 
          element={
            <ProtectedRoute>
              <LeadDetailsDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;