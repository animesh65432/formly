import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Dashboard, LandingPage, SigninPage, BuilderPage, SignupPage, MyfromPage, IntergationsPage, SharefromPage } from "./pages"
import { useAuth } from "./store/auth"
export default function App() {
  const { token } = useAuth()
  const isLogin = !!token

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={isLogin ? <Navigate to="/dashboard" /> : <SignupPage />} />
        <Route path="/signin" element={isLogin ? <Navigate to="/dashboard" /> : <SigninPage />} />
        <Route path="/dashboard" element={isLogin ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/build" element={isLogin ? <BuilderPage /> : <Navigate to="/signin" />} />
        <Route path="/myfrom" element={isLogin ? <MyfromPage /> : <Navigate to="/signin" />}></Route>
        <Route path="/intergations" element={isLogin ? <IntergationsPage /> : <Navigate to="/signin" />} />
        <Route path="/share/:fromid" element={<SharefromPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
