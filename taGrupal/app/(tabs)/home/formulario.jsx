import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TareasContext } from './_layout';
import { BottomSheet } from '@rneui/themed';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';

export default function FormularioScreen() {
  const { taskList, setTaskList } = useContext(TareasContext);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const seleccionarDeGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsBottomSheetVisible(false);
    }
  };

  const tomarFoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Se requiere acceso a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsBottomSheetVisible(false);
    }
  };

  const agregarTarea = () => {
    if (!taskName) {
      Alert.alert("Error", "Por favor ingresa un nombre para la tarea.");
      return;
    }
    const nuevaTarea = { name: taskName, description: taskDescription, image };
    setTaskList([...taskList, nuevaTarea]);

    router.back();
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




      <Button title="Añadir imagen" onPress={() => setIsBottomSheetVisible(true)} />
      <Button title="Agregar Tarea" onPress={agregarTarea} />

      <Image
        source={{ uri: image }}
        style={styles.imagePreview}
      />


      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => setIsBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContainer}>
          <ThemedText style={styles.bottomSheetTitle}>Seleccionar imagen</ThemedText>
          <TouchableOpacity style={styles.bottomSheetOption} onPress={tomarFoto}>
            <ThemedText>Capturar imagen</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomSheetOption} onPress={seleccionarDeGaleria}>
            <ThemedText>Seleccionar de galería</ThemedText>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
  bottomSheetContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomSheetOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 8,
    resizeMode: 'cover'
  },
  
});
