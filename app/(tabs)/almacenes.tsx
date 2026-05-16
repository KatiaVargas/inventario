import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useInventory } from '../../src/context/InventoryContext';

export default function AlmacenesScreen() {
  const router = useRouter();
  const { almacenes, addAlmacen, updateAlmacen, deleteAlmacen, getArticulosByAlmacen } = useInventory();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const openNewModal = () => {
    setEditId(null);
    setNuevoNombre('');
    setModalVisible(true);
  };

  const handleAddAlmacen = () => {
    if (nuevoNombre.trim().length > 0) {
      if (editId) {
        updateAlmacen(editId, nuevoNombre.trim());
      } else {
        addAlmacen(nuevoNombre.trim(), 'archive');
      }
      setNuevoNombre('');
      setEditId(null);
      setModalVisible(false);
    }
  };

  const openOptions = (almacen: any) => {
    Alert.alert(
      'Opciones',
      `¿Qué deseas hacer con "${almacen.nombre}"?`,
      [
        {
          text: 'Editar',
          onPress: () => {
            setEditId(almacen.id);
            setNuevoNombre(almacen.nombre);
            setModalVisible(true);
          }
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmar Eliminación',
              'Al eliminar este almacén, se borrarán todas sus divisiones y artículos. ¿Estás seguro?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sí, eliminar', style: 'destructive', onPress: () => deleteAlmacen(almacen.id) }
              ]
            );
          }
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.title}>Mis Almacenes</Text>
        <Text style={styles.subtitle}>Gestiona los lugares donde guardas tus cosas</Text>

        <View style={styles.grid}>
          {almacenes.map((almacen) => {
            const numArticulos = getArticulosByAlmacen(almacen.id).length;
            
            return (
              <TouchableOpacity 
                key={almacen.id} 
                style={styles.card}
                onPress={() => router.push(`/almacen/${almacen.id}`)}
                onLongPress={() => openOptions(almacen)}
                delayLongPress={200}
              >
                <View style={styles.iconContainer}>
                  <FontAwesome name={almacen.icono as any} size={32} color="#FFFFFF" />
                </View>
                <Text style={styles.cardTitle}>{almacen.nombre}</Text>
                <Text style={styles.cardSubtitle}>{numArticulos} artículos</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={openNewModal}>
        <FontAwesome name="plus" size={20} color="#FFFFFF" />
        <Text style={styles.fabText}>Añadir almacén</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editId ? 'Editar Almacén' : 'Nuevo Almacén'}</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre del almacén (ej. Bodega)"
              placeholderTextColor="#AAAAAA"
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              autoFocus
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonCancel]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonPrimary]} 
                onPress={handleAddAlmacen}
              >
                <Text style={styles.modalButtonText}>{editId ? 'Guardar' : 'Crear'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 80,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#444444',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 12,
  },
  modalButtonCancel: {
    backgroundColor: '#333333',
  },
  modalButtonPrimary: {
    backgroundColor: '#4A90E2',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
