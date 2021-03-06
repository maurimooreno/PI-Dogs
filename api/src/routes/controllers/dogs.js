const { Dog, Temperament} = require('../../db.js');
const axios = require('axios');
const {API_KEY} = process.env;

const getApiDogs = async () => {
    const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let dogsApiInfo =  await dogsApi.data
    dogsApiInfo =  dogsApiInfo.map(dog => {
        
        let temp;
        if(dog.temperament !== undefined){
            temp = dog.temperament.split(/ |, |,/)
        }
        temp = temp?.map(t => t)
        let pesoImperial = dog.weight.imperial.split([' - '])
        let pesoMetrico = [
            Math.round(0.45 * Number(pesoImperial[0])),
            Math.round(0.45 * Number(pesoImperial[1]))
        ]
        let alturaImperial = dog.height.imperial.split(' - ')
        let alturaMetrica = [
            Math.round(2.54 * Number(alturaImperial[0])),
            Math.round(2.54 * Number(alturaImperial[1]))
        ]
        return {
            id: dog.id, 
            name: dog.name,
            image: dog.image.url,
            weight: pesoMetrico,
            height: alturaMetrica,
            yearsOfLife: dog.life_span,
            temperament: temp
        }
    })
    return dogsApiInfo
}

const getDbDogs = async () => {
    let dogsInfo = await Dog.findAll( {include: Temperament});
    let data = dogsInfo.map(d=> d.dataValues)
    data = data.map(d=>{
        let temp =  d.temperaments.map(t=> t.name)
        return{
            id: d.id, 
            name: d.name,
            image: d.image,
            weight: d.weight,
            height: d.height,
            yearsOfLife: d.yearsOfLife,
            createdInDB: d.createdInDB,
            temperament: temp
        }
    })
    return data;
}

const getAllDogs = async () => {
    let allDogs = []
    let dogsApi = await getApiDogs();
    let dogsDB = await getDbDogs();
    allDogs = dogsApi.concat(dogsDB);
    return allDogs;
}

const getDog = async (name) => {
    let findDog =  await getAllDogs();
    findDog = findDog.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
    return findDog;
}
const addDog = async (name, image, weight, height, yearsOfLife, temperament) => {
    let newDog = await Dog.create({
        name,
        image,
        weight,
        height,
        yearsOfLife
    })
    for(const el of temperament) {
        let temperamentDB = await Temperament.findOne({where : {name : el}})
        newDog.addTemperament(temperamentDB);
    };
    return newDog;
}

module.exports = {getAllDogs, addDog, getDog}; 