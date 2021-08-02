import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
const Counter = () => {
  // const counter = useSelector((state) => state.counter);
  const [data, setData] = useState([])
  const counter = useSelector( (state) => state.then( a => setData(a)));

  const dispatch = useDispatch();

  let comp = data.map((item, index) => {
    return (
      <tr key={index}>
        <th scope="row">{(index += 1)}</th>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.desc}</td>
        <td>
          <button onClick={() => dispatch({ type: "remove", id: item.id })}>
            Remove
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      {comp}
      {/* Counter: {counter} */}
      <hr />
      {/* <button onClick={() => dispatch({type: 'increase', payload: 10})}>Increase</button>
      <button onClick={() => dispatch({type: 'increment'})}>Increment</button>
      <button onClick={() => dispatch({type: 'decrement'})}>Decrement</button>
      <button onClick={() => dispatch({type: 'decrease', payload: 10})}>Decrease</button> */}
    </div>
  );
};
export default Counter;