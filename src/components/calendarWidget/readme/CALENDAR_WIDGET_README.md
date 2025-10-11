# 📅 Calendar Widget - React Native

Un componente de calendario minimalista estilo widget con soporte para eventos, animaciones suaves y tema claro/oscuro.

## ✨ Características

- 📱 **Diseño Mobile-First**: Optimizado para dispositivos móviles
- 🎨 **Tema Automático**: Soporte para light/dark mode
- ⚡ **Animaciones Suaves**: Transiciones con Animated API
- 📆 **Vista Mensual**: Grid de 7 columnas (Lun-Dom)
- 🔵 **Día Actual**: Destacado automáticamente
- 📝 **Panel de Eventos**: Se expande al tocar un día
- 🎯 **Indicadores**: Puntos en días con eventos
- 💪 **TypeScript**: Completamente tipado
- 🔧 **Reutilizable**: Fácil de integrar

---

## 🚀 Instalación y Uso

### Uso Básico

```typescript
import CalendarWidget from './src/components/CalendarWidget';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CalendarWidget />
    </View>
  );
}
```

### Con Props Personalizadas

```typescript
<CalendarWidget
  theme="dark"
  onDateSelect={(date) => {
    console.log('Fecha seleccionada:', date);
  }}
  events={{
    '2025-10-15': [
      { id: '1', time: '10:00', title: 'Meeting', color: '#667eea' }
    ]
  }}
/>
```

---

## 📋 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `events` | `EventsByDate` | `MOCK_EVENTS` | Objeto con eventos por fecha |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Tema del calendario |
| `onDateSelect` | `(date: Date) => void` | `undefined` | Callback al seleccionar un día |

### Tipos

```typescript
interface Event {
  id: string;
  time: string;      // Formato: "10:00"
  title: string;
  color?: string;    // Color hex del evento
}

interface EventsByDate {
  [date: string]: Event[];  // Formato fecha: "2025-10-15"
}
```

---

## 🎨 Personalización

### Cambiar Colores del Tema

En `CalendarWidget.tsx`, modificá las paletas:

```typescript
const lightColors = {
  background: '#f5f7fa',        // Fondo exterior
  cardBackground: '#ffffff',    // Fondo de la card
  primary: '#1a202c',          // Color principal
  today: '#667eea',            // Color del día actual
  selected: '#5a67d8',         // Color del día seleccionado
  accent: '#667eea',           // Color de acento
  // ... más colores
};

const darkColors = {
  background: '#0f1419',
  cardBackground: '#1a1f2e',
  primary: '#e2e8f0',
  today: '#7c3aed',
  selected: '#6d28d9',
  accent: '#8b5cf6',
  // ... más colores
};
```

### Cambiar Tamaño

```typescript
const CALENDAR_WIDTH = 350; // En lugar de Math.min(SCREEN_WIDTH - 40, 400)
```

---

## 🔌 Integración con API Real

### Ejemplo con Google Calendar API

```typescript
import { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const useGoogleCalendar = (year: number, month: number) => {
  const [events, setEvents] = useState<EventsByDate>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Configurar Google Sign In
        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
          webClientId: 'TU_CLIENT_ID',
        });

        // Sign in
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const tokens = await GoogleSignin.getTokens();

        // Fetch events desde Google Calendar
        const startDate = new Date(year, month, 1).toISOString();
        const endDate = new Date(year, month + 1, 0).toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
          `timeMin=${startDate}&timeMax=${endDate}&singleEvents=true&orderBy=startTime`,
          {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          }
        );

        const data = await response.json();
        
        // Transformar a formato EventsByDate
        const formattedEvents: EventsByDate = {};
        
        data.items?.forEach((item: any) => {
          const date = item.start.dateTime || item.start.date;
          const dateKey = date.split('T')[0]; // "2025-10-15"
          
          if (!formattedEvents[dateKey]) {
            formattedEvents[dateKey] = [];
          }
          
          formattedEvents[dateKey].push({
            id: item.id,
            time: new Date(date).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            title: item.summary,
            color: '#667eea',
          });
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching calendar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [year, month]);

  return { events, loading };
};

// Uso:
export default function App() {
  const { events, loading } = useGoogleCalendar(2025, 9); // Octubre 2025

  if (loading) return <ActivityIndicator />;

  return <CalendarWidget events={events} />;
}
```

### Ejemplo con API Propia

```typescript
const useCustomCalendar = (userId: string, year: number, month: number) => {
  const [events, setEvents] = useState<EventsByDate>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://tu-api.com/calendar/${userId}?year=${year}&month=${month}`
        );
        const data = await response.json();
        
        // Transformar según tu formato
        const formatted = transformToEventsByDate(data);
        setEvents(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [userId, year, month]);

  return events;
};

