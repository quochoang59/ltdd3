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

const Login = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});

    const onLogin = ()=>{
        fetch('https://quochoang59.000webhostapp.com/API/Login.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email : email,
              password : password,
             
            
       //Chuyen object thanh string va dua len server
            })
       
            }).then((response) => response.json())
                .then((responseJson) => {
                  if(responseJson == "No")
                  {
                      alert("Invalid Email Or Password")
                  }
                  else{
                    
                    setData(responseJson);
                    if(data.role == '1' ){
                        navigation.navigate('Admin');
                    }
                    else{
                      navigation.navigate('Home',{data:data.name,key:"dasdas"});
                    }
                  }
       
                }).catch((error) => {
                  console.error(error);
                });
    }


    return(
        <View style={styles.container}>
        <Text style={{fontSize:20}}>Login</Text>
        <Image style={styles.image} source={{uri:'https://cdn-icons-png.flaticon.com/128/5087/5087579.png'}} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
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
        <TouchableOpacity
          style={styles.dangky}
          onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: 'blue' }}>Don't have account ? Register</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={() => onLogin()}
          />
        </View>
      </View>
    );
}
export default Login;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: '20%',
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
    dangky: {
      marginTop: 15,
    },
  });