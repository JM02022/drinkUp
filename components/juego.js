import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { textoRetos } from '../reto/retos';

const Juego = ({ route }) => {
  const { nombres } = route.params;
  const [selectedName, setSelectedName] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');

  const handlePlay = () => {
    const randomName = nombres[Math.floor(Math.random() * nombres.length)];
    const randomChallenge = textoRetos[Math.floor(Math.random() * textoRetos.length)];
    setSelectedName(randomName);
    setSelectedChallenge(randomChallenge);
  };

  return (
    <View style={styles.container}>
      {selectedName !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{selectedName}, {selectedChallenge}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
        <Text style={styles.buttonText}>Jugar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  playButton: {
    width:200,
    backgroundColor: '#6495ED',
    borderRadius: 10,
    padding: 10,
    marginTop: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign:'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop:100,
    margin:50, 
  },
  resultText: {
    fontSize: 34,
    color:'#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Juego;
