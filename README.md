# React Native Components Project

Este es un proyecto de [**React Native**](https://reactnative.dev) que contiene diferentes componentes en ramas separadas. Cada rama representa una implementación de un componente o feature diferente.

## 📱 Estructura del Proyecto

Este repositorio utiliza diferentes ramas (branches) para organizar componentes individuales:

- **main**: Rama principal con la configuración base
- Cada **rama adicional** contiene un componente específico con su propia documentación

Para explorar los componentes disponibles, revisa las diferentes ramas del repositorio.

## 🚀 Instalación

> **Nota**: Asegúrate de tener completada la guía [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) antes de continuar.

### Clonar el repositorio

```sh
git clone <url-del-repositorio>
cd AwesomeProject
```

### Instalar dependencias

```sh
yarn install
```

### iOS: Instalar dependencias nativas

Para iOS, es necesario instalar las dependencias de CocoaPods:

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

## 🏃‍♂️ Ejecutar la Aplicación

Este proyecto funciona tanto en **Android** como en **iOS**.

### Iniciar Metro

Primero, inicia el servidor de Metro:

```sh
yarn start
```

### Ejecutar en Android

En otra terminal:

```sh
yarn android
```

### Ejecutar en iOS

En otra terminal:

```sh
yarn ios
```

Si todo está configurado correctamente, deberías ver la aplicación ejecutándose en el emulador de Android, simulador de iOS o en tu dispositivo conectado.

## 🔄 Cambiar entre Componentes

Para ver un componente específico:

1. Cambia a la rama del componente que quieres explorar:
   ```sh
   git checkout <nombre-de-la-rama>
   ```

2. Instala las dependencias (en caso de que sean necesarias):
   ```sh
   yarn install
   ```

3. Para iOS, si hay cambios nativos:
   ```sh
   cd ios && bundle exec pod install && cd ..
   ```

4. Ejecuta la aplicación siguiendo los pasos anteriores

## 📚 Documentación

Cada componente en su respectiva rama incluye su propia documentación con detalles de implementación, props, ejemplos de uso y más.

## 🛠 Desarrollo

Durante el desarrollo, puedes aprovechar [Fast Refresh](https://reactnative.dev/docs/fast-refresh) que actualiza automáticamente la aplicación cuando guardas cambios.

Para recargar manualmente:
- **Android**: Presiona <kbd>R</kbd> dos veces o <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) / <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS) para abrir el menú de desarrollo
- **iOS**: Presiona <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> en el simulador

## 📖 Recursos

- [React Native Website](https://reactnative.dev) - documentación oficial de React Native
- [React Native Docs](https://reactnative.dev/docs/getting-started) - guías y tutoriales
- [GitHub Repository](https://github.com/facebook/react-native) - repositorio oficial de React Native
