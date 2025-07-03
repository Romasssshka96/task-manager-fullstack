import { useState, useEffect } from 'react';
import { serverGetTasks, serverDeleteTask, serverAddTask, serverMarkTaskAsDone, serverEditTask } from '../../services/task';

import Panel from '../panel/Panel';
import List from '../list/List';
import './App.css';

function App() {

  	const [task, setTask] = useState([])
  	const [selectedItems, setSelectedItems] = useState([])
	const [filter, setFilter] = useState('all')
	const [editedId, setEditedId] = useState(null)
	const [editedText, setEditedText] = useState('')
	
	console.log(editedText);

	useEffect(()=>{
		serverGetTasks()
		.then(setTask)
	}, [])

 

	const addTask = async (text) =>{
		if(text){		
			const newTask = await serverAddTask(text)			//захист від пустого інпуту
			setTask([...task, newTask])					//формування данних таски 
			//{id: randomInteger(0, 10000), text, done: false}
		}
  	}

	const selectTask = (id) =>{
		setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]		//додавання в стейт id тих таск які обрані користувачем 
		
		)
	}

	const toogleStatus = async() => {
		await serverMarkTaskAsDone(selectedItems)
		setTask(prev => prev.map(task => selectedItems.includes(task.id) ? {...task, done: !task.done} : task));	//зміна поля done
		setSelectedItems([])
	}

	const deleteTask = async () => {
		await serverDeleteTask(selectedItems)
		setTask(prev => prev.filter(task => !selectedItems.includes(task.id)  ));	//фільтрація стейту з тасками по id, ті що обрані будуть відалені фільтрацією
		setSelectedItems([])
	}

	
    const filterTasks = (items, filter) => {
        if(filter === 'done'){
            return items.filter(item => item.done)
        }if(filter === 'unDone'){
            return items.filter(item => !item.done)
        }else{
            return items
        }
    }


	const updateList = (filter) => {
		setFilter(filter)
	}


  const startEdit = (id, currentText) => {
	console.log(id, currentText)
	setEditedId(id);
	setEditedText(currentText);
  };
  
  const cancelEdit = () => {
	setEditedId(null);
	setEditedText('');
  };
  
  const saveEdit = async (id) => {
	const update = await serverEditTask(id, editedText)
	console.log(update)
	setTask(prevTasks =>
	  prevTasks.map(item =>
		item.id === id ? update : item
	  )
	);
	cancelEdit(); // сбрасываем редактирование
  };



	const listOfTasks = filterTasks(task, filter)

 	 return (
    	<div className='container'>
        	<Panel addTask={addTask} 
			toogleStatus={toogleStatus} 
			deleteTask={deleteTask} 
			selectedItems={selectedItems} 
			updateList={updateList} 
			filter={filter}
			/>

        	<div className='App'>
      

        		<List task={listOfTasks} 
				selectTask={selectTask} 
				selectedItems={selectedItems} 
				startEdit={startEdit} 
				saveEdit={saveEdit} 
				setEditedText={setEditedText}
				cancelEdit={cancelEdit}
				editedId={editedId}
				editedText={editedText}
				/>
      
    	</div>
    	</div>

  	);
}

export default App;


















