import { Box, Image, Text, VStack, Badge, HStack } from "@chakra-ui/react";
import { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors = {
  normal: "gray",
  fire: "red",
  water: "blue",
  electric: "yellow",
  grass: "green",
  ice: "cyan",
  fighting: "orange",
  poison: "purple",
  ground: "brown",
  flying: "blue.100",
  psychic: "pink",
  bug: "green.400",
  rock: "brown.400",
  ghost: "purple.700",
  dragon: "purple.500",
  dark: "gray.700",
  steel: "gray.400",
  fairy: "pink.200",
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Box
      w="100%"
      maxW="300px"
      h="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="white"
      boxShadow="md"
      _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <VStack spacing={3} h="100%" justify="space-between">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          boxSize="200px"
          objectFit="contain"
        />
        <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
          {pokemon.name}
        </Text>
        <HStack spacing={2}>
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              colorScheme={typeColors[type.type.name as keyof typeof typeColors] || "gray"}
              fontSize="0.8em"
              textTransform="capitalize"
            >
              {type.type.name}
            </Badge>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};