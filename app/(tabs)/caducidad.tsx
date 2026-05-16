import React from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useInventory, getArticuloStatus } from '../../src/context/InventoryContext';

export default function CaducidadScreen() {
  const router = useRouter();
  const { articulos, secciones } = useInventory();
  
  // Agrupar artículos por estado
  const expired = articulos.filter(a => getArticuloStatus(a.caducidad) === 'expired');
  const warning = articulos.filter(a => getArticuloStatus(a.caducidad) === 'warning');
  const ok = articulos.filter(a => getArticuloStatus(a.caducidad) === 'ok');

  const sections = [
    { title: 'Caducados', data: expired, color: '#F44336', icon: 'times-circle' },
    { title: 'Próximos a caducar', data: warning, color: '#FFC107', icon: 'exclamation-triangle' },
    { title: 'En buen estado', data: ok, color: '#4CAF50', icon: 'check-circle' },
  ];

  const renderItem = ({ item, section }: any) => {
    const seccion = secciones.find(s => s.id === item.seccionId);
    
    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => router.push({ pathname: '/almacen/[id]', params: { id: item.almacenId } })}
      >
        <View style={[styles.statusIndicator, { backgroundColor: section.color }]} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.itemName}>{item.nombre}</Text>
            <Text style={[styles.dateText, { color: section.color }]}>
              {item.caducidad || 'Sin fecha'}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={12} color="#AAAAAA" />
            <Text style={styles.locationText}>{seccion?.nombre || 'General'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: any) => (
    <View style={styles.sectionHeader}>
      <FontAwesome name={section.icon} size={18} color={section.color} style={styles.sectionIcon} />
      <Text style={[styles.sectionTitle, { color: section.color }]}>
        {section.title} ({section.data.length})
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Control de Caducidad</Text>
        <Text style={styles.subtitle}>Revisa el estado de tus alimentos</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={false}
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
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statusIndicator: {
    width: 6,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    paddingRight: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    color: '#AAAAAA',
    fontSize: 14,
  },
});
