import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { decrement, increment, incrementByAmount } from '../state/counter/counterSlice';

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>()
    const [input, setInput] = useState<string>("");
    const handleIncrementByAmount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(incrementByAmount(input))
        setInput("");
    }
  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => {
            dispatch(increment())
        }}>Increment</button>
        <button onClick={() => {
            dispatch(decrement())
        }}>Decrement</button>
      </div>
      <form onSubmit={handleIncrementByAmount}>
        <label htmlFor="">Increment by: <input type="text" value={input} onChange={(e) => {
            setInput(e.target.value);
        }}/></label>
        <button>Apply</button>
      </form>
    </div>
  )
}

export default Counter