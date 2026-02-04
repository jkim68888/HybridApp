import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../routes'
import { Animated } from 'react-native'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import type { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6'

type Props = NativeStackScreenProps<RootStackParams, 'BrowserScreen'>;

const NavButton = ({
  iconName,
  disabled,
  onPress,
}: {
  iconName: FontAwesome6SolidIconName
  disabled?: boolean
  onPress: () => void
}) => {
  return (
    <TouchableOpacity style={styles.button} disabled={disabled} onPress={onPress}>
      <FontAwesome6 name={iconName} size={20} color={disabled ? 'lightgray' : 'black'} iconStyle="solid" />
    </TouchableOpacity>
  )
}

const BrowserScreen = ({ route, navigation }: Props) => {
  const { url } = route.params
  const [currentUrl, setCurrentUrl] = useState(url)
  const urlTitle = useMemo(() => {
    return currentUrl.replace('https://', '').split('/')[0]
  }, [currentUrl])
  const progress = useRef(new Animated.Value(0)).current
  const webViewRef = useRef<WebView>(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.header}>
        <Text>{urlTitle}</Text>
      </View>
      <View style={styles.loadingBarBackground}>
        <Animated.View style={[styles.loadingBar, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
      </View>
      <WebView 
        ref={webViewRef}
        source={{ uri: url }} 
        onNavigationStateChange={(event) => {
          setCurrentUrl(event.url)
          setCanGoBack(event.canGoBack)
          setCanGoForward(event.canGoForward)
        }}
        onLoadProgress={({ nativeEvent }) => {
          console.log(nativeEvent.progress)
          progress.setValue(nativeEvent.progress)
        }}
        onLoadEnd={() => {
          progress.setValue(0)
        }}
      />
      <View style={styles.navigator}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <View style={styles.naverIconOutline}>
            <Text style={styles.naverIconText}>N</Text>
          </View>
        </TouchableOpacity>
        <NavButton iconName="arrow-left" disabled={!canGoBack} onPress={() => webViewRef.current?.goBack()} />
        <NavButton iconName="arrow-right" disabled={!canGoForward} onPress={() => webViewRef.current?.goForward()} />
        <NavButton iconName="arrow-rotate-right" onPress={() => webViewRef.current?.reload()} />
      </View>
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
  navigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 40,
  },
  button: {
    width: 30,
    height: 30,
  },
  naverIconOutline: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverIconText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold', 
  },
})