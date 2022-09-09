import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSpring, animated, config } from "react-spring";

const ListForm = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {

            const updateTodo = (title, id, completedTodo) => {
                        const newTodo = todos.map((todo) =>
                                    todo.id === id ? { title, id, completedTodo } : todo
                        )
                        setTodos(newTodo);
                        setEditTodo('');

            };

            useEffect(() => {
                        if (editTodo) {
                                    setInput(editTodo.title);
                        } else {
                                    setInput('');

                        }
            }, [setInput, editTodo])

            const onInputChange = (event) => {
                        setInput(event.target.value);
            }

            const onSubmitList = (event) => {
                        event.preventDefault();
                        if (!editTodo) {

                                    setTodos([...todos, { id: uuidv4(), title: input, completedTodo: false }])
                                    setInput('');
                        } else {
                                    updateTodo(input, editTodo.id, editTodo.completedTodo)
                        }

            }

            const [flip, setFlip] = useState(false);

            const props = useSpring({
                        delay: 2500,
                        from: { opacity: 0, y: 200 },
                        to: { opacity: 1, y: 0 },
                        config: config.molasses,
                        onRest: () => setFlip(!flip),
            });


            return (
                        <animated.form style={props} onSubmit={onSubmitList} >
                                    <input type='text'
                                                placeholder='Enter a todo list'
                                                value={input}
                                                onChange={onInputChange}
                                                required
                                                className='input-todo-list' />
                                    <button className='todo-button' type='submit' >{!editTodo ? 'Add' : 'OK'}</button>

                        </animated.form>
            )
}

export default ListForm