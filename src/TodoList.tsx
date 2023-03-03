import React, { ChangeEvent, useState, KeyboardEvent} from "react"
import './todolist.css';
import { FilterValueType } from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
  status: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (title: string) => void
  boolChangeHandler: (id: string) => void



}


export function TodoList(props: PropsType) {
const[newTaskTitle, setNewTastTitle] = useState('')



const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
  setNewTastTitle( e.currentTarget.value)
}

const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  if(e.charCode === 13) {
    props.addTask(newTaskTitle)
    setNewTastTitle('')
  }
}

const addTast = () => {
    props.addTask(newTaskTitle)
    setNewTastTitle('')

}

const onAllClickHandler = () => props.changeFilter('all')
const onActiveClickHandler = () => props.changeFilter('active')
const onCompletedClickHandler = () => props.changeFilter('completed')




  return(
    <div className="component">
      <h3>{props.title}</h3>
      <div>
          <input value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyPress={ onKeyPressHandler}
          />
          <button onClick={addTast}>+</button>
      </div>
        <ul>
           {
            props.tasks.map(t => {
             const onRemoveHandler = () => {props.removeTask(t.id)}
             const onChangeHand = () => {props.boolChangeHandler(t.id)}

              return <li key={t.id}>
                       <input type={'checkbox'}
                              checked={t.isDone}
                        onChange={onChangeHand}
                       />
                       <span>{t.title}</span>
                       <button onClick={onRemoveHandler}>X</button>
                     </li>
})
            }

        </ul>
      <div className="list-state">
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>

  )
}
