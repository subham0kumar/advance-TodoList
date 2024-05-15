import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import DropArea from "./DropArea";

const Tasks = ({
  tasks,
  removeTask,
  listID,
  taskID,
  setActiveCard,
  onDrop,
  setActiveList,
}) => {
  return (
    <>
      <section
        className="mb-2 flex items-start justify-between bg-[#242424] rounded-md pt-2 pb-1 active:opacity-0.7 cursor-grab"
        draggable
        onTouchStart={() => {
          setActiveCard(taskID);
          setActiveList(listID);
        }}
        onTouchEnd={() => {
          setActiveCard(null);
          setActiveList(null);
        }}
        onDragStart={() => {
          setActiveCard(taskID);
          setActiveList(listID);
        }}
        onDragEnd={() => {
          setActiveCard(null);
          setActiveList(null);
        }}
      >
        {/* <h3>{listID}</h3> */}
        <input type="checkbox" className="my-3 mx-2" />{" "}
        <span className="w-full px-4 flex flex-col">
          <h3 className="text-lg tracking-wider">{tasks.title}</h3>{" "}
          <p className="font-acorn tracking-wider">{tasks.details}</p>
        </span>
        <button
          onClick={() => removeTask(listID, taskID)}
          className="text-red-500 ml-2 hover:scale-125 bg-transparent"
        >
          <RiCloseCircleLine size={22} />
        </button>
      </section>
      <DropArea onDrop={() => onDrop(listID, taskID + 1)} />
    </>
  );
};

export default Tasks;
