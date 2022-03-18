const { Temperament } = require('../db');
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
    allTempDB = allTempDB.map(t=>{
        return{
            id: t.id,
            name: t.name
        }
    })
    return allTempDB;
}

module.exports = {getAllTemperaments};