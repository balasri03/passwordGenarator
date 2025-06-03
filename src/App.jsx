import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length,setlength] = useState(8)
  const [numbersAllowed,setnumbersAllowed] = useState(false)
  const [charactersAllowed,setcharactersAllowed] = useState(false)
  const [password,setPassword] = useState('')
  const passwordRef=useRef(null)

  const generatePassword=useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numbersAllowed) str += "0123456789"
    if(charactersAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/~`"
    for(let i=0;i<length;i++){
      const char=Math.floor(Math.random()*str.length+1) //we generate a random number between 0 and the length of the string
      pass += str.charAt(char)

    }
    setPassword(pass)

  },[length,numbersAllowed,charactersAllowed]) //as long as this dependencies don't change, the function will not be recreated
  //useCallback is used to memoize the function so that it doesn't get recreated on every render
  useEffect(()=>{
    generatePassword()
  },[length,numbersAllowed,charactersAllowed]) //this will run the function whenever the dependencies change

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password) //this copy password to clipboard
    passwordRef.current?.select()
  }



  return (
    <div className='w-full max-w-md mx-auto shadow-lg p-6 my-8 rounded-lg bg-gradient-to-r from-indigo-900/80 to-teal-800/80 text-white align-center'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
        type="text"
        value={password}
        className='flex-1 p-2 text-lg bg-slate-100 text-black outline-none'
        placeholder='Generated Password' readOnly
        ref={passwordRef} //This is useful for actions like copying the password 
                         // or giving visual feedback to the user.
        >
        </input>
        <button
        onClick={copyPasswordToClipboard}
        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2'
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='w-full cursor-pointer'
          onChange={(e) => setlength(e.target.value)}
          name=""
          id="" />
          <label htmlFor='="length'>Length:{length}</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input
             type="checkbox"
             defaultChecked={numbersAllowed}
             onChange={
              ()=>{
                setnumbersAllowed((prev)=>!prev)
              }
             }></input>
             <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input
             type="checkbox"
             defaultChecked={charactersAllowed}
             onChange={
              ()=>{
                setcharactersAllowed((prev)=>!prev)
              }
             }></input>
             <label htmlFor="number">Characters</label>
        </div> 
      </div>
    </div>
  )
}

export default App
