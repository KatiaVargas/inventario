import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { listaComprasData } from '../../src/data/mockData';

export default function ComprasScreen() {
  const [items, setItems] = useState(listaComprasData);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, comprado: !item.comprado } : item
    ));
  };

  const renderItem = ({ item }: { item: typeof listaComprasData[0] }) => (
    <TouchableOpacity 
      style={[styles.itemContainer, item.comprado && styles.itemContainerDone]} 
      onPress={() => toggleItem(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>
        {item.comprado && <FontAwesome name="check" size={14} color="#4A90E2" />}
      </View>
      <Text style={[styles.itemText, item.comprado && styles.itemTextDone]}>
        {item.nombre}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Compras</Text>
        <Text style={styles.subtitle}>{items.filter(i => !i.comprado).length} artículos pendientes</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    paddingTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemContainerDone: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#AAAAAA',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4A90E2',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
