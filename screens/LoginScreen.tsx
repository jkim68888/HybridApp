import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { RootStackParams } from '../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login'

type Props = NativeStackScreenProps<RootStackParams>;

const LoginScreen = () => {
  const navigation = useNavigation<Props['navigation']>()   

  return (
    <View style={styles.safearea}>
      <WebView source={{ uri: LOGIN_URL }} onNavigationStateChange={
        (event) => {
          console.log(event.url)
          if (event.url === 'https://www.naver.com/') {
            navigation.goBack()
          }
        }
      } 
      />
    </View> 
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
})