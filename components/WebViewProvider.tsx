import React, {createContext, MutableRefObject, ReactNode, useRef} from 'react'
import WebView from 'react-native-webview'

interface WebViewContextType {
  webViewRefs: MutableRefObject<WebView[]>
	addWebViewRef: (ref: WebView) => void
}

const WebViewContext = createContext<WebViewContextType | undefined>(undefined)

const WebViewProvider = ({children}: {children: ReactNode}) => {
	const webViewRefs = useRef<WebView[]>([])
	const addWebViewRef = (ref: WebView) => {
		webViewRefs.current.push(ref)
	}

  return (
    <WebViewContext.Provider value={{webViewRefs, addWebViewRef}}>
      {children}
    </WebViewContext.Provider>
  )
}

export {WebViewProvider, WebViewContext}
