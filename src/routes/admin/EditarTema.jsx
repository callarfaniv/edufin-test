import { Box, Center, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function EditarTema() {

    const location = useLocation()
    const { text } = location.state

    useEffect(() => {
        console.log(text)
    }, [])

    return (
        <>
            <Box padding="20px">
                <Center>
                    <Heading>Hello from edit {text}</Heading>
                </Center>
            </Box>
        </>
    )
}