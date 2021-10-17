import React, { useState, useRef } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from "../hook/Auth";

import Logo from '../assets/Logo.png';
import IllustrationInitial from '../assets/IllustrationInitial.png';

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const passwordRef = useRef<TextInput>(null);
    const buttonSubmit = useRef<TouchableOpacity>(null);

    async function handleSubmit(){
        setLoading(true);
        try {
            await signIn({ email, password });
            navigation.navigate('Home');
            setEmail('');
            setPassword('');
            setLoading(false);
        } catch (error) {
            Alert.alert('Autenticação', 'Usuário ou senha inválido');
            setLoading(false);
            setPassword('');
        }

    };

    return (
        <SafeAreaView style={styles.Container}>
            <StatusBar translucent style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "position" : 'height'}
                enabled
                style={{ flex: 1 }}
            >
                
                <ScrollView 
                    keyboardShouldPersistTaps='handled'
                >
                
                
                    <View style={styles.ContentBrand}>

                        <Image
                            source={Logo}
                            />

                        <Image
                            style={styles.Illustration}
                            source={IllustrationInitial}
                        />

                    </View>


                    <View style={styles.CotentSign}>
                        <Text style={styles.Title} >Acessar</Text>
                        
                        <View>
                            <TextInput
                                style={styles.Input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="E-Mail"
                                keyboardType="email-address"
                                autoCapitalize='none'
                                returnKeyType='next'
                                onSubmitEditing={
                                    () => passwordRef.current?.focus()
                                }
                            />
                            <TextInput
                                ref={passwordRef}
                                secureTextEntry={true}
                                style={styles.Input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Senha"
                                keyboardType="email-address"
                                autoCapitalize='none'
                                returnKeyType='next'
                                onSubmitEditing={
                                    () => buttonSubmit.current?.focus()
                                }
                            />
                        </View>

                        {
                            loading
                            ? 
                            <View  style={styles.Loading}>
                                <ActivityIndicator size='large' color='#2446C0'/>
                            </View>
                            :
                            <TouchableOpacity 
                                style={styles.ButtonSign} 
                                onPress={handleSubmit} 
                                ref={buttonSubmit}
                            >
                                <Text style={styles.TextButton} >ENTRAR</Text>
                            </TouchableOpacity>
                        }
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({   
    Container: {
        flex: 1,
        backgroundColor: '#2446C0',
    },
    Title: {
        color: '#000',
        fontFamily: 'Saira_400Regular',
        fontSize: 28,
        marginTop: 10
    },
    ButtonSign: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#3f51b5",
        width: 320,
        height: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextButton: {
        color: '#FFF',
        fontFamily: 'Roboto_400Regular',
        fontSize: 20
    },
    ContentBrand: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        height: 380,
        paddingTop: 50
    },
    Illustration: {
        width: 300,
        height: 167,
        marginBottom: 30
    },
    CotentSign: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: '100%',
        height: 268,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        paddingBottom: 10,
        paddingHorizontal: 50,
    },
    Input: {
        width: 320,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#A9A9A9',
    },
    Loading: {
        width: 350,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SignIn;