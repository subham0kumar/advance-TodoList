import React, { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={
        showDrop
          ? "border-dashed border-[1px] mb-2 flex items-start justify-between transition-all duration-200 ease-in-out rounded-md p-2 opacity-100 "
          : "opacity-0"
      }
    >
      Drop Here
    </section>
  );
};

export default DropArea;
