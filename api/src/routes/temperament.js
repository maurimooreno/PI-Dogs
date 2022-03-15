const { Temperament } = require('../db');
const axios = require('axios');

const getAllTemperaments = async () => {
    let allDogs = await axios.get('https://api.thedogapi.com/v1/breeds');
    let arrayTemp = allDogs.data.map(dog=> dog.temperament)
    let conversion = arrayTemp.toString();
    let allTemperaments = conversion.split(/ |,/);

    allTemperaments.forEach( temp => {
        if(temp){
            Temperament.findOrCreate({
                where : {name : temp}
            })
        }
    });
    let allTempDB = await Temperament.findAll();
    return allTempDB;
}

module.exports = {getAllTemperaments};