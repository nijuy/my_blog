import React, { useState } from 'react';

import Form from './Todos/Form';
import TdTemplate from './Todos/TdTemplate';
import TdList from './Todos/TdList';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Todo.css';

const Todo = () => {
    let date = new Date();
    const [value, onChange] = useState(date);
    
    let id = 0;
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);

    const handleChange = (e) => {
        setInput(e.target.value);
    }
    
    const handleCreate = () => {
        const newinput = input;
        const newtodo = todos;
        let space = 0;
    
        for(let i of newinput){
          if(i === ' ')
            space += 1;
        }
    
        if(space === newinput.length)
          setInput('');
    
        else {
          setInput('');
          console.log('1:',id);
          setTodos(newtodo.concat({ id : id++, text : input, checked : false }));
          console.log('2:',id);
        }
    }
    
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
          handleCreate();
        }
    }
    
    const handleToggle = (id) => {
        const newtodos = todos;
        
        const ind = newtodos.findIndex(i => i.id === id);
        const selected = newtodos[ind];
        const nextTd = [...newtodos];
    
        nextTd[ind] = { ...selected, checked : !selected.checked };
        setTodos(nextTd);
    }
    
    const handleRemove = (id) => {
        const td = todos;
        setTodos(td.filter(i => i.id !== id));
    }

    return(
        <div className = 'todobox'>
            <Calendar
                    onChange = {onChange}
                    value = {value}
                />
            <div className = 'realtodobox'>
                <p className = 'title2'> 오늘 할 일 </p>
                <TdTemplate 
                        form = { 
                            <Form 
                                value = { input }  
                                onChange = { handleChange }
                                onCreate = { handleCreate }
                                onKeyPress = { handleKeyPress }
                            /> 
                        }>
                        <TdList 
                            todos = { todos } 
                            onToggle = { handleToggle } 
                            onRemove = { handleRemove }
                        />
                    </TdTemplate>
            </div>
        </div>
    );
}

export default Todo;