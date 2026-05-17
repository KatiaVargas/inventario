
# Inventario Personal 

**• Nombre del proyecto.**
<br>**Inventario Personal**

**• Descripción general de la aplicación.**
<br>*Es una aplicación que le permite al usuario ordenar sus artículos, objetos y alimentos en respectivas secciones para mantener un control de almacenamiento y poder detectar a tiempo que alimentos pueden llegar a ser caducos y encontrar sus respectivos artículos con mayor facilidad*

**• Problema o necesidad que resuelve.**
<br>*Ordenar y mantener un control sobre artículos de forma eficiente*

**• Integrantes del equipo y rol de cada uno.**
<br>**Katia Paola Vargas Flores** - Líder técnico | Front end | Funcionalidad | UI

**• Tecnologías utilizadas.**
<br>REACT 
<br>NATIVE
<br>EXPO

**• Herramienta o herramientas de IA utilizadas.**
<br>- Antigravity

**• Prompts principales utilizados o resumen de cómo se usó la IA.**

<br>**PROMPT 1 - Estructura inicial (maqueta + navegación en modo oscuro)**

<br><br>Crea una aplicación móvil de inventario y despensa personal con React Native y Expo. Quiero una primera versión solo de interfaz (frontend), sin lógica real: pantallas de ejemplo, navegación funcionando y datos simulados para visualizar el flujo.

<br>El diseño general debe ser obligatoriamente un modo oscuro/gris oscuro de fondo, con tarjetas en tonos de gris ligeramente más claros para contraste, y letras blancas muy legibles y visibles.

<br>**Estructura la app con una barra de navegación inferior con cinco secciones principales:**
<br>**1.	Inicio:** Un menú principal con tarjetas llamativas de acceso directo a cada sección, mostrando información de ejemplo rápida (ej. "Artículos por caducar: 3", "Faltan en la lista: 5").
<br>**2.	Almacenes:** Pantalla que simule cuatro opciones de almacenamiento base: Refrigerador, Congelador, Alacena, Estantería. 
Debe mostrar un botón simulado para "Añadir almacén".
<br>**3.	Lista de compras:** Una lista de artículos/alimentos pendientes por comprar con casillas de verificación (checkboxes) de ejemplo.
<br>**4.	Buscador:** Una barra de búsqueda estática que muestre cómo se verían los resultados con su ubicación detallada (Almacén, ubicación exacta y sección).
<br>**5.	Caducidad:** Una interfaz que muestre alimentos de ejemplo clasificados con una barra visual de 3 colores: Verde (Ok), Amarillo (Próximo a caducar) y Rojo (Caducado).

<br>**Requisitos:**
<br>● Solo interfaz (frontend) y navegación, sin persistencia ni funcionalidades reales por
ahora.
<br>● Usa la versión más reciente compatible con Expo Go (Expo SDK actual).
<br>● Mantén un diseño limpio, moderno y consistente en todas las pantallas.
________________________________________
**PROMPT 2 - Secciones de almacenes (Estructura interna y añadir objetos)**
Implementa la funcionalidad real de la sección Almacenes. Elimina los datos simulados anteriores.

**Requisitos:**
1.	Por defecto, crea los almacenes: Refrigerador, Congelador, Alacena y Estantería.
2.	Permite al usuario:
a.	Añadir nuevos almacenes personalizados.
b.	Dentro de cada almacén, poder crear "Divisiones" o "Secciones" (ej. en Refrigerador: "Puerta", "Cajón inferior").

3.	Añade un formulario para registrar un objeto/alimento dentro de una sección específica. El formulario debe pedir: Nombre del objeto, Categoría, Almacén perteneciente, División/Sección exacta, y un campo opcional para la fecha de Caducidad seleccionado por fecha (Si el usuario no pone información, no cuenta para caducidad).
4.	Añade una opción para editar o eliminar almacenes o divisiones ya creados

5.	Mantén el estilo visual de modo oscuro/gris con texto blanco y la navegación intacta.
________________________________________
**PROMPT 3 - Lista de compras (Gestión de faltantes)**
Desarrolla la funcionalidad real de la sección Lista de compras.
**Requisitos:**
1.	Crea una interfaz limpia donde el usuario pueda escribir un artículo o alimento faltante y añadirlo a la lista de compras mediante un botón.
2.	Cada artículo debe tener un botón o casilla para marcarlo como "comprado" (lo que lo elimina de la lista o lo tacha) y un botón para borrarlo individualmente.
3.	Deja la estructura lista para que en el futuro otras pantallas puedan inyectar datos automáticamente a esta lista. Mantén el diseño oscuro/gris con texto blanco.
________________________________________
**PROMPT 4 - Buscador inteligente (Predicción y ubicación exacta)**
Convierte la sección Buscador en una herramienta funcional con búsqueda predictiva.
**Requisitos:**
1.	Conecta el buscador con los objetos que el usuario ya registró en la sección de Almacenes.
2.	Implementa un sistema de filtrado en tiempo real: cuando el usuario empiece a escribir (ej. escribe "hu"), el buscador debe predecir y desplegar inmediatamente los objetos que coincidan con esas letras (ej. "Huevos").
3.	Cada resultado de búsqueda debe mostrar de forma muy clara su "ruta de ubicación" exacta en formato de texto legible.
________________________________________
**PROMPT 5 - Caducidad automática (Semáforo de colores y automatización)**
Desarrolla la lógica real para la sección de Caducidad.
**Requisitos:**
1.	Recopila automáticamente todos los objetos de los Almacenes que tengan una fecha de caducidad asignada.
2.   Diseña una barra de estado o etiqueta con un sistema de semáforo de 3 colores para cada artículo:
**o	Verde:*** Fuera de peligro (le queda bastante tiempo).
**o	Amarillo:** A punto de caducar (falta 1 semana o menos para la fecha actual). 
**o	Rojo:** Objeto ya caducado (fecha igual o menor a la del día de hoy).
**Lógica de automatización crítica:** Cuando un objeto pasa a color Rojo (Caducado), el sistema debe añadir automáticamente ese artículo a la "Lista de compras". 
**Excepción:** Si el usuario tiene más de un objeto con el mismo nombre en los almacenes y esos otros NO han caducado, no lo añadas a la lista de compras aún.
________________________________________
**PROMPT 6 - Inicio funcional (Métricas en tiempo real)**
Transforma la pantalla de Inicio para que sea un panel de control (Dashboard) real y dinámico conectado al resto de las pantallas.
**Requisitos:**
1.	Modifica las tarjetas del menú para que muestren estadísticas reales actualizadas al instante:
**o	Tarjeta de Almacenes:** Debe decir cuántos objetos totales hay guardados.
**o	Tarjeta de Lista de Compras:** Debe mostrar cuántos artículos faltan por comprar.
**o	Tarjeta de Caducidad:** Debe alertar el número exacto de objetos que ya están en color Amarillo o Rojo.
2.	Haz que al tocar cualquier tarjeta del Inicio, la navegación redirija de inmediato a la sección correspondiente de la barra inferior. Mantén el diseño oscuro/gris.
________________________________________
**PROMPT 7 – Acceso rápido + correcciones**
Al utilizar “Buscar” y “Caducidad” 
1.	Al tocar el artículo permita la redirección hacia el almacén donde se encuentre guardados
2.	Al mantener presionado al artículo, permita la edición o eliminación del mismo

