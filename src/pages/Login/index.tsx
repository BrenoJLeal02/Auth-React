import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  CloseButton
} from "@chakra-ui/react";
import DefaultAuth from "../../components/auth";
import illustration from "../../assets/cria_bets.svg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { signIn } from "../../service/Auth";
import ConfirmButton from "../../theme/custom/confirmButton";
import NavigationLink from "../../theme/custom/navLink";
import {
  L_BODY, D_BODY,
  L_BG, D_BG, 
  L_TXT_COLOR, D_TXT_COLOR,
  L_STXT_COLOR, D_STXT_COLOR,
  L_DTXT_COLOR, D_DTXT_COLOR
} from "../../theme/custom/colors"

const SignIn: React.FC = () => {
  const authBg = useColorModeValue(L_BODY, D_BODY);
  const textColor = useColorModeValue(L_TXT_COLOR, D_TXT_COLOR);
  const textColorSecondary = useColorModeValue(L_STXT_COLOR, D_STXT_COLOR);
  const textColorDetails = useColorModeValue(L_DTXT_COLOR, D_DTXT_COLOR);
  const brandStars = useColorModeValue(L_BG, D_BG);
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [company] = useState<string>(import.meta.env.VITE_ID_ENTERPRISE as string);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (document.referrer != import.meta.env.VITE_LOCAL_URL) {
      const pagePrevious = document.referrer;
      if (pagePrevious) {
        if (pagePrevious !== localStorage.getItem("pagePrevious")) {
          localStorage.setItem("pagePrevious", pagePrevious );
        }
      }
    } else {
      localStorage.removeItem("pagePrevious")
    }
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setIsError(null);
  
    if (!username || !password) {
      setIsError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }
  
    try {
      const user = await signIn({ username, password, company });
      const redirectUrl = localStorage.getItem("pagePrevious") || import.meta.env.VITE_DEFAULT_REDIRECT;
      window.location.href = `${redirectUrl}?token=${user.token}`;
      
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response: { status: number } };
        switch (err.response.status) {
          case 404:
            setIsError("Usuário e/ou senha inválidos.");
            break;
          case 500:
            setIsError("Erro na conexão com o servidor. Por favor, tente novamente.");
            break;
          default:
            setIsError("Ocorreu um erro inesperado. Por favor, tente novamente.");
            break;
        }
      } else {
        setIsError("Ocorreu um erro inesperado. Por favor, tente novamente.");
      }
      console.error("Erro ao logar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg={authBg}
      float="right"
      minHeight="100vh"
      position="relative"
      w="100%"
      transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
    >
      <DefaultAuth illustrationBackground={illustration} image={illustration} showBackButton={false}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w='100%'
          mx={{ base: "auto", lg: "0px" }}
          me='auto'
         
          alignItems='start'
          justifyContent='center'
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "50px", md: "14vh" }}
          flexDirection='column'>
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Login
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
              Digite seu username e senha para entrar
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
              <Alert status="error" mb="10px" borderRadius="md" position="relative" >
                <AlertIcon />
                {isError}
                <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => setIsError(null)}
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
                  Nome de usuário<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='Nome de usuário'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display='flex'>
                  Senha<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='************'
                    mb='24px'
                    size='lg'
                    type={show ? "text" : "password"}
                    variant='auth'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement display='flex' alignItems='center' mt='4px'>
                    <Icon
                      color={brandStars}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent='space-between' align='center' mb='24px'>
                { NavigationLink({
                  route: '/forgot',
                  text: 'Esqueci minha senha'
                }) }
                </Flex>
                {
                  ConfirmButton({ loading: loading, text: 'Entrar' })
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
};

export default SignIn;
