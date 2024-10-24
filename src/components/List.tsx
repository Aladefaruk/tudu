import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import SB from "../assets/sponegbob.jpg";

interface TaskType {
  _id: string;
  title: string;
  completed: boolean;
}

interface ListProps {
  loading: boolean,
  list: {
    name: string;
    tasks: TaskType[];
  };
  handleTaskAddition: (newTask: TaskType) => void;
  handleDeleteTask: (taskId: string) => void;
  handleToggleTaskCompletion: (taskId: string) => void;
}

const List: React.FC<ListProps> = ({
  loading,
  list,
  handleTaskAddition,
  handleDeleteTask,
  handleToggleTaskCompletion,
}) => {
  const [newTask, setNewTask] = useState<TaskType>({
    _id: "",
    title: "",
    completed: false,
  });

  const addTask = () => {
    if (newTask.title.trim() === "") return; // Prevent adding empty tasks
    handleTaskAddition({ ...newTask });
    setNewTask({
      _id: "",
      title: "",
      completed: false,
    });
  };

  return (
    <div className="w-full">
      <div className="w-full flex">
        <div className="bg-[#323232] h-[100vh] w-full lg:w-1/2 p-5">
          <h3 className="text-lg mb-1 text-[#fff]">Add new task</h3>

          <div className="mb-2 flex items-center">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="New Task Title"
              className="border rounded p-1 px-2 outline-none h-[30px] w-4/5 md:w-1/2 lg:w-1/3 text-[14px]"
            />
            <button
              onClick={addTask}
              className="bg-[#717171] text-white p-1 rounded ml-2 w-[120px]"
            >
              Add +
            </button>

          </div>

          <p className="mt-10 mb-5 text-[#fff]">You can prioritize task by dragging them up or down on the list 😉</p>
          <div className="border-[0.5px] border-[#fff] rounded-md p-3 -10">
            {
              loading ? <h1 className="text-[#fff] font-[500] flex text-center py-5">Loading...</h1> :

                list.tasks.length === 0 ? <h1 className="text-[#fff] font-[500] flex text-center py-5">No Task Added</h1> : list.tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white border rounded p-2 mb-2 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTaskCompletion(task._id)}
                        className="mr-2"
                      />
                      <h4
                        className={`font-[400] text-[#575757] ${task.completed ? "line-through" : ""
                          }`}
                      >
                        {task.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-500 text-sm mt-1"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        </div>
        <img src={SB} alt="spongebob" className="h-[100vh] hidden lg:flex lg:w-1/2" />
      </div>
    </div>
  );
};

export default List;
