import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Center, Heading, Table, TableCaption, TableContainer, Td, Tfoot, Th, Thead, Tr, Tbody, Button, ButtonGroup, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../../firebase/firebase-config"

export default function Temas() {

    const [temas, setTemas] = useState([])

    const temasCollectionRef = collection(db, "temas")

    useEffect(() => {

        const getTemas = async () => {
            const data = await getDocs(temasCollectionRef)
            setTemas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(temas)
        }

        getTemas()

    }, [])

    return (
        <>
            <Box padding="20px">
                <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <Link to="/admin"><BreadcrumbLink>Panel</BreadcrumbLink></Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Temas</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Center>
                    <Heading>Temas</Heading>
                </Center>
                <TableContainer>
                    <Table variant='striped'>
                        <TableCaption>Temas de EDUFIN</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Tema</Th>
                                <Th>Dificultad</Th>
                                <Th isNumeric>Acciones</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {temas.map(tema => (
                                <Tr key={tema.nombre}>
                                    <Td>{tema.nombre}</Td>
                                    <Td>{tema.dificultad}</Td>
                                    <Td isNumeric>
                                        <ButtonGroup variant='solid' spacing='6'>
                                            <Link to="/admin/editar" state={{ id: tema.id }}><Button colorScheme='blue'>Editar</Button></Link>
                                            <Link><Button colorScheme='green'>Ver</Button></Link>
                                            <Link><Button colorScheme='red'>Borrar</Button></Link>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}