export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export interface Todo {
    id: number
    name: string
    description: string
    active: boolean
    date: Date
    color: string
}

export interface Post {
    id: number
    title: string
    body: string
    userId: number
}
