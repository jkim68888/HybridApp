export const RouteNames = {
    Home_Tab: 'Home_Tab' as const,
    HOME: 'HomeScreen' as const,
    SHOPPING: 'ShoppingScreen' as const,
    BROWSER: 'BrowserScreen' as const,
    LOGIN: 'LoginScreen' as const,
}

export type RootStackParams = {
    [RouteNames.Home_Tab]: undefined,
    [RouteNames.BROWSER]: {url: string},
    [RouteNames.LOGIN]: undefined,
}