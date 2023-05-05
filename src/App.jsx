import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Purchases from "./pages/Purchases"
import Product from "./pages/Product"
import Header from "./components/layout/Header"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <>
      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/purchases" element={<Purchases />} />

        <Route path="/products/:id" element={<Product />} />

        <Route path="/*" element={<NotFound />} />




      </Routes>
    </>
  )
}

export default App
