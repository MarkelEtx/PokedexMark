//Details.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, ScrollView, ProgressBarAndroid } from 'react-native';
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';
// import global_es from "../Translations/es/global.json";
// import global_en from "../Translations/en/global.json";
// import {useTanslation} from "react-i18next";
// import { styles } from './styles';

// i18next.init({
//     interpolation: {escapeValue:false},
//     lng: "es",
//     resources:{
//         es:{
//             global: global_es
//         },
//         en:{
//             global: global_en
//         },
//     },
// })
const Details = props => {
    const [details, setDetails] = useState([]);
    const [imagesgen] = useState([
        `https://img.pokemondb.net/sprites/red-blue/normal/`,
        `https://img.pokemondb.net/sprites/silver/normal/`,
        `https://img.pokemondb.net/sprites/ruby-sapphire/normal/`,
        `https://img.pokemondb.net/sprites/diamond-pearl/normal/`,
        `https://img.pokemondb.net/sprites/black-white/normal/`,
        `https://img.pokemondb.net/sprites/x-y/normal/`,
        `https://img.pokemondb.net/sprites/sun-moon/normal/`,
        `https://img.pokemondb.net/sprites/sword-shield/normal/`
    ]);

    useEffect(() => {
        fetchPokemonDetails();
    }, []);

    const fetchPokemonDetails = () => {
        const { state } = props.navigation;
        fetch(`https://pokeapi.co/api/v2/pokemon/${state.params.pokemon}`)
            .then(res => res.json())
            .then(details => {
                setDetails(details)
            });

    };
    function estadisticas() {
        return (details.stats).map((stat) => {
            return (

                <Text style={styles.textStats}>{stat.stat.name}:
                    <Text style={(stat.base_stat >= 70) ? styles.green : styles.red}>{stat.base_stat}</Text>{"\n"}
                    <ProgressBarAndroid style={{ width: 100 }}
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={stat.base_stat / 100}
                        color={(stat.base_stat >= 70) ? "green" : "red"}
                    />
                </Text>

            )
        })
    }
    function generaciones() {
        return (imagesgen).map((imagen, n) => {
            return (
                <View style={styles.spriteimg}>
                    <Text>{n + 1}.Generación</Text>
                    <Image
                        style={{ width: 100, height: 100, }}
                        source={{
                            uri: imagen + details.name + ".png",
                        }}
                    />
                </View>
            )
        })
    }

    //const[t,i18n] = useTanslation("global");

    return details.name ? (
        <View style={[styles.container]}>
            <ScrollView>
                <View style={[styles.apartado]}>
                    <Text style={styles.textName}>{details.id}-{details.name}</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 3, }} >

                    <Image
                        style={styles.apartadoimg}
                        source={{
                            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`,
                        }}
                    />
                    <View style={styles.apartado} >
                        <Button style={{ width: 12 }}
                            onPress={() => alert('This is a button!')}
                            title="español"
                            color="red"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Button style={{ width: 12 }}
                            onPress={() => alert(images[0] + details.name + ".png")}
                            title="Ingles"
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
                            <Text >pepea: {details.abilities[0].ability.name}</Text>
                            <Text >Type: {details.types[0].type.name}{(details.types.length > 1) ? "/" + details.types[1].type.name : null}</Text>
                            <Text >Height: {details.height}</Text>
                            <Text >Weight: {details.weight}</Text>
                        </View>
                        <View style={styles.mediaColInfo}>
                            {estadisticas()}
                        </View>
                    </View>
                </View>
                <View style={styles.apartdoSprites} >
                    <View style={styles.infoBack}>
                        <Text style={styles.infotext}>SPRITES</Text>

                    </View>
                    <ScrollView
                        horizontal={true}>
                        <View style={styles.generaciones} >
                            {generaciones()}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    ) : (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ActivityIndicator size="large" color="green" />
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
        height: 150


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
        flex: 3,
        backgroundColor: "gray",
        borderRadius: 10,
        margintop: 10,
        marginHorizontal: 10,
        marginBottom: 10
    },
    spriteimg: {
        backgroundColor: "dimgray",
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    generaciones: {
        flexDirection: "row",
        flex: 2
    }


});
