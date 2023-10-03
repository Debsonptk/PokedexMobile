import { memo } from 'react';
import { Image, Text, View } from '@gluestack-ui/themed';
import { transparentize } from 'polished';
import { TouchableOpacity } from 'react-native';
import { pokemonColors, unslugify } from 'helpers/index';
import { PokemonType } from 'types/PokemonType';

interface IPokemonCardProps {
  pokemon: PokemonType;
  onPress: () => void;
}

const Component: React.FC<IPokemonCardProps> = ({ pokemon, onPress }) => {
  const colors =
    pokemonColors?.[pokemon.color as keyof typeof pokemonColors] ||
    pokemonColors.black;

  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center' }}
      onPress={onPress}
    >
      <View
        mb={16}
        bg={colors.background}
        p={16}
        borderRadius={15}
        maxWidth="100%"
        minWidth={190}
      >
        <Text color={colors.name}>{unslugify(pokemon.name)}</Text>
        <Text
          alignSelf="flex-end"
          color={colors.text}
          fontSize={14}
          bold
          marginBottom={6}
          fontWeight="normal"
          position="absolute"
          right={8}
          top={4}
        >
          {pokemon.pokedexIndex}
        </Text>

        <View minHeight={66} minWidth={66}>
          {pokemon.types.map((type) => (
            <View
              bg={transparentize(0.7)(colors.name)}
              py={2}
              px={12}
              borderRadius="$full"
              mr="auto"
              mb={4}
            >
              <Text color={colors.name} key={type}>
                {unslugify(type)}
              </Text>
            </View>
          ))}
        </View>
        {pokemon.image && (
          <Image
            source={{ uri: pokemon.image }}
            h={66}
            w={66}
            alt={pokemon.name}
            position="absolute"
            bottom={0}
            right={0}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(Component);
