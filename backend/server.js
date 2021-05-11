import express from 'express';


const app = express();
app.get('https://fakestoreapi.com/products' , (req, res) =>{
    res.send(data.products);
})

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.listen(3000, () => {
    console.log('Server at http://localhost:3000');
});
