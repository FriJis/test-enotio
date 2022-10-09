import {
    AccordionDetails,
    AccordionSummary,
    Grid,
    List,
    ListItem,
    ListItemText,
    Switch,
    Typography,
} from '@mui/material'
import moment from 'moment'
import { FC, useCallback, useMemo } from 'react'
import { Todo } from '../types/main'
import _ from 'lodash'
import { constSystemMomentFormat } from '../utils'
import { AccordionStyled } from '../hoc/Accordion'
import { LineStyled } from '../hoc/Line'

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
                                <LineStyled
                                    sx={{
                                        backgroundColor: todo.color,
                                    }}
                                ></LineStyled>
                            </Grid>
                            <Grid item>
                                <Grid container flexDirection={'column'}>
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                textDecoration: todo.active
                                                    ? 'line-through'
                                                    : null,
                                                fontSize: '24px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {todo.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                            }}
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

export const TodosWrapper: FC<{
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
                <AccordionStyled
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
                </AccordionStyled>
            ))}
        </>
    )
}
