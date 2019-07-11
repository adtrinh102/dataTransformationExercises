const { categorizePokemonsByRarity } = require("./2.reduce")

const getGymLeader = (gym, trainers) => {
    return trainers.find(trainer => gym.trainerId === trainer.id)
}

const getTrainerPokemons = (trainer, pokemons) => {
    return pokemons.filter(pokemon => trainer.pokemonIds.includes(pokemon.id))
}

const getTrainersPokemons = (trainers, pokemons) => {
    return trainers.map(trainer => {
        const trainerPokemons = getTrainerPokemons(trainer, pokemons)
        return {
            id: trainer.id,
            name: trainer.name,
            pokemons: trainerPokemons
        }
    })
}

const getBigGyms = (gyms, trainers) => {
    const bigGyms = gyms.filter(gym => {
        const gymLeader = getGymLeader(gym, trainers)
        const numberOfPokemons = gymLeader.pokemonIds.length
        if (numberOfPokemons >= 4) {
            return gym
        }
    })

    return bigGyms.map(gym => gym.city)
}

const getRarestGym = (gyms, trainers, pokemons) => {
    return gyms
    .map(gym => {
        const gymLeader = getGymLeader(gym, trainers)
        const trainerPokemons = getTrainerPokemons(gymLeader, pokemons)

        return {
            gym,
            pokemonByRarity: categorizePokemonsByRarity(trainerPokemons)
        }
    })
    .reduce((rarestGym, currentGym) => {
        const legendaryCountRarestGym = rarestGym.pokemonByRarity.legendary.length
        const legendaryCountCurrentGym = currentGym.pokemonByRarity.legendary.length
        if (legendaryCountCurrentGym > legendaryCountRarestGym) {
            return currentGym
        }
        return rarestGym
    })
    .gym
}


module.exports = {
    getGymLeader,
    getTrainerPokemons,
    getTrainersPokemons,
    getBigGyms,
    getRarestGym,
}