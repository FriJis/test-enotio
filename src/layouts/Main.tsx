import {
    AppBar,
    Box,
    Card,
    CardContent,
    Checkbox,
    Drawer,
    FormControlLabel,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Switch,
    Toolbar,
    Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import {
    FC,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { TodosWrapper } from '../components/Todo'
import { StoreTodosContext } from '../ctx/store'
import { Post, Todo } from '../types/main'
import { Settings } from '@mui/icons-material'
import { constSystemMomentFormat, getRandomValueFromArray } from '../utils'
import { useQuery } from '@tanstack/react-query'
import { API } from '../common/api'

export const Main: FC = () => {
    const [todos, setTodos] = useContext(StoreTodosContext)
    const [showSettings, setShowSettings] = useState(false)
    const [showNews, setShowNews] = useState(false)
    const [randomPost, setRandomPost] = useState<Post | null>(null)

    const { data: posts } = useQuery(['posts'], () => API.getPosts())

    useEffect(() => {
        const post = getRandomValueFromArray(posts?.data || [])
        if (!post) return
        setRandomPost(post)
    }, [posts])

    const todayTodos = useMemo(() => {
        return todos.filter(
            (todo) =>
                constSystemMomentFormat(todo.date) ===
                constSystemMomentFormat(new Date())
        )
    }, [todos])

    const todayIsCompleted = useMemo(() => {
        const length = todayTodos.filter((todo) => todo.active).length
        if (length >= todayTodos.length) return true
        return false
    }, [todayTodos])

    const setActive = useCallback(
        (id: number, value: boolean) => {
            setTodos((old) =>
                old.map<Todo>((todo) => {
                    if (todo.id === id) {
                        todo.active = value
                        return todo
                    }
                    return todo
                })
            )
        },
        [setTodos]
    )

    return (
        <>
            <Drawer
                open={showSettings}
                onClose={() => setShowSettings(false)}
                anchor="right"
            >
                <Box sx={{ width: '250px' }}>
                    <List>
                        <ListItem
                            secondaryAction={
                                <Switch
                                    checked={showNews}
                                    onChange={(e) =>
                                        setShowNews(e.target.checked)
                                    }
                                ></Switch>
                            }
                        >
                            <ListItemText>Show news</ListItemText>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">To Do</Typography>
                    <IconButton
                        size="large"
                        sx={{ mr: 2 }}
                        onClick={() => setShowSettings(true)}
                    >
                        <Settings />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ marginTop: '10px' }}>
                <Grid container>
                    <FormControlLabel
                        control={
                            <Checkbox checked={todayIsCompleted} disabled />
                        }
                        label="Today tasks:"
                    />
                </Grid>
                <TodosWrapper todos={todos} onActive={setActive} />
                {showNews && (
                    <Card className="running-line" sx={{ marginTop: '10px' }}>
                        <CardContent className="running-line__inner">
                            {randomPost?.title}: {randomPost?.body}
                        </CardContent>
                    </Card>
                )}
            </Container>
        </>
    )
}
