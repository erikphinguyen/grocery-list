import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import './Tasks.css';
import tasksReducer, { thunkGetTasks, thunkPostTasks, thunkPutTasks, thunkDeleteTasks } from '../../store/tasks';

function Tasks({ user }) {

  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [finishedTasks, setFinishedTasks] = useState([]);

  // get tasks from store
  const [task, setTask] = useState([]);
  const [completed, setCompleted] = useState(false);

  // post task to store
  const [useTask, setUseTask] = useState('');

  // put task
  const [editMode, setEditMode] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [editTask, setEditTask] = useState({
    userId: task.userId,
    task: task.task,
  });

  // GET TASKS
  useEffect(() => {
    dispatch(thunkGetTasks(id))
      .then(res => {
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
    dispatch(thunkPutTasks(data))
      .then(res => {
        dispatch(thunkGetTasks(id))
          .then(res => {
            setTask(res)
            setEditMode(false)
          })
      })
  }

  // DELETE TASK
  const handleDeleteTask = (id) => {
    dispatch(thunkDeleteTasks(id))
      .then(() => {
        let deleteTask = task.filter(task => task.id !== id)
        setTask(deleteTask)
      })
  }

  // save reference for dragItem and dragOverItem
  const dragItem = useRef();
  const dragOverItem = useRef();

  // handle drag sorting
  const handleSort = () => {
    let items = [...task];
    let dragItemIndex = dragItem.current;
    let dragOverItemIndex = dragOverItem.current;
    items.splice(dragOverItemIndex, 0, items.splice(dragItemIndex, 1)[0]);
    setTask(items);
  }

  // handle drag and drop
  const onDragStart = (e, i) => {
    console.log('drag start:', i);
    // e.dataTransfer.setData('id', id);
  }

  const onDragEnter = (e, i) => {
    console.log('drag enter:', i);
  }

  const onDragEnd = (e) => {

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

          {task?.map((task, i) => {
            return (
              task?.userId === user?.id &&
              <div key={task.id} value={task.id}>
                <div
                  draggable='true'
                  onDragStart={(e) => dragItem.current = i}
                  onDragEnter={(e) => dragOverItem.current = i}
                  onDragEnd={handleSort}
                  // onDragOver={(e) => e.preventDefault()}
                  className='tasks-mapped'
                  style={(completed) ? { backgroundColor: 'green', color: 'white', textShadow: '2px 2px 2px black' } : { backgroundColor: 'white' }}
                  // style={(completed && finishedTasks === task.id) ? { backgroundColor: 'green', color: 'white', textShadow: '2px 2px 2px black' } : { backgroundColor: 'white' }}
                  onClick={() => {
                    // do I need to have a completed column in backend?


                    if (!finishedTasks.includes(task.id)) { // if task is not in finishedTasks array, add it
                      finishedTasks.push(task.id) // add task to finishedTasks array
                      console.log('FIRST IF: WHAT IS FINISHED TASKS', finishedTasks)
                      setFinishedTasks(finishedTasks) // update finishedTasks array
                      setCompleted(!completed)
                    }
                    if (finishedTasks.includes(task.id)) {  // if task is already in finishedTasks array, remove it
                      let index = finishedTasks.indexOf(task.id) // find index of task in finishedTasks array
                      finishedTasks.splice(index, 1) // remove task from finishedTasks array
                      console.log('SECOND IF: WHAT IS FINISHED TASKS', finishedTasks)
                      setCompleted(!completed)
                      setFinishedTasks(finishedTasks) // update finishedTasks array
                    }

                    console.log('WHAT IS FINISHED TASKS', finishedTasks)

                  }}
                >
                  <h3>
                    {task.task}
                  </h3>
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
