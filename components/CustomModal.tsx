import { Modal, Text, Button, StyleSheet, Pressable } from "react-native";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function CustomModal({ visible, onClose }: CustomModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.content} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Ceci est une modale ! 🎉</Text>
          <Text style={styles.description}>
            Une modale s'affiche par-dessus le contenu existant.
          </Text>
          <Button title="Fermer" onPress={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    color: "#666",
  },
});