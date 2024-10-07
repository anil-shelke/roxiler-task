import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Bar} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {

  const [datas, setDatas] = useState([]);
  const [month, setMonth] = useState(2);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    axios.get('/api/data').then((response) => {
      setDatas(response.data)
    }
    )
      .catch((error) => {
        console.log(error)
      })
  },)

  function fdata(datas, month, searchValue) {
    const filterdata = datas.filter(data1 => {
      const data2 = new Date(data1.dateOfSale);
      return data2.getMonth() == month;
    })

    if (searchValue) {
      const filterdata2 = filterdata.filter(data => {
        const searchNumber = Number(searchValue);
        console.log(searchValue);
        return Math.floor(data.price) === searchNumber;
      })
      return filterdata2;
    } else {
      return filterdata;
    }
  }

  const filteredData = fdata(datas, month, searchValue);
  // console.log(filteredData);


  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const sumprice = filteredData.reduce(function(sum,cur){
    return sum + cur.price;
  },0)
  // console.log(sumprice);

  const sumsold = filteredData.reduce((sum,cur)=>{
    if (cur.sold === true){
      return sum + 1;
    }
    return sum;
  },0)
  console.log(sumsold);

  const sumNotSold = filteredData.reduce((sum,cur)=>{
    if(cur.sold === false){
      return sum + 1;
    }
    return sum;
  },0)

  const pricearray = filteredData.map((data,index)=>{
      return data.price;
  })  
  console.log(pricearray);

  const ranges = ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901 above'];

  const counts = new Array(ranges.length).fill(0);

  pricearray.forEach(price => {
    if(price<=100){
      counts[0]++;
    }else if(price<=200){
      counts[1]++;
    }else if(price<=300){
      counts[2]++;
    }else if(price<=400){
      counts[3]++;
    }else if(price<=500){
      counts[4]++;
    }else if(price<=600){
      counts[5]++;
    }else if(price<=700){
      counts[6]++;
    }else if(price<=800){
      counts[7]++;
    }else if(price<=900){
      counts[8]++;
    }else{
      counts[9]++;
    }    
  });

  const data = {
    labels: ranges,
    datasets: [
      {
        label: 'numberOfItemInPriceRange',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192,)',
        borderColor: 'rgba(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  
  

  return (
    <>
      <h2>Transaction Dashboard</h2>
      <h2>datas:{datas.length}</h2>

      <div className='box1'>
        <div>
          <label htmlFor="inp">Search Transaction:</label>
          <input name='inp' onChange={(e) => setSearchValue(e.target.value)} type="number" placeholder='Enter the price' />
        </div>
        <div className="dropdown">
          <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
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

      
      <table className="table">
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
            filteredData.map((data, index) => (

              <tr key={data.id}>
                <th >{index + 1}</th>
                <td >{data.title}</td>
                <td>{data.price}</td>
                <td >{data.description}</td>
                <td>{data.category}</td>
                <td><a href="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg">{data.image}</a></td>
                <td>{data.sold ? "true" : "false"}</td>
                <td>{data.dateOfSale}</td>
              </tr>
            ))
          }
        </tbody>
      </table>


      <div>
        <h2>Statistics: {months[month]}</h2>
        <p>Total sale: {sumprice}</p>
        <p>Total sold item: {sumsold}</p>
        <p>Total not sold item: {sumNotSold}</p>
      </div>
      

<div>
<h2>Chart Bar: {months[month]}</h2>
 <Bar data={data} options={options} />
</div>

    </>
  )
}

export default App 