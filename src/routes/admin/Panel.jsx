import { Box, Center, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";

export default function Panel() {

    return (
        <>
            <Heading>Panel de admin</Heading>
            <Box padding="20px" height="100%">
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    <Link to="/admin/temas">
                        <GridItem w='100%' h='200px' bg='blue.500'  >
                            <Center h='100%'>
                                <HamburgerIcon w={20} h={20} marginRight="20px" />
                                <Heading>Ver temas</Heading>
                            </Center>
                        </GridItem>
                    </Link>
                    <Link to="/admin/crear">
                        <GridItem w='100%' h='200px' bg='yellow.500' >
                            <Center h='100%'>
                                <AddIcon w={20} h={20} marginRight="20px" />
                                <Heading>Crear tema</Heading>
                            </Center>
                        </GridItem>
                    </Link>
                </Grid>
            </Box>

        </>
    )
}