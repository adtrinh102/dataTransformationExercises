const calculateTotalPokemonWeight = (pokemons) => {
    return pokemons.reduce((totalWeight, currentPokemon) => {
        return totalWeight + parseFloat(currentPokemon.weight)
    }, 0)
}

const calculateAverageSpawnChance = (pokemons) => {
    let totalSpawnChance = 0
    totalSpawnChance = pokemons.reduce((spawnChance, currentPokemon) => {
        return spawnChance + currentPokemon.spawn_chance
    }, 0)
    return totalSpawnChance / pokemons.length
}

const calculateTotalEggDistance = (pokemons) => {
    return pokemons
        .filter(pokemon => pokemon.egg !== "Not in Eggs")
        .reduce((eggDistance, currentPokemon) => {
            return eggDistance + parseFloat(currentPokemon.egg)
        }, 0)
}

const getHeaviestPokemon = (pokemons) => {
    const heaviestWeight = pokemons
        .reduce((heaviestWeight, currentPokemon) => {
            if (parseFloat(currentPokemon.weight) > heaviestWeight) {
                heaviestWeight = parseFloat(currentPokemon.weight)
            }
            return heaviestWeight
        }, 0)

    return pokemons.find(pokemon => parseFloat(pokemon.weight) === heaviestWeight)
}

const categorizePokemonsByRarity = (pokemons) => {
    const common = pokemons.filter(pokemon => pokemon.spawn_chance > 0.1)
    const rare = pokemons.filter(pokemon => pokemon.spawn_chance <= 0.1 && pokemon.spawn_chance > 0.01)
    const legendary = pokemons.filter(pokemon => pokemon.spawn_chance <= 0.01)
    
    return {common, rare, legendary}
}


module.exports = {
    calculateTotalPokemonWeight,
    calculateAverageSpawnChance,
    calculateTotalEggDistance,
    getHeaviestPokemon,
    categorizePokemonsByRarity
}