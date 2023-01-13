import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import './Tasks.css';
import tasksReducer, { thunkGetTasks, thunkPostTasks, thunkPutTasks, thunkDeleteTasks } from '../../store/tasks';

function Tasks({ user }) {

  const { id } = useParams();

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
        // console.log('WHAT IS RES', res)
        // let sortedTasks = res.sort((a, b) => a.id - b.id)
        // console.log('WHAT IS SORTED', sortedTasks)
        setTask(res)
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
      .then(res => {
        console.log('NEWTASK POST: WHAT IS RES', res)
        setAddTask([...task, res])
        setAddTask('')
      })
  }

  // PUT TASK


  {/* {task.map((task) => {
            return (
              <div className='tasks-list-item'>
                <div className='tasks-list-item-text'>
                  <p>{task.task}</p>
                </div>
                <div className='tasks-list-item-buttons'>
                  <button className='tasks-list-item-button'>
                    <i className="fas fa-check"></i>
                  </button>
                  <button className='tasks-list-item-button'>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            )
          }
          )} */}

  return (
    <div className='tasks-container'>
      <div className='tasks-page'>
        <h1 style={{ letterSpacing: '0.05rem' }}>GROCERY LIST</h1>
        <div className='tasks-input-container'>
          <input
            style={{ width: "100%", border: 'none' }}
            type='text'
            placeholder='Add an item here...'
            value={addTask}
            name='task'
            onChange={(e) => setAddTask(e.target.value)}
          />
          <button className='button' onClick={handleNewTask} type='submit'>Submit</button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className='tasks-list'>
          {task.map((task) => {
            return (

              <div key={task.id}>
                <div className='tasks-mapped'>
                  <h3>{task.task}</h3>
                </div>
                <br></br>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tasks;
