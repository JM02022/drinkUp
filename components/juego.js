import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Modal, Button } from 'react-native';
import { textoRetos, textoRetosTodos } from '../reto/retos';

const Juego = ({ route }) => {
  const { nombres } = route.params;
  const [selectedName, setSelectedName] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messageShown, setMessageShown] = useState(false);
  const lastPress = useRef(0);

  useEffect(() => {
    handlePlay(); // Mostrar un reto aleatorio al cargar la pantalla
  }, []);

  const handleDoublePress = () => {
    const currentTime = new Date().getTime();
    const delta = currentTime - lastPress.current;

    if (delta < 300) {
      // Cambiar de reto al detectar un doble toque
      handlePlay();
    } else if (!messageShown) {
      // Mostrar el modal si no es un doble toque y el mensaje no se ha mostrado
      setModalVisible(true);
    }

    lastPress.current = currentTime;
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setMessageShown(true); // Marcar el mensaje como mostrado al cerrar el modal
  };

  const handlePlay = () => {
    const randomName = nombres[Math.floor(Math.random() * nombres.length)];
    let randomChallenge;

    // Verificar si es un reto de textoRetosTodos
    const isRetosTodos = Math.random() < 0.5;
    if (isRetosTodos) {
      randomChallenge = textoRetosTodos[Math.floor(Math.random() * textoRetosTodos.length)];
      setSelectedName(''); // No mostrar el nombre
    } else {
      randomChallenge = textoRetos[Math.floor(Math.random() * textoRetos.length)];
      setSelectedName(randomName); // Mostrar el nombre
    }

    setSelectedChallenge(randomChallenge);
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoublePress}>
      <View style={styles.container}>
        {selectedName !== '' && (
          <Text style={styles.resultText} numberOfLines={1} ellipsizeMode="tail">
            {selectedName}
          </Text>
        )}
        {selectedChallenge !== '' && (
          <Text style={styles.resultTextChallenge}>{selectedChallenge}</Text>
        )}

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Debe presionar 2 veces para cambiar de reto</Text>
            <Button title="Cerrar" onPress={handleCloseModal} color="#FFD700" />
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20, // Añadido espacio alrededor del texto
  },
  resultText: {
    fontSize: 40, // Tamaño del texto
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -80,
    textShadowColor: '#FFD700', // Dorado
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  resultTextChallenge: {
    fontSize: 30, // Tamaño del texto
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    padding:10,
    textShadowColor: '#FFD700', // Dorado
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.98)', // Fondo transparente
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Juego;
