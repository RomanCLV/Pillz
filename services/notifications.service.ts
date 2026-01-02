// services/notificationService.ts

// Désactive l'auto enregistrement des push tokens (Expo Go SDK >=53)
(globalThis as any).__expo_push_token_auto_registration_disabled = true;

import * as Notifications from 'expo-notifications';
import { DailyPillSummary, IntakeStatus } from '../types/dailySummary';
import { translate } from '@i18n/t';
import { LanguageCode } from '@i18n/types';
import { Platform } from "react-native";

const NOTIFICATIONS_CHANNEL = "pillz-intakes";

// Comportement par défaut quand une notif arrive (important sur iOS)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function initNotifications(language: LanguageCode): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    console.warn("Notifications permission not granted");
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(NOTIFICATIONS_CHANNEL, {
      name: translate(language, "notifications.title"),
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  return true;
}

/**
 * TEST : déclenche 2 notifications locales
 * - une à +10 secondes
 * - une à +1 minute
 */
export async function scheduleTestNotifications() {
  const trig1: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 10,
    repeats: false,
    channelId: NOTIFICATIONS_CHANNEL,
  };
  const trig2: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 60,
    repeats: false,
    channelId: NOTIFICATIONS_CHANNEL,
  };

  // +10 secondes
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🧪 Test notification",
      body: "Notification après 10 secondes",
    },
    trigger: trig1,
  });

  // +1 minute
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🧪 Test notification",
      body: "Notification après 1 minute (app en veille)",
    },
    trigger: trig2,
  });
}

export async function cancelAllNotifications() {
  console.log("cancel All Notifications");
  await Notifications.cancelAllScheduledNotificationsAsync();
}

function scheduleIfFuture(date: Date, content: Notifications.NotificationContentInput) {
  if (date.getTime() <= Date.now()) 
    return;

  const trig: Notifications.DateTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date: date,
    channelId: NOTIFICATIONS_CHANNEL,
  };

  console.log("notifications planned:");
  console.log(content);
  
  return Notifications.scheduleNotificationAsync({
    content,
    trigger: trig,
  });
}

export async function scheduleDailyNotifications(
  pills: DailyPillSummary[],
  language: LanguageCode
) {
  await cancelAllNotifications();

  for (const pill of pills) {
    for (const intake of pill.intakes) {
      if (intake.status !== IntakeStatus.PENDING) 
        continue;

      const base = new Date();
      base.setHours(
        intake.schedule.hour,
        intake.schedule.minute,
        0,
        0
      );

      // -15 min
      scheduleIfFuture(new Date(base.getTime() - 15 * 60000), {
        title: translate(language, "notifications.reminder"),
        body: translate(language, "notifications.pillIn15Minutes", { name: pill.name }),
      });

      // heure H
      scheduleIfFuture(base, {
        title: translate(language, "notifications.timeToTake"),
        body: pill.name + " - " + translate(language, "pill.usage." + pill.unit, { n: pill.dosage.toString() }, true),
      });

      // fin de fenêtre
      if (pill.intakeWindowMinutes >= 30) {
        scheduleIfFuture(
          new Date(base.getTime() + (pill.intakeWindowMinutes - 30) * 60000),
          {
            title: translate(language, "notifications.reminder"),
            body: translate(language, "notifications.pillSoonExpired", {name: pill.name}),
          }
        );
      }
    }
  }
}
