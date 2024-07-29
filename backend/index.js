const express = require('express')  
 const app = express();
 const port  = 3000;

 app.get('/',(req,res) =>{
    res.send('hello hey')
 })

 async function getData() {
  const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    data = await response.json();
    console.log('Data fetched successfully');
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}


(async () => {
  await getData(); 
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
})();


app.get('/api/data', (req, res) => {
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Data not available' });
  }
});
