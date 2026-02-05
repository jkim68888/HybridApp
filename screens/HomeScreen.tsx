import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { RouteNames } from '../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../routes'

type Props = NativeStackScreenProps<RootStackParams>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.safearea} edges={['top']}>
      <WebView sou
        source={{ uri: 'https://m.naver.com' }}
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
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  safearea: {flex: 1}
})