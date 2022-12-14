import React,{useState} from 'react';
function TaskRow({task,editTaskMethod,editCompletionMethod,deleteMethod,displayMode}) {
    // props:
        // task Object

        // methods
            // editTaskMethod --> edit task name
            // editCompletionMethod --> edit completion
            // deleteMethod --> delete task

        // displayMode (all or givenDate)
            // if specific date is given, do NOT show date --> givenDate
            // if specific date is NOT given, show the dates --> all

    // states:
        // editing --> boolean
            // if true: --> ONNLY task name is editable
            // if false: --> ONLY completion is editable
        // taskName --> taskName if given
        // completion --> completed or not

    // methods:
        // saveChangedName --> for the updated taskName --> calls editTaskMethod
        // saveChangedStatus --> for the completion status --> calls editCompletionMethod
        // deleteTask --> deletes task --> calls deleteMethod 

    return (
        <div>
            
        </div>
    );
}

export default TaskRow;