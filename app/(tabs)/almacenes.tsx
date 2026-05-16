import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { almacenesData } from '../../src/data/mockData';

export default function AlmacenesScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.title}>Mis Almacenes</Text>
        <Text style={styles.subtitle}>Gestiona los lugares donde guardas tus cosas</Text>

        <View style={styles.grid}>
          {almacenesData.map((almacen) => (
            <TouchableOpacity key={almacen.id} style={styles.card}>
              <View style={styles.iconContainer}>
                <FontAwesome name={almacen.icono as any} size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.cardTitle}>{almacen.nombre}</Text>
              <Text style={styles.cardSubtitle}>{almacen.cantidadArticulos} artículos</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="plus" size={20} color="#FFFFFF" />
        <Text style={styles.fabText}>Añadir almacén</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 80, // espacio para el boton flotante
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
