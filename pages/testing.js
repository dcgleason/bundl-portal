import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-beautiful-dnd';

const EditableDiv = ({ id, text, index, moveDiv }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setCurrentText(event.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={currentText}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onDoubleClick={handleDoubleClick}>{currentText}</div>
      )}
    </div>
  );
};

const DivList = () => {
  const [divs, setDivs] = useState([
    {
      id: '1',
      text: 'Div 1',
    },
    {
      id: '2',
      text: 'Div 2',
    },
    {
      id: '3',
      text: 'Div 3',
    },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const movedDiv = divs[result.source.index];
    setDivs(
      divs
        .slice(0, result.source.index)
        .concat(divs.slice(result.source.index + 1, result.destination.index))
        .concat(movedDiv)
        .concat(divs.slice(result.destination.index + 1))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {divs.map((div, index) => (
          <Draggable key={div.id} draggableId={div.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  userSelect: 'none',
                  padding: 16,
                  margin: '0 0 8px 0',
                  minHeight: '50px',
                  backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                  color: 'white',
                  ...provided.draggableProps.style,
                }}
              >
                <EditableDiv
                  key={div.id}
                  id={div.id}
                  index={index}
                  text={div.text}
                  moveDiv={moveDiv}
                />
              </div>
            )}
          </Draggable>
        ))}
      </DragDropContext>
    </div>
  );
};





