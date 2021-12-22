const express = require('express');
const mongoose = require('mongoose')
const app = express();
const FoodModel = require('./models/Food')
const cors = require ('cors')

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sagz999:sagz1987@cluster0.zvemo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

app.post('/insert', async (req, res) => {

    const food = new FoodModel({ foodName:req.body.foodName , daysSinceIate: req.body.days })

    try {
        await food.save();
        res.send("inserted data")
    } catch (err) {
        console.log(err)
    }
})

app.get('/read', (req, res) => {

    FoodModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }

        res.send(result)
    })
    
})

app.put('/update', async (req, res) => {

    const newFoodName=req.body.newFoodName
    const id =req.body.id

    try {
        await FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("updated")
        })

    } catch (err) {
        console.log(err)
    }
})

app.delete('/delete/:id', async(req, res) => {
const id = req.params.id
    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted")
    
})

app.listen(3001, () => {
    console.log('Server running on PORT:3001....')
});