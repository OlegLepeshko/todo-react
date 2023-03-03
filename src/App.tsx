import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList'
import { v1 } from 'uuid';


export type FilterValueType = 'all' | 'completed' | 'active'

export function App() {

const[tasks, setTasks] = useState<Array<TaskType>>([
  {id: v1(), title: "JS", isDone: true, status: false},
  {id: v1(), title: "React", isDone: true, status: false},
  {id: v1(), title: "HTML&CSS", isDone: true, status: false},
  {id: v1(), title: "Node", isDone: false, status: false},
  {id: v1(), title: "postgreSQL", isDone: true, status: false}
])

console.log(tasks)


let[filter, setFilter] = useState<FilterValueType>('all')
let[toggleClass, setToggleClass] = useState<string>('')

function removeTask(id: string) {
  let filterTasks = tasks.filter(t => t.id !== id)
  setTasks(filterTasks)
  }

function boolChangeHandler ( id: string)  {
    let arrBoolean: Array<TaskType> = tasks.map(t => {
      if(t.id === id) {
        t.isDone ? t.isDone = false : t.isDone = true
      }
      return t;
    })
    setTasks(arrBoolean)
  }

//  const handleClick = (id: string) => {
//     let arr: Array<string> = []
//     if(arr.length !== 0) {
//       setToggleClass(toggleClass = ' active')
//     }else {
//       setToggleClass(toggleClass = '')
//     }

//      let arrHanderClick: Array<TaskType> = tasks.map(t => {
//       if(t.id === id ) {
//          t.status ? t.status = false : t.status = true
//           if(t.status === true) {
//             arr.push(t.id)
//           }
//        }
//       return t
//     })


//     setTasks(arrHanderClick)
//     console.log(arr)

//   }



function addTask(title: string) {
let newTask =  {id: v1(),
               title: title,
               isDone: false,
              status: true}
let newTasks = [newTask, ...tasks]
setTasks(newTasks)
}



function changeFilter(value: FilterValueType) {
  setFilter(value)
}

  let taskForTodolist = tasks
  if(filter === 'completed') {
    taskForTodolist = tasks.filter(t => t.isDone === true)
  }
  if(filter === 'active') {
    taskForTodolist = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className='app'>
       <TodoList
       title='What to learn'
       tasks={taskForTodolist}
       removeTask={removeTask}
       changeFilter={changeFilter}
       addTask={addTask}
       boolChangeHandler={boolChangeHandler}
       />
    </div>

  );
}
