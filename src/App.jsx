import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [onHighlight, setOnHighlight] = useState(false);
  const [todo, setTodo] = useState('');   //value entered in input field
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error parsing local storage data:', error);
      localStorage.removeItem('todos'); // Clear the corrupted data
      return [];
    }
  });
  const [showFinished, setshowFinished] = useState(true)

  const setHighlight = () => {
    setOnHighlight(true);
    setTimeout(() => {
      setOnHighlight(false)
    }, 500);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])


  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  //for input field
  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('');
    // console.table(stodos);
  }


  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    });
    let newTodos = [...todos];  //newTodos is a new array that holds the todos object with updated isCompleted values for re-rendering
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    // console.table(newTodos);
  }

  const handleEdit = (e, id) => {
    let editTodo = todos.filter(i => i.id == id)
    setTodo(editTodo[0].todo);
    handleDelete(e, editTodo[0].id);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    // console.table(newTodos);
  }



  return (
    <>
      <Navbar onHighlight={setHighlight} />
      <div className="w-full s_lg:w-4/5 lg:w-3/4 xl:w-2/4 mx-auto py-9 px-3 sm:px-7">

        <div className="card flex flex-col gap-5 min-h-[70vh] bg-red-300 rounded-xl py-8 px-5 sm:px-8 md:w-">
          <div className="addTodo flex flex-col gap-2">

            <h2 className='text-2xl font-bold'>Add a ToDo</h2>
            <div className="input flex gap-2 flex-col mt-2 items-center justify-center w-full sm:flex-row md:justify-start">
              <input type="text" className='rounded px-2 py-1 w-full md:w-4/5' onChange={handleChange} value={todo} />
              <button className='bg-red-800 py-1 w-full sm:w-fit cursor-pointer px-3 text-white rounded disabled:bg-red-900' disabled={todo.length <= 3} onClick={handleAdd}  >Add</button>
            </div>
          </div>
          <label htmlFor="finish">

            <input type="checkbox" checked={showFinished} onChange={toggleFinished} className='cursor-pointer' /> Show Finished
          </label>
          <div id="all-todos" className={onHighlight ? 'highlight' : 'transition-all duration-300'}>
            <h2 className='text-xl font-bold'>Your Todos</h2>
            <div className="todos w-full">
              {todos.length === 0 && <div className='text-xl m-4'>No Todos to display</div>}
              {todos.map(item => {
                return (showFinished || !item.isCompleted) && <div key={item.id} className="todo my-3 flex gap-4 items-start justify-between w-full md:w-11/12">
                  <div className="box flex items-baseline gap-4">
                    <input type="checkbox" name={item.id} id="checkBtn" checked={item.isCompleted} className='cursor-pointer' onChange={handleCheckbox} />
                    <p className={item.isCompleted ? 'line-through' : ''}>{item.todo}</p>
                  </div>
                  <div className="buttons text-white flex items-center gap-4">
                    <button className='p-2 bg-red-800 rounded' onClick={(e) => { handleEdit(e, item.id) }}><FaEdit />
                    </button>
                    <button className='p-2 bg-red-800 rounded' onClick={(e) => { handleDelete(e, item.id) }}><MdDelete />
                    </button>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
