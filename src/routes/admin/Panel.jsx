import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Panel() {

    return (
        <>
            <Heading>Panel de admin</Heading>
            <Link to="/admin/temas">Temas</Link>
            <Link to="/admin/crear">Crear tema</Link>
        </>
    )
}