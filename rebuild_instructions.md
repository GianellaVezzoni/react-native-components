# 🔧 Instrucciones para Ver los Iconos

Los iconos ya están configurados correctamente. Ahora necesitas **limpiar y reconstruir** la aplicación para que los cambios se apliquen.

## Para iOS:

1. **Opción 1 - Limpieza rápida:**
   ```bash
   cd ios
   rm -rf Pods
   rm -rf ~/Library/Developer/Xcode/DerivedData/*
   pod install
   cd ..
   yarn ios
   ```

2. **Opción 2 - Desde Xcode:**
   - Abre el proyecto en Xcode: `open ios/AwesomeProject.xcworkspace`
   - Menú: Product → Clean Build Folder (Cmd + Shift + K)
   - Cierra Xcode
   - Ejecuta: `yarn ios`

## Para Android:

1. **Limpieza completa:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   yarn android
   ```

2. **Si sigue sin funcionar:**
   ```bash
   cd android
   ./gradlew clean
   rm -rf .gradle
   cd ..
   rm -rf android/app/build
   yarn android
   ```

## ✅ Lo que se configuró:

- ✅ Fuentes de iconos agregadas a `Info.plist` de iOS
- ✅ Fuentes copiadas a `android/app/src/main/assets/fonts/`
- ✅ Pods de iOS actualizados
- ✅ Autolinking configurado en Android

## 🎯 Después de reconstruir:

Deberías ver estos iconos en la pantalla de login:
- 👤 → Icono de cuenta (email)
- 🔒 → Icono de candado (contraseña)
- 👁️ → Icono de ojo (mostrar/ocultar contraseña)
- G → Icono de Google

## 🐛 Si aún no funcionan:

**Para iOS:**
```bash
cd ios
pod deintegrate
pod install
cd ..
yarn ios
```

**Para Android:**
```bash
cd android
./gradlew clean
./gradlew assembleDebug --refresh-dependencies
cd ..
yarn android
```

## 💡 Tip:
Si estás usando un simulador/emulador, asegúrate de:
1. Cerrar la app completamente
2. Limpiar el build
3. Reinstalar la app
