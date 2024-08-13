import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeO9PjBplJyztKJ9Jyi1ET2RIBOOeQpVg",
  authDomain: "meu-firebase-b4b2a.firebaseapp.com",
  projectId: "meu-firebase-b4b2a",
  storageBucket: "meu-firebase-b4b2a.appspot.com",
  messagingSenderId: "495412982984",
  appId: "1:495412982984:web:a1d5e2a4aa0e91112561fd"
};


firebase.initializeApp(firebaseConfig);


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function App() {
  const [nomes, setNomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const nomesCollection = firebase.firestore().collection('Nomes');
      const snapshot = await nomesCollection.get();

      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setNomes(data);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Lista de Nomes:</Text>
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome} {item.sobrenome}</Text>
          </View>
        )}
      />
    </View>
  );
}
