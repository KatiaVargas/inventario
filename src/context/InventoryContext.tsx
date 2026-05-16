import React, { createContext, useState, useContext, ReactNode } from 'react';

export type CaducidadStatus = 'ok' | 'warning' | 'expired';

export interface Almacen {
  id: string;
  nombre: string;
  icono: string;
}

export interface Seccion {
  id: string;
  nombre: string;
  almacenId: string;
}

export interface Articulo {
  id: string;
  nombre: string;
  categoria: string;
  almacenId: string;
  seccionId: string;
  caducidad?: string; // DD-MM-YYYY
}

interface InventoryContextType {
  almacenes: Almacen[];
  secciones: Seccion[];
  articulos: Articulo[];
  addAlmacen: (nombre: string, icono?: string) => void;
  addSeccion: (nombre: string, almacenId: string) => void;
  addArticulo: (articulo: Omit<Articulo, 'id'>) => void;
  updateArticulo: (id: string, articulo: Partial<Omit<Articulo, 'id'>>) => void;
  deleteArticulo: (id: string) => void;
  updateAlmacen: (id: string, nombre: string) => void;
  deleteAlmacen: (id: string) => void;
  updateSeccion: (id: string, nombre: string) => void;
  deleteSeccion: (id: string) => void;
  getSeccionesByAlmacen: (almacenId: string) => Seccion[];
  getArticulosByAlmacen: (almacenId: string) => Articulo[];
  getArticulosBySeccion: (seccionId: string) => Articulo[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const getArticuloStatus = (caducidad?: string): CaducidadStatus => {
  if (!caducidad) return 'ok';
  
  const hoy = new Date();
  hoy.setHours(0,0,0,0);
  
  // Parsear formato DD-MM-YYYY
  const partes = caducidad.split('-');
  if (partes.length !== 3) return 'ok';
  
  const fechaCaducidad = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
  const diffTime = fechaCaducidad.getTime() - hoy.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'expired';
  if (diffDays <= 3) return 'warning';
  return 'ok';
};

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [almacenes, setAlmacenes] = useState<Almacen[]>([
    { id: '1', nombre: 'Refrigerador', icono: 'thermometer-snowflake' },
    { id: '2', nombre: 'Congelador', icono: 'snowflake' },
    { id: '3', nombre: 'Alacena', icono: 'archive' },
    { id: '4', nombre: 'Estantería', icono: 'server' },
  ]);

  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [articulos, setArticulos] = useState<Articulo[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

  const addAlmacen = (nombre: string, icono: string = 'archive') => {
    const newAlmacen = { id: generateId(), nombre, icono };
    setAlmacenes(prev => [...prev, newAlmacen]);
  };

  const addSeccion = (nombre: string, almacenId: string) => {
    const newSeccion = { id: generateId(), nombre, almacenId };
    setSecciones(prev => [...prev, newSeccion]);
  };

  const addArticulo = (articulo: Omit<Articulo, 'id'>) => {
    const newArticulo = { id: generateId(), ...articulo };
    setArticulos(prev => [...prev, newArticulo]);
  };

  const updateArticulo = (id: string, articulo: Partial<Omit<Articulo, 'id'>>) => {
    setArticulos(prev => prev.map(a => a.id === id ? { ...a, ...articulo } : a));
  };

  const deleteArticulo = (id: string) => {
    setArticulos(prev => prev.filter(a => a.id !== id));
  };

  const updateAlmacen = (id: string, nombre: string) => {
    setAlmacenes(prev => prev.map(a => a.id === id ? { ...a, nombre } : a));
  };

  const deleteAlmacen = (id: string) => {
    setAlmacenes(prev => prev.filter(a => a.id !== id));
    setSecciones(prev => prev.filter(s => s.almacenId !== id));
    setArticulos(prev => prev.filter(a => a.almacenId !== id));
  };

  const updateSeccion = (id: string, nombre: string) => {
    setSecciones(prev => prev.map(s => s.id === id ? { ...s, nombre } : s));
  };

  const deleteSeccion = (id: string) => {
    setSecciones(prev => prev.filter(s => s.id !== id));
    setArticulos(prev => prev.filter(a => a.seccionId !== id));
  };

  const getSeccionesByAlmacen = (almacenId: string) => secciones.filter(s => s.almacenId === almacenId);
  
  const getArticulosByAlmacen = (almacenId: string) => articulos.filter(a => a.almacenId === almacenId);

  const getArticulosBySeccion = (seccionId: string) => articulos.filter(a => a.seccionId === seccionId);

  return (
    <InventoryContext.Provider value={{
      almacenes,
      secciones,
      articulos,
      addAlmacen,
      addSeccion,
      addArticulo,
      updateArticulo,
      deleteArticulo,
      updateAlmacen,
      deleteAlmacen,
      updateSeccion,
      deleteSeccion,
      getSeccionesByAlmacen,
      getArticulosByAlmacen,
      getArticulosBySeccion
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
