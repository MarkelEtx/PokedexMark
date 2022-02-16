import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';

const Pokemons = props => {
    const [pokemons, setPokemons] = useState([]);
    const [searchfeild, setSearchfeild] = useState('');

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=251')
            .then(response => response.json())
            .then(pokemons => setPokemons(pokemons.results));
    };
    return (
        <View style={[styles.container, {
            flexDirection: "column"
        }]}>
            <View style={styles.searchCont} >
                <TextInput
                    style={styles.searchfeild}
                    placeholder="Search Pokemons"
                    value={searchfeild}
                    onChangeText={value => setSearchfeild(value)}
                />
            </View>
            <View style={{ flex: 2, backgroundColor: "black" }} >
                <ScrollView>
                    <View style={styles.container}>
                        {pokemons
                            .filter(pokemon =>
                                pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
                            )
                            .map((pokemon, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        key={index}
                                        style={styles.card}
                                        onPress={() =>
                                            props.navigation.navigate('Details', {
                                                pokemon: pokemon.name,
                                            })
                                        }>
                                        <Image
                                            style={{ width: 150, height: 150 }}
                                            source={{
                                                uri: `https://img.pokemondb.net/sprites/diamond-pearl/normal/${pokemon.name}.png`,
                                            }}
                                        />
                                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>{pokemon.name}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                    </View>
                </ScrollView>
            </View>

        </View>
    );
};

export default Pokemons;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: "black"
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: "gray",
        borderRadius: 20

    },
    searchCont: {

        paddingLeft: '20%',
        paddingTop: 20,
        flex: 0.3,
        backgroundColor: "red",
        zIndex: 1,

    },

    searchfeild: {
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        width: 250,
        borderRadius: 10,
        backgroundColor: "white",
        zIndex: 1
    },
});
