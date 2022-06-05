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
  
  
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import {  SafeAreaView } from "react-native-web";
import RNPickerSelect from 'react-native-picker-select';
import { clearErrors } from "react-native/Libraries/LogBox/Data/LogBoxData";

const AddBook = () => {
  const [id, setId] = useState(0);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
    const [type, setType] = useState('');
     const [price, setPrice] = useState('');
     const [data, setData] = useState([]);
     const [image, setImage] = useState('');
     const [author, setAuthor] = useState('');
     const [refresh, setRefresh] = useState(false);

    // them sach
     const onAddBook = () =>{
      fetch('https://quochoang59.000webhostapp.com/API/Create.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name : name,
        type_id : type,
        price : price,
        image: image,
        description: description,
        author: author,
 //Chuyen object thanh string va dua len server
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
            alert(responseJson);
            clearText();
 
          }).catch((error) => {
            console.error(error);
          });
     };
     const clearText=()=>{
      setName(""),
      setType(""),
      setPrice(""),
      setImage(""),
      setAuthor(""),
      setDescription("");
     }



     return(
      <View style={{marginTop:50}} >
        <Text style={{textAlign:"center",fontSize:20}}>ADD BOOKS</Text>
        <View style={styles.input}>
          <Text>Name: </Text>
          <TextInput
            keyboardType="default"
            placeholder="Enter Name"
            onChangeText={(text) => {
             setName(text)
            }}
            value = {name}
          />
        </View>
        <View style={{paddingHorizontal:20}}>
            <Text>
            Type 
            </Text>
            <RNPickerSelect
                onValueChange={(value) => setType(value)}
                items={[
                    { label: "Horror", value: "1" },
                    { label: "Romane", value: "2" },
                    { label: "Sci-fi", value: "3" },
                    { label: "Thrilled", value: "4" },
                ]}
            />
        </View>

         <View style={styles.input}>
          <Text>Price: </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter Price"
            onChangeText={(text) => {
             setPrice(text)
            }}
            value = {price}
          />
        </View>
        <View style={styles.input}>
          <Text>Image: </Text>
          <TextInput
            placeholder="Image link"
            onChangeText={(text) => {
             setImage(text)
            }}
            value={image}
          />
        </View>
        <View style={styles.input}>
          <Text>Description: </Text>
          <TextInput
            placeholder="Description"
            onChangeText={(text) => {
             setDescription(text)
            }}
            value={description}
          />
        </View>
        <View style={styles.input}>
          <Text>Author: </Text>
          <TextInput
            placeholder="Author"
            onChangeText={(text) => {
             setAuthor(text)
            }}
            value={author}
          />
        </View>
        <View>
            <TouchableOpacity onPress={()=>onAddBook()}>
              <Text title="Submit" style={styles.button}>Submit</Text>
            </TouchableOpacity>
        </View>
      </View>
     );
}
export default AddBook;

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    height: 40,
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
  },
  button: {
    marginVertical:10,
    padding:5,
    textAlign:"center",
    borderWidth: 2,
    backgroundColor:"blue",
    color:"white",
    borderRadius: 10,
    width:100,
    justifyContent:"center",
    alignSelf:"center",
  },
});
  
