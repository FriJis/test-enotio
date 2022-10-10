import {
    AccordionDetails,
    AccordionSummary,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material'
import moment from 'moment'
import { FC, useCallback, useMemo } from 'react'
import { Todo } from '../types/main'
import _ from 'lodash'
import { constSystemMomentFormat } from '../utils'
import { AccordionStyled } from '../hoc/Accordion'
import { LineStyled } from '../hoc/Line'
import { IOSSwitch } from '../hoc/Switch'
import { ExpandMore } from '@mui/icons-material'

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
                        <IOSSwitch
                            checked={todo.active}
                            onChange={(e) =>
                                setActive(todo.id, e.target.checked)
                            }
                        />
                    }
                    key={todo.id}
                >
                    <ListItemIcon>
                        <LineStyled
                            sx={{
                                backgroundColor: todo.color,
                            }}
                        ></LineStyled>
                    </ListItemIcon>

                    <ListItemText
                        primary={
                            <Typography
                                sx={{
                                    textDecoration: todo.active
                                        ? 'line-through'
                                        : 'none',

                                    fontSize: '24px',
                                }}
                            >
                                {todo.name}
                            </Typography>
                        }
                        secondary={todo.description}
                        secondaryTypographyProps={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            paddingRight: '50px',
                            fontSize: '14px',
                        }}
                    ></ListItemText>
                </ListItem>
            ))}
        </List>
    )
}

export const TodosWrapper: FC<{
    todos: Todo[]
    onActive?: (id: number, value: boolean) => void
}> = ({ todos, onActive }) => {
    const dates = useMemo(() => {
        return Array.from(
            new Set(
                _.sortBy(todos, (todo) => moment(todo.date).valueOf()).map(
                    (todo) => constSystemMomentFormat(todo.date)
                )
            )
        )
    }, [todos])

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
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Grid container alignItems={'center'}>
                            <Grid item>
                                <LineStyled
                                    sx={{ backgroundColor: '#A9A9A9' }}
                                ></LineStyled>
                            </Grid>
                            <Grid item>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '24px',
                                        lineHeight: '28px',
                                    }}
                                >
                                    {moment(date).format('DD/MM')} Tasks
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
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
