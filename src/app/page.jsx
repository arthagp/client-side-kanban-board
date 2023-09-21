import Board from '@/components/Board'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className='bg-blue-300 min-h-screen'>
      <Navbar />
      <main>
        <Board />
      </main>
    </div>
  )
}
