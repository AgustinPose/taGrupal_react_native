import { StyleSheet, ScrollView, Button, View, Dimensions, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router, useRouter, useSearchParams } from 'expo-router';

export default function PantallaPrincipal({ route }) {
  const { listaTareas, setListaTareas } = route.params;
  const [contador, setContador] = useState(listaTareas.length);
  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenSize(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    setContador(listaTareas.length); // Actualizar contador Listas
  }, [listaTareas]);

  const agregarTarea = () => {
    router.navigate("/(tabs)/home/formulario");
  };

  const eliminarTarea = (indice) => {
    const nuevaLista = listaTareas.filter((_, i) => i !== indice);
    setListaTareas(nuevaLista);
    setContador(nuevaLista.length);
  };

  return (
    <ScrollView>
      <ThemedView style={estilos.contenedor(screenSize.width)}>
        <ThemedText style={estilos.titulo(screenSize.width, screenSize.height)}>To Do List</ThemedText>
        <ThemedText style={estilos.contadorEstilo(screenSize.width, screenSize.height)}>
          Cantidad Tareas: {contador}
        </ThemedText>
        
        <ThemedView style={estilos.contenedorEntrada(screenSize.height)}>
          <Button title="Nueva tarea" onPress={agregarTarea} />
        </ThemedView>
      </ThemedView>

      <ThemedView style={estilos.listaTareas}>
        <FlatList
          data={listaTareas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={estilos.elementoTarea(screenSize.width)}>
              {item.image && <Image source={{ uri: item.image }} style={estilos.taskImage} />}
              <ThemedText>{item.name}</ThemedText>
              <Button title="Eliminar" onPress={() => eliminarTarea(index)} />
            </View>
          )}
        />
      </ThemedView>
    </ScrollView>
  );
}

const estilos = {
  contenedor: (width) => ({
    padding: width * 0.05,
  }),
  titulo: (width, height) => ({
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
  }),
  contadorEstilo: (width, height) => ({
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  }),
  contenedorEntrada: (height) => ({
    flexDirection: 'row',
    marginBottom: height * 0.02,
  }),
  listaTareas: {
    gap: 10,
  },
  elementoTarea: (width) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    width: width * 0.9,
  }),
  taskImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
};
