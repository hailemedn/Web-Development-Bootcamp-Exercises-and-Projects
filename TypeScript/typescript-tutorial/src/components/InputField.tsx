import React from 'react'
import './styles.css'
interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputField:React.FC<Props> = ({todo, setTodo}) => {
  return <form action="" className='input'>
    <input 
        type="input" 
        className='input__box' 
        placeholder='Enter a task'
        value={todo}
        onChange={e => {
            setTodo(e.target.value);
        }} />
    <button className='input__submit'>Go</button>
  </form>
}

export default InputField
