import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom"

// auth Pages 
import { RegisterPage } from "./pages/auth/RegisterPage"
import { LoginPage } from "./pages/auth/LoginPage"

// dashboard Pages
import { Dashboard } from "./pages/dashboard/DashBoard"
import { ProtectedRouter } from "./components/ProtectedRoute"

// landing page
import { Landing } from "./pages/Landing"


function App() {

  return (

      <BrowserRouter>
        <Routes>
          // public routes
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage/>}/>

          // protected routes
          <Route path="/dashboard" element={
                                            <ProtectedRouter>
                                              <Dashboard />
                                            </ProtectedRouter>
                                            }
          />
                    {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to='/dashboard' replace />}  />

                    {/* 404 pages */}
          <Route path="*" element={<div>Page Not Found</div>}/>
        </Routes>
      </BrowserRouter>

  )
}

export default App