Al estar en Inicio
<br>1.- Nuevo articulo debe tener la misma funcionalidad que añadir artículos en el almacén 
<br>2.- Al presionar "artículos totales" te envíe a Buscar. 
<br>     Al presionar "Por caducidad" o "caducos" te envíe a Caducidad. 
<br>     Al presionar "En lista compras" te envie a Lista
________________________________________


**• Funcionalidades principales.**
<br>Arquitectura Modular PWA (Progressive Web App): Permite que el sitio web sea instalable en teléfonos móviles como si fuera una aplicación nativa, funcionando a pantalla completa y adaptando sus menús de forma táctil.

Automatización de Caducidad con Semáforo Inteligente: Clasificación visual automática mediante colores según la fecha actual. Integra un motor que añade artículos caducados a la lista de compras si no quedan unidades vigentes.

Motor de Búsqueda Predictivo e Indexado: Filtrado en tiempo real desde las primeras dos letras que no solo encuentra el objeto, sino que desglosa su ubicación exacta de forma jerárquica


**• Estructura del proyecto.**
•	Inicio (Dashboard): *Funciona como el panel de control y menú de selección. Presenta tarjetas de acceso rápido hacia las demás secciones con contadores numéricos sincronizados en tiempo real (ej. número de productos guardados, artículos por comprar y alertas de caducidad).*

•	Almacenes: *Interfaz de gestión de espacios. Por defecto incluye Refrigerador, Congelador, Alacena y Estantería. Permite crear nuevos almacenes, añadir subdivisiones internas (ej. Puerta, Repisa) y registrar objetos mediante un formulario que solicita Nombre, Ubicación y Fecha de Caducidad.*

•	Lista de Compras: *Ventana de abastecimiento donde el usuario añade manualmente artículos faltantes. Cuenta con casillas de verificación para marcar elementos adquiridos y eliminarlos, además de recibir inserciones automáticas del módulo de caducidad.*

•	Buscador: *Pantalla limpia optimizada para móviles que contiene una barra de texto. Al escribir, despliega instantáneamente las coincidencias predichas junto con su ruta exacta en formato:* 
<br>Almacén -> División -> Sección.

•	Caducidad: *Módulo de monitoreo temporal. Muestra los productos con fecha límite organizados en barras de estado: Verde (Vigente), Amarillo (cerca de caducir) y Rojo (Caducado, activa el auto-abastecimiento en la lista de compras).*


**• Instrucciones para instalar y ejecutar.**
Para levantar el proyecto de forma local en tu computadora, sigue estos pasos desde tu terminal:
<br><br>**Prerrequisitos:**
<br>  Tener instalado Node.js 

<br>  Paso 1: Clonar el repositorio
<br>    Abre tu terminal y descarga tu proyecto de GitHub:
<br>    git clone https://github.com/KatiaVargas/inventario.git
<br>    cd inventario

<br>  Paso 2: Instalar dependencias
<br>    Instala los paquetes necesarios definidos en el archivo package.json:
<br>    npm install
<br>    Instalar Expo Go para celular
    
<br>  Paso 3: Ejecutar en entorno de desarrollo
<br>    Inicia el servidor visualizar y probar la aplicación desde el celular:
<br>    npx expo start
<br>    con Expo Go, escanea el código ó usa el link de localhost
<br>  Asegurate que tenbas ambas en una misma conexión
 

**• Capturas de pantalla o enlaces a evidencias.**
https://drive.google.com/drive/folders/1DS4hZL3mgGSuZoVVlmpz0IcJNmXByZL0?usp=sharing

**• Conclusiones del equipo.**
<br> Este proyecto fue más personal para mi y mi familia, tenemos que organizar un abastecimiento de nuestros propios artículos, he tenido algunos problemas de internet para la realización del proyecto y me he manejado mayormente con Antigravity, mis tokens se habian agotado así que me tenía que basar en el proyecto anterior para realizar conexiones y últimos toques como la implementación del logo.
<br> El producto final salió mejor de lo que tenía en mente, y aún pienso si es posible mejorarlo a futuro para convertirlo en algo funcional con conexión a una base de datos directa para su uso funcional completo.
