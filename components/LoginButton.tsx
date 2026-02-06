import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams, RouteNames } from '../routes'
import { useNavigation } from '@react-navigation/native'

type Props = NativeStackScreenProps<RootStackParams>;

const LoginButton = () => {
	const navigation = useNavigation<Props['navigation']>()

	const isLoggedIn = false 
	const iconName = isLoggedIn ? "right-from-bracket" : "right-to-bracket"

	const onPressLogin = useCallback(() => {
		navigation.navigate(RouteNames.LOGIN)
	}, [navigation])

	const onPressLogout = useCallback(() => {
		navigation.navigate(RouteNames.LOGIN)
	}, [navigation])

	return (
		<TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
			<FontAwesome6 name={iconName} size={20} color="black" iconStyle="solid" />
		</TouchableOpacity>
	)
}

export default LoginButton

const styles = StyleSheet.create({})