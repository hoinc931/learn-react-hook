// import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
// // import {v4 as uuidv4} from 'uuid';


// const TodoAdd = (props) => {
//     let history = useHistory()
//     const [todo, setTodo] = useState("");

//     const onHandleSubmit = (e) => {
//         e.preventDefault();
//         // const data = {
//         //     id: uuidv4(),
//         //     name: todo
//         // }
//         props.onAdd.onAdd(todo);
//         history.push('/')
//     }
//     const onHandleChange = (e) => {
//         setTodo(e.target.value)
//     }

//     return (
//         <div>
//             <h1>Add todo: {todo}</h1>
//             <form action="" onSubmit={onHandleSubmit}>
//                 <input type="text" onChange={ onHandleChange} />
//                 <button type="submit">Add</button>
//             </form>
//         </div>
//     )
// }

// export default TodoAdd
