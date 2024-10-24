import React, { useState, useEffect } from "react";
import List from "../components/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface TaskType {
  _id: string;
  title: string;
  completed: boolean;
}

const Main = () => {
  const [list, setList] = useState({
    name: "Todo",
    tasks: [] as TaskType[],
  });

  // CallingJson place endpoint set in env file
  const API = process.env.REACT_APP_MOCKAPI

  //Get data from JSon placeholder
  const GetData = async () => {
    try {
      const res = await fetch(`${API}`, {
        method: "GET",
      });

      const res_json = await res.json();
      console.log(res_json)
      if (!res.ok) {

        throw { success: false, data: res };
      }
      setList((prevList) => ({
        ...prevList,
        tasks: [{ ...res_json, _id: `task-${Date.now()}` }],
      }))
      return
    } catch (error) {

      return { success: false, data: "Netwrok error" };
    }
  }

  // Load tasks from local storage on component mount or call from JSon place holder if task is empty
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setList((prevList) => ({
        ...prevList,
        tasks: parsedTasks,
      }));
    } else {
      GetData()
    }
  }, []);

  //Drag and drop functionality
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    //edge case- the function won't do anything if drop destination is not defined
    if (!destination) return; 

    const newTasks = Array.from(list.tasks);
    const [movedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, movedTask);

    setList({ ...list, tasks: newTasks });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  //function to add new task to the task list
  const handleTaskAddition = (newTask: Omit<TaskType, '_id'>) => {
    const newTaskWithId = {
      ...newTask,
      _id: `task-${Date.now()}`,
      completed: false,
    };

    setList((prevList) => {
      const updatedTasks = [...prevList.tasks, newTaskWithId];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...prevList, tasks: updatedTasks };
    });
  };

  //function to delete new task to the task list
  const handleDeleteTask = (taskId: string) => {
    setList((prevList) => {
      const updatedTasks = prevList.tasks.filter((task) => task._id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...prevList, tasks: updatedTasks };
    });
  };
  //function to mark task as complete
  const handleToggleTaskCompletion = (taskId: string) => {
    setList((prevList) => {
      const updatedTasks = prevList.tasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save immediately
      return { ...prevList, tasks: updatedTasks };
    });
  };

  return (
    <div className="bg-[#fff] h-[100vh]">
      <div className="bg-[#323232] p-5 text-[18px] lg:text-[24px] w-full text-center shadow-2xl">
        <h2 className="text-[#fff] text-[30px] lg:text-[50px]">TUUDU</h2>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list" type="task">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col w-full h-full pt-1"
            >
              <List
                list={list}
                handleTaskAddition={handleTaskAddition}
                handleDeleteTask={handleDeleteTask}
                handleToggleTaskCompletion={handleToggleTaskCompletion}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Main;
