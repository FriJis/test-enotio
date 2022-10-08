import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { StoreTodosContextProvider } from './ctx/store'
import { Main } from './layouts/Main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const queryClient = new QueryClient()

export const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <StoreTodosContextProvider>
                <QueryClientProvider client={queryClient}>
                    <CssBaseline />
                    <Main></Main>
                </QueryClientProvider>
            </StoreTodosContextProvider>
        </ThemeProvider>
    )
}
