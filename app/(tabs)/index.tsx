import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useInventory, getArticuloStatus } from '../../src/context/InventoryContext';
import AddArticuloModal from '../../src/components/AddArticuloModal';

export default function InicioScreen() {
  const router = useRouter();
  const { articulos, listaCompras } = useInventory();
  const [modalVisible, setModalVisible] = React.useState(false);
  
  const totalArticulos = articulos.length;
  const porCaducar = articulos.filter(a => getArticuloStatus(a.caducidad) === 'warning').length;
  const caducados = articulos.filter(a => getArticuloStatus(a.caducidad) === 'expired').length;
  const faltanEnLista = listaCompras.filter(i => !i.comprado).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola, Katia!</Text>
        <Text style={styles.subtitle}>Resumen de tu inventario</Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/buscador')}>
          <FontAwesome name="cubes" size={32} color="#4A90E2" />
          <Text style={styles.cardValue}>{totalArticulos}</Text>
          <Text style={styles.cardLabel}>Artículos totales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/caducidad')}>
          <FontAwesome name="exclamation-circle" size={32} color="#FFC107" />
          <Text style={styles.cardValue}>{porCaducar}</Text>
          <Text style={styles.cardLabel}>Por caducar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/caducidad')}>
          <FontAwesome name="times-circle" size={32} color="#F44336" />
          <Text style={styles.cardValue}>{caducados}</Text>
          <Text style={styles.cardLabel}>Caducados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/compras')}>
          <FontAwesome name="shopping-basket" size={32} color="#4CAF50" />
          <Text style={styles.cardValue}>{faltanEnLista}</Text>
          <Text style={styles.cardLabel}>En lista compras</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.floatingAddBtn} 
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
        <Text style={styles.floatingAddBtnText}>Nuevo Artículo</Text>
      </TouchableOpacity>

      <AddArticuloModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
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
  floatingAddBtn: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingAddBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 12,
    fontSize: 18,
  },
});
