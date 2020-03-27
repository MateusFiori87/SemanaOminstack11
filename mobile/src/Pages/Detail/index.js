import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../../assets/logo.png'
import Styles from './Styles'

export default function Datail() {
    const route = useRoute();
    const navigation = useNavigation();

    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title} " com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    function navigationBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do chão: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Image source={logoImg}></Image>

                <TouchableOpacity onPress={navigationBack}>
                    <Feather name='arrow-left' size={28} color='#E82041' />
                </TouchableOpacity>
            </View>

            <View style={Styles.incident}>
                <Text style={[Styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={Styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>


                <Text style={Styles.incidentProperty}>Caso:</Text>
                <Text style={Styles.incidentValue}>{incident.title}</Text>

                <Text style={Styles.incidentProperty}>VALOR:</Text>
                <Text style={Styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
            </View>

            <View style={Styles.contactBox}>
                <Text style={Styles.heroTitle}>Salve o Dia!</Text>
                <Text style={Styles.heroTitle}>Seja o Heróis desse caso.</Text>
                <Text style={Styles.heroDescription}>Entre em Contato:</Text>

                <View style={Styles.actions} >
                    <TouchableOpacity
                        style={Styles.action}
                        onPress={sendWhatsapp}
                    >
                        <Text style={Styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Styles.action}
                        onPress={sendMail}
                    >
                        <Text style={Styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}