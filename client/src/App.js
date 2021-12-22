import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [newFoodName, setNewFoodName] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    })
  }, [])

  const addToList = () => {

    axios.post("http://localhost:3001/insert", { foodName: foodName, days: days })
  }

  const updateFood = (id) =>{

    axios.put("http://localhost:3001/update",{ id : id, newFoodName : newFoodName })

  }

  const deleteFood =(id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
  }



  return (
    <div className="App">
      <h1>CRUD operation with MERN</h1>
      <label>Food Name:</label>
      <input type="text" onChange={(e) => { setFoodName(e.target.value) }} />

      <label>Day since you ate it:</label>
      <input type="number" onChange={(e) => { setDays(e.target.value) }} />

      <button onClick={addToList}>Add to list </button>

      <h1>Food list</h1>
      {

        foodList.map((val, key) => {

          return (

            <div key={key} className='food'>
              
              <h1 >{val.foodName}</h1>
              <h1 >{val.daysSinceIate}</h1>
              <input type="text" placeholder='New food Name....' onChange={(e) => { setNewFoodName(e.target.value) }}/>
              <button onClick={() => updateFood(val._id)}>Update</button>
              <button onClick={() => deleteFood(val._id)}>Delete</button>

            </div>
          )

        })

      }

    </div>
  );
}

export default App;
