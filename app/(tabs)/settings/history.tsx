import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { useTheme } from "@hooks/useTheme";
import { useT } from "@i18n/useT";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedButton from "@themedComponents/ThemedButton";
import ThemedText from "@themedComponents/ThemedText";
import TrashIcon from "@icons/trash.svg"
import ThemedModal from "@components/themedComponents/ThemedModal";
import Spacer from "@components/Spacer";
import BackHeader from "@components/headers/BackHeader";
import ThemedView from "@components/themedComponents/ThemedView";

export default function index () {
  const theme = useTheme();
  const t = useT();

  const [confirmModal, setConfirmModal] = useState({ visible: false, message: "" });

  const openModal = () => {
    console.log("openModal");
    setConfirmModal({
        visible: true,
        message: t("settings_history.deleteDataModal")
    });
  };

  const closeModal = () => {
    console.log("close");
    setConfirmModal({
        visible: false,
        message: ""
    });
  };

  const handleConfirm = () => {
    console.log("handleConfirm");
    closeModal();
  };

  return (
    <SafeTopAreaThemedView style={{flex: 1}}>
      {/* En-tête */}
      <ThemedView style={styles.container}>
        <BackHeader title={t("settings.data.history")} />
        <Spacer height={24}/>

        <ThemedText>
            {t("settings_history.deleteDataText")}
        </ThemedText>
        <Spacer />
        <ThemedButton
            onPress={openModal}
            containerStyle={styles.trashButton}
            variant="error"
            icon={<TrashIcon width={24} height={24} color={theme.text.onBrand} />}
            >
            {t("global.delete")}
        </ThemedButton>
      </ThemedView>

      {/* Modale de confirmation */}
      <ThemedModal
        visible={confirmModal.visible}
        onClose={closeModal}
        title={t("global.deleteData")}
        description={confirmModal.message}
        type="info"
        confirmText={t("global.delete")}
        onConfirm={handleConfirm}
        showCancel={true}
      />
    </SafeTopAreaThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  trashButton: {
    marginTop: 8,
  },
});
