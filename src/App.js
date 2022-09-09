import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ListForm from './components/ListForm';
import TodosList from './components/TodosList';
import { useSpring, animated, config } from "react-spring";


const App = () => {
  const saveState = JSON.parse(localStorage.getItem('todos')) || [];
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState(saveState)
  const [editTodo, setEditTodo] = useState(null)
  const [flip, setFlip] = useState(false);

  const props = useSpring({
    delay: 500,
    from: { opacity: 0, y: 200 },
    to: { opacity: 1, y: 0 },
    config: config.molasses,
    onRest: () => setFlip(!flip),
  });


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <div className='main'>
      <animated.div style={props} className='todoBox'>
        <div className='header'>
          <Header />
        </div>
        <div className='listForm'>
          <ListForm
            todos={todos}
            setTodos={setTodos}
            input={input}
            setInput={setInput}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
        </div>
        <div>
          <TodosList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
        </div>
      </animated.div>
    </div>

  );
}

export default App;
