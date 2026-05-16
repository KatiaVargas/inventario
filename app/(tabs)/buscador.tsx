import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { articulosData, almacenesData } from '../../src/data/mockData';

export default function BuscadorScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Simular búsqueda simple por nombre
  const filteredArticulos = searchQuery 
    ? articulosData.filter(a => a.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
    : articulosData;

  const renderItem = ({ item }: { item: typeof articulosData[0] }) => {
    const almacen = almacenesData.find(a => a.id === item.almacenId);
    
    return (
      <View style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <Text style={styles.itemName}>{item.nombre}</Text>
          <FontAwesome name="chevron-right" size={12} color="#AAAAAA" />
        </View>
        <View style={styles.locationContainer}>
          <FontAwesome name={almacen?.icono as any || 'archive'} size={14} color="#4A90E2" />
          <Text style={styles.locationText}>
            {almacen?.nombre} <Text style={styles.separator}>•</Text> {item.seccion}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={18} color="#AAAAAA" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alimento o artículo..."
            placeholderTextColor="#AAAAAA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <FontAwesome 
              name="times-circle" 
              size={18} 
              color="#AAAAAA" 
              onPress={() => setSearchQuery('')}
            />
          )}
        </View>
      </View>

      <Text style={styles.resultsTitle}>
        {searchQuery ? 'Resultados de búsqueda' : 'Sugerencias'}
      </Text>

      <FlatList
        data={filteredArticulos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron artículos.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  resultCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    color: '#AAAAAA',
    fontSize: 14,
  },
  separator: {
    color: '#555555',
  },
  emptyText: {
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
