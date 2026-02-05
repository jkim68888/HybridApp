import { RefreshControl, ScrollView, StyleSheet} from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { RouteNames } from '../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../routes'

type Props = NativeStackScreenProps<RootStackParams>;

const SHOPPING_URL = 'https://shopping.naver.com/'

const ShoppingScreen = ({navigation}: Props) => {
  const [refreshing, setRefreshing] = useState(false)
  const webViewRef = useRef<WebView>(null)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      webViewRef.current?.reload()
    }, 1000)
  }

  return (
    <SafeAreaView style={styles.safearea} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.contentContainerStyle}  
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <WebView
          ref={webViewRef}
          source={{ uri: SHOPPING_URL }}
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
    </SafeAreaView>
  )
}

export default ShoppingScreen

const styles = StyleSheet.create({
  safearea: {flex: 1},
  contentContainerStyle: {flex: 1}
})