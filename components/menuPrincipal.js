import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Advertencia from './advertencia';// Importa el componente Advertencia

const MenuPrincipal = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [nombresList, setNombresList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Mostrar la advertencia después de un tiempo (por ejemplo, 2 segundos)
    setTimeout(() => {
      setShowWarning(true);
    }, 2000);
  }, []);

  const handleAccept = () => {
    // Cerrar la advertencia
    setShowWarning(false);
    // Lógica para cargar tu aplicación normal después de aceptar la advertencia
    // (puedes agregar tu lógica aquí)
  };

  const handleInputChange = (text) => {
    // Verificar si el texto contiene solo letras y espacios
    if (/^[a-zA-Z\s]*$/.test(text)) {
      setNombre(text);
    } else {
      setNotification("No se aceptan números");
      setTimeout(() => {
        setNotification(null);
      }, 1000);
    }
  };

  const handleButtonPress = () => {
    if (nombre.trim() !== '') {
      setNombresList([...nombresList, nombre]);
      setNombre('');
      showNotification(nombre);
    }
  };

  const showNotification = (nombre) => {
    setNotification(`Se agregó con éxito: ${nombre}`);
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };

  const handleStartGame = () => {
    if (nombresList.length > 0) {
      navigation.navigate('Juego', { nombres: nombresList });
    } else {
      Alert.alert('Error', 'La lista de jugadores está vacía');
    }
  };

  const renderRow = ({ item, index }) => {
    if (index % 3 === 0) {
      return (
        <View style={styles.listItemRow}>
          {nombresList.slice(index, index + 3).map((item, idx) => renderItem(item, index + idx))}
        </View>
      );
    } else {
      return null;
    }
  };

  const renderItem = (item, index) => (
    <View key={index} style={[styles.listItem, { backgroundColor: '#ffd700' }]}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
        <MaterialIcons name="cancel" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const handleDelete = (index) => {
    const updatedList = nombresList.filter((_, i) => i !== index);
    setNombresList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drink Up</Text>
      <Text style={styles.subtitle}>La timidez es un obstáculo para divertirse</Text>
      <FlatList
        style={{ marginTop: 20, marginBottom: 20 }}
        data={nombresList}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre"
        onChangeText={handleInputChange}
        value={nombre}
      />
      <TouchableOpacity style={styles.largeButton1} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Ingresar Jugador</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.largeButton2} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Iniciar Juego</Text>
      </TouchableOpacity>
      <Advertencia visible={showWarning} onClose={handleAccept} />
      {notification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 80,
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    transform: [{ skewY: '-10deg' }]
  },
  subtitle: {
    marginTop: 50,
    fontSize: 17,
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    width: 300,
    height: 40,
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  listItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listItem: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: {
    color: '#fff',
  },
  largeButton1: {
    borderRadius: 10,
    width: 320,
    height: 40,
    backgroundColor: '#ffd700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  largeButton2: {
    borderRadius: 10,
    width: 320,
    height: 40,
    backgroundColor: '#ffd700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notification: {
    borderRadius: 8,
    marginTop: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffd700', 
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    top: -1,
    left: 76,
    zIndex: 1,
  },
});

export default MenuPrincipal;
