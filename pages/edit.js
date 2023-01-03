import React, { useState, useEffect } from 'react';
import { closestCenter, DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const UserComponent = ({
  id,
  body
}) => {


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
          className="bg-white shadow overflow-hidden sm:rounded-lg max-w-2xl mx-auto"
      >
     {body}
  
         
      </div>
      
     </>
  )
} 


function DragApp() {

  const [ questionOne, setQuestionOne] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

    const [items, setItems] = useState([
        {
          id: "1",
          note: "Manoj"
        },
        {
          id: "2",
          note: "John"
        },
        {
          id: "3",
          note: "Ronaldo"
        },
        {
          id: "4",
          note: "Harry"
        },
        {
          id: "5",
          note: "Jamie"
        }
      ])
    const [renderTrigger, setRenderTrigger] = useState(false);

    useEffect(() => {
        setRenderTrigger(!renderTrigger);
      }, [items]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
          .then((data) => setItems(data));
          console.log('items', items)
      }, []);



  const sensors = [useSensor(PointerSensor)];


  const saveOrder = () => {

    console.log("order" + items.map(item => item.id))
    // Send the current order of the items to a database via a POST route
    fetch('/api/save-order', { // create this route in our API
      method: 'POST',
      body: JSON.stringify({
        order: items.map(item => item.id)
      })
    })
  }

  const handleDragEnd = ({active, over}) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (

<>

<div >

<div className="grid grid-cols-1">
  <div  className="col-span-1 p-6 mx-10 ">
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <label  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              <em>Drag and Drop to reorder your notes (this is the order that your contributions will appear in your Bundle...hint: the "Save Order" button is at the very bottom): </em>
     </label>
    <div
      style={{
        margin: 'auto',
        width: 1000,
        textAlign: 'center',

      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {
            items.map(
              item => <UserComponent {...item} key={item.id} />
            )
          }
        </SortableContext>
      </DndContext>
    </div>
    <button onClick={saveOrder} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" >Save Order</button>
  </div>

  </div>
</div>

</div>
    </>
  );


}

export default DragApp;


