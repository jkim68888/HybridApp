import { RefreshControl, ScrollView, StyleSheet, View} from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import { RouteNames } from '../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../routes'
import { WebViewContext } from '../components/WebViewProvider'

type Props = NativeStackScreenProps<RootStackParams>;

const SHOPPING_URL = 'https://shopping.naver.com/'

const ShoppingScreen = ({navigation}: Props) => {
  const context = useContext(WebViewContext)
  const [refreshing, setRefreshing] = useState(false)
  const webViewRef = useRef<WebView | null>(null)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      webViewRef.current?.reload()
    }, 1000)
  }

  return (
    <View style={styles.safearea}>
      <ScrollView 
        contentContainerStyle={styles.contentContainerStyle}  
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <WebView
          ref={(ref) => {
            if (ref) {
              context?.addWebViewRef(ref)
            }
          }}
          source={{ uri: SHOPPING_URL }}
          originWhitelist={['http://*', 'https://*', 'about:*']}
          onShouldStartLoadWithRequest={request => {
            console.log(request)

            if (request.url.startsWith(SHOPPING_URL) || request.mainDocumentURL?.startsWith(SHOPPING_URL)) {
              return true
            }
            
            if (request.url != null && request.url.startsWith('https://')) {
              navigation.navigate(RouteNames.BROWSER, { url: request.url })
              return false
            }

            return true
          }}
          onLoad={() => {
            setRefreshing(false)
          }}
          startInLoadingState={true}
          renderLoading={() => <></>}
        />
      </ScrollView>
    </View>
  )
}

export default ShoppingScreen

const styles = StyleSheet.create({
  safearea: {flex: 1},
  contentContainerStyle: {flex: 1}
})