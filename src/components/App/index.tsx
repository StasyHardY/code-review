import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';

// Общий комментарий - header и footer лучше разделить по компонентам <Header/>, <Footer/>

function App() {

    /* неправильно использовать тип any в ts, пропишем type/interface для todos
        interface TodosState {
          list: {
            todos: Todo[];
          };
        }

        const todos = useSelector((state: TodosState) => state.list.todos);
    */
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
  return (
      // todo list for users:
    <div className="App main">
      <header className="App-header">
        TODO list with users:

        {/* код не используется? его следует удалить, если код закомментирован для дальнейшей работы и не должен привлекать внимание разработчика при code review, МОЖНО написать комментарий о его важности 
        Также src={logo}, logo нужно получать либо из пропсов компонента, либо другой константы, иначе тут будет всегда alt="logo"
        */}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
        {/* MAIN APP: */}

        {/* название main app не полностью отражает суть приложения, можно было бы назвать TodoApp, TodoList, TodoMain */}
        
        <MainApp todos={todos}/>

        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"} // класс может быть обернут в {} при использовании динамических классов, {`app-footer-link ${someClass}`}, тут же это не обязательно и можно убрать {} для лучшей читаемости
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
