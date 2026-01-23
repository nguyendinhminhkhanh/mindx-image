import { useState } from "react";
import Button from "../Button";
import clsx from "clsx";
function TaskList({ tasks, handleDeleteTask }) {

    const clsList = clsx({
        'border': tasks.length > 0,
        'divide-y divide-gray-100 mt-8': true
    })
    return (
        <ul className={clsList}>
            {tasks.map((task, idx) => {
                return (
                    <li className="p-2 flex" key={idx}>
                        <div className="mr-2 inline-flex items-center">
                            {task.content}
                        </div>
                        <Button label="DELETE" onClick={() => handleDeleteTask(idx)} variant="danger" />
                    </li>
                )
            })}
        </ul>
    )

}

export default TaskList;