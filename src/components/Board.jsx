'use client'
import React, { useEffect, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import { getAllTask, moveTask } from '@/api/fetch';

const Board = ({ titleBoard, boardId }) => {
  const [allTasks, setAllTasks] = useState([])


  const fetchAllTasks = async () => {
    try {
      const response = await getAllTask(boardId);
      setAllTasks(response.data)
      console.log(response.data, 'data')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllTasks()
  }, [boardId])



  return (
    <div className='bg-slate-100 rounded-2xl text-black text-opacity-70 flex flex-col max-w-[300px] m-4 '>
      <div className='flex justify-between'>
        <h1 className='font-bold p-3'>{titleBoard}</h1>
        <div className='p-3'>
          <button className='focus:outline-none'>
            <svg fill="#000000" width="15px" height="15px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M899.4 638.2h-27.198c-2.2-.6-4.2-1.6-6.4-2-57.2-8.8-102.4-56.4-106.2-112.199-4.401-62.4 31.199-115.2 89.199-132.4 7.6-2.2 15.6-3.8 23.399-5.8h-27.2c-1.8.6-3.4 1.6-5.4 1.8-52.8 8.6 93 46.6 104.4 98.6.8 4 2 8 3 12v27.2c-.6 1.8-1.6 3.6-1.8 5.4-8.4 52-45.4 91.599-96.801 103.6-5 1.2-9.6 2.6-14.2 3.8zM130.603 385.8l27.202.001c2.2.6 4.2 1.6 6.4 1.8 57.6 9 102.6 56.8 106.2 113.2 4 62.2-32 114.8-90.2 131.8-7.401 2.2-15 3.8-22.401 5.6h-27.2c-1.8-.6-3.4-1.6-5.2-2-52-9.6-86-39.8-102.2-90.2-2.2-6.6-3.4-13.6-5.2-20.4v-27.2c.6-1.8 1.6-3.6 1.8-5.4 8.6-52.2 45.4-91.6 96.8-103.6 4.8-1.201 9.4-2.401 13.999-3.601zm370.801.001h27.2c2.2.6 4.2 1.6 6.4 2 57.4 9 103.6 58.6 106 114.6 2.8 63-35.2 116.4-93.8 131.4-6.2 1.6-12.4 3-18.6 4.4h-27.2c-2.2-.6-4.2-1.6-6.4-2-57.4-8.8-103.601-58.6-106.2-114.6-3-63 35.2-116.4 93.8-131.4 6.4-1.6 12.6-3 18.8-4.4z" />
            </svg>
          </button>
        </div>
      </div>
      <Droppable droppableId={`dropable-${boardId}`} >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            className={`${snapshot.isDraggingOver ? 'bg-slate-400' : null} rounded-lg`}
            ref={provided.innerRef}
          >
            {allTasks.map((card, index) => (
              <Draggable key={card.id} draggableId={`dragable-${card.id}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card taskName={card.task_name} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div>
        <button className='m-3 hover:bg-gray-200 rounded-lg px-3 py-1 text-sm text-start w-[200px]'>
          + Add Card
        </button>
      </div>
    </div>
  );
};

export default Board;
