import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    onSubmit: (todo: any) => void,

}
type InputNewTodoState = {
    value: string
}

export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
        /*  следует добавить this.setState({ value: e.target.value }) ; 
            для того, чтобы при изменении пропска, значение инпута также обновлялось
        */
    }

    /* 
        handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
        
    }
    */

    handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        var val = this.state.value.trim(); // var - устарело и const  в этом случае подходит лучше - const val = this.state.value.trim();

        if (val) { 
            this.props.onSubmit({
                title: this.state.value, // если val(ue) это то, что ввел пользователь, то надо изменять title на val - актуальное значение инпута
                isDone: false,
            });
            this.props.onChange('');
            /*  так же следует обновить state - this.setState({ value: '' }) 
                для того, чтобы инпут был пусть для ввода нового значения после добавления предыдущего.
            */ ;
        }
    }

    render() {
        return (
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
