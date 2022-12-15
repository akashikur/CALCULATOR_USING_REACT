import { useReducer } from 'react';
import './App.css';
import Digitbutton from './Digitbutton';
import Operationbutton from './Operationbutton';


export const ACTION={
  ADD_DIGIT:"add-action",
  CHOOSE_OPERATORS:"choose-operators",
  CLEAR:"clear",
  DELETE_DIGIT:"delete-digits",
  EVALUATE:"evaluate"
}
function reducer(state,{type,payload}){
  switch(type){
    case ACTION.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentoperant:payload.digit,
          overwrite:false
        }
      }
        if(payload.digit === "0" && state.currentoperant === "0"){
           return state
          }
   
        if(payload.digit === "." && state.currentoperant.includes(".")){return state}
    
    return {
      ...state,
      currentoperant:`${state.currentoperant || ""}${payload.digit}`,
    }
    case ACTION.CHOOSE_OPERATORS:
      if(state.currentoperant == null && state.previousoperant == null){
        return state
      }
      if(state.currentoperant==null){
        return{
          ...state,
          operation:payload.operation,
        }
      }

      
      if(state.previousoperant == null){
        return{
          ...state,
          operation:payload.operation,
          previousoperant:state.currentoperant,
          currentoperant:null,
        }
      }
      return{
        ...state,
        previousoperant:evaluate(state),
        operation:payload.operation,
        currentoperant:null
      }
    case ACTION.CLEAR:
      return {}
    case ACTION.EVALUATE:
      if(state.operation==null || state.currentoperant==null || state.previousoperant==null){
        return state
      }
      return{
        ...state,
        overwrite:true,
        previousoperant:null,
        operation:null,
        currentoperant:evaluate(state),
      }

      case ACTION.DELETE_DIGIT:
        if(state.overwrite){
          return {
            ...state,
            overwrite:false,
            currentoperant:null
          }
        }
        if(state.currentoperant == null && state.previousoperant == null){
          return state
        }
        if(state.currentoperant==null && state.previousoperant.length>=1){
          return{
            ...state,
            currentoperant:state.previousoperant+state.operation,
            previousoperant:null,
            operation:null
          }
        }
        if(state.currentoperant.length===1){
          return{
            ...state,
            currentoperant:null
          }
        
        }
        return{
          ...state,
          currentoperant:state.currentoperant.slice(0,-1)
        }
    }

}

function evaluate({currentoperant,previousoperant,operation}){
  const prev=parseFloat(previousoperant)
  const current=parseFloat(currentoperant)
  if(isNaN(prev) || isNaN(current)) return""
  let computation=""
  switch(operation){
    case "+":
      computation=prev+current
      break
    case "-":
      computation=prev-current
      break  
    case "*":
      computation=prev*current
      break  
    case "/":
      computation=prev/current
      break 
  }
  return computation.toString()

}

function App() {
  const[{currentoperant,previousoperant,operation},dispatch]=useReducer(reducer,{})



  return (
    <div className="container">
      <div className='output'>
        <div className='previous-output'>{previousoperant}{operation}</div>
        <div className='current-output'>{currentoperant}</div> 
      </div>
      <div className='calculation'>
      <button className='span-2' onClick={()=>dispatch({type:ACTION.CLEAR})}>Ac</button>
      <button onClick={()=>dispatch({type:ACTION.DELETE_DIGIT})}>DEl</button>
      <Operationbutton operation="+" dispatch={dispatch}/>
      <Digitbutton digit="1" dispatch={dispatch}/>
      <Digitbutton digit="2" dispatch={dispatch}/>
      <Digitbutton digit="3" dispatch={dispatch}/>
      <Operationbutton operation="-" dispatch={dispatch}/>
      <Digitbutton digit="4" dispatch={dispatch}/>
      <Digitbutton digit="5" dispatch={dispatch}/>
      <Digitbutton digit="6" dispatch={dispatch}/>
      <Operationbutton operation="*" dispatch={dispatch}/>
      <Digitbutton digit="7" dispatch={dispatch}/>
      <Digitbutton digit="8" dispatch={dispatch}/>
      <Digitbutton digit="9" dispatch={dispatch}/> 
      <Operationbutton operation="/" dispatch={dispatch}/> 
      <Digitbutton digit="." dispatch={dispatch}/> 
      <Digitbutton digit="0" dispatch={dispatch}/>
      <button className='span-1' onClick={()=>dispatch({type:ACTION.EVALUATE})}>=</button>
    </div>
    </div>
  );
}

export default App;
