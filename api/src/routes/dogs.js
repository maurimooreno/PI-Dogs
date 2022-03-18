// const { router } = require('express').Router();
const { Op } = require('sequelize');
const { Dog, Temperament} = require('../db');
const axios = require('axios');
const e = require('express');
const {API_KEY} = process.env;

const getApiDogs = async () => {
    const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let dogsApiInfo =  await dogsApi.data
    dogsApiInfo =  dogsApiInfo.map(dog => {
        let temp;
        if(dog.temperament !== undefined){
            temp = dog.temperament.split(/ |, |,/)
        }
        temp = temp?.map(el => {
            return{
                name: el
            }
        })
        
        return {
            id: dog.id, 
            name: dog.name,
            image: dog.image.url,
            weight: dog.weight.metric,
            height: dog.height.metric,
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
        let temp =  d.temperaments.map(t=>{
            return{
                id: t.id,
                name: t.name
            }
        })
        return{
            id: d.id, 
            name: d.name,
            image: d.image,
            weight: d.weight,
            height: d.height,
            yearsOfLife: d.yearsOfLife,
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

const getDogDB = async (name) => {
    const dog = await Dog.findAll({where: {name: {[Op.substring]: name}}, include: Temperament})
    let data = dog.map(d=> d.dataValues)
    data = data.map(d=>{
        let temp =  d.temperaments.map(t=>{
            return{
                id: t.id,
                name: t.name
            }
        })
        return{
            id: d.id, 
            name: d.name,
            image: d.image,
            weight: d.weight,
            height: d.height,
            yearsOfLife: d.yearsOfLife,
            temperament: temp
        }
    })
    return data;
}

const getDogApi = async (name) => {
    const dog = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let dogInfo = await dog.data
    console.log(dogInfo)
    dogInfo = dogInfo.map(d => d.name.includes(name))
    dogInfo =  dogInfo.map(dog => {
        let temp;
        if(dog.temperament !== undefined){
            temp = dog.temperament.split(/ |, |,/)
        }
        temp = temp?.map(el => {
            return{
                name: el
            }
        })
        return {
            id: dog.id, 
            name: dog.name,
            image: dog.image?.url,
            weight: dog.weight.metric,
            height: dog.height.metric,
            yearsOfLife: dog.life_span,
            temperament: temp
        }
    })
    return dogInfo;
    
}

const getDog = async (name) => {
    let findDog =  await getAllDogs();
    findDog = findDog.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
    return findDog;
    // let dogApi = await getDogApi(name);
    // let dogDB = await getDogDB(name);
    // if(dogApi && dogDB) return all = dogApi.concat(dogDB)
    // if(dogApi) return dogApi;
    // if(dogDB) return dogDB;
    // return [];
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