import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import DefaultAuth from "../../components/auth";
import illustration from "../../assets/cria_bets.svg";
import { forgot } from '../../service/Auth';
import { useState } from "react";
import ConfirmButton from "../../theme/custom/confirmButton";
import NavigationLink from "../../theme/custom/navLink";
import {
  L_BODY, D_BODY,
  L_BG, D_BG, 
  L_TXT_COLOR, D_TXT_COLOR,
  L_STXT_COLOR, D_STXT_COLOR,
  L_DTXT_COLOR, D_DTXT_COLOR
} from "../../theme/custom/colors"

function Forgot() {
  const authBg = useColorModeValue(L_BODY, D_BODY);
  const textColor = useColorModeValue(L_TXT_COLOR, D_TXT_COLOR);
  const textColorSecondary = useColorModeValue(L_STXT_COLOR, D_STXT_COLOR);
  const textColorDetails = useColorModeValue(L_DTXT_COLOR, D_DTXT_COLOR);
  const brandStars = useColorModeValue(L_BG, D_BG);

  const [email, setEmail] = useState<string>("");
  const [company] = useState<string>(import.meta.env.VITE_ID_ENTERPRISE as string);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setIsError(null);

    try {
      const user = await forgot({
        email,
        company,
        username:'',
      });
      navigate('/forgot-confirmado', { state: { token: user.token } });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("404")) {
          setIsError("E-mail não cadastrado.");
        } else if (error.message.includes("500")) {
          setIsError("Erro na conexão com o servidor. Por favor, tente novamente.");
        } else {
          setIsError("Ocorreu um erro inesperado. Por favor, tente novamente.");
        }
      } else {
        setIsError("Ocorreu um erro inesperado. Por favor, tente novamente.");
      }
      console.error("Erro ao recuperar a senha:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setIsError(null);
  };

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
          mt={{ base: "0px", md: "55px" }}
          flexDirection='column'>
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Recuperar Senha
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
              Preencha os campos abaixo para recuperar sua senha
            </Text>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}>
            {isError && (
              <Alert status="error" mb="10px" borderRadius="md" position="relative">
                <AlertIcon />
                {isError}
                <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={handleCloseAlert}
                />
              </Alert>
            )}
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='email'
                  placeholder='mail@criabets.com.br'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {
                  ConfirmButton({ loading: loading, text: 'Recuperar' })
                }
              </FormControl>
            </form>
            
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
              maxW='100%'
              mt='0px'>
              <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                Ainda não possui uma conta?&nbsp;
                { NavigationLink({
                  route: '/registro',
                  text: 'Cadastrar-se'
                  }) }
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </DefaultAuth>
    </Box>
  );
}

export default Forgot;
