import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {WebView} from 'react-native-webview'
import { colors, CustomText } from '../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function FeedbackForm({navigation}){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 100, marginLeft: 20}}>
                <AntDesign 
                color={colors.purple200}
                name="left" 
                size={25}/>
                <CustomText style={{color: colors.purple200, fontSize: 22}}>back</CustomText>
            </TouchableOpacity>
            <WebView style={styles.webView} source={{uri: 'https://docs.google.com/forms/d/e/1FAIpQLSeRHrnrciHaSxyrRCpDJmnuO4y1L5jgDznW8emL5y2_f2P_6A/viewform?usp=sf_link'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.formPurple,
    },
    webView: {
        flex: 1,
        backgroundColor: colors.formPurple,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
