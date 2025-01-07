import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [letter, setLetter] = useState('');
    const [letterType, setLetterType] = useState('Vowels');

    const setData = async (data) => {
        try {
            await AsyncStorage.setItem('alphadata', data);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Failed to save data.');
            console.error(error);
        }
    };

    const handleSubmit = () => {
        if (!letter.trim()) {
            Alert.alert('Error', 'Please enter a valid letter.');
            return;
        }

        const myData = JSON.parse(route.params.datastring);
        const newLetter = { key: letter.trim().toLowerCase() };

        const sectionIndex = letterType === 'Vowels' ? 0 : 1;

        // Check for duplicates
        const isDuplicate = myData[sectionIndex].data.some(
            (item) => item.key === newLetter.key
        );

        if (isDuplicate) {
            Alert.alert('Error', 'This letter already exists in the selected section.');
            return;
        }

        // Add the new letter to the appropriate section
        myData[sectionIndex].data.push(newLetter);

        const stringData = JSON.stringify(myData);
        setData(stringData);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Letter:</Text>
            <TextInput
                style={styles.input}
                maxLength={1}
                value={letter}
                onChangeText={setLetter}
                placeholder="Enter a letter"
            />

            <Text style={styles.label}>Letter Type:</Text>
            <RNPickerSelect
                onValueChange={(value) => setLetterType(value)}
                items={[
                    { label: 'Vowels', value: 'Vowels' },
                    { label: 'Consonants', value: 'Consonants' },
                ]}
                value={letterType}
                style={pickerSelectStyles}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
});

const pickerSelectStyles = {
    inputAndroid: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
        color: 'black',
        marginBottom: 16,
    },
    inputIOS: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 4,
        color: 'black',
        marginBottom: 16,
    },
};

export default Add;
