import { useState } from "react";

const App = () => {
  const [bool, setBool] = useState(true);               // 🔘 Boolean 
  const [number, setNumber] = useState(0);              // 🔢 Number 
  const [string, setString] = useState("");             // 🧶 "String"
  const [array, setArray] = useState(['a', 'b']);       // 🪗 Array []
  const [object, setObject] = useState({                // 🐣 Object {}
    name: "Mouse",
    x: 0, 
    y: 0 
  }); 

  
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


  const concatenate_array = () => {           // 🪗 Add an index to an array.
    const toAdd = ['R','G','B'];
    setArray(array => [...array, ...toAdd]);
  }

  const clear_array = () => {                 // 🪗 Set an array to empty.
    setArray([]);
  }

  const update_object = (e) => {              // 🪗 update keys of a object.
    const x = e.clientX;
    const y = e.clientY;
    setObject(prev => ({ ...prev, x, y }))
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
      &nbsp; Add to Array: &nbsp;
      <input type="text" onChange={append_array} onKeyUp={(e)=>e.target.value = ""} className="smallInput"/>
      <button onClick={concatenate_array}>Join to Array: ['R','G','B']</button>
      <button onClick={clear_array}>Clear</button>
      <hr />

      <p> 🧶 Object: {JSON.stringify(object,null,2)}</p>
      <div className="object-container" onMouseMove={update_object}>
        <p> Hover Here</p>
      </div>
     

    </div>
  )

}

export default App;
