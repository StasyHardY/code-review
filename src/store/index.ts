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

/* 
  ОБЩИЕ КОММЕНТАРИИ ПО АРХИТЕКТУРЕ

  Я бы сделал следующую структуру

  src
    components
      App
        App.js
      InputNewTodo
        InputNewTodo.js
      MainApp
        MainApp.js
      UserSelect
        UserSelect.js
    store // разделить экшены и редьюсеры - вроде как правило для архитектуры redux,  в index.js файлах экспортируем все actions/reducers
      actions
        index.js
        todoActions.js
      reducers
        index.js
        todoReducer.js
      index.js
        

    еще я бы, конечно, добавил eslint + prettier, без них никуда и настроил кастомно webpack, нравится там копаться, но в таком проекте это не нужно
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
                case 'CHANGE_TODOS': { /* можно было бы поменять тут change_todos, на update_todos, change говорит о каком то изменении, но о каком именно ? update говорит об обновлении */
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
