import { Box, Center, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";


export default function Tema() {
    return (
        <Box w="100%" h="100%" p={4}>
            <Center>
                <Heading>El presupuesto</Heading>
            </Center>
            <br />
            <Grid
                h='100%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} alignContent="center" justifyItems="center">
                    <Center>
                        <Image
                            boxSize="200px"
                            src="https://cdn-icons-png.flaticon.com/512/2679/2679445.png"
                            alt="presupuesto" />
                    </Center>
                </GridItem>
                <GridItem colSpan={4} rowSpan={2} display="flex" alignItems="center" >
                    <Text fontSize="xl">
                        El presupuesto es una herramienta que nos permite saber cuáles son los ingresos y
                        gastos en un tiempo determinado, conocer cuánto se puede destinar al ahorro para el
                        cumplimiento de las metas planteadas, identificar en qué está gastando el dinero,
                        cuánto necesitamos para cubrir nuestras necesidades, determinar en qué está gastando
                        de más y tomar medidas cuando se requiera hacer un recorte de gastos.
                    </Text>
                </GridItem>
            </Grid>
            <br />
            <Center>
                <Heading>Ejemplo</Heading>
            </Center>
        </Box >
    )
}