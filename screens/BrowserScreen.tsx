import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../routes'
import { useState } from 'react'
import { Animated } from 'react-native'

type Props = NativeStackScreenProps<RootStackParams, 'BrowserScreen'>;

const BrowserScreen = ({ route }: Props) => {
  const { url } = route.params
  const [currentUrl, setCurrentUrl] = useState(url)
  const urlTitle = useMemo(() => {
    return currentUrl.replace('https://', '').split('/')[0]
  }, [currentUrl])

  const progress = useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.header}>
        <Text>{urlTitle}</Text>
      </View>
      <View style={styles.loadingBarBackground}>
        <Animated.View style={[styles.loadingBar, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
      </View>
      <WebView 
        source={{ uri: url }} 
        onNavigationStateChange={({ url }) => setCurrentUrl(url)} 
        onLoadProgress={({ nativeEvent }) => {
          console.log(nativeEvent.progress)
          progress.setValue(nativeEvent.progress)
        }}
        onLoadEnd={() => {
          progress.setValue(0)
        }}
      />
    </SafeAreaView>   
  )
}

export default BrowserScreen

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBarBackground: {
    height: 2,
    backgroundColor: 'white',
  },
  loadingBar: {
    height: 2,
    backgroundColor: 'blue',
  },
})