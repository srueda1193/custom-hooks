import { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer';


export interface InitalState {
    id: number;
    description: string,
    done: boolean
}

export interface Action {
    type: string,
    payload: InitalState
}

const initialState: InitalState[] = [];

const init: any = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])


    const handleNewTodo = (todo: InitalState) => {
        const action: Action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (todo: InitalState) => {
        const action: Action = {
            type: '[TODO] Delete Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleToggleTodo = (todo: InitalState) => {

        const action: Action = {
            type: '[TODO] Toggle Todo',
            payload: todo
        }

        dispatch(action);
    }

    return {
        todos,
        todosCount : todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
