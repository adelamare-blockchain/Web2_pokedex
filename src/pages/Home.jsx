// Librairies
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';

// components
import { useCounter } from '../hooks/useCounter';
import Pokecard from '../components/Pokecard/Pokecard';

// MAIN FUNCTION
export default function Home() {
  // VARIABLES
  // Variable 1 - loaderPokemon
  const loaderPokemons = useLoaderData();

  // STATES
  // State 1 - pokemons
  const [pokemons, setPokemons] = useState(loaderPokemons);
  // State 2 - loading
  const [loading, setLoading] = useState(false);

  // METHODES
  // 1) Fetch first 30 pokemons
  const fetchPokemons = async (add = false) => {
    setLoading(true);

    setLoading(false);
  };

  // // CYCLES
  // // ComponentDidMount
  // useEffect(() => {
  //   fetchPokemons();
  // }, []);

  return (
    <div>
      {/* Pokemons */}
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-w-7xl mx-auto mt-10 md:p-0 p-5'>
        {pokemons.map((pokemon, i) => (
          <Pokecard key={i} pokemon={pokemon} />
        ))}
      </div>
      {/* Loading */}
      {loading && (
        <div className='flex justify-center items-center text-white mt-5'>
          Chargement...
        </div>
      )}
      {/* Get More Pokemons */}
      <div className='flex justify-center my-10'>
        <button
          className='bg-white hover:bg-gray-50 rounded-full text-black py-2 px-5 text-lg font-semibold shadow-lg hover:shadow-xl transition duration-150 disabled:opacity-80 disabled:cursor-wait'
          onClick={() => fetchPokemons(true)}
          disabled={loading}>
          Encore plus de pokemons
        </button>
      </div>
    </div>
  );
}

export async function loader() {
  try {
    // Get the first pokemons
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=30`,

      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      toast.error('Une erreur est survenue.');
    }

    const data = await response.json();

    // Get the array of 30 first pokemons
    const promises = data.results.map(async (pokemon) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      return await response.json();
    });

    const pokemonDetails = await Promise.all(promises);

    // Si pas d'ajout de pokemons
    const myPokemonsArray = [];

    // My Created pokemons
    const myPokemonsResponse = await fetch(
      import.meta.env.VITE_REACT_APP_FIREBASE_URL,
      {
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Response of myPokemons
    const myPokemonsData = await myPokemonsResponse.json();

    // Transform data to pokeapi
    for (const key in myPokemonsData) {
      myPokemonsArray.push({
        id: key,
        ...myPokemonsData[key],
      });
    }

    return [...myPokemonsArray, ...pokemonDetails];
  } catch (error) {
    console.error(error);
  }
}
