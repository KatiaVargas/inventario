import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useInventory } from '../../src/context/InventoryContext';

export default function ComprasScreen() {
  const { listaCompras, addArticuloCompra, toggleComprado, deleteArticuloCompra } = useInventory();
  const [nuevoItem, setNuevoItem] = React.useState('');

  const handleAddItem = () => {
    if (nuevoItem.trim().length > 0) {
      addArticuloCompra(nuevoItem.trim());
      setNuevoItem('');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.itemContainer, item.comprado && styles.itemContainerDone]}>
      <TouchableOpacity 
        style={styles.itemMainAction}
        onPress={() => toggleComprado(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.checkbox}>
          {item.comprado && <FontAwesome name="check" size={14} color="#4A90E2" />}
        </View>
        <Text style={[styles.itemText, item.comprado && styles.itemTextDone]}>
          {item.nombre}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deleteArticuloCompra(item.id)}
      >
        <FontAwesome name="trash" size={18} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Compras</Text>
        <Text style={styles.subtitle}>{listaCompras.filter(i => !i.comprado).length} artículos pendientes</Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Añadir artículo..."
          placeholderTextColor="#AAAAAA"
          value={nuevoItem}
          onChangeText={setNuevoItem}
          onSubmitEditing={handleAddItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <FontAwesome name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaCompras}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <FontAwesome name="shopping-basket" size={48} color="#333333" />
            <Text style={styles.emptyStateText}>Tu lista está vacía.</Text>
          </View>
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
    paddingBottom: 40,
  },
  inputSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 4,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  itemMainAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  deleteButton: {
    padding: 12,
    marginRight: 4,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyStateText: {
    color: '#555555',
    fontSize: 18,
    marginTop: 16,
  },
});
