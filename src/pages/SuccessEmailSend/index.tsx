import React from "react";
import { Box, Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import DefaultAuth from "../../components/auth";
import illustration from "../../assets/cria_bets.svg";

const openInNewTab = (url: string): void => {
  window.open(url, "_blank");
};
const SuccessEmailSend: React.FC = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const authBg = useColorModeValue('white', 'navy.900');

  return (
    <Box
      bg={authBg}
      float="right"
      minHeight="100vh"
      height="100%"
      position="relative"
      w="100%"
      transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      transitionDuration=".2s, .2s, .35s"
      transitionProperty="top, bottom, width"
      transitionTimingFunction="linear, linear, ease"
    >
      <DefaultAuth illustrationBackground={illustration} image={illustration}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w='100%'
          mx={{ base: "auto", lg: "0px" }}
          me='auto'
          h='100%'
          alignItems='start'
          justifyContent='center'
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "55px" }}
          flexDirection='column'
        >
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              E-mail enviado
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'
            >
              E-mail de recuperação de senha enviado com sucesso
            </Text>
          </Box>
          <Flex
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx='auto'
            mb={{ base: "20px", md: "auto" }}
          >
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              mt='0px'
            >
              <Text color={textColorDetails} fontWeight='400' fontSize='16px' mb='20px'>
                Senha enviada para o seu e-mail, confira na caixa de entrada e no spam.
              </Text>
              <Flex
                direction='row'
                justify='center'
                align='center'
                mt='20px'
              >
                <Button
                  colorScheme="black"
                  onClick={() => openInNewTab("https://mail.google.com")}
                  aria-label="Abrir Gmail"
                  variant="outline"
                  size="lg"
                  p={4}
                  minWidth="120px"
                  minHeight="50px"
                  mr='10px'
                >
                  <FaGoogle size="24px" />
                </Button>
                <Button
                  colorScheme="black"
                  onClick={() => openInNewTab("https://outlook.com")}
                  aria-label="Abrir Outlook"
                  variant="outline"
                  size="lg"
                  p={4}
                  minWidth="120px"
                  minHeight="50px"
                >
                  <FaMicrosoft size="24px" />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </DefaultAuth>
    </Box>
  );
};

export default SuccessEmailSend;
