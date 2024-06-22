import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => onComplete(task.id)}>
        <Text style={task.completed ? styles.completed : styles.taskText}>{task.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  completed: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    color: 'red',
  },
});

export default TaskItem;
