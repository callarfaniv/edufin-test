import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase-config";


export default function EditarTema() {

    const location = useLocation()
    const { id } = location.state

    const [tema, setTema] = useState({})
    const docRef = doc(db, "temas", id);

    useEffect(() => {
        console.log(id)
        const getTema = async () => {
            try {
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data())
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
                    <BreadcrumbItem >
                        <Link to="/admin/temas"><BreadcrumbLink>Temas</BreadcrumbLink></Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Editar tema</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Center>
                    <Heading>Editar tema</Heading>
                </Center>
                {tema.lenght == 0 ? <>
                    <Heading>Loading</Heading>
                </> : <>
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
                            <FormLabel>Descripci??n</FormLabel>
                            <Textarea value={tema.contenido.descripcion} />
                            <FormHelperText>Descripci??n del contenido.</FormHelperText>
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
                            <FormLabel>Descripci??n</FormLabel>
                            <Textarea value={tema.ejemplo.descripcion} />
                            <FormHelperText>Descripci??n del ejemplo.</FormHelperText>
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
                            <FormLabel>Descripci??n</FormLabel>
                            <Textarea value={tema.ejercicio.link} />
                            <FormHelperText>Link del ejercicio.</FormHelperText>
                        </FormControl>
                    </Box>
                    <br />
                    <Center>
                        <Button>Guardar tema</Button>
                    </Center>
                </>}
            </Box>
        </>
    )
}