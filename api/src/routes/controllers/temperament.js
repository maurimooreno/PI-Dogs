const { Temperament } = require('../../db.js');
const axios = require('axios');
const {API_KEY} = process.env;

const getAllTemperaments = async () => {
    let allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
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
    allTempDB = allTempDB.map(t=> t.name)

    return allTempDB;
}

module.exports = {getAllTemperaments};