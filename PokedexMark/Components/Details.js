//Details.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, } from 'react-native';
// import { styles } from './styles';


const Details = props => {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetchPokemonDetails();

    }, []);

    const fetchPokemonDetails = () => {
        const { state } = props.navigation;
        fetch(`https://pokeapi.co/api/v2/pokemon/${state.params.pokemon}`)
            .then(res => res.json())
            .then(details => {
                setDetails(details)
                console.log(details)
                
            });

    };
    const images = [
        `https://img.pokemondb.net/sprites/silver/normal/${details.name}.png`,
        `https://img.pokemondb.net/sprites/ruby-sapphire/normal/${details.name}.png`,

    ]
    
    console.log(images)
    return details.name ? (
        <View style={[styles.container]}>
            <View style={[styles.apartado]}>
                <Text style={styles.textName}>{details.id}-{details.name}</Text>

            </View>
            <View style={{ flexDirection: "row", flex: 2, }} >

                <Image
                    style={styles.apartadoimg}
                    source={{
                        uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`,
                    }}
                />
                <View style={styles.apartado} >
                    <Button style={{ width: 12 }}
                        onPress={() => alert('This is a button!')}
                        title="Learn More"
                        color="red"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
            <View style={styles.infoView} >
                <View style={styles.infoBack}>
                    <Text style={styles.infotext}>INFO</Text>
                </View>
                <View style={styles.apartadoInfo}>
                    <View style={styles.mediaColInfo}>
                        <Text >Ability: {details.abilities[0].ability.name}</Text>
                        <Text >Type: {details.types[0].type.name}{(details.types.length > 1) ? "/" + details.types[1].type.name : null}</Text>
                        <Text >Height: {details.height}</Text>
                        <Text >Weight: {details.weight}</Text>
                    </View>
                    <View style={styles.mediaColInfo}>
                        <Text style={styles.textStats}>{details.stats[0].stat.name}: <Text style={(details.stats[0].base_stat >= 70) ? styles.green : styles.red}>{details.stats[0].base_stat}</Text></Text>
                        <Text style={styles.textStats}>{details.stats[1].stat.name}: <Text style={(details.stats[1].base_stat >= 70) ? styles.green : styles.red}>{details.stats[1].base_stat}</Text></Text>
                        <Text style={styles.textStats}>{details.stats[2].stat.name}: <Text style={(details.stats[2].base_stat >= 70) ? styles.green : styles.red}>{details.stats[2].base_stat}</Text></Text>
                        <Text style={styles.textStats}>{details.stats[3].stat.name}: <Text style={(details.stats[3].base_stat >= 70) ? styles.green : styles.red}>{details.stats[3].base_stat}</Text></Text>
                        <Text style={styles.textStats}>{details.stats[4].stat.name}: <Text style={(details.stats[4].base_stat >= 70) ? styles.green : styles.red}>{details.stats[4].base_stat}</Text></Text>
                        <Text style={styles.textStats}>{details.stats[5].stat.name}: <Text style={(details.stats[5].base_stat >= 70) ? styles.green : styles.red}>{details.stats[5].base_stat}</Text></Text>
                    </View>
                </View>
            </View>
            <View style={styles.apartdoSprites} >
                <View style={styles.infoBack}>
                    <Text style={styles.infotext}>SPRITES</Text>
                </View>
            </View>
        </View>
    ) : (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"

    },
    apartado: {
        flex: 1,
        margin: 10,
        backgroundColor: "gray",
        borderRadius: 12,
        padding: 10
    },
    apartadoimg: {
        flex: 1,
        margin: 10,
        backgroundColor: "gray",
        borderRadius: 12,
        padding: 10,
       

    },
    apartado2: {
        padding: 10
    },
    textName: {
        paddingTop: 10,
        fontSize: 50,
        textAlign: "center",
        fontWeight: "bold",
        color: "black"
    },
    textTitle: {
        fontSize: 22,
    },
    text: {
        fontSize: 22,
        marginBottom: 15,

    },
    apartadoInfo: {
        flexDirection: "row",
        flex: 2,
        backgroundColor: "gray",
        borderRadius: 10,
        margin: 10,
        marginTop: 0
    },
    red: {
        color: "red",
        fontWeight: "bold"
    },
    green: {
        color: "green",
        fontWeight: "bold"
    },
    infoView: {
        flexDirection: "column",
        flex: 2,
        backgroundColor: "gray",
        borderRadius: 10,
        margin: 10,
        marginTop: 0
    },
    infotext: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    infoBack: {
        flexDirection: "column",
        flex: 0.5,
        textAlign: "center",
        backgroundColor: "dimgray",
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10
    },
    mediaColInfo: {
        flex: 1
    },
    apartdoSprites: {
        flex: 2,
        backgroundColor: "gray",
        borderRadius: 10,
        margintop: 10,
        marginHorizontal: 10,
        marginBottom: 10
    }

});
