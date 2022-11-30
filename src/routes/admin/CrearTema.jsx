import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db, storage } from "../../firebase/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function CrearTema() {

    const { isOpen: isValOpen, onOpen: onValOpen, onClose: onValClose } = useDisclosure()
    const { isOpen: isStaOpen, onOpen: onStaOpen, onClose: onStaClose } = useDisclosure()
    const [nombre, setNombre] = useState("")
    const [dificultad, setDificultad] = useState("")
    const [contDesc, setContDesc] = useState("")
    const [contImagenes, setContImagenes] = useState([])
    const [contImagenesUrls, setContImagenesUrls] = useState([])
    const [ejemploDesc, setEjemploDesc] = useState("")
    const [ejemploImagenes, setEjemploImagenes] = useState([])
    const [ejemploImagenesUrls, setEjemploImagenesUrls] = useState([])
    const [ejerLink, setEjerLink] = useState("")
    const [statusMsj, setStatusMsj] = useState("")

    const temasCollectionRef = collection(db, "temas")

    useEffect(() => {
        const addTema = async () => {
            await addDoc(temasCollectionRef, {
                nombre: nombre,
                dificultad: dificultad,
                contenido: {
                    descripcion: contDesc,
                    imagenes: contImagenesUrls
                },
                ejemplo: {
                    descripcion: ejemploDesc,
                    imagenes: ejemploImagenesUrls
                },
                ejercicio: {
                    link: ejerLink,
                },
            })
        }
        if (!contImagenesUrls.length == 0 && !ejemploImagenesUrls.length == 0) {
            console.log("Contenido: ", contImagenesUrls)
            console.log("Ejemplo: ", ejemploImagenesUrls)
            addTema()
        }
    }, [contImagenesUrls, ejemploImagenesUrls])

    const validar = async () => {
        if (contImagenes.length == 0) {
            setStatusMsj("El contenido no tiene imagens. Deseas continuar ?")
        }
        if (ejemploImagenes.length == 0) {
            setStatusMsj("El ejemplo no tiene imagens. Deseas continuar ?")
        }
        await cargarImagenes(contImagenes, setContImagenesUrls)
        await cargarImagenes(ejemploImagenes, setEjemploImagenesUrls)
    }

    const cargarImagenes = async (files, setImagenesUrl) => {
        onStaOpen()
        const urles = []
        files.map(async (file, i) => {
            const storageRef = ref(storage, `/files/${nombre}/${file.name}`)
            await uploadBytes(storageRef, file).then(() => {
                getDownloadURL(storageRef).then((url) => {
                    urles.push(url)
                    if (urles.length === files.length) {
                        setImagenesUrl(urles)
                    }
                })
            })
        })
    }

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
                    <Input type='text' onChange={(event) => setNombre(event.target.value)} />
                    <FormHelperText>Nombre del tema.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Dificultad</FormLabel>
                    <Select placeholder='Selecciona dificultad' onChange={(event) => setDificultad(event.target.value)}>
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
                        <Textarea placeholder='Here is a sample placeholder' onChange={(event) => setContDesc(event.target.value)} />
                        <FormHelperText>Descripción del contenido.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Imagenes</FormLabel>
                        <Input type='file' multiple onChange={(event) => setContImagenes([...event.target.files])} />
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
                        <Textarea placeholder='Here is a sample placeholder' onChange={(event) => setEjemploDesc(event.target.value)} />
                        <FormHelperText>Descripción del ejemplo.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Imagenes</FormLabel>
                        <Input type='file' multiple onChange={(event) => setEjemploImagenes([...event.target.files])} />
                        <FormHelperText>Imagenes del ejemplo.</FormHelperText>
                    </FormControl>
                </Box>
                <br />
                <Box border='1px' borderColor='gray.200' padding="10px" borderRadius="md" >
                    <Center>
                        <Heading size="lg">Ejercicio</Heading>
                    </Center>
                    <FormControl>
                        <FormLabel>Link</FormLabel>
                        <Input type='text' onChange={(event) => setEjerLink(event.target.value)} />
                        <FormHelperText>Link del ejercicio.</FormHelperText>
                    </FormControl>
                </Box>
                <br />
                <Center>
                    <Button onClick={validar}>Guardar tema</Button>
                </Center>
            </Box>

            <Modal isOpen={isValOpen} onClose={onValClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear tema</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{statusMsj}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onValClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isStaOpen} onClose={onStaClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Subiendo imagenes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{statusMsj}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onStaClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}