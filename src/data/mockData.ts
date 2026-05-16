export interface ArticuloCompra {
  id: string;
  nombre: string;
  comprado: boolean;
}

export const listaComprasData: ArticuloCompra[] = [
  { id: '1', nombre: 'Huevos (Docena)', comprado: false },
  { id: '2', nombre: 'Manzanas', comprado: true },
  { id: '3', nombre: 'Papel Higiénico', comprado: false },
  { id: '4', nombre: 'Detergente líquido', comprado: false },
  { id: '5', nombre: 'Tomates', comprado: true },
];
