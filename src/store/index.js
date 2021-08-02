import {
  createStore
} from 'redux';

let a = fetch("https://60ef93eaf587af00179d3a4d.mockapi.io/products-redux")
  .then((res) => res.json())
  .then((data) => data)
  .catch(error => console.log("error: ", error));
const aa = new Promise(a)

const reducer = (state = aa, action) => {
  switch (action.type) {
    case "remove":
      console.log(action.id);
      break;
    default:
      return state
  }
};

// const initialStore = {
//     counter: 0,
//     showCounter: true
// }

// const counterReducer = (state = initialStore, action) => {
//     switch (action.type) {
//         case "increment":
//             return {
//                 ...state,
//                 counter: state.counter + 1
//             }
//             case "decrement":
//                 return {
//                     ...state,
//                     counter: state.counter - 1
//                 }
//                 case 'increase':
//                     return {
//                         ...state,
//                         counter: state.counter + action.payload
//                     }
//                     case 'decrease':
//                     return {
//                         ...state,
//                         counter: state.counter - action.payload
//                     }
//                     default:
//                         return state
//     }
// }

const store = createStore(reducer);

export default store;