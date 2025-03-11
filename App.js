import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, View } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Buy groceries', completed: false },
    { id: '2', description: 'Walk the dog', completed: false },
  ]);
  const [taskDescription, setTaskDescription] = useState('');

  // Add a new task
  const addTask = () => {
    if (taskDescription) {
      const newTask = {
        id: Math.random().toString(),
        description: taskDescription,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskDescription(''); // Clear input after adding
    }
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Render each task with CheckBox and description
  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleCompletion(item.id)}
      />
      <Text style={item.completed ? styles.completedText : styles.text}>
        {item.description}
      </Text>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        style={styles.input}
        placeholder="New task"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <Button title="Add" onPress={addTask} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffe4e1', // Light pink background
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffb6c1', // Soft pink
    padding: 15,
    borderRadius: 15,
    marginVertical: 6,
    shadowColor: '#ff69b4',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  input: {
    height: 40,
    borderColor: '#ff69b4', // Hot pink border
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fffaf0', // Light cream
    marginBottom: 10,
    color: '#ff1493', // Deep pink text
  },
  text: {
    fontSize: 16,
    color: '#d63384', // Dark pink text
    flex: 1,
    marginLeft: 10,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
    flex: 1,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#ff69b4', // Hot pink button
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#ff1493',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

