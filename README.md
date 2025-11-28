# 🐱 FelineApp

Una aplicación móvil desarrollada en React Native para explorar y descubrir información sobre diferentes razas de gatos. La aplicación utiliza The Cat API para obtener datos sobre razas felinas y permite a los usuarios buscar, ver detalles y guardar sus razas favoritas.

## ✨ Características

- 📋 **Lista de Razas**: Explora una amplia colección de razas de gatos con información detallada
- 🔍 **Búsqueda**: Busca razas por nombre en tiempo real
- ❤️ **Favoritos**: Marca tus razas favoritas y guárdalas localmente
- 📱 **Navegación**: Navega entre la lista y los detalles de cada raza
- 🖼️ **Imágenes**: Visualiza imágenes de cada raza de gato
- 💾 **Persistencia**: Tus favoritos se guardan localmente usando AsyncStorage
- 🎨 **UI Moderna**: Interfaz de usuario limpia y moderna

## 🛠️ Tecnologías

- **React Native** 0.79.3
- **React** 19.0.0
- **TypeScript** 5.0.4
- **Zustand** 5.0.5 - Gestión de estado
- **React Navigation** 7.x - Navegación entre pantallas
- **Axios** 1.9.0 - Cliente HTTP para llamadas a la API
- **AsyncStorage** 2.2.0 - Almacenamiento local
- **React Native Config** 1.6.0 - Gestión de variables de entorno

## 📋 Requisitos Previos

- Node.js >= 18
- npm o yarn
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS, solo macOS)
- CocoaPods (para iOS)

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd felineApp
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configuración de iOS (solo macOS)**
   ```bash
   # Instala las dependencias de Ruby (primera vez)
   bundle install
   
   # Instala las dependencias de CocoaPods
   bundle exec pod install
   ```

4. **Configuración de variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   API_KEY=tu_api_key_de_thecatapi
   ```
   
   Para obtener una API key gratuita, visita [The Cat API](https://thecatapi.com/) y regístrate.

## 🏃 Ejecución

### Iniciar Metro Bundler

```bash
npm start
# o
yarn start
```

### Android

```bash
npm run android
# o
yarn android
```

### iOS

```bash
npm run ios
# o
yarn ios
```

## 📁 Estructura del Proyecto

```
felineApp/
├── src/
│   ├── api/              # Cliente API y funciones de fetch
│   │   └── catApi.ts
│   ├── domain/           # Modelos de dominio y lógica de negocio
│   │   ├── breed.ts
│   │   └── getBreeds.ts
│   ├── store/            # Estado global con Zustand
│   │   └── breedStore.ts
│   ├── ui/               # Componentes y pantallas
│   │   ├── components/
│   │   │   ├── BreedItem.tsx
│   │   │   └── SearchInput.tsx
│   │   └── screens/
│   │       ├── BreedList.tsx
│   │       └── BreedDetail.tsx
│   ├── utils/            # Utilidades
│   │   └── likeStorage.ts
│   └── __tests__/        # Tests unitarios
├── android/              # Código nativo Android
├── ios/                  # Código nativo iOS
├── App.tsx               # Componente principal
└── package.json
```

## 🏗️ Arquitectura

La aplicación sigue una arquitectura limpia con separación de responsabilidades:

- **Domain**: Modelos de datos y lógica de negocio
- **API**: Capa de comunicación con servicios externos
- **Store**: Gestión de estado global con Zustand
- **UI**: Componentes y pantallas de la interfaz de usuario
- **Utils**: Utilidades y helpers

## 🧪 Testing

Ejecuta los tests con:

```bash
npm test
# o
yarn test
```

## 📱 Funcionalidades Principales

### Lista de Razas
- Muestra todas las razas de gatos disponibles
- Búsqueda en tiempo real por nombre
- Indicador visual de razas favoritas
- Manejo de estados de carga y error

### Detalle de Raza
- Información completa de la raza
- Imagen de alta calidad
- Descripción detallada
- Origen, esperanza de vida y temperamento
- Botón para agregar/quitar de favoritos

### Favoritos
- Persistencia local con AsyncStorage
- Sincronización automática entre pantallas
- Indicadores visuales (❤️/🤍)

## 🔧 Scripts Disponibles

- `npm start` - Inicia Metro Bundler
- `npm run android` - Ejecuta la app en Android
- `npm run ios` - Ejecuta la app en iOS
- `npm test` - Ejecuta los tests
- `npm run lint` - Ejecuta el linter

## 📝 Notas

- La aplicación requiere una API key de The Cat API para funcionar correctamente
- Los favoritos se almacenan localmente en el dispositivo
- La aplicación está optimizada para iOS y Android

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado.

## 🙏 Agradecimientos

- [The Cat API](https://thecatapi.com/) por proporcionar la API de razas de gatos
- [React Native](https://reactnative.dev/) por el framework
- Todos los contribuidores de las librerías utilizadas

---

Desarrollado con ❤️ usando React Native
