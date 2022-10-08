import _ from 'lodash'
import moment from 'moment'
import { createContext, FC, PropsWithChildren, useState } from 'react'
import { State, Todo } from '../types/main'

export const StoreTodosContext = createContext<State<Todo[]>>([[], () => {}])

export const StoreTodosContextProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const todos = useState<Todo[]>(
        Array(15)
            .fill('')
            .map<Todo>(() => ({
                name: 'test',
                description: 'test description',
                id: _.random(0, moment().valueOf()),
                active: false,
                date: moment().add(_.random(0, 5), 'days').toDate(),
                color: `rgb(${_.random(0, 255)}, ${_.random(
                    0,
                    255
                )}, ${_.random(0, 255)})`,
            }))
    )

    return (
        <StoreTodosContext.Provider value={todos}>
            {children}
        </StoreTodosContext.Provider>
    )
}
