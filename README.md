# HybridApp

### React-Native App with WebView

## 앱 네비게이션 구현

- 탭 네비게이션 : [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator)
- 스크린 네비게이션 : [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator)

## 웹뷰 화면 구현

- 홈 스크린의 웹뷰에 웹사이트 로드 
- 웹사이트 리퀘스트를 처리하여 새로운 스크린으로 이동
```tsx
<WebView 
   source={{ uri: 'https://m.naver.com' }}
   onShouldStartLoadWithRequest={request => {
      console.log(request)

      if (request.url.startsWith('https://m.naver.com') || 
         request.mainDocumentURL?.startsWith('http://m.naver.com')) {
         return true
      }
      
      if (request.url != null && request.url.startsWith('https://')) {
         navigation.navigate(RouteNames.BROWSER, { url: request.url })
         return false
      }

      return true
   }}
/>
```

## 브라우저 기능 구현

- 현재 접속 중인 웹사이트 정보 나타내기
- 웹사이트 로딩바 구현
- 뒤로가기, 앞으로가기, 새로고침 기능 구현
```tsx
const { url } = route.params
const [currentUrl, setCurrentUrl] = useState(url)
const urlTitle = useMemo(() => {
   return currentUrl.replace('https://', '').split('/')[0]
}, [currentUrl])

const progress = useRef(new Animated.Value(0)).current

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
```



