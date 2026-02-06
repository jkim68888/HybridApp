import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react' 
import WebView from 'react-native-webview'
import { RootStackParams } from '../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { WebViewContext } from '../components/WebViewProvider'

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login'

type Props = NativeStackScreenProps<RootStackParams>;

const LoginScreen = () => {
  const navigation = useNavigation<Props['navigation']>()   
  const context = useContext(WebViewContext)

  useEffect(() => {
    console.log(context?.webViewRefs.current)
  }, [context])
  
  return (
    <View style={styles.safearea}>
      <WebView 
        source={{ uri: LOGIN_URL }} 
        originWhitelist={['http://*', 'https://*', 'about:*']}
        onNavigationStateChange={
          (event) => {
            console.log(event.url)
            if (event.url === 'https://www.naver.com/') {
              if (context?.webViewRefs.current && context?.webViewRefs.current.length > 0) {
                context?.webViewRefs.current.forEach(ref => {
                  ref.reload()
                })
              }
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