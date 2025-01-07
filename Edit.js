import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({navigation, route}) => {

    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

  const[letter,setLetter] = useState(route.params.key);

  const setData = async(value) => {
      AsyncStorage.setItem("alphadata", value);
      navigation.navigate("Home");
  }

  return (
    <View>
      <Text>Letter:</Text>
      <TextInput value={letter} maxLength={1} style={{borderWidth:1}} onChangeText={(text)=>setLetter(text)}/>
      <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
        <Button title='Save'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Vowels") {
              indexnum = 0;
            }
            datasource[indexnum].data[myindex].key=letter;
            let stringdata = JSON.stringify(mydata);
            setData(stringdata);
            //navigation.navigate("Home")
          }
        }
        />
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Vowels") {
              indexnum = 0;
            }
            Alert.alert("Are you sure?",'', 
              [{text:'Yes', onPress:()=>{
                datasource[indexnum].data.splice(myindex,1);
                let stringdata = JSON.stringify(mydata);
                setData(stringdata);
                //navigation.navigate("Home")
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;