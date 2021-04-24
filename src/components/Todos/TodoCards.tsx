import { CardColumns } from 'react-bootstrap'
import TodoCard from './Todo/TodoCard'
import React from 'react'
import { Todo } from '../../models/todo'

interface Props {
  tasks: Record<string, Todo>;
  onTaskChecked: (event: React.ChangeEvent<HTMLInputElement> | undefined, id: string) => void;
  onTaskDeleted: (id: string) => void;
  onSelectTask: (id: string) => void;
}

const TodoCards = ({ onTaskChecked, onTaskDeleted, tasks, onSelectTask }: Props) => {
  return (
    <CardColumns>
      {Object.keys(tasks).map((key, idx) => {
        const task = tasks[key]
        return (
          <TodoCard
            key={idx}
            Todo={task}
            onTaskChecked={(event) => onTaskChecked(event, key)}
            onTaskDeleted={() => onTaskDeleted(key)}
            onTaskSelect={onSelectTask}
          />
        )
      })}
    </CardColumns>
  )
}

export default TodoCards
