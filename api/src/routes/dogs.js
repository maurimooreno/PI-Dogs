const { Router } = require('express');

const {getAllDogs, addDog, getDog} = require('../routes/controllers/dogs.js');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let name = req.query.name;
        if(name){
            let dog = await getDog(name);
            dog.length > 0 ? res.status(200).json(dog) : res.status(404).send({error: 'No se encontro ninguna raza con ese nombre'})
        }else{
            let allDogs = await getAllDogs();
            res.status(200).json(allDogs);
    }
    } catch (error) {
        next(error)
    }
    
})

router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        let allDogs = await getAllDogs();
        let dogsFilter = allDogs.filter(dog => dog.id == id);
        dogsFilter.length > 0 ? res.status(200).json(dogsFilter) : res.status(404).json({error: `El perro con ID ${id} no se existe`})
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        let { name, image, weight, height, yearsOfLife, temperament } = req.body;
        let allDogs = await getAllDogs();
        let find = allDogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase());
        if(find.length > 0){
            return res.status(400).json('La raza que intentas agregar ya existe');
        }else{
            let newDog = await addDog(name, image, weight, height, yearsOfLife, temperament)
            return res.status(201).json(newDog);
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;