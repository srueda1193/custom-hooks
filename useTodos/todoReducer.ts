import { Action, InitalState } from "./useTodos";


export const todoReducer = (initialState: InitalState[], action: Action) => {
    switch (action.type) {
        case '[TODO] Add Todo':

            return [...initialState, action.payload];

        case '[TODO] Delete Todo':

            return initialState.filter((todo) => todo.id !== action.payload.id);

        case '[TODO] Toggle Todo':
            return initialState.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                
                return todo;
            })

        default:
            return initialState;
    }
}