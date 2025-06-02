import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Dashboard, LandingPage, SinginPage, BuilderPage, SignupPage, MyfromPage, IntergationsPage, SharefromPage } from "./pages"
import { useAuth } from "./store/auth"
export default function App() {
  const { token } = useAuth()
  const isLogin = !!token

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={isLogin ? <Navigate to="/dashboard" /> : <SignupPage />} />
        <Route path="/singin" element={isLogin ? <Navigate to="/dashboard" /> : <SinginPage />} />
        <Route path="/dashboard" element={isLogin ? <Dashboard /> : <Navigate to="/singin" />} />
        <Route path="/build" element={isLogin ? <BuilderPage /> : <Navigate to="/singin" />} />
        <Route path="/myfrom" element={isLogin ? <MyfromPage /> : <Navigate to="/singin" />}></Route>
        <Route path="/intergations" element={isLogin ? <IntergationsPage /> : <Navigate to="/singin" />} />
        <Route path="/share/:fromid" element={<SharefromPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
