import React, {useState, useEffect} from 'react';

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
    <div className="">
      <center>
        <h1>Cash Register Manager App</h1>
        <input type="number" placeholder="Bill Amount" value={billAmount} onChange={event => setbillAmount(event.target.value)}/>
        {billState && <input type="number" placeholder="Cash You Gave" value={cashAmount} onChange={event => setcashAmount(event.target.value)}/>}
        {cashState && <button onClick={calcReturnAmount}>Calculate Return Change</button>}
        <h2>${returnAmount}</h2>
        <p>$1 x{notes[1]}</p>
        <p>$5 x{notes[5]}</p>
        <p>$10 x{notes[10]}</p>
        <p>$20 x{notes[20]}</p>
        <p>$100 x{notes[100]}</p>
        <p>$500 x{notes[500]}</p>
        <p>$2000 x{notes[2000]}</p>
      </center>
    </div>
  );
}

export default App;