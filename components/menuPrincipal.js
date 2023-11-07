import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MenuPrincipal =  ({navigation}) => {
  const [nombre, setNombre] = useState('');
  const [nombresList, setNombresList] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (text) => {
    setNombre(text);
  };

  const handleButtonPress = () => {
    if (nombre !== '') {
      setNombresList([...nombresList, nombre]);
      setNombre('');
      showNotification(nombre);
    }
  };

  const showNotification = (nombre) => {
    setNotification(`Se agrego con exito: ${nombre}`);
  
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

  const randomColor = () => {
    const colors = [
        '#FF00FF', // Magenta
        '#800080', // Púrpura
        '#0000FF', // Azul
        '#00FFFF', // Celeste
        '#00FF00', // Verde
        '#FFFF00', // Amarillo
        '#FF0000', // Rojo
    ]; // Asegúrate de que los colores coincidan con los del estilo

    const randomIndex = Math.floor(Math.random() * (colors.length - 1));
    const color1 = colors[randomIndex];
    const color2 = colors[randomIndex + 1];
    const gradient = Math.random(); // Puedes ajustar este valor para controlar la intensidad del degradado
    const r = Math.round(parseInt(color1.slice(1, 3), 16) * gradient + parseInt(color2.slice(1, 3), 16) * (1 - gradient));
    const g = Math.round(parseInt(color1.slice(3, 5), 16) * gradient + parseInt(color2.slice(3, 5), 16) * (1 - gradient));
    const b = Math.round(parseInt(color1.slice(5, 7), 16) * gradient + parseInt(color2.slice(5, 7), 16) * (1 - gradient));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};


const renderItem = (item, index) => (
    <View key={index} style={[styles.listItem, { backgroundColor: randomColor() }]}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
        <MaterialIcons name="cancel" size={24} color="white" />
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
        style={{marginTop:20,marginBottom:20}}
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
    color: '#ff00ff', // Cambia el color a un tono morado más vibrante
    textShadowColor: '#B110FE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15, // Aumenta el radio del resplandor para hacerlo más pronunciado
    transform: [{ skewY: '-10deg' }]
  },
   
  subtitle: {
    marginTop:50,
    fontSize: 17,
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    width: 300,
    height: 40,
    color:'#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:10,
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
    color: 'white',
  },
  largeButton1: {
    borderRadius:10,
    width: 320,
    height: 40,
    backgroundColor: '#6495ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:15
  },
  largeButton2: {
    borderRadius:10,
    width: 320,
    height: 40,
    backgroundColor: '#6495ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notification: {
    borderRadius:8,
    marginTop:20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green', // Puedes ajustar el color de la notificación
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
  },
  deleteButton: {
    position: 'absolute',
    top: -1,
    left: 76,
    zIndex: 1,
  },
});

export default MenuPrincipal;
