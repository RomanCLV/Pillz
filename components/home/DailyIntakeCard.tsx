import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@hooks/useTheme";
import { useT } from "@i18n/useT";
import { DailyIntake } from "types/dailyIntake";
import { IntakeStatus } from "types/dailySummary";
import ThemedText from "@themedComponents/ThemedText";
import ThemedCard from "@themedComponents/ThemedCard";
import ThemedButton from "@themedComponents/ThemedButton";
import Chip from "@components/Chip";
import ClockIcon from "@icons/time.svg";
import CloseIcon from "@icons/close.svg";
import ScheduleChip from "@components/pills/ScheduleChip";
import Spacer from "@components/Spacer";

interface DailyIntakeCardProps {
  intake: DailyIntake;
  onTake?: () => void;
}

const ICON_SIZE = 18;

export default function DailyIntakeCard({ intake, onTake }: DailyIntakeCardProps) {
  const theme = useTheme();
  const t = useT();

  // Déterminer le statut
  const isPending = intake.schedule.status === IntakeStatus.PENDING;
  const isTaken = intake.schedule.status === IntakeStatus.TAKEN;
  const isSkipped = intake.schedule.status === IntakeStatus.SKIPPED;

  // Afficher le chip de statut ou le bouton
  const getButtonOrChip = () => {
    if (isTaken) {
      return (
        <Chip variant="secondary" intensity="solid" style={styles.chip}>
          <View style={styles.chipContent}>
            <Ionicons name="checkmark" size={ICON_SIZE} color={theme.text.onBrand} />
            <ThemedText style={[styles.chipText, { color: theme.text.onBrand }]}>
              {t("home.intake.taken")}
            </ThemedText>
          </View>
        </Chip>
      );
    }
    
    if (isSkipped) {
      return (
        <Chip variant="error" intensity="solid" style={styles.chip}>
          <View style={styles.chipContent}>
            <CloseIcon width={ICON_SIZE} height={ICON_SIZE} color={theme.text.onBrand} />
            <ThemedText style={[styles.chipText, { color: theme.text.onBrand }]}>
              {t("home.intake.skipped")}
            </ThemedText>
          </View>
        </Chip>
      );
    }
    
    if (isPending && intake.canTakeNow) {
      return (
        <ThemedButton
          variant={intake.timeAlmostDue ? "accent" : "primary"}
          size="small"
          onPress={onTake}
          containerStyle={styles.takeButtonContainer}
          buttonStyle={styles.takeButton}
          icon={<ClockIcon height={ICON_SIZE} width={ICON_SIZE} color={theme.text.onBrand} />}
        >
          {t("home.intake.taken")}
        </ThemedButton>
      );
    }

    // // Pas encore l'heure
    return (
        <ThemedButton
          variant="ghost"
          disabled
          size="small"
          containerStyle={[styles.takeButtonContainer, {borderColor: theme.text.tertiary, borderWidth: 1, borderRadius: 8}]}
          buttonStyle={styles.takeButton}
          icon={<ClockIcon height={ICON_SIZE} width={ICON_SIZE} color={theme.text.tertiary} />}
        >
          {t(intake.canTakeSoon ? "home.intake.takeSoon" : "home.intake.take")}
        </ThemedButton>
    );
  };

  const version: number = 2;

  return version === 1 ?  
  (
    <ThemedCard>
      {/* En-tête avec nom et dosage */}
      <View style={styles.row}>
        <ThemedText style={styles.name}>{intake.name}</ThemedText>
        <Chip variant="highlight">{t(`pill.usage.${intake.unit}`, {n: intake.dosage}, true )}</Chip>
      </View>
      <Spacer height={12} />
      <View style={styles.row}>
        <ScheduleChip schedule={intake.schedule.schedule} variant="primary" intensity="light" />
        {getButtonOrChip()}
      </View>
    </ThemedCard>
  )
  :
  version === 2 ?
    (
    <ThemedCard>
      {/* En-tête avec nom et dosage */}
      <View style={styles.row}>
        <ThemedText style={styles.name}>{intake.name}</ThemedText>
        <ScheduleChip schedule={intake.schedule.schedule} variant="primary" intensity="light" />
      </View>
      <Spacer height={12} />
      <View style={styles.row}>
        <Chip variant="highlight">{t(`pill.usage.${intake.unit}`, {n: intake.dosage}, true )}</Chip>
        {getButtonOrChip()}
      </View>
    </ThemedCard>
  )
  :
    (
    <ThemedCard>
      {/* En-tête avec nom et dosage */}
      <View style={styles.row}>
        <ThemedText style={styles.name}>{intake.name}</ThemedText>
        <ScheduleChip schedule={intake.schedule.schedule} variant="primary" intensity="light" />
      </View>
      <Spacer height={12} />
      <View style={styles.row}>
        <ThemedText style={{color: theme.text.tertiary}}>{t(`pill.usage.${intake.unit}`, {n: intake.dosage}, true )}</ThemedText>
        {getButtonOrChip()}
      </View>
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  takeButtonContainer: {
    minWidth: 84, // 60 + 12 + 12,
  },
  takeButton: {
    height: 31,
    justifyContent: "center",
    alignItems: "center",
  },
  chip :{
  },
  chipContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
