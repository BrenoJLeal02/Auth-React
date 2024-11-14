import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import InputMask from 'react-input-mask';
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
    Alert,
    AlertIcon,
    Text,
    useColorModeValue,
    CloseButton,
} from "@chakra-ui/react";
import DefaultAuth from "../../components/auth";
import illustration from "../../assets/cria_bets.svg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { signUp } from "../../service/Auth";
import { dateValidade } from "../../scripts/validators"
import ConfirmButton from "../../theme/custom/confirmButton";
import NavigationLink from "../../theme/custom/navLink";
import {
    L_BODY, D_BODY,
    L_BG, D_BG, 
    L_TXT_COLOR, D_TXT_COLOR,
    L_STXT_COLOR, D_STXT_COLOR,
    L_DTXT_COLOR, D_DTXT_COLOR
  } from "../../theme/custom/colors"
import { validateName, validateCpf, validateUsername, validatePassword, validatePasswordsMatch} from '../../scripts/validations/signup'
import { errorMessages } from "../../scripts/utils/errors/registerError";
interface ErrorResponse {
    response?: {
        status: number;
        data?: {
            error?: string;
        };
    };
    request?: AxiosRequestConfig;
    message?: string;
}
const Register: React.FC = () => {
    const authBg = useColorModeValue(L_BODY, D_BODY);
    const textColor = useColorModeValue(L_TXT_COLOR, D_TXT_COLOR);
    const textColorSecondary = useColorModeValue(L_STXT_COLOR, D_STXT_COLOR);
    const textColorDetails = useColorModeValue(L_DTXT_COLOR, D_DTXT_COLOR);
    const brandStars = useColorModeValue(L_BG, D_BG);
    const borderColor = useColorModeValue('#E0E5F2', 'rgba(135, 140, 189, 0.3)');
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => setShow(!show);

    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm_password, setConfirmPassword] = useState<string>("");
    const [company] = useState<string>(import.meta.env.VITE_ID_ENTERPRISE as string);
    const [cpf, setCpf] = useState<string>("");
    const [birth_date, setBirth_date] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | boolean>(false);
    
    const navigate = useNavigate();
    const cleanedCpf = cpf.replace(/\D/g, '');

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setIsError(false);
    
        
        if (!email || !password || !confirm_password || !birth_date || !cpf) {
            setIsError("Por favor, preencha os campos em vermelho.");
            setLoading(false);
            return;
        }

        if (!name || !validateName(name)) {
            const errorMessage = !name 
                ? "Por favor, insira seu nome." 
                : "O nome não pode conter caracteres especiais.";
            setIsError(errorMessage);
            setLoading(false);
            return;
        }
        if (!username || !validateUsername(username)) {
            const errorMessage = !username 
                ? "Por favor, insira seu nome." 
                : "O nome de usuário não pode conter espaço";
            setIsError(errorMessage);
            setLoading(false);
            return;
        }


        const passwordError = validatePassword(password);
        if (passwordError) {
            setIsError(passwordError);
            setLoading(false);
            return;
        }
        const passwordsMatchError = validatePasswordsMatch(password, confirm_password);
        if (passwordsMatchError) {
            setIsError(passwordsMatchError);
            setLoading(false);
            return;
        }
    
        try {
            await signUp({
                name,
                password,
                company,
                cpf:cleanedCpf,
                birth_date,
                email,
                username,
                confirm_password
            });
            toast.success("Registro realizado com sucesso!");
            navigate('/');

        } catch (error: any) {
            let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
            if (error.response) {
                if (error.response.status >= 400) {
                    console.log(`error.response.data: ${JSON.stringify(error.response.data)}`)
                    const errorKey = error.response.data?.error || "Erro desconhecido";
                    errorMessage = errorMessages[errorKey] || errorMessage;
                    
                }
            } else if (error.request) {
                errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
            } else {
                errorMessage = "Ocorreu um erro inesperado: " + error.message;
            }
            setIsError(errorMessage);
        } finally {
            setLoading(false);
        }
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
                            Registrar-se
                        </Heading>
                        <Text
                            mb='36px'
                            ms='4px'
                            color={textColorSecondary}
                            fontWeight='400'
                            fontSize='md'>
                            Preencha os campos abaixo para criar sua conta
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
                                {typeof isError === "string" ? isError : "Ajuste os campos em vermelho."}
                                <CloseButton
                                    position="absolute"
                                    right="8px"
                                    top="8px"
                                    onClick={() => setIsError(false)}
                                />
                            </Alert>
                        )}
                        <form onSubmit={onSubmit}>
                            
                            <FormControl>
                                <Box display={"flex"} gap={"8px"} flexDirection="column">
                                    <Box display={"flex"} gap={"8px"}>
                                        <InputGroup size='md' flexDirection="column" flex="1">
                                            <FormLabel
                                                display='flex'
                                                ms='4px'
                                                fontSize='sm'
                                                fontWeight='500'
                                                color={textColor}
                                                mb='8px'>
                                                Nome<Text color={brandStars}>*</Text>
                                            </FormLabel>
                                            <Input
                                                variant='auth'
                                                fontSize='sm'
                                                ms={{ base: "0px", md: "0px" }}
                                                type='text'
                                                placeholder='Nome completo'
                                                mb='24px'
                                                fontWeight='500'
                                                size='lg'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                borderColor={isError && !validateName(name) || isError && !name ? 'red.500' : borderColor}
                                            />
                                        </InputGroup>
                                    </Box>
                                    <Box display={"flex"} gap={"8px"}>
                                        <InputGroup size='md' flexDirection="column" flex="1">
                                            <FormLabel
                                                display='flex'
                                                ms='4px'
                                                fontSize='sm'
                                                fontWeight='500'
                                                color={textColor}
                                                mb='8px'>
                                                CPF<Text color={brandStars}>*</Text>
                                            </FormLabel>
                                            <InputMask
                                            mask={'999.999.999-99'}
                                            type='text'
                                            placeholder='___.___.___-__'
                                            maskChar={null}
                                            style={{
                                                fontSize: '14px',
                                                padding: '10px',
                                                border: '1px solid',
                                                borderColor: (isError && (!validateCpf(cpf) || !cpf)) ? 'red' : borderColor, 
                                                color: textColor,
                                                borderRadius: '16px',
                                                width: '100%',
                                                height: '3rem',
                                                outline: 'none',
                                                backgroundColor: "transparent"
                                            }}
                                            value={cpf}
                                            onChange={(e) => setCpf(e.target.value)}
                                            onBlur={() => {
                                                if (!validateCpf(cpf)) {
                                                    setIsError(true);
                                                } else {
                                                    setIsError(false);
                                                }
                                            }}
                                        />
                                        </InputGroup>
                                        <InputGroup size='md' flexDirection="column" flex="1">
                                            <FormLabel
                                                display='flex'
                                                ms='4px'
                                                fontSize='sm'
                                                fontWeight='500'
                                                color={textColor}
                                                mb='8px'>
                                                Data de Nascimento<Text color={brandStars}>*</Text>
                                            </FormLabel>
                                            <Input
                                                variant='auth'
                                                fontSize='sm'
                                                ms={{ base: "0px", md: "0px" }}
                                                type='date'
                                                placeholder='01/01/2001'
                                                mb='24px'
                                                fontWeight='500'
                                                size='lg'
                                                value={birth_date}
                                                onChange={(e) => dateValidade({value:e.target.value, setDate:setBirth_date})}
                                                borderColor={isError && !birth_date ? 'red.500' : borderColor}
                                            />
                                        </InputGroup>
                                    </Box>
                                    <Box display={"flex"} gap={"8px"}>
                                        <InputGroup size='md' flexDirection="column">
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
                                                borderColor={isError && !email ? 'red.500' : borderColor}
                                            />
                                        </InputGroup>
                                    </Box>
                                    <Box display={"flex"} gap={"8px"}>
                                        <InputGroup size='md' flexDirection="column" flex="1">
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
                                                
                                                variant='auth'
                                                fontSize='sm'
                                                ms={{ base: "0px", md: "0px" }}
                                                type='text'
                                                placeholder='Nome de usuário'
                                                mb='8px'
                                                fontWeight='500'
                                                size='lg'
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                borderColor={isError && !validateUsername(username) || isError && !username ? 'red.500' : borderColor}
                                            />
                                        </InputGroup>
                                    </Box>
                                    <Box display={"flex"} gap={"8px"}>
                                    <InputGroup size='md' flexDirection="column" flex="1" position="relative">
                                        <FormLabel
                                            display='flex'
                                            ms='4px'
                                            fontSize='sm'
                                            fontWeight='500'
                                            color={textColor}
                                            mb='8px'>
                                            Senha<Text color={brandStars}>*</Text>
                                        </FormLabel>
                                        <Input
                                            
                                            variant='auth'
                                            fontSize='sm'
                                            ms={{ base: "0px", md: "0px" }}
                                            type={show ? "text" : "password"}
                                            placeholder='Min. 8 caracteres'
                                            mb='24px'
                                            fontWeight='500'
                                            size='lg'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            borderColor={isError && validatePassword(password) || isError && !password ? 'red.500' : borderColor}
                                        />
                                        <InputRightElement width='3rem' position="absolute" right="0" top="8">
                                            <Icon
                                                color={brandStars}
                                                _hover={{ cursor: "pointer" }}
                                                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                                onClick={handleClick}
                                            />
                                        </InputRightElement>
                                    </InputGroup>

                                    <InputGroup size='md' flexDirection="column" flex="1" position="relative">
                                        <FormLabel
                                            display='flex'
                                            ms='4px'
                                            fontSize='sm'
                                            fontWeight='500'
                                            color={textColor}
                                            mb='8px'>
                                            Repetir Senha<Text color={brandStars}>*</Text>
                                        </FormLabel>
                                        <Input
                                            
                                            variant='auth'
                                            fontSize='sm'
                                            ms={{ base: "0px", md: "0px" }}
                                            type={show ? "text" : "password"}
                                            placeholder='Min. 8 caracteres'
                                            mb='24px'
                                            fontWeight='500'
                                            size='lg'
                                            value={confirm_password}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            borderColor={isError && password !== confirm_password || isError && !confirm_password ? 'red.500' : borderColor}
                                        />
                                        <InputRightElement width='3rem' position="absolute" right="0" top="8">
                                            <Icon
                                                color={brandStars}
                                                _hover={{ cursor: "pointer" }}
                                                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                                onClick={handleClick}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    </Box>
                                    {
                                        ConfirmButton({ loading: loading, text: 'Registrar' })
                                    }
                                </Box>
                            </FormControl>
                        </form>
                        <Flex
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='start'
                            maxW='100%'
                            mt='0px'>
                            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                                Já possui uma conta?&nbsp;
                                { NavigationLink({
                                route: '/',
                                text: 'Entrar'
                                }) }
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </DefaultAuth>
        </Box>
    );
};

export default Register;
