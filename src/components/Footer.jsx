import {
    Box,
    useColorModeValue,
    Stack,
    Container,
    Text,
} from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-around' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>© 2022 EDUFIN. Todos los derechos reservados</Text>
            </Container>
        </Box>
    )
}