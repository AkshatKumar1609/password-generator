import { use, useState } from 'react';
import './App.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';

function App() {
  let [uppercase,setUppercase] = useState(false);
  let [lowercase,setLowercase] = useState(false);
  let [number,setNumber] = useState(false);
  let [symbol,setSymbol] = useState(false);
  let [passlength,setPasslength] = useState(6);
  let [password,setPassword] = useState('');

  function generatePassword(){
    if(uppercase || lowercase || number || symbol){
      let charset = '';
      if(uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      if(lowercase) charset += "abcdefghijklmnopqrstuvwxyz"
      if(number) charset += "0123456789"
      if(symbol) charset += "!@#$%^&*()_+-=[]{}|;:',.<>?/~"

      let finalPass = '';
      for(let i = 0;i<passlength;i++){
        finalPass += charset.charAt(Math.floor(Math.random()*charset.length));
      }
      setPassword(finalPass);
    }
    else{
      toast.error("Select atleast one option")
    }
  }

  function copyPass(){
    navigator.clipboard.writeText(password);
    toast.success("Copied Successfully")
  }

  return (
    <div className="password-generator">
      <div className="generator-container">
        <h1 className="title">Password Generator</h1>

        <div className="password-display">
          <input type="text" className="password-output" placeholder="Your password will appear here" readOnly value={password}/>
          <button className="copy-btn" aria-label="Copy password" onClick={copyPass}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        <div className="length-control">
          <div className="length-info">
            <span className="label">Password Length</span>
            <span className="value">{passlength}</span>
          </div>
          <input type="range" min="4" max="32" defaultValue={passlength} className="length-slider" onChange={(event)=>setPasslength(event.target.value)}/>
        </div>

        <div className="settings">
          <div className="setting-item">
            <input type="checkbox" id="uppercase" className="checkbox" checked = {uppercase} onChange={()=>setUppercase(!uppercase)}/>
            <label htmlFor="uppercase">Include Uppercase Letters</label>
          </div>
          <div className="setting-item">
            <input type="checkbox" id="lowercase" className="checkbox" checked = {lowercase} onChange={()=>setLowercase(!lowercase)}/>
            <label htmlFor="lowercase">Include Lowercase Letters</label>
          </div>
          <div className="setting-item">
            <input type="checkbox" id="numbers" className="checkbox" checked = {number} onChange={()=>setNumber(!number)}/>
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div className="setting-item">
            <input type="checkbox" id="symbols" className="checkbox" checked = {symbol} onChange={()=>setSymbol(!symbol)}/>
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>

        {/* <div className="strength-meter">
      <span className="label">Password Strength</span>
      <div className="meter">
        <div className="level weak"></div>
        <div className="level medium"></div>
        <div className="level strong"></div>
        <div className="level very-strong"></div>
      </div>
    </div> */}

        <button className="generate-btn" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Zoom}
      />
    </div>
  );
}

export default App;
