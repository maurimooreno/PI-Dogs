const { Router } = require('express');
const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getAllDogs, addDog, getDog} = require('../routes/dogs.js');
const {getAllTemperaments} = require('../routes/temperament.js')


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use(express.json())

router.get('/dogs', async (req, res) => {
    let name = req.query.name;
    if(name){
        let dog = await getDog(name);
        dog.length > 0 ? res.status(200).json(dog) : res.status(404).json({error: `El perro con nombre ${name} no se existe`})
    }else{
        let allDogs = await getAllDogs();
        res.status(200).json(allDogs);
    }
})

router.get('/dogs/:id', async (req, res) => {
    let {id} = req.params
    let allDogs = await getAllDogs();
    let dogsFilter = allDogs.filter(dog => dog.id == id);
        dogsFilter.length > 0 ? res.status(200).json(dogsFilter) : res.status(404).json({error: `El perro con ID ${id} no se existe`})
})

router.post('/dog', async (req, res) => {
    let { name, image, weight, heigth, yearsOfLife } = req.body;
    let allDogs = await getAllDogs();
    try {
        let find = allDogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase());
        if(find.length > 0){
            return res.status(406).json('La raza que intentas agregar ya existe');
        }else{
            let newDog = await addDog(name, image, weight, heigth, yearsOfLife)
            res.status(201).json(newDog);
        }
    } catch (error) {
        return res.json(error);
    }
})

router.get('/temperament', async (req,res) => {
    let allTemperaments = await getAllTemperaments();
    if(allTemperaments){
        return res.status(200).json(allTemperaments);
    }else{
        return res.status(404).send('No hay temperamentos en la base de datos')
    }
})
module.exports = router;
