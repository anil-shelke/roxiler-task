import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {

  const [datas, setDatas] = useState([]);
  const [month, setMonth] = useState(2);
  const [searchValue, setSearchValue] = useState(9);

  useEffect(() => {
    axios.get('/api/data').then((response) => {
      setDatas(response.data)
    }
    )
      .catch((error) => {
        console.log(error)
      })
  },)

  const filterdata = datas.filter(data1 => {
    const data2 = new Date(data1.dateOfSale);
    return data2.getMonth() == month;
  })

  // const inputdata = "Solid Gold Petite Micropave";
  // const inputdata = 763;
  const filterdata2 = filterdata.filter(data => {
    const searchNumber = Number(searchValue);
    console.log(searchValue);
    // console.log()
    return Math.floor(data.price) === searchNumber;
  })

  return (
    <>
      <h2>Transaction Dashboard</h2>
      <h2>datas:{datas.length}</h2>

      <div className='box1'>
        <div>
        <label htmlFor="inp">Search Transaction:</label>
        <input name='inp' onChange={(e) => setSearchValue(e.target.value)} type="number" placeholder='Enter the price' />
        </div>
        <div class="dropdown">
          <button class="dropbtn">Dropdown</button>
          <div class="dropdown-content">
            <a onClick={() => setMonth(0)} href="#">Jan</a>
            <a onClick={() => setMonth(1)} href="#">feb</a>
            <a onClick={() => setMonth(2)} href="#">Mar</a>
            <a onClick={() => setMonth(3)} href="#">Apr</a>
            <a onClick={() => setMonth(4)} href="#">May</a>
            <a onClick={() => setMonth(5)} href="#">Jun</a>
            <a onClick={() => setMonth(6)} href="#">Jul</a>
            <a onClick={() => setMonth(7)} href="#">Aug</a>
            <a onClick={() => setMonth(8)} href="#">Sept</a>
            <a onClick={() => setMonth(9)} href="#">Oct</a>
            <a onClick={() => setMonth(10)} href="#">Nov</a>
            <a onClick={() => setMonth(11)} href="#">Dec</a>
          </div>
        </div>
      </div>

      {
        filterdata2.map((data1, index) => (
          <tr key={data1.id}>
            <th >{index + 1}</th>
            <td >{data1.title}</td>
            <td>{data1.price}</td>
            <td >{data1.description}</td>
            <td>{data1.category}</td>
            <td><a href="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg">{data1.image}</a></td>
            <td>{data1.sold}</td>
            <td>{data1.dateOfSale}</td>
          </tr>

        ))
      }
      <table class="table">
        <thead>
          <tr>
            <th >No</th>
            <th >Title</th>
            <th >price</th>
            <th >descrption</th>
            <th >category</th>
            <th >image</th>
            <th >sold</th>
            <th >dateOfSale</th>
          </tr>
        </thead>
        <tbody>
          {
            filterdata.map((data, index) => (

              <tr key={data.id}>
                <th >{index + 1}</th>
                <td >{data.title}</td>
                <td>{data.price}</td>
                <td >{data.description}</td>
                <td>{data.category}</td>
                <td><a href="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg">{data.image}</a></td>
                <td>{data.sold}</td>
                <td>{data.dateOfSale}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App
