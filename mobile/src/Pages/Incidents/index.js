import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import api from '../../Services/api'

import logoImg from '../../../assets/logo.png'
import Styles from './Styles'

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();
    }, [])

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }
    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Image source={logoImg}></Image>
                <Text style={Styles.headerText}>
                    Total de <Text style={Styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={Styles.title}>Bem Vindo!</Text>
            <Text style={Styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={Styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={Styles.incident}>
                        <Text style={Styles.incidentProperty}>ONG:</Text>
                        <Text style={Styles.incidentValue}>{incident.name}</Text>


                        <Text style={Styles.incidentProperty}>Caso:</Text>
                        <Text style={Styles.incidentValue}>{incident.title}</Text>

                        <Text style={Styles.incidentProperty}>VALOR:</Text>
                        <Text style={Styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={Styles.datailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={Styles.datailsButtonText}> Ver Mais Detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}