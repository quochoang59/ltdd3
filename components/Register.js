import React, { useState,useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Modal
  
} from 'react-native';

const Register = ({navigation}) =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(0);

    const onRegister = ()=>{
        fetch('https://quochoang59.000webhostapp.com/API/Register.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name : name,
              password : password,
              email : email,
              role: role,
            
       //Chuyen object thanh string va dua len server
            })
       
            }).then((response) => response.json())
                .then((responseJson) => {
                  if(responseJson=="Success!")
                  {
                      navigation.navigate('Login');
                  }
       
                }).catch((error) => {
                  console.error(error);
                });
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize:20}}>Register</Text>
          <Image style={styles.image} source={{uri:'https://icon-library.com/images/register-icon-png/register-icon-png-9.jpg'}} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => {
             setName(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          
          <TouchableOpacity
            style={styles.dangnhap}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'blue' }}>Already have an account ?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <Button title="Register" onPress={() => onRegister()} />
          </View>
        </View>
    );
}

export default Register;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: '20%',
    },
    title: {
      fontSize: 30,
      marginTop: 20,
      fontWeight: 'bold',
      color: 'red',
    },
    image: {
      height: 120,
      width: 120,
    },
    input: {
      padding: 8,
      height: 35,
      width: '80%',
      borderColor: 'black',
      borderWidth: 1,
      marginTop: 10,
    },
    button: {
      marginTop: 20,
      width: '30%',
    },
    dangnhap: {
      marginTop: 15,
    },
  });