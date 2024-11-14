import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Footer from './footer';
import FixedPlugin from './fixedPlugin';
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa';

function AuthIllustration(props: { 
  children: JSX.Element | string; 
  illustrationBackground: string; 
  showBackButton?: boolean;
}) {
  const { children, illustrationBackground, showBackButton = true } = props;
  const navigate = useNavigate();
  const backgroundColor = useColorModeValue(
    "linear-gradient(135deg, #0f404e 0%, #268a4b 100%)",
    "linear-gradient(135deg, #268a4b 0%, #0f404e 100%)"
  );
  
  return (
    <Flex position='relative'h='max-content'>
      <Flex
        h={{
          sm: 'initial',
          md: 'unset',
          lg: '50vh',
          xl: '97vh'
        }}
        w='100%'
        maxW={{
          base: '1440px',
          md: '1440px',
          lg: '1440px'
        }}
        justifyContent='start'
        direction='column'
        boxShadow='none'
      >
        {showBackButton && (
          <Box
            display={{ base: 'block' }}
            marginLeft={{
              md: '52vw',
              lg: '52vw',
              '2xl': '52vw'
            }}
            w={{
              md: '50vw',
              lg: '50vw',
              '2xl': '50vw'
            }}
            height={{
              base: '50px',
              xl: '50px',
              '2xl': '50px'
            }}
            alignContent='center'
          >
            <Button
              onClick={() => navigate('/')}
              bg={'transparent'}
              width={'fit-content'}
              _hover={{
                backgroundColor: 'transparent'
              }}
              boxShadow='none'
            >
              <Flex align='center' ps={{ base: '25px', lg: '0px' }} pt={{ lg: '0px', xl: '0px' }} w='fit-content'>
                <Icon as={FaChevronLeft} me='12px' h='13px' w='8px' color='secondaryGray.6 00' boxShadow='none' />
                <Text ms='0px' fontSize='sm' color='secondaryGray.600' boxShadow='none'>
                  Voltar
                </Text>
              </Flex>
            </Button>
          </Box>
        )}
        <Box
          display={{ base: 'block' }}
          marginLeft={{
            sm: '10vw',
            md: '50vw',
            lg: '50vw',
            xl: '50vw',
            '2xl': '50vw'
          }}
          w={{ lg: '50vw', '2xl': '50vw' }}
          height='auto'
          zIndex='9999'
        >
          <Box paddingLeft={{ lg: '5vw', '2xl': '5vw' }}>
            {children}
            <FixedPlugin boxShadow='none' />
            <Footer />
          </Box>
        </Box>
        <Box
          display={{
            base: 'none',
            md: 'block'
          }}
          minH='100vh'
          w={{
            md: '50vw',
            lg: '50vw',
            '2xl': '50vw'
          }}
          position='fixed'
          boxShadow='none'
        >
          <Flex
            w='100%'
            h='100%'
            position='absolute'
            justifyContent='start'
            direction='column'
            background={backgroundColor}
            borderBottomRightRadius={{
              md: '15%'
            }}
            display={{ base: 'none', md: 'block' }}
          >
            <Box
              display={{
                base: 'none',
                md: 'block',
                sm: 'none'
              }}
              color='white'
              bg={`url(${illustrationBackground})`}
              w='50vw'
              h='15vw'
              bgSize='cover'
              position='absolute'
              top={{
                base: '40%'
              }}
              transform='translate(0%, -50%)'
            >
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

// PROPS
AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any
};

export default AuthIllustration;
