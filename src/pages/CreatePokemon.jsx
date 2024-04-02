// Librairies
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// components
import MakeForm from '../components/MakeForm/MakeForm';

// Récupération FIREBASE_URL
// const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

export default function CreatePokemon() {
  // VARIABLES
  // Variable 1 - useNavigate
  const navigate = useNavigate();

  // Refs
  const name = useRef('');
  const height = useRef('');
  const weight = useRef('');
  const hp = useRef('');
  const attack = useRef('');
  const defense = useRef('');
  const specialAttack = useRef('');
  const specialDefense = useRef('');
  const speed = useRef('');
  const image = useRef('');
  const types = useRef([]);

  // Function
  const onCreateNewPokemon = async () => {
    const newPokemon = {
      // General
      name: name.current.value,
      height: height.current.value / 10, // cm to decimeter
      weight: weight.current.value * 10, // kg to hectogram
      sprites: {
        other: {
          home: {
            front_default: image.current.value,
          },
        },
      },
      // Stats
      stats: [
        {
          base_stat: hp.current.value,
          stat: {
            name: 'hp',
          },
        },
        {
          base_stat: attack.current.value,
          stat: {
            name: 'attack',
          },
        },
        {
          base_stat: defense.current.value,
          stat: {
            name: 'defense',
          },
        },
        {
          base_stat: specialAttack.current.value,
          stat: {
            name: 'special-attack',
          },
        },
        {
          base_stat: specialDefense.current.value,
          stat: {
            name: 'special-defense',
          },
        },
        {
          base_stat: speed.current.value,
          stat: {
            name: 'speed',
          },
        },
      ],
      // Types
      types: [],
    };

    // Loop on types to add them to pokemon if checked
    const typesKeys = Object.keys(types.current);
    typesKeys.forEach((type) => {
      if (types.current[type].checked) {
        newPokemon.types.push({
          type: {
            name: type,
          },
        });
      }
    });

    // Add to firebase realtime
    const response = await fetch(
      'https://react-pokedex-420b3-default-rtdb.firebaseio.com/pokemons.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon),
      }
    );

    // Error message
    if (!response.ok) return toast.error('Une erreur est survenue .');

    // get the id
    const { name: newPokemonName } = await response.json();

    // Redirect with useNavigate (react-router)
    navigate(`/pokemon/${newPokemonName}`);
  };

  return (
    <div>
      <h1 className='text-3xl font-semibold text-center mb-10'>
        Créer un pokémon
      </h1>
      <div className='m-5 max-w-xl mx-auto p-10 bg-yellow-pokemon rounded-xl bg-opacity-10'>
        <MakeForm
          name={name}
          height={height}
          weight={weight}
          hp={hp}
          attack={attack}
          defense={defense}
          specialAttack={specialAttack}
          specialDefense={specialDefense}
          speed={speed}
          image={image}
          types={types}
          onFormSubmittedHandler={onCreateNewPokemon}
        />
      </div>
    </div>
  );
}
