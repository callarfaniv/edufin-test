import { Route, Routes } from "react-router-dom";
import Admin from "./routes/Admin";
import Home from "./routes/Home";
import Tema from "./routes/Tema";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tema" element={<Tema />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}