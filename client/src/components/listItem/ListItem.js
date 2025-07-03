import pancil from '../../resources/pancil.png'

const ListItem = ({selectTask, task, selectedItems, startEdit, isEditing, saveEdit, setEditedText, cancelEdit, editedText}) => {

    const colorStatus =()=>{ 

        if(selectedItems.includes(task.id)){
            return {background:' #FFA07A'}
        }else if(task.done){
            return {background:'rgb(0, 255, 127)'}
        }else{ return {background:' rgb(252, 232, 116)'}}

    }
    //console.log(task.task)

    console.log(setEditedText)

    return(
        <>
        {isEditing ? (
                    
          <div className='editingInputBlock'>
            <input className='editingInput'
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <div className="editBtnBlock">
                <button className='confirm' onClick={() => saveEdit(task.id)}> Сохранить</button>
                <button className='cancellation' onClick={() => cancelEdit()}> Отмена</button>
            </div>

          </div>
          
        ) : (

            <li>

                <h2 className='status' style={colorStatus()} >
                    {task.done ? 'выполнено' : 'в работе'}
                </h2>

                <h2 className='task'>task: {task.text}</h2>
                <div className="listBtnGroup">
                    <img className='pancil' onClick={() => startEdit(task.id, task.text)} src={pancil} alt="pancil" />
                    <button onClick={()=>selectTask(task.id)}  className='chooseBtn'>choose</button>
                </div>


            </li>
          )
        }

        </>

    )
}



export default ListItem



































