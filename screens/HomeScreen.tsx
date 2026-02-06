import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react' 
import WebView from 'react-native-webview'
import { RouteNames } from '../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../routes'
import { WebViewContext } from '../components/WebViewProvider'

type Props = NativeStackScreenProps<RootStackParams>;

const HomeScreen = ({navigation}: Props) => {
  const context = useContext(WebViewContext)
  
  return (
    <View style={styles.safearea}>
      <WebView
        ref={(ref) => {
          if (ref) {
            context?.addWebViewRef(ref)
          }
        }}
        source={{ uri: 'https://m.naver.com' }}
        originWhitelist={['http://*', 'https://*', 'about:*']}
        onShouldStartLoadWithRequest={request => {
          console.log(request)

          if (request.url.startsWith('https://m.naver.com') || request.mainDocumentURL?.startsWith('http://m.naver.com')) {
            return true
          }
          
          if (request.url != null && request.url.startsWith('https://')) {
            navigation.navigate(RouteNames.BROWSER, { url: request.url })
            return false
          }

          return true
        }}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  safearea: {flex: 1}
})