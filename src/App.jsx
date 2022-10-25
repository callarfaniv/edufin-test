import { Route, Routes } from "react-router-dom";
import CrearTema from "./routes/admin/CrearTema";
import EditarTema from "./routes/admin/EditarTema";
import Panel from "./routes/admin/Panel";
import Temas from "./routes/admin/Temas";
import Home from "./routes/Home";
import Tema from "./routes/Tema";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="tema" element={<Tema />} />
      <Route path="admin">
        <Route index element={<Panel />} />
        <Route path="temas" element={<Temas />} />
        <Route path="crear" element={<CrearTema />} />
        <Route path="editar" element={<EditarTema />} />
      </Route>
    </Routes>
  )
}