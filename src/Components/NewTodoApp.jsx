import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { HiOutlinePlusCircle } from "react-icons/hi";
import Tasks from "./Tasks";
import DropArea from "./DropArea";

const TodoApp = () => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDetails, setNewTaskDetails] = useState("");
  const [showNewTaskForm, setShowNewTaskForm] = useState("");
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState("");
  const [editListId, setEditListId] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [activeList, setActiveList] = useState(null);

  const onDrop = (listID, position) => {
    console.log(
      `${activeCard} from ${activeList} will be in list ${listID} at postion ${position}`
    );

    if (activeCard == null || activeCard === undefined) return;

    let taskToMove = "";
    lists.map((list) =>
      list.id === activeList ? (taskToMove = list.tasks[activeCard]) : ""
    );

    const deletedLists = lists.map((list) =>
      list.id === activeList
        ? {
            ...list,
            tasks: list.tasks.filter((_, index) => index !== activeCard),
          }
        : list
    );

    const updatedLists = deletedLists.map((list) =>
      list.id === listID
        ? {
            ...list,
            tasks: [
              ...list.tasks,
              { title: taskToMove.title, details: taskToMove.details },
            ],
          }
        : list
    );

    setLists(updatedLists);
  };

  const handleNewList = () => {
    const newList = {
      id: Math.random().toString(36).substr(2, 9),
      title: newListTitle,
      tasks: [],
    };
    if (!newList.title || /^\s$/.test(newList.title)) {
      return;
    }
    setLists([...lists, newList]);
    setNewListTitle("");
    setShowNewListForm(false);
  };

  const handleNewTask = (listId, taskTitle, taskDetails) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            tasks: [...list.tasks, { title: taskTitle, details: taskDetails }],
          }
        : list
    );
    if (!taskTitle || /^\s$/.test(taskTitle)) {
      return;
    }
    setLists(updatedLists);
    setShowNewTaskForm("");
    setNewTaskTitle("");
    setNewTaskDetails("");
  };

  const handleDeleteTask = (listId, taskIndex) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.filter((_, index) => index !== taskIndex),
          }
        : list
    );
    setLists(updatedLists);
  };

  const handleDeleteList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
  };

  const handleUpdateListTitle = (listId, newTitle) => {
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, title: newTitle } : list
    );
    setLists(updatedLists);
    setEditListId("");
  };

  return (
    <div className="w-[100vw] font-poppins">
      <div className=" flex flex-col items-center justify-center container mx-auto p-4">
        <button
          onClick={() => setShowNewListForm(true)}
          className={`flex items-center space-x-3 tracking-wider mb-3  ${
            showNewListForm ? "opacity-50" : "hover:scale-105 active:scale-95"
          }`}
        >
          <HiOutlinePlusCircle size={22} />{" "}
          <h3 className="text-lg">Create New List</h3>
        </button>
        <h2 className="hidden lg:block mb-4">
          {" "}
          You can drag and drop tasks form one list to another
        </h2>
        {showNewListForm ? (
          <form onSubmit={handleNewList} className="my-4 flex">
            <input
              autoFocus
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="New List Title"
              className="border-b-2 border-gray-300 px-2 py-1 mr-2 bg-transparent outline-none"
            />
            <button
              onClick={handleNewList}
              className="bg-[#7454d4] text-white pl-2 pr-3 py-1 rounded-md flex items-center space-x-3"
            >
              <HiOutlinePlusCircle size={22} /> <h4>Create List</h4>
            </button>
          </form>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
          {lists.map((list) => (
            <div
              key={list.id}
              className="h-fit w-[85vw] md:w-[40vw] lg:w-[30vw] py-4 px-6 text-left rounded-xl bg-[#2f2f2f]"
            >
              <div className="flex justify-between items-center mb-4">
                {editListId === list.id ? (
                  <input
                    type="text"
                    value={list.title}
                    onChange={(e) => {
                      setUpdatedTaskTitle(e.target.value);
                    }}
                    onBlur={() => {
                      setEditListId("");
                      handleUpdateListTitle(list.id, updatedTaskTitle);
                    }}
                    autoFocus
                    className="border border-gray-300 px-2 py-1"
                  />
                ) : (
                  <span className="w-full flex items-center justify-between space-x-3">
                    <h2 className="text-xl font-acorn mx-2">{list.title}</h2>
                    {/* <button
                      onClick={() => setEditListId(list.id)}
                      className="hover:scale-125 bg-transparent"
                    >
                      <TiEdit size={22} />
                    </button> */}
                  </span>
                )}
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="text-red-500 ml-3 hover:scale-125 bg-transparent"
                >
                  <RiCloseCircleLine size={22} />
                </button>
              </div>
              <button
                onClick={() => setShowNewTaskForm(list.id)}
                className={` bg-transparent text-blue-500  px-2 py-1 rounded-md mb-2  ${
                  showNewTaskForm
                    ? "opacity-50"
                    : "hover:text-white hover:bg-blue-500"
                }`}
              >
                Add New Task
              </button>
              {showNewTaskForm === list.id && (
                <div className="mb-4 flex items-start justify-between">
                  <span className="w-[75%]">
                    {" "}
                    <input
                      autoFocus
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Task Title"
                      className="w-full outline-none bg-transparent border-b-[1px] mb-1 px-2 py-1 mr-2"
                    />
                    <input
                      type="text"
                      value={newTaskDetails}
                      onChange={(e) => setNewTaskDetails(e.target.value)}
                      placeholder="Task Details"
                      className="w-full outline-none bg-transparent border-b-[1px] mb-1 px-2 py-1 mr-2"
                    />
                  </span>
                  <button
                    onClick={() =>
                      handleNewTask(list.id, newTaskTitle, newTaskDetails)
                    }
                    className="bg-green-500 text-white px-2 py-1 rounded-md active:scale-95"
                  >
                    Add Task
                  </button>
                </div>
              )}

              <DropArea onDrop={() => onDrop(list.id, 0)} />
              <ul>
                {list.tasks.map((task, index) => (
                  <>
                    <li key={index}>
                      <Tasks
                        tasks={task}
                        taskID={index}
                        listID={list.id}
                        removeTask={handleDeleteTask}
                        setActiveCard={setActiveCard}
                        setActiveList={setActiveList}
                        onDrop={onDrop}
                      />
                    </li>
                  </>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
