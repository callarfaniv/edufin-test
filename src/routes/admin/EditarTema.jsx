import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase-config";


export default function EditarTema() {

    const location = useLocation()
    const { id } = location.state

    const [tema, setTema] = useState([])
    const docRef = doc(db, "temas", id);

    useEffect(() => {
        console.log(id)
        const getTema = async () => {
            try {
                const docSnap = await getDoc(docRef);
                setTema(docSnap.data());
            } catch (error) {
                console.log(error)
            }
        }

        getTema()
    }, [])

    return (
        <>
            <Box padding="20px">
                <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <Link to="/admin"><BreadcrumbLink>Panel</BreadcrumbLink></Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Crear tema</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Center>
                    <Heading>Agregar tema</Heading>
                </Center>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input type='text' value={tema.nombre} />
                    <FormHelperText>Nombre del tema.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Dificultad</FormLabel>
                    <Select placeholder='Selecciona dificultad' value={tema.dificultad} >
                        <option>Principiante</option>
                        <option>Avanzado</option>
                        <option>Magnate</option>
                    </Select>
                    <FormHelperText>Dificulta del tema.</FormHelperText>
                </FormControl>
                <br />
                <Box border='1px' borderColor='gray.200' padding="10px" borderRadius="md" >
                    <Center>
                        <Heading size="lg">Contenido</Heading>
                    </Center>
                    <FormControl>
                        <FormLabel>Descripción</FormLabel>
                        <Textarea value={tema.contenido.descripcion} />
                        <FormHelperText>Descripción del contenido.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Imagenes</FormLabel>
                        <Input type='file' multiple />
                        <FormHelperText>Imagenes del contenido.</FormHelperText>
                    </FormControl>
                </Box>
                <br />
                <Box border='1px' borderColor='gray.200' padding="10px" borderRadius="md" >
                    <Center>
                        <Heading size="lg">Ejemplo</Heading>
                    </Center>
                    <FormControl>
                        <FormLabel>Descripción</FormLabel>
                        <Textarea value={tema.ejemplo.descripcion} />
                        <FormHelperText>Descripción del ejemplo.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Imagenes</FormLabel>
                        <Input type='file' multiple />
                        <FormHelperText>Imagenes del ejemplo.</FormHelperText>
                    </FormControl>
                </Box>
                <br />
                <Box border='1px' borderColor='gray.200' padding="10px" borderRadius="md" >
                    <Center>
                        <Heading size="lg">Ejercicio</Heading>
                    </Center>
                    <FormControl>
                        <FormLabel>Descripción</FormLabel>
                        <Textarea value={tema.ejercicio.descripcion} />
                        <FormHelperText>Descripción del ejercicio.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Imagenes</FormLabel>
                        <Input type='file' multiple />
                        <FormHelperText>Imagenes del ejercicio.</FormHelperText>
                    </FormControl>
                </Box>
                <br />
                <Center>
                    <Button>Guardar tema</Button>
                </Center>
            </Box>
        </>
    )
}