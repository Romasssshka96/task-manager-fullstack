import {useState} from 'react'

import './Panel.css'
import paperBin from '../../resources/paper-bin_5867779.png'
import checkMark from '../../resources/check-mark-96.png'
import employee from '../../resources/employee-9090435_1280.png'



const Panel = ({addTask, deleteTask, toogleStatus, updateList, filter}) => {


	const bottonsData = [
        {name: 'all', label: 'All tasks' },
        {name: 'done', label: 'Done tasks' },
        {name: 'unDone', label: 'Active tasks' },
    ]

	const bottons = bottonsData.map(({name, label}) => {

		//const active = filter === name;

		//const changeClasse = active ? 'btn-light' : 'btn-outline-light'

		return(
			<button 
			className='btnFiltr'
			type="button"
			key={name}
			onClick={() => updateList(name)}>

			{label} 

			</button>
		)
	
	})
    
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e) =>{
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    addTask(inputValue)
    console.log('Отправленное имя: ' + inputValue);
    setInputValue('')
    e.preventDefault();
  }


    return(

		
		<div className="panelBlock">
			
			<div className='panel'>
				<img className='employee' src={employee} alt="employee" />
        	    <form className='addForm' onSubmit={handleSubmit}>
        	        <label className='addLabel'>
        	            Add your task
        	            <input className='addInput' placeholder="create something new" type="text" value={inputValue} onChange={handleChange} />
        	        </label>
		
        	        <input className='addBtn' type="submit" value='add task' />
		
        	    </form>

				
				<div className="btnBlock">

					<div className="filterBlock">
						{bottons}
					</div>

					<img className='checkMark'src={checkMark} alt="check-mark" onClick={toogleStatus} />
					<img className='paperBin' src={paperBin} alt="paper bin" onClick={deleteTask} />
		
				</div>

        	</div>
		</div>

    )
}

export default  Panel






















