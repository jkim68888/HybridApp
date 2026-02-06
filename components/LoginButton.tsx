import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams, RouteNames } from '../routes'
import { useNavigation } from '@react-navigation/native'
import Cookies from '@react-native-cookies/cookies'
import { useIsFocused } from '@react-navigation/native'
import { WebViewContext } from './WebViewProvider'

type Props = NativeStackScreenProps<RootStackParams>;

const LoginButton = () => {
	const context = useContext(WebViewContext)
	const navigation = useNavigation<Props['navigation']>()
	const isFocused = useIsFocused()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const iconName = isLoggedIn ? "right-from-bracket" : "right-to-bracket"

	useEffect(() => {
		if (isFocused) {
			Cookies.get('https://m.naver.com', true)
				.then(cookie => {
					console.log(cookie)
					if (cookie.NID_SES) {
						setIsLoggedIn(true)
					} else {
						setIsLoggedIn(false)
					}
				})
				.catch((error: Error) => {
					console.error(error)
				})
		}
	}, [isFocused])

	const onPressLogin = useCallback(() => {
		navigation.navigate(RouteNames.LOGIN)
	}, [navigation])

	const onPressLogout = useCallback(async () => {
		await Cookies.clearAll(true)
		setIsLoggedIn(false)
		if (context?.webViewRefs.current && context?.webViewRefs.current.length > 0) {
			context?.webViewRefs.current.forEach(ref => {
				ref.reload()
			})
		}
	}, [context])

	return (
		<TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
			<FontAwesome6 name={iconName} size={20} color="black" iconStyle="solid" />
		</TouchableOpacity>
	)
}

export default LoginButton

const styles = StyleSheet.create({})