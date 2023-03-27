import { configureStore } from '@reduxjs/toolkit'

// IDE ругается на action type, что логично, я попробую описать типы для action, не уверен, что это обязательно
/*

interface AddTodoAction {
  type: 'ADD_TODO';
  payload: some type action;
}

interface RemoveTodoAction {
  type: 'REMOVE_TODO';
  payload: some type action;
}

interface ChangeTodosAction {
  type: 'CHANGE_TODOS';
  payload: some type action[];
}

interface TodoState {
  todos: [];
}

type TodoActionTypes = AddTodoAction | RemoveTodoAction | ChangeTodosAction;

interface TodoState {
  todos: some type todos[];
}


так же, немного неправильно прописывать initialState таким образом
Лучше делать так:

const initialState: TodoState = {
  todos: [],
};

таким образом, запись типов будет такая:
state = initialState, action: TodoActionTypes): TodoState

*/

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {
                    // в es6 появилась классная возможность, как оператор расширения {...}
                    const newState = state; 
                    // Думаю, это неправильное копирование, тут мы создаем ссылку на обьект, если изменим newState, изменится и исходный state. Поэтому оператор {...} тут очень кстати, при создании нового объекта состояния, который содержит все из state,
                    // const newState = { ...state };
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
