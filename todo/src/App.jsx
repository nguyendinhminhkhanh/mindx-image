
import { useEffect, useMemo, useState } from 'react'

import FormAddTask from './component/FormAddTask';
import TaskList from './component/TaskList/TaskList';
function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return [];
    return JSON.parse(storedTasks);
  })


  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  const handleAddTasks = (text) => {
    console.log("Thêm thành công tasks", text)
    setTasks(preTasks => [...preTasks, { content: text, isCompleted: false }]);
  }

  const title = useMemo(() => {
    const unCompletedTasks = tasks.filter(task => !task.isCompleted)
    return unCompletedTasks.length > 0 ? `There is ${unCompletedTasks.length} tasks to done` : `All tasks is done`
  }, [tasks]);



  const handleDeleteTask = (idx) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== idx))
  }

  return (
    <div className="container mx-auto">
      {/* //FormAddTask */}
      <FormAddTask handleAddTasks={handleAddTasks} />

      {/* //title */}
      <div className="my-2">{title}</div>

      {/* Tastlist */}
      <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} />
    </div>
  )
}

export default App 
