import React from 'react'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from './helpers/taskSlice'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const App = () => {
  const dispatch=useDispatch()
  const taskList=useSelector((state)=>state.tasks.task)

  useEffect(()=>{
    dispatch(fetchTasks())
  },[])
  
  console.log(taskList);
  return (
    <div className=''>
      <h1 style={{textAlign:'center',color:'#fff'}} >My-Todos</h1>
      <TodoForm/>
      <TodoList />
    </div>
  )
}

export default App
