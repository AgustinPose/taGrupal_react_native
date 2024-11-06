import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Button, View, Dimensions, FlatList, Image, Switch } from 'react-native';
import { TareasContext } from './_layout'; // Importa el contexto
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function PantallaPrincipal() {
  const { taskList, setTaskList } = useContext(TareasContext); 
  const [contador, setContador] = useState(taskList.length);
  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));
  const router = useRouter();

  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenSize(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    setContador(taskList.length);
  }, [taskList]);

  const agregarTarea = () => {
    router.navigate("/(tabs)/home/formulario");
  };

  const eliminarTarea = (indice) => {
    const nuevaLista = taskList.filter((_, i) => i !== indice);
    setTaskList(nuevaLista);
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
          data={taskList} // Usamos taskList del contexto
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={estilos.elementoTarea(screenSize.width)}>

              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={estilos.taskImage}
                />
              )}
              <View style={estilos.taskContent}>
                <ThemedText style={estilos.taskName}>{item.name}</ThemedText>
                <ThemedText style={estilos.taskDescription}>{item.description}</ThemedText>
              </View>

              <Switch
                value={item.isEnabled || false}
                onValueChange={() => {
                  const updatedTasks = [...taskList];
                  updatedTasks[index].isEnabled = !updatedTasks[index].isEnabled;
                  setTaskList(updatedTasks);
                }}
              />
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
    width: '100%',
    alignItems: 'center'
  },
  elementoTarea: (width) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 20
  }),
  taskImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },

  taskContent: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'flex-start'
  },


};
