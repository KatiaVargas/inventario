export type CaducidadStatus = 'ok' | 'warning' | 'expired';

export interface Almacen {
  id: string;
  nombre: string;
  icono: string; // nombre del icono
  cantidadArticulos: number;
}

export interface Articulo {
  id: string;
  nombre: string;
  almacenId: string;
  seccion: string;
  caducidad: string; // YYYY-MM-DD
  statusCaducidad: CaducidadStatus;
}

export interface ArticuloCompra {
  id: string;
  nombre: string;
  comprado: boolean;
}

export const almacenesData: Almacen[] = [
  { id: '1', nombre: 'Refrigerador', icono: 'thermometer-snowflake', cantidadArticulos: 24 },
  { id: '2', nombre: 'Congelador', icono: 'snowflake', cantidadArticulos: 15 },
  { id: '3', nombre: 'Alacena', icono: 'archive', cantidadArticulos: 42 },
  { id: '4', nombre: 'Estantería', icono: 'server', cantidadArticulos: 18 },
];

export const articulosData: Articulo[] = [
  { id: '1', nombre: 'Leche Deslactosada', almacenId: '1', seccion: 'Puerta', caducidad: '2024-06-15', statusCaducidad: 'ok' },
  { id: '2', nombre: 'Pechuga de Pollo', almacenId: '1', seccion: 'Carnes', caducidad: '2024-05-18', statusCaducidad: 'warning' },
  { id: '3', nombre: 'Yogurt Griego', almacenId: '1', seccion: 'Lácteos', caducidad: '2024-05-12', statusCaducidad: 'expired' },
  { id: '4', nombre: 'Helado de Vainilla', almacenId: '2', seccion: 'Principal', caducidad: '2025-01-10', statusCaducidad: 'ok' },
  { id: '5', nombre: 'Sopa enlatada', almacenId: '3', seccion: 'Latas', caducidad: '2026-08-22', statusCaducidad: 'ok' },
  { id: '6', nombre: 'Pan de Caja', almacenId: '3', seccion: 'Panadería', caducidad: '2024-05-17', statusCaducidad: 'warning' },
  { id: '7', nombre: 'Queso Crema', almacenId: '1', seccion: 'Lácteos', caducidad: '2024-04-30', statusCaducidad: 'expired' },
  { id: '8', nombre: 'Pasta Fusilli', almacenId: '3', seccion: 'Pastas', caducidad: '2025-11-05', statusCaducidad: 'ok' },
  { id: '9', nombre: 'Cereal de Avena', almacenId: '3', seccion: 'Cereales', caducidad: '2024-06-01', statusCaducidad: 'warning' },
  { id: '10', nombre: 'Botellas de Agua', almacenId: '4', seccion: 'Bebidas', caducidad: '2026-01-01', statusCaducidad: 'ok' },
];

export const listaComprasData: ArticuloCompra[] = [
  { id: '1', nombre: 'Huevos (Docena)', comprado: false },
  { id: '2', nombre: 'Manzanas', comprado: true },
  { id: '3', nombre: 'Papel Higiénico', comprado: false },
  { id: '4', nombre: 'Detergente líquido', comprado: false },
  { id: '5', nombre: 'Tomates', comprado: true },
];

export const resumenData = {
  totalArticulos: 99,
  porCaducar: 3,
  caducados: 2,
  faltanEnLista: 3,
};
