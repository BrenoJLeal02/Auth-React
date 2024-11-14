import { Button, Icon, useColorMode, Box, useColorModeValue } from '@chakra-ui/react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export default function FixedPlugin(props: { [x: string]: unknown }) {
	const { ...rest } = props;
	const { colorMode, toggleColorMode } = useColorMode();
	const hoverBgColorLight = useColorModeValue('#268a5b', '#444');
	const hoverBgColorDark = useColorModeValue('#AAA', 'brand.400');

	const callFunctionLight = () => {
		if (colorMode === 'dark') {
			return toggleColorMode()
		}
	}

	const callFunctionDark = () => {
		if (colorMode === 'light') {
			return toggleColorMode()
		}
		return
	}

	return (
		<Box
			position='fixed'
			top='0px'
			right='0px'
		>
			<Button
				{...rest}
				width='40px'
				height='40px'
				zIndex='9999'
				variant='no-effects'
				onClick={callFunctionLight}
				size='lg'
				position='relative'
				border={colorMode === 'light' ? '0px solid #000' : '0px'}
				borderRight='0px'
				backgroundColor={colorMode === 'light' ? '#268a5b' : '#000'}
				_hover= {{ bg: hoverBgColorLight }}
				borderRadius='0px'
				padding='0px'
				borderBottomLeftRadius='15px'
			>
				<Icon as={IoMdSunny} h='20px' w='20px' color={colorMode === 'light' ? '#FFF' : '#333'} boxShadow='none' />
			</Button>
			<Button
				{...rest}
				width='40px'
				height='40px'
				zIndex='9999'
				variant='no-effects'
				onClick={callFunctionDark}
				size='lg'
				position='relative'
				border={colorMode === 'light' ? '0px solid #000' : '0px'}
				borderLeft='0px'
				borderRadius='0px'
				_hover= {{ bg: hoverBgColorDark }}
				backgroundColor={colorMode === 'light' ? '#CCC' : 'brand.400'}
				padding='0px'
				borderBottomRightRadius='15px'
			>
				<Icon as={IoMdMoon} h='20px' w='20px' color={colorMode === 'light' ? '#FFF' : '#000'} boxShadow='none' />
			</Button>
		</Box>
	);
}
