import React, { useState } from 'react'
import { useCallback } from 'react';
import { useEffect, useRef } from 'react';
const App = () => {
  //1 sabse phle length,number,special character k liye ek use state banana pdega
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef('')
  //2 fir uske baad ek passwordGenerator naame ka function chalana pdega jisme apn ko password generate krna pdega or usme check bhi krna pdega k numbers allow h characters allow h fir uske baad apn ko password generate krna pdega
  const passwordGenerator = useCallback(
    () => {
      console.log("hello")
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTWVXYTYZabcdefghijklmnopqrstwvxyz";
      if (numberAllowed) {
        str += "1234567890"
      }
      if (charAllowed) {
        str += "!@#$%^&*"
      }
      for (let i = 1; i < length; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        console.log(char)
        pass += str.charAt(char)
        // console.log(pass)  
      }

      setPassword(pass)
    },
    [length, numberAllowed, charAllowed, setPassword],
  )
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(
    () => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 999);
      window.navigator.clipboard.writeText(password)
    },
    [password],
  )
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-slate-400 '>
      <div className="w-full max-w-md mx-auto  shadow-md rounded-lg px-4 py-3 my-8 h-96 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center text-4xl my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-gray-700 text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 text-white px-3 py-1.5"
          >
            Copy
          </button>
        </div>
        <div className=" flex flex-col gap-y-5 items-center text-sm gap-x-2">
          <div className="flex flex-col items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-96 border-r-orange-600 "
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <br />
            <label className="text-white text-2xl mr-7">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2 ">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              style={{ transform: "scale(1.5)" }}
            />
            <label className="text-white text-2xl " htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center ml-3 gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              style={{ transform: "scale(1.5)" }}
            />
            <label className="text-white text-2xl" htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App