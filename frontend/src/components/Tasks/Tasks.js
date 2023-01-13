import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import './Tasks.css';
import { thunkGetTasks, thunkPostTasks, thunkPutTasks, thunkDeleteTasks } from '../../store/tasks';

function Tasks({ user }) {

  const {id} = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  // get tasks from store
  const [task, setTask] = useState([]);

  // post task to store
  const [addTask, setAddTask] = useState('');


  const [errors, setErrors] = useState([]);

  // GET TASKS
  useEffect(() => {
    dispatch(thunkGetTasks(user.id)) // user.id is a number while id is a string, why is that okay?
      .then(res => {
        console.log('what is res GET TASKS', res)
      })
  }, [dispatch])

  // POST TASK
  const handleNewTask = async (e) => {
    e.preventDefault();

    const newTask = {
      userId: user.id,
      task: addTask,
    }

    dispatch(thunkPostTasks(newTask))
      .then(res =>
        console.log('what is res POST TASKS', res)
        // setAddTask([...addTask, res])
      )
  }

  // PUT TASK



  return (
    <div className='tasks-container'>
      <div className='tasks-page'>
        <h1 style={{ letterSpacing: '0.05rem' }}>GROCERY LIST</h1>
        <div className='tasks-input-container'>
          <input
            style={{ width: "100%" }}
            type='text'
            placeholder='Add an item'
          />
        </div>
        <br></br>
        <div className='tasks-list'>
          <h3>World</h3>
        </div>
      </div>
    </div>
  )
}

export default Tasks
