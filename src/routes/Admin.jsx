import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";

export default function Admin() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [temas, setTemas] = useState([])
    const [nombre, setNombre] = useState("")
    const [dificultad, setDificultad] = useState("")
    const [contDesc, setContDesc] = useState("")
    const [contImagenes, setContImagenes] = useState([])
    const [contImagenesUrls, setContImagenesUrls] = useState([])
    const [ejemploDesc, setEjemploDesc] = useState("")
    const [ejemploImagenes, setEjemploImagenes] = useState([])
    const [ejemploImagenesUrls, setEjemploImagenesUrls] = useState([])
    const [ejerDesc, setEjerDesc] = useState("")
    const [ejerImagenes, setEjerImagenes] = useState([])
    const [ejerImagenesUrls, setEjerImagenesUrls] = useState([])
    const [statusMsj, setStatusMsj] = useState("")

    const temasCollectionRef = collection(db, "temas")

    useEffect(() => {

        const getTemas = async () => {
            const data = await getDocs(temasCollectionRef)
            setTemas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(temas)
        }

        getTemas()

    }, [])

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
                    descripcion: ejerDesc,
                    imagenes: ejerImagenesUrls
                },
            })
        }
        if (!contImagenesUrls.length == 0 && !ejemploImagenesUrls.length == 0 && !ejerImagenesUrls.length == 0) {
            console.log("Contenido: ", contImagenesUrls)
            console.log("Ejemplo: ", ejemploImagenesUrls)
            console.log("Ejercicio: ", ejerImagenesUrls)
            addTema()
        }
    }, [contImagenesUrls, ejemploImagenesUrls, ejerImagenesUrls])

    const agregarTema = async () => {
        await cargarImagenes(contImagenes, setContImagenesUrls)
        await cargarImagenes(ejemploImagenes, setEjemploImagenesUrls)
        await cargarImagenes(ejerImagenes, setEjerImagenesUrls)
    }


    const cargarImagenes = async (files, setImagenesUrl) => {
        onOpen()
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
            <Box padding="20px" bg>
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
                        <FormLabel>Descripción</FormLabel>
                        <Textarea placeholder='Here is a sample placeholder' onChange={(event) => setEjerDesc(event.target.value)} />
                        <FormHelperText>Descripción del ejercicio.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Imagenes</FormLabel>
                        <Input type='file' multiple onChange={(event) => setEjerImagenes([...event.target.files])} />
                        <FormHelperText>Imagenes del ejercicio.</FormHelperText>
                    </FormControl>
                </Box>
                <br />
                <Center>
                    <Button onClick={agregarTema}>Guardar tema</Button>
                    <Button onClick={() => console.log(contImagenesUrls)}>Console.log</Button>
                </Center>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Subiendo imagen</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{statusMsj}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}