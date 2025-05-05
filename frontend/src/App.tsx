import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard, LandingPage } from "./pages"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
