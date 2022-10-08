import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    List,
    ListItem,
    ListItemText,
    Switch,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import { FC, useCallback, useMemo } from 'react'
import { Todo } from '../types/main'
import _ from 'lodash'
import { constSystemMomentFormat } from '../utils'

export const Todos: FC<{
    todos: Todo[]
    onActive?: (id: number, value: boolean) => void
}> = ({ todos, onActive }) => {
    const setActive = useCallback(
        (id: number, value: boolean) => {
            if (onActive) onActive(id, value)
        },
        [onActive]
    )
    return (
        <List>
            {todos.map((todo) => (
                <ListItem
                    secondaryAction={
                        <Switch
                            checked={todo.active}
                            onChange={(e) =>
                                setActive(todo.id, e.target.checked)
                            }
                        />
                    }
                    key={todo.id}
                >
                    <ListItemText>
                        <Grid container>
                            <Grid item>
                                <Box
                                    sx={{
                                        height: '100%',
                                        width: '2px',
                                        backgroundColor: todo.color,
                                        marginRight: '5px',
                                    }}
                                ></Box>
                            </Grid>
                            <Grid item>
                                <Grid container flexDirection={'column'}>
                                    <Grid item>
                                        <Typography
                                            variant={'h5'}
                                            sx={{
                                                textDecoration: todo.active
                                                    ? 'line-through'
                                                    : null,
                                            }}
                                        >
                                            {todo.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            {todo.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    )
}

export const TodoWrappers: FC<{
    todos: Todo[]
    onActive?: (id: number, value: boolean) => void
}> = ({ todos, onActive }) => {
    const dates = useMemo(
        () =>
            Array.from(
                new Set(
                    _.sortBy(todos, (todo) => moment(todo.date).valueOf())
                        .map((todo) => constSystemMomentFormat(todo.date))
                        .values()
                )
            ),
        [todos]
    )

    const collectionByDate = useMemo(() => {
        return todos.reduce<Map<string, Todo[]>>((acc, todo) => {
            const currentDate = constSystemMomentFormat(todo.date)
            const currentTodos = acc.get(currentDate)
            if (!currentTodos) return acc.set(currentDate, [todo])
            return acc.set(currentDate, [...currentTodos, todo])
        }, new Map(dates.map((date) => [date, []])))
    }, [dates, todos])

    return (
        <>
            {dates.map((date) => (
                <Accordion
                    key={date}
                    defaultExpanded={
                        constSystemMomentFormat(new Date()) === date
                    }
                >
                    <AccordionSummary>{date} Tasks</AccordionSummary>
                    <AccordionDetails>
                        <Todos
                            onActive={onActive}
                            todos={collectionByDate.get(date) || []}
                        ></Todos>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}
