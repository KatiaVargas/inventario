import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Platform, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useInventory, Articulo } from '../context/InventoryContext';

interface AddArticuloModalProps {
  visible: boolean;
  onClose: () => void;
  articulo?: Articulo | null; // Null para añadir, Articulo para editar
}

export default function AddArticuloModal({ visible, onClose, articulo }: AddArticuloModalProps) {
  const { almacenes, secciones, addArticulo, updateArticulo } = useInventory();

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [almacenId, setAlmacenId] = useState('');
  const [seccionId, setSeccionId] = useState('');
  const [caducidad, setCaducidad] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());

  // Efecto para cargar datos del articulo si estamos editando
  React.useEffect(() => {
    if (visible) {
      if (articulo) {
        setNombre(articulo.nombre);
        setCategoria(articulo.categoria === 'General' ? '' : articulo.categoria);
        setAlmacenId(articulo.almacenId);
        setSeccionId(articulo.seccionId);
        setCaducidad(articulo.caducidad || '');
        if (articulo.caducidad) {
          const partes = articulo.caducidad.split('-');
          if (partes.length === 3) {
            setDateObj(new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0])));
          }
        } else {
          setDateObj(new Date());
        }
      } else {
        resetForm();
      }
    }
  }, [visible, articulo, almacenes]);

  const currentAlmacenSecciones = secciones.filter(s => s.almacenId === almacenId);

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDateObj(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      setCaducidad(`${day}-${month}-${year}`);
    }
  };

  const handleSave = () => {
    if (nombre.trim().length > 0 && almacenId) {
      const data = {
        nombre: nombre.trim(),
        categoria: categoria.trim() || 'General',
        almacenId,
        seccionId,
        caducidad: caducidad.trim() || undefined,
      };

      if (articulo) {
        updateArticulo(articulo.id, data);
      } else {
        addArticulo(data);
      }
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setNombre('');
    setCategoria('');
    setAlmacenId(almacenes[0]?.id || '');
    setSeccionId('');
    setCaducidad('');
    setDateObj(new Date());
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContentLarge}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{articulo ? 'Editar Objeto/Alimento' : 'Registrar Objeto/Alimento'}</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="times" size={24} color="#AAAAAA" />
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            <Text style={styles.label}>Nombre del objeto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Leche Deslactosada"
              placeholderTextColor="#AAAAAA"
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>Categoría (Opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Lácteos"
              placeholderTextColor="#AAAAAA"
              value={categoria}
              onChangeText={setCategoria}
            />

            <Text style={styles.label}>Almacén</Text>
            <View style={styles.radioGroup}>
              {almacenes.map(alm => (
                <TouchableOpacity 
                  key={alm.id} 
                  style={[styles.radioItem, almacenId === alm.id && styles.radioItemActive]}
                  onPress={() => {
                    setAlmacenId(alm.id);
                    setSeccionId(''); // Reset seccion when warehouse changes
                  }}
                >
                  <Text style={[styles.radioText, almacenId === alm.id && styles.radioTextActive]}>
                    {alm.nombre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>División / Sección</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={[styles.radioItem, seccionId === '' && styles.radioItemActive]}
                onPress={() => setSeccionId('')}
              >
                <Text style={[styles.radioText, seccionId === '' && styles.radioTextActive]}>
                  Sin División
                </Text>
              </TouchableOpacity>
              {currentAlmacenSecciones.map(sec => (
                <TouchableOpacity 
                  key={sec.id} 
                  style={[styles.radioItem, seccionId === sec.id && styles.radioItemActive]}
                  onPress={() => setSeccionId(sec.id)}
                >
                  <Text style={[styles.radioText, seccionId === sec.id && styles.radioTextActive]}>
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
                <Text style={{ color: caducidad ? '#FFFFFF' : '#AAAAAA', fontSize: 16 }}>
                  {caducidad || 'DD-MM-YYYY (Toca para seleccionar)'}
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
          </ScrollView>

          <View style={[styles.modalActions, { marginTop: 16 }]}>
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonPrimary]} onPress={handleSave}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}



const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    minHeight: 48,
    justifyContent: 'center',
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
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
