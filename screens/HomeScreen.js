import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasksData = await AsyncStorage.getItem('tasks');
    if (tasksData) {
      setTasks(JSON.parse(tasksData));
    }
  };

  const saveTasks = async (tasks) => {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = (title) => {
    const newTask = { id: Date.now().toString(), title, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setModalVisible(false);
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem task={item} onComplete={completeTask} onDelete={deleteTask} />
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      <AddTaskModal 
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        onAddTask={addTask} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;
