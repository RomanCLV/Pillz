import { LocaleConfig } from "react-native-calendars";
import { translations } from "./index";

/**
 * Adaptateur LanguageSet.calendar -> react-native-calendars
 */
Object.entries(translations).forEach(([lang, languageSet]) => {
  const cal = languageSet.calendar;

  LocaleConfig.locales[lang] = {
    monthNames: [
      cal.monthNames.january,
      cal.monthNames.february,
      cal.monthNames.march,
      cal.monthNames.april,
      cal.monthNames.may,
      cal.monthNames.june,
      cal.monthNames.july,
      cal.monthNames.august,
      cal.monthNames.september,
      cal.monthNames.octember,
      cal.monthNames.november,
      cal.monthNames.december,
    ],
    monthNamesShort: [
      cal.monthShortNames.january,
      cal.monthShortNames.february,
      cal.monthShortNames.march,
      cal.monthShortNames.april,
      cal.monthShortNames.may,
      cal.monthShortNames.june,
      cal.monthShortNames.july,
      cal.monthShortNames.august,
      cal.monthShortNames.september,
      cal.monthShortNames.octember,
      cal.monthShortNames.november,
      cal.monthShortNames.december,
    ],
    dayNames: [
      cal.dayNames.sunday,
      cal.dayNames.monday,
      cal.dayNames.tueday,
      cal.dayNames.wednesday,
      cal.dayNames.thursday,
      cal.dayNames.friday,
      cal.dayNames.saturday,
    ],
    dayNamesShort: [
      cal.dayShortNames.sunday,
      cal.dayShortNames.monday,
      cal.dayShortNames.tueday,
      cal.dayShortNames.wednesday,
      cal.dayShortNames.thursday,
      cal.dayShortNames.friday,
      cal.dayShortNames.saturday,
    ],
    today: cal.today,
  };
});
