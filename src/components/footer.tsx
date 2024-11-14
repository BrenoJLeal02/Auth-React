/* eslint-disable */

import { Flex, Text } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Flex
			right='0px'
			bottom='0px'
			zIndex='999'
			position={{
				base: 'relative'
			}}
			display={{ base: 'block' }}
		>
			<Text
				color={'gray.400'}
				fontSize={'12px'}
				textAlign={{
					base: 'center',
					xl: 'center',
					'2xl': 'center'
				}}>
				{' '}
				&copy; {new Date().getFullYear()}
				<Text as='span' fontWeight='500' ms='4px' color={'gray.400'}>
					CriaBets. All Rights Reserved.
				</Text>
			</Text>
		</Flex>
	);
}
