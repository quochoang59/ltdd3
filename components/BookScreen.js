//import * as React from 'react';
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
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from "react-native-web";
import RNPickerSelect from 'react-native-picker-select';



 const BookView = () => {
  const [id, setId] = useState(0);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
    const [type, setType] = useState('');
     const [price, setPrice] = useState('');
     const [data, setData] = useState([]);
     const [filterdata, setFilterData] = useState([]);
     const [image, setImage] = useState('');
     const [author, setAuthor] = useState('');
     const [refresh, setRefresh] = useState(false);
     const [modal, setModal] = useState(false);
     
     
const getBook = () => {
  fetch('https://quochoang59.000webhostapp.com/API/Show.php')
    .then((response) => response.json())
    .then((json) => {
      if(json=="No Results Found."){
        alert(json);
      }
      else{
        setData(json);
      }
    //  setData(json);
    })
    .catch((error) => {
      console.error(error);
    });

    
};

// hien thi danh sach bang API
// const getBook = async () => {
//   try {
//     const response = await fetch(
//       'https://quochoang59.000webhostapp.com/API/Show.php'
//     );
//     const json = await response.json();
//     setData(json);
//     alert(json);
//   } catch (error) {
//     console.error(error);
//   }
// };

//them sach
//      const onAddBook = () =>{
//       fetch('https://quochoang59.000webhostapp.com/API/Create.php', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         book_name : name,
//         category : category,
//         price : price,
//         image: image,
//  //Chuyen object thanh string va dua len server
//       })
 
//       }).then((response) => response.json())
//           .then((responseJson) => {
 
//             getBook();
//             clearText();
 
//           }).catch((error) => {
//             console.error(error);
//           });
//      };
     //Xoa sach
     const onDelete =(index)=>{
      fetch('https://quochoang59.000webhostapp.com/API/Delete.php', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      
          id : index,
      
        })
      
        }).then((response) => response.json())
        .then((responseJson) => {
      
          getBook();
      
        }).catch((error) => {
           console.error(error);
        });
     };
     const clearText=()=>{
      setName(""),
      setCategory(""),
      setPrice(""),
      setImage("")
     }
     const onEdit = ()=>{
      fetch('https://quochoang59.000webhostapp.com/API/Update.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  
          id : id,
          name : name,
          type_id : type,
          price : price,
          image: image,
          description: description,
          author: author,
  
        })
  
        }).then((response) => response.json())
            .then((responseJson) => {
              alert(responseJson);
              getBook();
  
            }).catch((error) => {
              console.error(error);
            });

     };
     const onSearch=(textSearch)=>{
      if(textSearch=='')
      {
        setRefresh(false);
        getBook();
      }
      else
      {
        setFilterData(data.filter(book => book.name.includes(textSearch)))
        setRefresh(true);
      }
     
      
     };
     const Item = ({ name, type,description, price,author, img,index }) => (
        
        <TouchableOpacity style={styles.item}>
            <View style={styles.viewimg}>
                <Image style={styles.images} source={{ uri: img }} />
            </View>
            <View style={styles.item_content}>
                <Text style={styles.titleitem}>Name :</Text>
                <Text style={styles.titleitem}>Type :</Text>
                <Text style={styles.titleitem}>Description :</Text>
                <Text style={styles.titleitem}>Price :</Text>
                <Text style={styles.titleitem}>author :</Text>
            </View>
            <View style={styles.item_content2}>
                <Text style={styles.titleitem2}>{name}</Text>
                <Text style={styles.titleitem2}>{type}</Text>
                <Text style={styles.titleitem2}>{description}</Text>
                <Text style={styles.titleitem2}>{price}</Text>
                <Text style={styles.titleitem2}>{author}</Text>
            </View>
            <View>
            <TouchableOpacity onPress={()=>{
              setinfo(index);
              setModal(true);
            }}>
              <Text style={styles.buttonEdit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onDelete(data[index].id)}>
              <Text style={styles.buttonDelete}>Delete</Text>
            </TouchableOpacity>
            </View>
        </TouchableOpacity>
        
    );
    const renderItem = ({ item }) => (
        <Item
            name={item.name}
            type={item.type_name}
            description={item.description}
            price={item.price}
            img={item.image}
            author={item.author}
            index={data.indexOf(item)}
        />
    );
    const setinfo = (u) => {
      setId(data[u].id)
      setName(data[u].name)
      setType(data[u].type)
      setPrice(data[u].price)
      setDescription(data[u].description)
      setImage(data[u].image)
      setAuthor(data[u].author)
  };

    useEffect(() => {
      getBook()
  }, []);
  return (
    
  

    <View style={{marginTop:50}}>
      <Modal visible={modal}>
      <View style={{marginTop:50}} >
        <Text style={{textAlign:"center",fontSize:20}}>EDIT BOOKS</Text>
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
            <TouchableOpacity onPress={()=>{
              onEdit();
              setModal(false);}}>
              <Text title="Submit" style={styles.button}>Submit</Text>
            </TouchableOpacity>
        </View>
      </View>
      </Modal>
      <Text style={{textAlign:"center",fontSize:20}}>BOOKS VIEW</Text>
     <Searchbar
      placeholder="Search"
      onChangeText={(text) => {
            onSearch(text)
            }}
    /> 
        <FlatList nestedScrollEnabled
          data={refresh == true > 0? filterdata : data}
          renderItem={renderItem}
        />
        
    </View>
    
  );
}
 
export default BookView;

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
  titleitem2: {
        padding: 3,
        fontWeight: '500',
        color: '#000000',
        borderBottomWidth: 2,
        borderColor: '#DD9900',
        fontStyle: 'italic',

    },
  item_content2: {

        justifyContent: 'center'
    },
    viewimg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 5,

    },
    images: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    titleitem: {
        padding: 3,
        fontWeight: '700',
        color: '#000000',
        borderBottomWidth: 2,
        borderColor: '#FF8600'
    },
    item: {
        backgroundColor: '#C4C4C4',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 5,
    },
    item_content: {
        justifyContent: 'center',
        marginLeft: 10,
    },
    buttonEdit: {
      marginLeft:30,
      marginVertical:10,
      padding:5,
      textAlign:"center",
      borderWidth: 2,
      backgroundColor:"yellow",
      borderRadius: 10,
    },
    buttonDelete: {
      marginLeft:30,
      marginVertical:10,
      padding:5,
      textAlign:"center",
      borderWidth: 2,
      backgroundColor:"red",
      borderRadius: 10,
    },
    modal: {
      backgroundColor: 'white',
      margin: 0, // This is the important style you need to set
      alignItems: undefined,
      justifyContent: undefined,
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
 
