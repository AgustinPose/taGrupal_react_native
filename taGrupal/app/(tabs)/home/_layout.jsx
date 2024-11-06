import React, { useState, createContext } from 'react';
import { Stack } from 'expo-router';

// Crear un contexto para la lista de tareas
export const TareasContext = createContext();

export default function RootLayout() {
  const [taskList, setTaskList] = useState([]);

  return (
    <TareasContext.Provider value={{ taskList, setTaskList }}>
      <Stack>
        {/* La pantalla principal (index) recibe el estado global de las tareas */}
        <Stack.Screen
          name="index"
          options={{ title: "Atrás", headerShown: false }}
        />
        {/* La pantalla de formulario también tiene acceso al estado global */}
        <Stack.Screen
          name="formulario"
          options={{ title: "Agregar Tarea" }}
        />
      </Stack>
    </TareasContext.Provider>
  );
}
