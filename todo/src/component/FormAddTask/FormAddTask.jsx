import { useEffect, useRef, useState } from "react";
import Button from "../Button";

function FormAddTask({ handleAddTasks }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const handleChangeInput = (e) => {
    const value = e.target.value;
    setText(value);
  };

  const onAddTask = () => {
    if (text) {
      setText("");
      handleAddTasks(text);
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <div className="mt-3 flex">
        <div className="flex-grow">
          <input
            ref={inputRef}
            className="w-full h-full px-2 border rounded"
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAddTask();
              }
            }}
            onChange={handleChangeInput}
            placeholder="Enter new task"
          />
        </div>
        <Button onClick={onAddTask} label="Add" />
      </div>
    </div>
  );
}

export default FormAddTask;
