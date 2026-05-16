import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useInventory, CaducidadStatus } from '../../src/context/InventoryContext';

export default function AlmacenDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { almacenes, secciones, articulos, addSeccion, updateSeccion, deleteSeccion, addArticulo, updateArticulo, deleteArticulo } = useInventory();

  const almacen = almacenes.find(a => a.id === id);
  const almacenSecciones = secciones.filter(s => s.almacenId === id);

  const [modalSeccionVisible, setModalSeccionVisible] = useState(false);
  const [nuevaSeccion, setNuevaSeccion] = useState('');
  const [editSeccionId, setEditSeccionId] = useState<string | null>(null);

  const openNewSeccionModal = () => {
    setEditSeccionId(null);
    setNuevaSeccion('');
    setModalSeccionVisible(true);
  };

  const [modalArticuloVisible, setModalArticuloVisible] = useState(false);
  const [nuevoArtNombre, setNuevoArtNombre] = useState('');
  const [nuevoArtCategoria, setNuevoArtCategoria] = useState('');
  const [nuevoArtSeccion, setNuevoArtSeccion] = useState('');
  const [nuevoArtCaducidad, setNuevoArtCaducidad] = useState('');
  const [editArticuloId, setEditArticuloId] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());

  const parseDateForPicker = (dateStr: string) => {
    if (!dateStr) return new Date();
    const partes = dateStr.split('-');
    if (partes.length === 3) {
      return new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
    }
    return new Date();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDateObj(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      setNuevoArtCaducidad(`${day}-${month}-${year}`);
    }
  };

  const openNewArticuloModal = () => {
    setEditArticuloId(null);
    setNuevoArtNombre('');
    setNuevoArtCategoria('');
    setNuevoArtSeccion('');
    setNuevoArtCaducidad('');
    setDateObj(new Date());
    setModalArticuloVisible(true);
  };

  if (!almacen) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Almacén no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddSeccion = () => {
    if (nuevaSeccion.trim().length > 0) {
      if (editSeccionId) {
        updateSeccion(editSeccionId, nuevaSeccion.trim());
      } else {
        addSeccion(nuevaSeccion.trim(), almacen.id);
      }
      setNuevaSeccion('');
      setEditSeccionId(null);
      setModalSeccionVisible(false);
    }
  };

  const openOptionsSeccion = (seccion: any) => {
    Alert.alert(
      'Opciones de División',
      `¿Qué deseas hacer con "${seccion.nombre}"?`,
      [
        {
          text: 'Editar',
          onPress: () => {
            setEditSeccionId(seccion.id);
            setNuevaSeccion(seccion.nombre);
            setModalSeccionVisible(true);
          }
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmar Eliminación',
              'Al eliminar esta división, se borrarán todos los artículos dentro de ella. ¿Estás seguro?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sí, eliminar', style: 'destructive', onPress: () => deleteSeccion(seccion.id) }
              ]
            );
          }
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleAddArticulo = () => {
    if (nuevoArtNombre.trim().length > 0) {
      if (editArticuloId) {
        updateArticulo(editArticuloId, {
          nombre: nuevoArtNombre.trim(),
          categoria: nuevoArtCategoria.trim() || 'General',
          seccionId: nuevoArtSeccion,
          caducidad: nuevoArtCaducidad.trim() || undefined,
        });
      } else {
        addArticulo({
          nombre: nuevoArtNombre.trim(),
          categoria: nuevoArtCategoria.trim() || 'General',
          almacenId: almacen.id,
          seccionId: nuevoArtSeccion,
          caducidad: nuevoArtCaducidad.trim() || undefined,
        });
      }
      setNuevoArtNombre('');
      setNuevoArtCategoria('');
      setNuevoArtCaducidad('');
      setEditArticuloId(null);
      setModalArticuloVisible(false);
    }
  };

  const openOptionsArticulo = (articulo: any) => {
    Alert.alert(
      'Opciones de Artículo',
      `¿Qué deseas hacer con "${articulo.nombre}"?`,
      [
        {
          text: 'Editar',
          onPress: () => {
            setEditArticuloId(articulo.id);
            setNuevoArtNombre(articulo.nombre);
            setNuevoArtCategoria(articulo.categoria === 'General' ? '' : articulo.categoria);
            setNuevoArtSeccion(articulo.seccionId);
            setNuevoArtCaducidad(articulo.caducidad || '');
            setDateObj(parseDateForPicker(articulo.caducidad || ''));
            setModalArticuloVisible(true);
          }
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmar Eliminación',
              '¿Estás seguro de que quieres eliminar este artículo?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sí, eliminar', style: 'destructive', onPress: () => deleteArticulo(articulo.id) }
              ]
            );
          }
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const renderArticulosDeSeccion = (seccionId: string) => {
    const arts = articulos.filter(a => a.seccionId === seccionId && a.almacenId === almacen.id);
    if (arts.length === 0 && seccionId !== '') return <Text style={styles.emptyText}>No hay artículos aquí.</Text>;
    if (arts.length === 0 && seccionId === '') return null;

    return arts.map(art => (
      <TouchableOpacity 
        key={art.id} 
        style={styles.articuloItem}
        onLongPress={() => openOptionsArticulo(art)}
        delayLongPress={200}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.articuloName}>{art.nombre}</Text>
          <Text style={styles.articuloCategoria}>{art.categoria}</Text>
        </View>
        {art.caducidad && (
          <View style={styles.caducidadBadge}>
            <FontAwesome name="calendar" size={12} color="#AAAAAA" />
            <Text style={styles.caducidadText}>{art.caducidad}</Text>
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <FontAwesome name="times" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <FontAwesome name={almacen.icono as any} size={28} color="#4A90E2" style={styles.headerIcon} />
        <Text style={styles.title}>{almacen.nombre}</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.actionBtnOutline]} 
            onPress={openNewSeccionModal}
          >
            <FontAwesome name="folder-plus" size={16} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>Nueva División</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.actionBtnPrimary]} 
            onPress={openNewArticuloModal}
          >
            <FontAwesome name="plus" size={16} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>Añadir Artículo</Text>
          </TouchableOpacity>
        </View>

        {almacenSecciones.length === 0 && articulos.filter(a => a.almacenId === almacen.id && a.seccionId === '').length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome name="inbox" size={48} color="#333333" />
            <Text style={styles.emptyStateText}>Este almacén está vacío.</Text>
            <Text style={styles.emptyStateSub}>Añade un artículo o crea una división.</Text>
          </View>
        ) : (
          <View>
            {articulos.filter(a => a.almacenId === almacen.id && a.seccionId === '').length > 0 && (
              <View style={styles.seccionContainer}>
                <View style={styles.seccionHeader}>
                  <Text style={styles.seccionTitle}>Sin División</Text>
                </View>
                {renderArticulosDeSeccion('')}
              </View>
            )}
            
            {almacenSecciones.map(seccion => (
              <View key={seccion.id} style={styles.seccionContainer}>
                <View style={styles.seccionHeader}>
                  <Text style={styles.seccionTitle}>{seccion.nombre}</Text>
                  <TouchableOpacity onPress={() => openOptionsSeccion(seccion)} style={{ paddingHorizontal: 8 }}>
                    <FontAwesome name="ellipsis-h" size={16} color="#AAAAAA" />
                  </TouchableOpacity>
                </View>
                {renderArticulosDeSeccion(seccion.id)}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal Nueva Sección */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalSeccionVisible}
        onRequestClose={() => setModalSeccionVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editSeccionId ? 'Editar División' : 'Nueva División'}</Text>
            <Text style={styles.modalSub}>Ej. Puerta, Cajón inferior, Estante 1</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre de la división"
              placeholderTextColor="#AAAAAA"
              value={nuevaSeccion}
              onChangeText={setNuevaSeccion}
              autoFocus
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setModalSeccionVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonPrimary]} onPress={handleAddSeccion}>
                <Text style={styles.modalButtonText}>{editSeccionId ? 'Guardar' : 'Crear'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Nuevo Artículo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalArticuloVisible}
        onRequestClose={() => setModalArticuloVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentLarge}>
            <Text style={styles.modalTitle}>{editArticuloId ? 'Editar Objeto/Alimento' : 'Registrar Objeto/Alimento'}</Text>
            
            <Text style={styles.label}>Nombre del objeto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Leche Deslactosada"
              placeholderTextColor="#AAAAAA"
              value={nuevoArtNombre}
              onChangeText={setNuevoArtNombre}
            />

            <Text style={styles.label}>Categoría (Opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Lácteos"
              placeholderTextColor="#AAAAAA"
              value={nuevoArtCategoria}
              onChangeText={setNuevoArtCategoria}
            />

            <Text style={styles.label}>División / Sección</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={[styles.radioItem, nuevoArtSeccion === '' && styles.radioItemActive]}
                onPress={() => setNuevoArtSeccion('')}
              >
                <Text style={[styles.radioText, nuevoArtSeccion === '' && styles.radioTextActive]}>
                  Sin División
                </Text>
              </TouchableOpacity>
              {almacenSecciones.map(sec => (
                <TouchableOpacity 
                  key={sec.id} 
                  style={[styles.radioItem, nuevoArtSeccion === sec.id && styles.radioItemActive]}
                  onPress={() => setNuevoArtSeccion(sec.id)}
                >
                  <Text style={[styles.radioText, nuevoArtSeccion === sec.id && styles.radioTextActive]}>
                    {sec.nombre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Fecha de Caducidad (Opcional)</Text>
            {Platform.OS === 'ios' && showDatePicker ? (
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={dateObj}
                  mode="date"
                  display="inline"
                  onChange={onDateChange}
                  style={styles.iosDatePicker}
                />
                <TouchableOpacity style={styles.datePickerCloseBtn} onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.datePickerCloseText}>Listo</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: nuevoArtCaducidad ? '#FFFFFF' : '#AAAAAA', fontSize: 16 }}>
                  {nuevoArtCaducidad || 'DD-MM-YYYY (Toca para seleccionar)'}
                </Text>
              </TouchableOpacity>
            )}

            {Platform.OS === 'android' && showDatePicker && (
              <DateTimePicker
                value={dateObj}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            <View style={[styles.modalActions, { marginTop: 16 }]}>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setModalArticuloVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonPrimary]} onPress={handleAddArticulo}>
                <Text style={styles.modalButtonText}>Guardar</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  actionBtnOutline: {
    backgroundColor: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#444444',
  },
  actionBtnPrimary: {
    backgroundColor: '#4A90E2',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyStateSub: {
    color: '#AAAAAA',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  seccionContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  seccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  seccionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  articuloItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  articuloName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  articuloCategoria: {
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 2,
  },
  caducidadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  caducidadText: {
    color: '#AAAAAA',
    fontSize: 12,
    marginLeft: 4,
  },
  emptyText: {
    color: '#AAAAAA',
    fontStyle: 'italic',
    padding: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  backButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
  modalContentLarge: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  modalSub: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 16,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444444',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  radioItem: {
    backgroundColor: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  radioItemActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  radioText: {
    color: '#AAAAAA',
  },
  radioTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
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
  datePickerContainer: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444444',
    overflow: 'hidden',
    paddingBottom: 8,
  },
  iosDatePicker: {
    width: '100%',
  },
  datePickerCloseBtn: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    marginTop: 8,
  },
  datePickerCloseText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
