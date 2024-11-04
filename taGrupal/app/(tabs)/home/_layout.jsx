import React, { useState } from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  // Estado global de la lista de tareas
  const [taskList, setTaskList] = useState([]);

  return (
    <Stack>
      {/* La pantalla principal (index) recibe el estado global de las tareas */}
      <Stack.Screen
        name="index"
        options={{ title: "Atrás", headerShown: false }}
        initialParams={{ taskList, setTaskList }}
      />
      {/* La pantalla de formulario también tiene acceso al estado global */}
      <Stack.Screen
        name="formulario"
        options={{ title: "Agregar Tarea" }}
        initialParams={{ taskList, setTaskList }}
      />
    </Stack>
  );
}
