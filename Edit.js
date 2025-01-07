import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data'; // Importing datasource

const Edit = ({ route, navigation }) => {
    const { sectionIndex, itemIndex } = route.params; // Get indices of the letter to edit from route params
    const [letter, setLetter] = useState(datasource[sectionIndex].data[itemIndex].key); // Initial state is the current letter

    const handleSave = () => {
        if (!letter.trim()) {
            Alert.alert('Error', 'Please enter a valid letter');
            return;
        }

        // Update the letter in the datasource
        datasource[sectionIndex].data[itemIndex].key = letter.trim().toLowerCase();

        // Navigate back to Home screen
        navigation.navigate('Home');
    };

    const handleDelete = () => {
        Alert.alert(
            "Are you sure?", // Title of the alert
            "", // Optional message (kept empty here)
            [{
                    text: "Yes", // Confirmation button
                    onPress: () => {
                        datasource[sectionIndex].data.splice(itemIndex, 1);
                        navigation.navigate("Home");
                    },
                },
                {
                    text: "No", // Cancel button
                    style: "cancel", // Optional style for the button
                },
            ]);
    };



    return (
        <View style={styles.container}>
            {/* TextInput for Letter */}
            <Text style={styles.label}>Letter:</Text>
            <TextInput
                style={styles.input}
                maxLength={1}
                value={letter}
                onChangeText={setLetter}
            />

            {/* Save and Delete Buttons */}
            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button title="Save" onPress={handleSave} />
                </View>
                <View style={styles.button}>
                    <Button title="Delete" onPress={handleDelete} />
                </View>
            </View>

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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensure space between buttons
        gap: 10, // Add spacing between buttons for better visual separation
    },
    button: {
        flex: 1, // Make each button take equal width
    },
});

export default Edit;
