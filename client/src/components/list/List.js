import './List.css';
import ListItem from '../listItem/ListItem';
import whatsNext from '../../resources/whats-next.png'




const List = ({task, selectTask,selectedItems, startEdit, saveEdit, editedId, editedText, cancelEdit, setEditedText}) => {



 

    const elem = task.map(i => 	
          <ListItem key={i.id}
           task={i} 
           isEditing={editedId === i.id}
           selectTask={selectTask}  
           selectedItems={selectedItems} 
           startEdit={startEdit} 
           saveEdit={saveEdit} 
           setEditedText={setEditedText}
           cancelEdit={cancelEdit}
           editedText={editedText}
           />
        
  )


    return(
        <>
        <img className='imgWhatsNext' src={whatsNext} alt="whatsNext" />
            <ul>
                {elem}
            </ul>
        </>

        
    )
}

export default List





























