import { useEffect, useState } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import About from './components/About';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from './components/Header';
import Tasks from './components/Tasks';

const App = () => {

  const [showAddTask, setShowAddTask] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setData(tasksFromServer);
    }
    getTasks()
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/data');
    const data = await response.json();

    console.log(data);
    return data;
  }

  //Fetch task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/data/${id}`);
    const data = await response.json();

    console.log(data);
    return data;
  }

  //Add Task
  const addTask = async (task) => {

    const response = await fetch('http://localhost:5000/data', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },

      body: JSON.stringify(task),
    })

    const item = await response.json();

    setData([...data, item]);
  }

  const deleteItem = async (id) => {

    await fetch(`http://localhost:5000/data/${id}`, {
      method: 'DELETE'
    })

    setData(data.filter((items) => items.id !== id));
  }

  const toogleReminder = async (id) => {

    const taskToToogle = await fetchTask(id);

    const updTask = { ...taskToToogle, reminder: !taskToToogle.reminder }

    const response = await fetch(`http://localhost:5000/data/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const item = await response.json();

    setData(data.map((task) => task.id === id ? {...task, reminder: item.reminder } : task));
  }
  return (
    <Router>
    <div className="container">
    <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
    
     <Route path='/' exact render={(props)=>(
        <>
         {showAddTask && <AddTask onAdd={addTask} />}
         {data.length > 0 ? (<Tasks data={data} onDelete={deleteItem} onToogle={toogleReminder} />) : ('Sorry, No Tasks To Show. Please Add a Task')}
        </>
      )} />
    <Route path='/about' component={About}/>
    <Footer/>
    </div>
    </Router>
  );
}

export default App;