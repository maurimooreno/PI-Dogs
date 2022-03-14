const { router } = require('express').Router();
const { Op } = require('sequelize');
const { Dog } = require('../db');
const axios = require('axios');


const getApiDogs = async () => {

    const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    const dogsApiInfo =  await dogsApi.data.map(dog => {
        return {
            id: dog.id, 
            name: dog.name,
            image: dog.image,
            weight: dog.weight,
            heigth: dog.heigth,
            yearsOfLife: dog.life_span,
            temperament: dog.temperament
        }
    })
    return dogsApiInfo
}

const getDbDogs = async () => {
    const dogsInfo = await Dog.findAll();
    return dogsInfo;
}


const getAllDogs = async () => {
    let allDogs = []
    let dogsApi = await getApiDogs();
    let dogsDB = await getDbDogs();
    allDogs = dogsApi.concat(dogsDB);
    return allDogs;
}

const getDogDB = async (name) => {
    const dog = await Dog.findAll({where: {name: {[Op.substring]: name}}})
    return dog;
}

const getDogApi = async (name) => {
    const dog = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    const dogInfo = await dog.data.filter(dog => {
        return {
            id: dog.id, 
            name: dog.name,
            image: dog.image,
            weight: dog.weight,
            heigth: dog.heigth,
            yearsOfLife: dog.life_span,
            temperament: dog.temperament
        }
    })
    return dogInfo;
    
}

const getDog = async (name) => {
    let dogApi = await getDogApi(name);
    let dogDB = await getDogDB(name);
    let all = []
    if(dogApi && dogDB) return all = dogApi.concat(dogDB)
    if(dogApi) return dogApi;
    if(dogDB) return dogDB;
    return [];
}
const addDog = async (name, image, weight, heigth, yearsOfLife, temperament) => {
    let newDog = await Dog.create({
        name,
        image,
        weight,
        heigth,
        yearsOfLife
    })
    return newDog;
}

module.exports = {getAllDogs, addDog, getDog}; 