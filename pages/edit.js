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
      >
     {body}
  
         
      </div>
      
     </>
  )
}

function InputForm() {

  const [ questionOne, setQuestionOne] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
    <form className="space-y-8 divide-y divide-gray-200" action="#" method="POST">
<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              <em>Upload a note manually: </em>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                <textarea
                  id="about"
                  name="about"
                  spellCheck="true"
                  placeholder="Dear Elle, ... Sincerely, [Your name]"
                  rows={8}
                  onChange={e => setQuestionOne(e.target.value)}
                  value={questionOne}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                />
                </div>
              </div>
            </div>

    


        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Photo: </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                { !selectedImage? <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" style={{ strokeWidth: 2, strokeLinecap:"round", strokeLinejoin:"round" }}/>
                </svg> : <div> </div>}
                <div className="flex text-sm text-gray-600">
                {   selectedImage ?  <label htmlFor="file-upload"> <span className="relative bg-white rounded-md font-medium text-grey-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"> Image Ready to Send</span> </label>:  (<>
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  
                    <span>Upload a image</span> 
                    <input
                        id="file-upload" 
                       name="file-upload" 
                       type="file" 
                       onChange={(event) => { 
                          console.log(event.target.files[0]);
                          setSelectedImage(event.target.files[0]);
                          }} 
                      className="sr-only"/>
                  </label>
                  <p className="pl-1">here</p>
                  </>
                  )}
                </div>
                <p className="text-xs text-gray-500">PNG or JPG up to 16MB</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
        <div className="flex justify-end">
         
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </div>
      </div>
    </form>
    </>
  
  )

}

function DragApp() {

    const [items, setItems] = useState([
        {
          id: "1",
          name: "Manoj"
        },
        {
          id: "2",
          name: "John"
        },
        {
          id: "3",
          name: "Ronaldo"
        },
        {
          id: "4",
          name: "Harry"
        },
        {
          id: "5",
          name: "Jamie"
        }
      ])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
          .then((data) => setItems(data));
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

<div className="grid grid-cols-2 divide-x-2 divide-gray-400">
  <div className="col-span-1 p-6">

  <InputForm/>

  </div>


  <div className="col-span-1 p-6 mx-10">
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <label  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              <em>Drag and Drop to reorder your notes (this is the order that your contributions will appear in your Bundle): </em>
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
    <button onClick={saveOrder} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >Save Order</button>
  </div>

  </div>
</div>
    </>
  );


}

export default DragApp;


