import './App.css'
import Todo from './Components/Todo'
import Todos from './Components/Todos'

function App() {

  return (
    <>
    <h1 className='text-2xl text-white font-bold' >CRUD Operation using redux toolkit</h1>
    <Todos />
    <br />
    <Todo />
    </>
  )
}

export default App
