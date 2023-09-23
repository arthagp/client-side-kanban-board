
'use client'
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from '@/components/Board';
import Navbar from '@/components/Navbar';
import { getAllBoard } from '@/api/fetch';

export default function Home() {
  const [boardsAndTask, setBoardAndTask] = useState([]);

  const fetchAllGetAllBoardAndTask = async () => {
    try {
      const response = await getAllBoard();
      setBoardAndTask(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllGetAllBoardAndTask();
  }, []);

  const onDragEnd = (result) => {
    // Handle the card reordering here and update the state accordingly.
    // You'll need to use the result object to get the source and destination indices.
  };

  return (
    <div className='bg-blue-300 min-h-screen'>
      <Navbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <main className='grid grid-cols-4'>
          {boardsAndTask.map((board, index) => (
            <Board
              key={index}
              titleBoard={board.board_name}
              cards={board.Tasks.map((task) => ({ id: task.id, taskName: task.task_name }))}
              boardId={board.id} // Pass the board's unique ID
            />
          ))}
        </main>
      </DragDropContext>
    </div>
  );
}
