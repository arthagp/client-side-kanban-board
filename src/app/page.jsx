'use client'
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from '@/components/Board';
import Navbar from '@/components/Navbar';
import { getAllBoard, moveTask } from '@/api/fetch';

export default function Home() {
  const [boards, setBoards] = useState([]);

  const fetchAllGetAllBoard = async () => {
    try {
      const response = await getAllBoard();
      setBoards(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllGetAllBoard();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) { // jika destination undefined maka akhiri eksekusi dengan return;
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const targetBoardId = destination.droppableId.replace("dropable-", ""); // untuk menghilangkan string dropable- menjadi string kosong agar mendapatkan id nya langsung
      const taskId = result.draggableId.replace("dragable-", "");
      console.log(taskId, 'task Id :')
      console.log(targetBoardId, 'targetBoard :')
      console.log(destination, 'destination')
      try {
        await moveTask({ taskId, targetBoardId });
        
      } catch (error) {
        console.error("Error moving the card:", error);
      }
    }
  };

  return (
    <div className='bg-blue-300 min-h-screen'>
      <Navbar/>
      <DragDropContext onDragEnd={onDragEnd}>
        <main className='grid grid-cols-4'>
          {boards.map((board, index) => (
            <Board
              key={index}
              titleBoard={board.board_name}
              boardId={board.id}
            />
          ))}
        </main>
      </DragDropContext>
    </div>
  );
}
