import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopColor: '#333333',
        },
        headerStyle: {
          backgroundColor: '#1E1E1E',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        sceneStyle: {
          backgroundColor: '#121212',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="almacenes"
        options={{
          title: 'Almacenes',
          tabBarIcon: ({ color }) => <FontAwesome name="archive" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="compras"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="buscador"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="caducidad"
        options={{
          title: 'Caducidad',
          tabBarIcon: ({ color }) => <FontAwesome name="clock-o" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
