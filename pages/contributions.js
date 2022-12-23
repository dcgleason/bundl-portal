import React, { useState, useEffect } from 'react';



const UserComponent = ({
  id,
  body
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const {
      setNodeRef,
      attributes,
      listeners,
      transition,
      transform,
      isDragging,
  } = useSortable({ id: id })

  const style = {
      transition,
      transform: CSS.Transform.toString(transform),
      border: '2px solid black',
      marginBottom: 5,
      marginTop: 5,
      display: "block",
      opacity: isDragging ? 0.5 : 1,
  }

  return (
      <>
      <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
      >
        <button onClick={toggleEditing}>Edit</button>
        <div
          contentEditable={isEditing}
          onBlur={handleBlur}
          suppressContentEditableWarning
        >
          {body}
        </div>
      </div>
      
     </>
  )
}