// Helper para transformar datos
function transformToEventsByDate(apiData: any[]): EventsByDate {
  const result: EventsByDate = {};
  
  apiData.forEach(event => {
    const dateKey = event.date; // Ya en formato "2025-10-15"
    
    if (!result[dateKey]) {
      result[dateKey] = [];
    }
    
    result[dateKey].push({
      id: event.id,
      time: event.time,
      title: event.title,
      color: event.color || '#667eea',
    });
  });
  
  return result;
}
```

---

## 📖 Ejemplos de Uso

### Calendario con Estado Local

```typescript
import { useState } from 'react';

export default function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<EventsByDate>({
    '2025-10-20': [
      { id: '1', time: '10:00', title: 'Reunión de equipo' }
    ]
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log('Fecha seleccionada:', date.toLocaleDateString());
  };

  const addEvent = (date: string, event: Event) => {
    setEvents(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), event]
    }));
  };

  return (
    <CalendarWidget 
      events={events}
      onDateSelect={handleDateSelect}
    />
  );
}
```

### Calendario con Context API

```typescript
// CalendarContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface CalendarContextType {
  events: EventsByDate;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  addEvent: (date: string, event: Event) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<EventsByDate>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const addEvent = (date: string, event: Event) => {
    setEvents(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), event]
    }));
  };

  return (
    <CalendarContext.Provider value={{ events, selectedDate, setSelectedDate, addEvent }}>
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('useCalendar must be used within CalendarProvider');
  return context;
};

// Uso:
export default function App() {
  return (
    <CalendarProvider>
      <MyApp />
    </CalendarProvider>
  );
}

function MyApp() {
  const { events, setSelectedDate } = useCalendar();
  
  return (
    <CalendarWidget 
      events={events}
      onDateSelect={setSelectedDate}
    />
  );
}
```

### Calendario con Múltiples Meses

```typescript
import { useState } from 'react';

export default function MultiMonthCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="< Anterior" onPress={prevMonth} />
        <Button title="Siguiente >" onPress={nextMonth} />
      </View>
      
      <CalendarWidget 
        // Necesitarás modificar el componente para aceptar currentDate como prop
      />
    </View>
  );
}
```

---

## 🎯 Casos de Uso

### 1. App de Productividad
```typescript
<CalendarWidget 
  events={taskEvents}
  theme="auto"
  onDateSelect={(date) => {
    navigation.navigate('TaskDetails', { date });
  }}
/>
```

### 2. App de Fitness
```typescript
const workoutEvents = {
  '2025-10-15': [
    { id: '1', time: '07:00', title: 'Morning Run', color: '#48bb78' }
  ]
};

<CalendarWidget events={workoutEvents} theme="dark" />
```

### 3. App Médica
```typescript
const appointments = {
  '2025-10-20': [
    { id: '1', time: '10:00', title: 'Doctor Checkup', color: '#f56565' }
  ]
};

<CalendarWidget events={appointments} />
```

---

## 🎨 Diseño

El calendario usa un diseño inspirado en:
- **iOS Calendar Widget**: Limpio y minimalista
- **Google Calendar**: Interactivo y funcional
- **Material Design**: Sombras y elevación

### Características Visuales

- ✅ Bordes redondeados (24px)
- ✅ Sombras sutiles para profundidad
- ✅ Tipografía clara y legible
- ✅ Colores suaves y armoniosos
- ✅ Indicadores visuales (puntos para eventos)
- ✅ Estados interactivos (hover, pressed)

---

## 🔧 Troubleshooting

### El calendario no se ve

**Solución**: Asegúrate de que el contenedor padre tenga espacio suficiente:
```typescript
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <CalendarWidget />
</View>
```

### Las animaciones van lentas

**Solución**: Es normal en modo development. Probá en modo Release:
```bash
npx react-native run-ios --configuration Release
npx react-native run-android --variant=release
```

### Los eventos no aparecen

**Solución**: Verificá el formato de fecha. Debe ser `"YYYY-MM-DD"`:
```typescript
const events = {
  '2025-10-15': [...], // ✅ Correcto
  '10/15/2025': [...], // ❌ Incorrecto
};
```

### El tema no cambia

**Solución**: Si usás `theme="auto"`, el componente detecta el tema del sistema. Para forzar un tema:
```typescript
<CalendarWidget theme="dark" />
```

---

## 🚀 Próximas Mejoras

Ideas para extender el componente:

- [ ] Navegación entre meses (← →)
- [ ] Vista semanal
- [ ] Vista de agenda (lista)
- [ ] Arrastrar y soltar eventos
- [ ] Eventos de múltiples días
- [ ] Eventos recurrentes
- [ ] Sincronización con calendarios nativos
- [ ] Recordatorios y notificaciones
- [ ] Exportar a ICS
- [ ] Compartir eventos

---

## 📄 Licencia

MIT - Usá libremente en tus proyectos

---

## 🤝 Contribuir

¿Tenés ideas para mejorar? Algunas sugerencias:
- Agregar más animaciones
- Mejorar la accesibilidad
- Optimizar el performance
- Agregar más temas visuales
- Crear variantes de tamaño (small, medium, large)

---

**¡Disfrutá tu calendario widget!** 📅✨

