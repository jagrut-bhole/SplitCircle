import { BrowserRouter, Routes, Route } from "react-router-dom"

// auth Pages 
import { RegisterPage } from "./pages/auth/RegisterPage"
import { LoginPage } from "./pages/auth/LoginPage"

// dashboard Pages
import { Dashboard } from "./pages/dashboard/Dashboard"

// Protection Route componnt
import { ProtectedRouter } from "./components/ProtectedRoute"
import { PublicRoute } from "./components/PublicRoute"

import { UserProfile } from "./pages/UserProfile"

// landing page
import { Landing } from "./pages/Landing"
import { ActivitySection } from "./components/ActivitySection"


function App() {

  return (

      <BrowserRouter>
        <Routes>
          // public routes
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

          // protected routes
          <Route path="/dashboard" element={
                                            <ProtectedRouter>
                                              <Dashboard />
                                            </ProtectedRouter>
                                            }
          />

          <Route path='/profile' element={
                                            <ProtectedRouter>
                                              <UserProfile />
                                            </ProtectedRouter>
                                          }
          />

          <Route path="/activity-logs" element={
                                            <ProtectedRouter>
                                              <ActivitySection />
                                            </ProtectedRouter>
          } />

                    {/* Redirect root to dashboard */}
          {/* <Route path="/" element={<Navigate to='/dashboard' replace />}  /> */}

                    {/* 404 pages */}
          <Route path="*" element={<div>Page Not Found</div>}/>
        </Routes>
      </BrowserRouter>

  )
}

export default App
