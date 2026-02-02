import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RootStackParams, RouteNames } from '../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParams>;

const ShoppingScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>ShoppingScreen</Text>
      <TouchableOpacity 
        onPress={() => 
          navigation.navigate(RouteNames.BROWSER, { url: 'https://m.naver.com' })
        }>
        <Text>Go to Browser</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ShoppingScreen

const styles = StyleSheet.create({})