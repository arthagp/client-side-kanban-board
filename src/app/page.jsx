'use client'
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from '@/components/Board';
import Navbar from '@/components/Navbar';
import { getAllBoard, moveTask, createBoard } from '@/api/fetch';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [boards, setBoards] = useState([]);
  const [isCreateBoard, setIsCreateBoard] = useState(false)
  const [boardName, setBoardName] = useState('')

  const fetchAllGetAllBoard = async () => {
    try {
      const response = await getAllBoard();
      setBoards(response.data);
    } catch (error) {
      console.log(error);
      setTimeout(() => { // sementara seperti ini dlu
        if (error.message = 'Unauthorized') {
          alert('You will be redirected to the login page')
          router.push('/login')
        }
      }, 2000)
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
      const targetBoardId = destination.droppableId.replace("dropable-", ""); // untuk menghilangkan/mereplace dengan string dropable- menjadi string kosong agar mendapatkan id nya langsung
      const taskId = result.draggableId.replace("dragable-", "");

      try {
        await moveTask({ taskId, targetBoardId });


      } catch (error) {
        console.error("Error moving the card:", error);
      }
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault()
    try {
      const response = await createBoard(boardName)
      if (response) {
        setIsCreateBoard(false)
        setBoardName('')
        fetchAllGetAllBoard()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-blue-300 min-h-screen'>
      <Navbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <main className='grid grid-cols-4'>
          {boards.map((board, index) => (
            <Board
              key={index}
              titleBoard={board.board_name}
              boardId={board.id}
            />
          ))}
          {/* form untuk create Board */}
          {isCreateBoard ? (
            <form action="" className='bg-slate-100 rounded-2xl text-black text-opacity-70 max-h-[90px] flex flex-col max-w-[300px] m-4'>
              <input className='m-2 pl-2 py-1'
                type="text"
                placeholder='Enter List Title'
                value={boardName}
                onChange={(e) => { setBoardName(e.target.value) }}
              />
              <div className='flex justify-start gap-x-2 ml-2'>
                <button onClick={handleCreateBoard} className='border bg-blue-400  text-white rounded-lg px-3 py-1' type='submit'>Add List</button>
                <button className='border bg-red-300 text-white rounded-lg px-3 py-1' onClick={() => { setIsCreateBoard(false) }}>Cancel</button>
              </div>
            </form>
          ) : (<button onClick={() => { setIsCreateBoard(true) }} className='bg-opacity-50 hover:bg-opacity-70 text-white font-semibold rounded-lg text-start pl-2 bg-slate-200 ml-3 w-[300px] h-[50px] mt-4'>+ Add New List Board</button>)}
          {/*  */}
        </main>
      </DragDropContext>
    </div>
  );
}
