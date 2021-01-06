import React, {useState, useEffect} from 'react';
import './App.css'
import $1 from './images/1$.png'
import $5 from './images/5$.png'
import $10 from './images/10$.png'
import $20 from './images/20$.png'
import $100 from './images/100$.png'
import $500 from './images/500$.png'
import $2000 from './images/2000$.png'

function App() {
  const [billAmount, setbillAmount] = useState('')
  const [billState, setbillState] = useState(false)
  const [cashAmount, setcashAmount] = useState('')
  const [cashState, setcashState] = useState(false)
  const [returnAmount, setreturnAmount] = useState(0)
  const [notes, setnotes] = useState({
    '2000':0,
    '500': 0,
    '100': 0,
    '20': 0,
    '10': 0,
    '5': 0,
    '1': 0,
  })

  useEffect(() => {
    billAmount !== '' ? setbillState(true) : setbillState(false);
    (cashAmount !== '') && (Number(cashAmount) >= Number(billAmount)) ? setcashState(true) : setcashState(false);
  }, [billAmount, cashAmount])

  useEffect(() => {
    setnotes({
      '2000':0,
      '500': 0,
      '100': 0,
      '20': 0,
      '10': 0,
      '5': 0,
      '1': 0,
    })
    setreturnAmount(0)
  },[billAmount, cashAmount])
;
  const calcReturnAmount = () => {
    const returncash = cashAmount - billAmount
    setreturnAmount(returncash)
    calcMinNotes(returncash)
  }

  const calcMinNotes = (returncash) => {
    for(let note of Object.keys(notes).sort((a,b)=>b-a)) {
      if(returncash>=note){
        setnotes(prevState => ({
          ...prevState,
          [note]:Math.floor(returncash/note)
        }))
        const remainder = returncash % note
        if(remainder !==0){
          console.log(remainder)
          calcMinNotes(remainder)
        }
        break;
      }
    }
  }
  
  return (
    <div className="App">
        <h1 className="Navbar">Cash Register Manager App</h1>
        <input type="number" placeholder="Bill Amount" value={billAmount} onChange={event => setbillAmount(event.target.value)}/>
        {billState && <input type="number" placeholder="Cash You Gave" value={cashAmount} onChange={event => setcashAmount(event.target.value)}/>}
        {cashState && <button onClick={calcReturnAmount}>Calculate Return Change</button>}
        <h2>${returnAmount}</h2>
        <p><img src={$1} width='130.0px' height='50px'/> <h2>x{notes[1]}</h2></p>
        <p><img src={$5} width='130.0px' height='50px'/> <h2>x{notes[5]}</h2></p>
        <p><img src={$10} width='130.0px' height='50px'/> <h2>x{notes[10]}</h2></p>
        <p><img src={$20} width='130.0px' height='50px'/> <h2>x{notes[20]}</h2></p>
        <p><img src={$100} width='130.0px' height='50px'/> <h2>x{notes[100]}</h2></p>
        <p><img src={$500} width='130.0px' height='50px'/> <h2>x{notes[500]}</h2></p>
        <p><img src={$2000} width='130.0px' height='50px'/> <h2>x{notes[2000]}</h2></p>
    </div>
  );
}

export default App;