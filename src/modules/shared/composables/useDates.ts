import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale('es');
dayjs.extend(duration);

export const dayjsInstance = (date: string) => dayjs(date || new Date());

const useDates = () => {
  const FORMAT = 'YYYY-MM-DD';
  const FORMAT_WITH_TIME = 'YYYY-MM-DD HH:mm';
  const formatDateWithTime = (date: string | Date, format: string = FORMAT_WITH_TIME) =>
    dayjs(date).format(format);

  const formatDate = (date: string | Date, format: string = FORMAT) => dayjs(date).format(format);

  const getDayOfWeek = (date: string | Date) => {
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const venezuelaTime = dayjs(date).tz('America/Caracas', true);
    return daysOfWeek[venezuelaTime.day()];
  };

  const fromNow = (date: string | Date, isLocale = false) => {
    if (isLocale) return dayjs(date).add(4, 'hour').fromNow();
    return dayjs(date).fromNow();
  };

  const formatDateVzla = (date: string, format = FORMAT) =>
    dayjs(date).add(4, 'hour').format(format);

  const addTimeVzla = (date: string) => dayjs(date).add(4, 'hour').format('h:mm A');

  const currentYear = dayjs().format('YYYY');

  const currentDate = dayjs(new Date()).format(FORMAT);

  // yesterday
  const startOfYesterday = dayjs(new Date()).subtract(1, 'day').startOf('day').format(FORMAT);

  // last week
  const startOfLastWeek = dayjs(new Date()).subtract(1, 'week').startOf('week').format(FORMAT);

  const endOfLastWeek = dayjs(new Date()).subtract(1, 'week').endOf('week').format(FORMAT);

  // last 7 days
  const startOfLast7Days = dayjs(new Date()).subtract(7, 'day').startOf('day').format(FORMAT);

  // current month
  const startOfMonth = dayjs(new Date()).startOf('month').format(FORMAT);
  const endOfMonth = dayjs(new Date()).endOf('month').format(FORMAT);

  // last month
  const startOfLastMonth = dayjs(new Date()).subtract(1, 'month').startOf('month').format(FORMAT);

  const endOfLastMonth = dayjs(new Date()).subtract(1, 'month').endOf('month').format(FORMAT);

  // last 12 months
  const startOfLast12Months = dayjs(new Date())
    .subtract(12, 'month')
    .startOf('month')
    .format(FORMAT);

  // current year
  const startOfCurrentYear = dayjs(new Date()).startOf('year').format(FORMAT);

  // last year
  const startOfLastYear = dayjs(new Date()).subtract(1, 'year').startOf('year').format(FORMAT);

  const endOfLastYear = dayjs(new Date()).subtract(1, 'year').endOf('year').format(FORMAT);

  const addEndTime = (date: string) => {
    return dayjs(date).endOf('day').format('YYYY-MM-DDTHH:mm:ssz');
  };

  const addStartTime = (date: string) => {
    return dayjs(date).startOf('day').format('YYYY-MM-DDTHH:mm:ssz');
  };

  const addTime = (date: string) => {
    return dayjs(date).add(4, 'hour').format('h:mm A');
  };

  return {
    getDayOfWeek,
    formatDate,
    formatDateWithTime,
    formatDateVzla,
    fromNow,
    currentYear,
    currentDate,
    startOfMonth,
    endOfMonth,
    addEndTime,
    addStartTime,
    addTimeVzla,
    addTime,
    rangeToday: {
      startDate: currentDate,
      endDate: currentDate,
    },
    rangeYesterday: {
      startDate: startOfYesterday,
      endDate: startOfYesterday,
    },
    rangeLast7Days: {
      startDate: startOfLast7Days,
      endDate: currentDate,
    },
    rangeLastWeek: {
      startDate: startOfLastWeek,
      endDate: endOfLastWeek,
    },
    rangeCurrentMonth: {
      startDate: startOfMonth,
      endDate: currentDate,
    },
    rangeLastMonth: {
      startDate: startOfLastMonth,
      endDate: endOfLastMonth,
    },
    rangeLast12Months: {
      startDate: startOfLast12Months,
      endDate: currentDate,
    },
    rangeCurrentYear: {
      startDate: startOfCurrentYear,
      endDate: currentDate,
    },
    rangeLastYear: {
      startDate: startOfLastYear,
      endDate: endOfLastYear,
    },
  };
};

export default useDates;
