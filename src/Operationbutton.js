import React from 'react'
import { ACTION } from './App'
export default function Operationbutton({dispatch,operation}) {
  return <button onClick={()=>dispatch({type:ACTION.CHOOSE_OPERATORS,payload:{operation}})}>
  {operation}
  </button>
}
