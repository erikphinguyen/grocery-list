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
  const [useTask, setUseTask] = useState('');

  // put task
  const [editMode, setEditMode] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [editTask, setEditTask] = useState({
    userId: task.userId,
    task: task.task,
  });


  const [errors, setErrors] = useState([]);

  // GET TASKS
  useEffect(() => {
    dispatch(thunkGetTasks(id)) // user.id is a number while id is a string, why is that okay?
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
      task: useTask,
    }

    dispatch(thunkPostTasks(newTask))
      .then(res => {
        console.log('NEWTASK POST: WHAT IS RES', res)
        setUseTask([...task, res])
        setUseTask('')
        setTask([...task, res])
      })
  }

  // PUT TASK
  const handleEditTask = e => {
    e.preventDefault();

    let data = {
      id: selectedEdit,
      ...editTask,
    }
    console.log('AM I IN HANDLE EDIT TASK?')
    dispatch(thunkPutTasks(data))
      .then(res => {
        console.log('EDIT TASK PUT: WHAT IS RES', res)
        dispatch(thunkGetTasks(id))
          .then(res => {
            setTask(res)
            setEditMode(false)
          })
      })
  }

  // DELETE TASK
  const handleDeleteTask = (id) => {
    console.log('WHAT IS ID', id)
    dispatch(thunkDeleteTasks(id))
      .then(() => {
        let deleteTask = task.filter(task => task.id !== id)
        console.log('WHAT IS DELETE TASK', deleteTask)
        setTask(deleteTask)
      })
  }

  return (
    <div className='tasks-container'>
      <div className='tasks-page'>
        <h1 style={{ letterSpacing: '0.05rem' }}>GROCERY LIST</h1>
        <div className='tasks-input-container'>
          <input
            style={{ width: "100%", border: 'none' }}
            type='text'
            placeholder='Add an item here...'
            value={useTask}
            name='task'
            onChange={(e) => setUseTask(e.target.value)}
          />
          <button className='button' onClick={handleNewTask} type='submit'>Submit</button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className='tasks-list'>
          {console.log('WAHT IS TASK IN JSX', task)}
          {task?.map((task) => {
            return (
              <div key={task.id} value={task.id}>
                <div className='tasks-mapped'>
                  <h3>{task.task}</h3>
                </div>
                <button className='button' onClick={() => {
                  setSelectedEdit(task.id)
                  setEditMode(true)
                }}>
                  Edit
                </button>
                <button className='button' onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <br></br>
                <br></br>
                {
                  (editMode && selectedEdit === task.id) && (
                    <>
                      <div >
                        <input
                          type='text'
                          placeholder='Edit task here...'
                          value={editTask.task}
                          name='task'
                          onChange={(e) => setEditTask({ ...editTask, task: e.target.value })}
                        />
                        <button className='button' onClick={handleEditTask}>Save</button>
                      </div>
                      <br></br>
                    </>
                  )
                }
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tasks;
