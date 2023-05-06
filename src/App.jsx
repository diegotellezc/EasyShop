import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Purchases from "./pages/Purchases"
import Product from "./pages/Product"
import Header from "./components/layout/Header"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <section className="grid grid-rows-[auto_1fr] min-h-screen font-['Yantramanav']">
      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route>
          <Route path="/purchases" element={<Purchases />} />

        </Route>


        <Route path="/products/:id" element={<Product />} />

        <Route path="/*" element={<NotFound />} />




      </Routes>
    </section>
  )
}

export default App
