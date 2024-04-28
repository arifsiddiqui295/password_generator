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
    <div className='w-screen h-screen flex items-center justify-center bg-white'
      style={{
        fontFamily: "helvetica",
        position: "relative"
      }}
    >
      <div className=' w-screen h-screen bg-[#2a2c42] text-center'
        style={{
          clipPath: "polygon(0 0, 100% 0%, 100% 48%, 0 82%)"
        }}
      >
        <h1 className="text-[#3ab694] text-center mt-10 text-5xl md:text-7xl my-3"
          style={{
            fontFamily: "helvetica"
          }}
        >Password Generator</h1>
        <h1 className="text-[#3ab694] text-center mt-10 text-2xl md:text-4xl my-3"
          style={{
            fontFamily: "helvetica"
          }}
        >
          Generate Strong and random Passwords to Keep your <br /> accounts Safe Online
        </h1>

      </div>
      <div
        style={{
          position: "absolute",
          top: "60%", // Adjusted for better vertical alignment
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "90%", // Ensures it doesn't overflow on smaller screens
          width: "600px", // Adjust width as needed
        }}
        className="bg-[#3ab694] p-6 md:p-10 rounded-lg" // Reduced padding on smaller screens
      >
        <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-10">
          <input
            type="text"
            value={password}
            className="w-full md:w-96 outline-none rounded-lg text-center text-bold text-[#48bc9c]"
            style={{
              fontWeight: "700"
            }}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-white rounded-lg text-[#48bc9c] px-3 py-1.5 mt-3 md:mt-0"
            style={{
              fontFamily:"helvetica",
              fontWeight: "700",
              border: "2px solid #48bc9c"
            }}
          >
            Copy <br /> Password
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-y-3 md:gap-y-5 items-center text-sm gap-x-2">
          <div className="flex flex-col items-center md:items-start gap-y-4 mb-6 md:mb-10">
            <label className="text-white text-2xl md:text-3xl mr-3 md:mr-7"> Password Length: {length}</label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer bg-gradient-to-r from-[#48bc9c] via-[#48bc9c] to-[#48bc9c] w-full md:w-96 h-2 range-slider"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />

          </div>
        </div>
        <div className="flex  items-center md:items-start gap-y-3 md:gap-y-0 gap-x-8">
          <div className="flex  items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="form-checkbox h-6 w-6 rounded-md text-green-500 checked:bg-green-500 focus:ring-0 focus:outline-none"
            />

            <label className="text-white text-2xl md:text-3xl" htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
             className="form-checkbox h-4 w-4 rounded-md text-green-500 checked:bg-green-500 focus:ring-0 focus:outline-none"
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              style={{ transform: "scale(1.5)" }}
            />
            <label className="text-white text-2xl md:text-3xl" htmlFor="characterInput">Characters</label>
          </div>
        </div>

      </div>

    </div>
  )
}

export default App