import liveData from './liveTravelData.json';

// Базовые резервные курсы валют относительно USD (обновляются вживую через open.er-api.com)
export const INITIAL_CURRENCY_RATES = {
  RUB: { symbol: '₽', rate: 92.5, name: 'RUB (Рубль)' },
  USD: { symbol: '$', rate: 1.0, name: 'USD (Доллар)' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR (Евро)' },
  BYN: { symbol: 'Br', rate: 3.28, name: 'BYN (Бел. рубль)' },
  KZT: { symbol: '₸', rate: 495.0, name: 'KZT (Тенге)' },
};

export const POPULAR_ORIGINS = [
  { code: 'MOW', name: 'Москва', country: 'Россия', flag: '🇷🇺' },
  { code: 'LED', name: 'Санкт-Петербург', country: 'Россия', flag: '🇷🇺' },
  { code: 'MSQ', name: 'Минск', country: 'Беларусь', flag: '🇧🇾' },
  { code: 'TBS', name: 'Тбилиси', country: 'Грузия', flag: '🇬🇪' },
  { code: 'EVN', name: 'Ереван', country: 'Армения', flag: '🇦🇲' },
  { code: 'IST', name: 'Стамбул', country: 'Турция', flag: '🇹🇷' },
  { code: 'ALA', name: 'Алматы', country: 'Казахстан', flag: '🇰🇿' },
  { code: 'TAS', name: 'Ташкент', country: 'Узбекистан', flag: '🇺🇿' },
  { code: 'DXB', name: 'Дубай', country: 'ОАЭ', flag: '🇦🇪' },
];

export const LIVE_DATA_UPDATED_AT = liveData.updatedAt;

// Получение реальных направлений из Travelpayouts для выбранного города вылета
export function getDealsForOrigin(originCode = 'MOW') {
  const code = (originCode || 'MOW').toUpperCase();
  const list = liveData.dataByOrigin[code] || liveData.dataByOrigin['MOW'] || [];
  return list;
}

// Связки лоукостеров с гигантской экономией
export const TRAVEL_HACKS = [
  {
    id: 'hack-rome',
    title: 'В Рим за ~$110 вместо $380',
    route: 'Москва ✈️ Ереван ✈️ Рим (Ciampino)',
    airline: 'FlyOne + Wizz Air',
    savings: 'Экономия $270 (-71%)',
    badge: 'Связка года',
    tip: 'В Ереване стыковка 4 часа — успеваешь выпить кофе с видом на Арарат без выхода из транзитной зоны или с быстрым выходом без визы!',
    origin: 'MOW',
    destination: 'FCO',
  },
  {
    id: 'hack-barcelona',
    title: 'В Барселону через Стамбул за ~$145',
    route: 'Москва ✈️ Стамбул (Sabiha) ✈️ Барселона',
    airline: 'Pegasus Airlines',
    savings: 'Экономия $210 (-59%)',
    badge: 'Единый лоукостер',
    tip: 'Pegasus летает из Внуково в Сабиху Гёкчен, а оттуда сотни рейсов в Испанию, Италию и Францию от €39.',
    origin: 'MOW',
    destination: 'BCN',
  },
  {
    id: 'hack-milano',
    title: 'В Милан через Кутаиси за ~$95',
    route: 'Минск/Москва ✈️ Кутаиси ✈️ Милан (Бергамо)',
    airline: 'Wizz Air + Belavia',
    savings: 'Экономия $190 (-66%)',
    badge: 'Сверхбюджетно',
    tip: 'Кутаиси — главная база Wizz Air на Кавказе: регулярные билеты в Милан, Будапешт и Вену от $25.',
    origin: 'MSQ',
    destination: 'BGY',
  },
];

// Генератор календаря цен (использует реальную матрицу Travelpayouts, если есть, либо живой расчет)
export const generateCalendarPrices = (basePriceUsd, origin = 'MOW', destination = '') => {
  // Если у нас есть реальные данные из month-matrix Travelpayouts
  if (liveData.realMonthMatrix && liveData.realMonthMatrix.length > 0 && destination === 'AER') {
    return liveData.realMonthMatrix.slice(0, 28).map((d) => {
      const dt = new Date(d.date);
      const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const priceUsd = Math.round(d.priceRub / 92.5);
      return {
        dateStr: dt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
        dayNumber: dt.getDate(),
        dayOfWeek: daysOfWeek[dt.getDay()],
        priceUsd,
        status: priceUsd <= basePriceUsd * 0.9 ? 'super-cheap' : priceUsd >= basePriceUsd * 1.3 ? 'expensive' : 'normal',
      };
    });
  }

  // Динамический календарь с учетом реальных лоукост-дней недели
  const days = [];
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const baseDate = new Date();

  for (let i = 0; i < 28; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i + 1);

    const dayOfWeekIndex = (d.getDay() + 6) % 7;
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];

    let multiplier = 1.0;
    if (dayOfWeekIndex === 1 || dayOfWeekIndex === 2) {
      multiplier = 0.82; // Вт, Ср обычно самые дешевые у лоукостеров
    } else if (dayOfWeekIndex === 4 || dayOfWeekIndex === 6) {
      multiplier = 1.35; // Пт, Вс пиковые
    } else {
      multiplier = 0.95;
    }

    const jitter = ((i * 17) % 15) - 7;
    const finalPrice = Math.round(basePriceUsd * multiplier + jitter);

    let status = 'normal';
    if (finalPrice <= basePriceUsd * 0.88) status = 'super-cheap';
    else if (finalPrice >= basePriceUsd * 1.2) status = 'expensive';

    days.push({
      dateStr: d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      dayNumber: d.getDate(),
      dayOfWeek,
      priceUsd: Math.max(25, finalPrice),
      status,
    });
  }
  return days;
};

// Реальный поиск билетов на Aviasales с партнерским маркером Travelpayouts
export const generateBookingLink = (originCode, destinationIata, departDate = '') => {
  const cleanOrigin = (originCode || 'MOW').toUpperCase();
  const cleanDest = (destinationIata || 'AER').toUpperCase();
  // Дата в формате ДДММ (например, 1511 для 15 ноября)
  let datePart = '0112';
  if (departDate) {
    try {
      const d = new Date(departDate);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      datePart = `${day}${month}`;
    } catch {
      datePart = '0112';
    }
  }
  return `https://www.aviasales.ru/search/${cleanOrigin}${datePart}${cleanDest}1?marker=travelradar`;
};

// Загрузка живых курсов валют через открытый API биржи
export async function fetchLiveExchangeRates() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const json = await res.json();
    if (json && json.rates) {
      return {
        RUB: { symbol: '₽', rate: json.rates.RUB || 92.5, name: 'RUB (Рубль)' },
        USD: { symbol: '$', rate: 1.0, name: 'USD (Доллар)' },
        EUR: { symbol: '€', rate: json.rates.EUR || 0.92, name: 'EUR (Евро)' },
        BYN: { symbol: 'Br', rate: json.rates.BYN || 3.28, name: 'BYN (Бел. рубль)' },
        KZT: { symbol: '₸', rate: json.rates.KZT || 495.0, name: 'KZT (Тенге)' },
      };
    }
  } catch (err) {
    console.warn('Could not fetch live exchange rates, using fallback:', err);
  }
  return INITIAL_CURRENCY_RATES;
}
