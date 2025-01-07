import React, {useState} from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { datasource } from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10.5,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const Home = ({ navigation }) => {

    const [myData, setMyData] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if (datastr!=null){
           let jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        }
        else {
            setMyData(datasource);
        }
    };
    getData();

    const renderItem = ({ item, section, index }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() =>
                    navigation.navigate('Edit', {
                        sectionIndex: datasource.indexOf(section), // Index of the section
                        itemIndex: index, // Index of the item within the section
                    })
                }
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };


    return (
        <View>
            <StatusBar />
            <Button title="Add Letter" onPress={() => {
                let datastr = JSON.stringify(myData)
                navigation.navigate('Add', {datastring: datastr});
                    }
                }
            />
            <SectionList
                sections={myData}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
                        {title}
                    </Text>
                )}
            />
        </View>
    );
};

export default Home;
