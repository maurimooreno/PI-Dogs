const { Router } = require('express');

const {getAllTemperaments} = require('../routes/controllers/temperament.js')

const router = Router();

router.get('/', async (req,res, next) => {
    try {
        let allTemperaments = await getAllTemperaments();
        if(allTemperaments){
            return res.status(200).json(allTemperaments);
        }else{
            return res.status(404).send('No hay temperamentos en la base de datos')
    }
    } catch (error) {
        next(error)
    }
    
})

module.exports = router;