import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useInventory, getArticuloStatus } from '../../src/context/InventoryContext';
import { listaComprasData } from '../../src/data/mockData'; // Mantengo lista compras porque no se pidio refactorizar

export default function InicioScreen() {
  const { articulos } = useInventory();
  
  const totalArticulos = articulos.length;
  const porCaducar = articulos.filter(a => getArticuloStatus(a.caducidad) === 'warning').length;
  const caducados = articulos.filter(a => getArticuloStatus(a.caducidad) === 'expired').length;
  const faltanEnLista = listaComprasData.filter(i => !i.comprado).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola, Katia!</Text>
        <Text style={styles.subtitle}>Resumen de tu inventario</Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <FontAwesome name="cubes" size={32} color="#4A90E2" />
          <Text style={styles.cardValue}>{totalArticulos}</Text>
          <Text style={styles.cardLabel}>Artículos totales</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="exclamation-circle" size={32} color="#FFC107" />
          <Text style={styles.cardValue}>{porCaducar}</Text>
          <Text style={styles.cardLabel}>Por caducar</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="times-circle" size={32} color="#F44336" />
          <Text style={styles.cardValue}>{caducados}</Text>
          <Text style={styles.cardLabel}>Caducados</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="shopping-basket" size={32} color="#4CAF50" />
          <Text style={styles.cardValue}>{faltanEnLista}</Text>
          <Text style={styles.cardLabel}>En lista compras</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acceso Rápido</Text>
        <View style={styles.quickAccessContainer}>
          <View style={styles.quickAccessBtn}>
            <FontAwesome name="plus" size={24} color="#FFFFFF" />
            <Text style={styles.quickAccessText}>Nuevo Artículo</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
  },
  section: {
    marginTop: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessBtn: {
    backgroundColor: '#2C2C2C',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  quickAccessText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});
