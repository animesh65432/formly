import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard, LandingPage, SinginPage, BuilderPage, SignupPage } from "./pages"
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/singin" element={<SinginPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/build" element={<BuilderPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
