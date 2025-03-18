import { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Input,
  VStack,
  Heading,
  Spinner,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import { PokemonCard } from './components/PokemonCard';
import { Pokemon, PokemonListResponse } from './types/pokemon';

const App = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get<PokemonListResponse>(
          'https://pokeapi.co/api/v2/pokemon?limit=151'
        );

        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailResponse = await axios.get<Pokemon>(pokemon.url);
            return detailResponse.data;
          })
        );

        setPokemons(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%" maxW="1280px" p={4}>
        <VStack spacing={8} align="center" mb={8}>
          <Heading>Pokemon Explorer</Heading>
          <Input
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxW="400px"
            size="lg"
          />
        </VStack>

        {loading ? (
          <Center h="50vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3, xl: 4 }} 
            spacing={6}
            justifyItems="center"
            alignItems="stretch"
          >
            {filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default App;
