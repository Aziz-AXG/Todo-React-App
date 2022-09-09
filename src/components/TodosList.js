import React, { useState } from 'react'
import { AiOutlineFileDone, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useSpring, animated, config } from "react-spring";

const TodosList = ({ todos, setTodos, setEditTodo }) => {
            const donetodo = (todo) => {
                        setTodos(
                                    todos.map((item) => {
                                                if (item.id === todo.id) {
                                                            return { ...item, completedTodo: !item.completedTodo };
                                                } else {
                                                            return item;
                                                }
                                    })
                        )
            }

            const handleEdit = ({ id }) => {
                        const findit = todos.find((todo) => todo.id === id)
                        setEditTodo(findit)
            }

            const deletetodo = ({ id }) => {
                        setTodos(todos.filter((todo) => todo.id !== id));
            }

            const [flip, setFlip] = useState(false);

            const props = useSpring({
                        delay: 3000,
                        from: { opacity: 0, y: 200 },
                        to: { opacity: 1, y: 0 },
                        config: config.molasses,
                        onRest: () => setFlip(!flip),
            });


            return (
                        <animated.div style={props}>
                                    {todos.map((todo) => (
                                                <div key={todo.id} className='todoList'>
                                                            <input value={todo.title}
                                                                        className={`${todo.completedTodo ? "completedTodo" : "notDoneList"}`}
                                                                        onChange={(event) => event.preventDefault()}
                                                            />
                                                            <div>
                                                                        <button className='doneBtn' onClich={() => donetodo(todo)}>
                                                                                    <AiOutlineFileDone />
                                                                        </button>
                                                                        <button className='editBtn' onClick={() => handleEdit(todo)}>
                                                                                    <AiOutlineEdit />
                                                                        </button>
                                                                        <button className='deleteBtn' onClick={() => deletetodo(todo)}>
                                                                                    <AiOutlineDelete />
                                                                        </button>
                                                            </div>


                                                </div>
                                    ))
                                    }
                        </animated.div>
            )
}

export default TodosList