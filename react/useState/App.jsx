import { useState } from "react";

const App = () => {
  const [bool, setBool] = useState(true);               // 🔘 Boolean 
  const [number, setNumber] = useState(0);              // 🔢 Number 
  const [string, setString] = useState("");             // 🧶 "String"
  const [array, setArray] = useState(['a', 'b']);       // 🪗 Array []
  const [object, setObject] = useState({ x: 0, y: 0 }); // 🐣 Object {}

  
  const change_boolean = () => {              // 🔘 Change to a specific Boolean Value
    setBool(false);
  }

  const toggle_boolean = () => {              // 🔘 Toggle a Boolean's Value
    setBool(light => !light);
  }


  const change_number = (newValue) => {       // 🔢 Change a Number's value
    setNumber(newValue);
  }

  const increment_Number = () => {            // 🔢 Increment a Number's value
    setNumber( number => number += 1 );
  }


  const change_string = (e) => {              // 🧶 Change a String value
    setString(e.target.value);
  }

  const clear_string = () => {                // 🧶 Clear a String value    
    setString("");
  }


  const append_array = (e) => {               // 🪗 Add an index to an array.
    const value = e.target.value
    if (value !== "") {
      setArray(array => [...array, value]);
    }
  }

  return (
    <div>

      <p> 🔘 Boolean: {bool ? "true" : "false"} {bool ? "☀️" : "🌒"} </p>
      <button onClick={change_boolean}>Boolean off</button>
      <button onClick={toggle_boolean}>Toggle Boolean</button>
      <hr />

      <p> 🔢 Number: {number} </p>
      <button onClick={()=>change_number(7)}>7</button>
      <button onClick={()=>change_number(11)}>11</button>
      <button onClick={increment_Number}>Increment Number</button>
      <hr />

      <p> 🧶 String: {string} </p>
      <input type="text" onChange={change_string} value={string} />
      <button onClick={clear_string}>Clear</button>
      <hr />

      <div className="array-container">
        <p> 🪗 Array: &nbsp;</p>
        {
          array.map( (value, index) => {
            return <span key={index}>{value}</span>
          })
        }
      </div>
      <br />
      Append Array: &nbsp;
      <input type="text" onChange={append_array} onKeyUp={(e)=>e.target.value = ""} className="smallInput"/>
      <hr />

    </div>
  )

}

export default App;
