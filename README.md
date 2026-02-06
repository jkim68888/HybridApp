# HybridApp : React-Native App with WebView

## 앱 네비게이션 구현

- 탭 네비게이션 : [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator)
- 스크린 네비게이션 : [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator)

## 웹뷰 화면 구현

- 홈 스크린의 웹뷰에 웹사이트 로드 
- 웹사이트 리퀘스트를 처리하여 새로운 스크린으로 이동

## 브라우저 기능 구현

- 현재 접속 중인 웹사이트 정보 나타내기
- 웹사이트 로딩바 구현
- 뒤로가기, 앞으로가기, 새로고침 기능 구현

## 네이티브 기능 구현
- Pull To Refresh 기능 구현 : [React-Native Components > RefreshControl](https://reactnative.dev/docs/refreshcontrol)
- 네이티브 공유 기능 구현 : [React-Native APIs > Share](https://reactnative.dev/docs/share)

## 쿠키 동기화
- 쿠키 관리 라이브러리 : [@react-native-cookies/cookies](https://github.com/react-native-cookies/cookies)
- 로그인 기능 구현
```md
# 쿠키가 없는 경우 프로세스
read 쿠키 -> N -> show 로그인 버튼 -> 로그인 페이지로 이동 -> 웹에서 로그인 완료 -> 웹뷰 새로고침
```
```md
# 쿠키가 있는 경우 프로세스
read 쿠키 -> Y -> show 로그아웃 버튼 -> 쿠키 삭제 -> 웹뷰 새로고침
```

## 전역 상태 관리
- 웹뷰 ref를 전역에서 관리
- [React Native Context](https://ko.react.dev/reference/react/useContext) 사용


## 웹뷰 최적화
- 핀치 줌/아웃 비활성화
- 링크 롱 프레스 시 프리뷰 비활성화
- 안드로이드 백버튼과 웹뷰 연결
- 텍스트 롱 프레스 액션 비활성화


## 스크린샷
![Image](https://github.com/user-attachments/assets/d98f35e8-ea4b-4393-9921-64911bdca31c)




