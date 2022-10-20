import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Tema from "./routes/Tema";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tema" element={<Tema />} />
    </Routes>
  )
}