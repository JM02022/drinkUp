import { StyleSheet, View } from 'react-native';
import MainStack from './navigation/MainStack';

export default function App() {
  return (
      <MainStack/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
