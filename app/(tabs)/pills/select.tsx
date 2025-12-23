import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { usePills } from "@hooks/usePills";
import { useTheme } from "@hooks/useTheme";
import { useSafeNavigation } from "@hooks/useSafeNavigation";
import { useT } from "@i18n/useT";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedModal from "@themedComponents/ThemedModal";
import ThemedButton from "@themedComponents/ThemedButton";
import ThemedView from "@themedComponents/ThemedView";
import PillCard from "@components/pills/PillCard";
import Spacer from "@components/Spacer";
import GenericHeader from "@components/headers/GenericHeader";
import HeaderButton from "@components/headers/HeaderButton";

import CloseIcon from "@assets/icons/close.svg";
import TrashIcon from "@assets/icons/trash.svg";

export default function Select() {
  const theme = useTheme();
  const { pills, deletePills } = usePills();
  const {goBack} = useSafeNavigation();
  const navigation = useNavigation();
  const t = useT();
  const params = useLocalSearchParams();
  
  const [selected, setSelected] = useState<number[]>(params.selected ? [Number(params.selected)] : []);
  const [deleteModal, setDeleteModal] = useState(false);
  
  useLayoutEffect(() => {
    const parent = navigation.getParent();

    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => {
      parent?.setOptions({
        tabBarStyle: { 
          backgroundColor: theme.background.secondary,
          borderTopWidth: 1,
          borderColor: theme.border.light + "10",
        }
      });
    };
  }, [navigation]);

  const toggle = (id: number) =>
    setSelected(s =>
      s.includes(id) ? s.filter(i => i !== id) : [...s, id]
    );

  const handleDelete = () => {
    // Afficher la modale de confirmation
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    await deletePills(selected);
    goBack()();
  };

  return (
    <SafeTopAreaThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        {/* En-tête */}
        <GenericHeader
          title={selected.length === 0 ? t("itemSelection.noSelection") : t("itemSelection.nSelected", { n: selected.length }, true)}
          leftButton={<HeaderButton onPress={goBack()} icon={<CloseIcon width={24} height={24} color={theme.text.primary} />} />}
        />
        <Spacer height={24} />

        {/* Liste des médicaments */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, pills.length === 0 && {flex: 1}]}
          showsVerticalScrollIndicator={false}
        >
          {pills.map((pill, index) => (
            <PillCard
              key={index}
              pill={pill}
              canSelect={true}
              isSelected={selected.includes(index)}
              onSelect={() => toggle(index)}
            />
          ))}

          <ThemedButton
            variant="error"
            icon={<TrashIcon width={24} height={24}
            color={selected.length === 0 ? theme.text.tertiary : theme.text.onBrand}
            opacity={selected.length === 0 ? 0.6 : 1} />}
            onPress={handleDelete}
            disabled={selected.length === 0}
          >
            {t("global.delete")} ({selected.length})
          </ThemedButton>
        </ScrollView>
      </ThemedView>

      <ThemedModal
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        title={t("pills_select.deleteTitle", { n: selected.length }, true)}
        description={t("pills_select.deleteConfirm", { n: selected.length }, true)}
        type="error"
        confirmText={t("global.delete")}
        cancelText={t("global.cancel")}
        onConfirm={confirmDelete}
      />
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  header: {
    padding: 16,
    gap: 12,
  },
  addButton: {
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    //flex: 1, <-- anti-scroll !
    paddingTop: 0,
    paddingBottom: 32,
    gap: 16,
  },
});
