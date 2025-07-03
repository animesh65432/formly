import { useAuth } from "./store/auth"
import { Route, Routes, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Loading } from "./components"

const LandingPage = lazy(() => import("./pages/LandingPage"))
const SignupPage = lazy(() => import("./pages/Singup"))
const SigninPage = lazy(() => import("./pages/Singin"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const BuilderPage = lazy(() => import("./pages/BuilderPage"))
const MyfromPage = lazy(() => import("./pages/Myfrompage"))
const IntergationsPage = lazy(() => import("./pages/IntergationsPage"))
const SharefromPage = lazy(() => import("./pages/SharefromPage"))

export default function App() {
  const { token } = useAuth()
  const isLogin = !!token
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>

  )
}
