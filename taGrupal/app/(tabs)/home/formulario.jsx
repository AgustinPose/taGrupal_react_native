// formulario.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FormularioScreen({ route }) {
  const { listaTareas, setListaTareas } = route.params;
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [image, setImage] = useState(null);

  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const agregarTarea = () => {
    if (!taskName) {
      Alert.alert("Error", "Por favor ingresa un nombre para la tarea.");
      return;
    }

    const nuevaTarea = { name: taskName, description: taskDescription, image };
    setListaTareas([...listaTareas, nuevaTarea]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre de la tarea"
        value={taskName}
        onChangeText={setTaskName}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción de la tarea"
        value={taskDescription}
        onChangeText={setTaskDescription}
        style={styles.input}
      />
      <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />
      <Button title="Agregar Tarea" onPress={agregarTarea} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
});

