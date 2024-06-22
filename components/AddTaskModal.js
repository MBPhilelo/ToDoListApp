import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet } from 'react-native';

const AddTaskModal = ({ visible, onClose, onAddTask }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    onAddTask(task);
    setTask('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalView}>
        <TextInput 
          placeholder="Enter task title" 
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <Button title="Add Task" onPress={handleAddTask} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
  },
});

export default AddTaskModal;
