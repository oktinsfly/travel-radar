import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN = '4e063bf1dfee01488232296080134491';
const ORIGINS = ['MOW', 'LED', 'MSQ', 'EVN', 'TBS', 'IST', 'ALA', 'TAS', 'DXB'];

// Map country code to flag emoji
function getCountryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '✈️';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Map country code to visa requirement (for travelers from CIS/RU/BY/KZ)
function getVisaRequirement(countryCode) {
  const noVisa = ['RU', 'BY', 'KZ', 'AM', 'GE', 'TR', 'UZ', 'AZ', 'KG', 'TJ', 'AE', 'TH', 'RS', 'ME', 'IL', 'VN', 'MV', 'EG'];
  const shengen = ['IT', 'FR', 'ES', 'DE', 'GR', 'PT', 'AT', 'NL', 'CZ', 'HU', 'PL', 'FI', 'SE', 'NO', 'CH'];

  if (noVisa.includes(countryCode)) {
    if (countryCode === 'RU') return 'Без визы (паспорт РФ)';
    if (countryCode === 'BY') return 'Без визы (паспорт РФ / РБ)';
    if (countryCode === 'AM' || countryCode === 'KZ' || countryCode === 'KG') return 'Без визы (по внутр. паспорту)';
    if (countryCode === 'GE') return 'Без визы (до 365 дней)';
    if (countryCode === 'TR') return 'Без визы (до 60 дней)';
    if (countryCode === 'AE') return 'Бесплатный штамп по прилету';
    if (countryCode === 'TH') return 'Без визы (до 60 дней)';
    return 'Без визы';
  }
  if (shengen.includes(countryCode)) {
    return 'Шенгенская виза';
  }
  return 'Электронная e-Visa / По прибытии';
}

// Curated high quality travel imagery for destinations
const CITY_IMAGES = {
  AER: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', // Сочи
  LED: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?auto=format&fit=crop&w=800&q=80', // СПб
  MOW: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80', // Москва
  EVN: 'https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&w=800&q=80', // Ереван
  TBS: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80', // Тбилиси
  IST: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80', // Стамбул
  AYT: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80', // Анталья
  DXB: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', // Дубай
  KGD: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', // Калининград
  MRV: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', // Минводы
  BAK: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80', // Баку
  SKD: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', // Самарканд
  TAS: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', // Ташкент
  HKT: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80', // Пхукет
  BKK: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80', // Бангкок
  MSQ: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', // Минск
  KZN: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80', // Казань
  UFA: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Уфа
  MCX: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Махачкала
  SVX: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80', // Екатеринбург
  DYU: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', // Душанбе
  OSS: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', // Ош
  GRV: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80', // Грозный
  DEFAULT: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
};

// Category tagging
function categorizeDestination(iata, countryCode, priceRub) {
  const categories = [];
  const beachIatas = ['AER', 'AYT', 'DXB', 'HKT', 'BKK', 'SSH', 'HRG', 'LCA', 'PFO', 'GOI', 'MLE', 'DPS'];
  const mountainIatas = ['MRV', 'AER', 'DYU', 'OSS', 'ALA', 'FRU', 'GYD'];
  const noVisaCountries = ['RU', 'BY', 'KZ', 'AM', 'GE', 'TR', 'UZ', 'AZ', 'KG', 'TJ', 'AE', 'TH', 'RS', 'ME', 'IL', 'VN', 'MV'];

  if (beachIatas.includes(iata)) categories.push('beach');
  if (mountainIatas.includes(iata)) categories.push('mountains');
  if (noVisaCountries.includes(countryCode)) categories.push('novisa');
  if (priceRub < 6000) categories.push('budget');
  categories.push('city');

  return categories;
}

async function syncAll() {
  console.log('🔄 Fetching Travelpayouts dictionaries (cities, countries, airlines)...');

  const [citiesRes, countriesRes, airlinesRes] = await Promise.all([
    fetch('http://api.travelpayouts.com/data/ru/cities.json').then((r) => r.json()).catch(() => []),
    fetch('http://api.travelpayouts.com/data/ru/countries.json').then((r) => r.json()).catch(() => []),
    fetch('http://api.travelpayouts.com/data/ru/airlines.json').then((r) => r.json()).catch(() => []),
  ]);

  const citiesMap = new Map();
  citiesRes.forEach((c) => citiesMap.set(c.code, c));

  const countriesMap = new Map();
  countriesRes.forEach((c) => countriesMap.set(c.code, c));

  const airlinesMap = new Map();
  airlinesRes.forEach((a) => airlinesMap.set(a.code, a));

  console.log(`✅ Loaded ${citiesMap.size} cities, ${countriesMap.size} countries, ${airlinesMap.size} airlines.`);

  const liveDataByOrigin = {};

  for (const origin of ORIGINS) {
    console.log(`📡 Fetching live prices from ${origin}...`);
    try {
      const url = `https://api.travelpayouts.com/v1/city-directions?origin=${origin}&currency=rub&token=${TOKEN}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!json.success || !json.data) {
        console.warn(`⚠️ No data for origin ${origin}`);
        continue;
      }

      const items = [];
      const destEntries = Object.entries(json.data);

      for (const [destCode, info] of destEntries) {
        const cityObj = citiesMap.get(destCode);
        const countryCode = cityObj ? cityObj.country_code : '';
        const countryObj = countriesMap.get(countryCode);
        const airlineObj = airlinesMap.get(info.airline);

        const cityName = cityObj ? cityObj.name : destCode;
        const cityNameEn = cityObj?.name_translations?.en || cityName;
        const countryName = countryObj ? countryObj.name : '';
        const flag = getCountryFlag(countryCode);
        const airlineName = airlineObj ? (airlineObj.name || airlineObj.name_translations?.ru || info.airline) : info.airline;

        const depDate = info.departure_at ? new Date(info.departure_at) : new Date();
        const retDate = info.return_at ? new Date(info.return_at) : null;

        const dateOptions = { day: 'numeric', month: 'short' };
        const datesStr = retDate
          ? `${depDate.toLocaleDateString('ru-RU', dateOptions)} — ${retDate.toLocaleDateString('ru-RU', dateOptions)}`
          : depDate.toLocaleDateString('ru-RU', dateOptions);

        const priceRub = info.price;
        const usualPriceRub = Math.round(priceRub * 1.7);
        const discountPercent = Math.round(((usualPriceRub - priceRub) / usualPriceRub) * 100);

        items.push({
          id: `${origin.toLowerCase()}-${destCode.toLowerCase()}`,
          city: cityName,
          cityEn: cityNameEn,
          country: countryName,
          countryCode,
          flag,
          iata: destCode,
          origin,
          basePriceRub: priceRub,
          basePriceUsd: Math.round(priceRub / 92.5),
          usualPriceRub,
          usualPriceUsd: Math.round(usualPriceRub / 92.5),
          discountPercent: Math.max(25, Math.min(65, discountPercent)),
          airline: airlineName,
          direct: info.transfers === 0,
          flightTime: info.transfers === 0 ? 'Прямой рейс' : `${info.transfers} пересадка`,
          dates: datesStr,
          visa: getVisaRequirement(countryCode),
          category: categorizeDestination(destCode, countryCode, priceRub),
          image: CITY_IMAGES[destCode] || CITY_IMAGES.DEFAULT,
          hotelEstimatePerNightUsd: Math.max(25, Math.round(priceRub / 92.5 * 0.4)),
          dailyExpenseUsd: Math.max(20, Math.round(priceRub / 92.5 * 0.3)),
          tag: info.transfers === 0 ? '⭐ Прямой рейс' : '🔥 Горящий тариф',
          flightNumber: info.flight_number,
        });
      }

      // Sort by price ascending
      items.sort((a, b) => a.basePriceRub - b.basePriceRub);
      liveDataByOrigin[origin] = items;
      console.log(`✅ Saved ${items.length} real deals for ${origin}`);
    } catch (err) {
      console.error(`❌ Error fetching ${origin}:`, err.message);
    }
  }

  // Fetch real month matrix for the #1 destination from Moscow (Sochi / AER)
  console.log('📅 Fetching real 30-day price matrix for MOW -> AER...');
  let realMonthMatrix = [];
  try {
    const today = new Date().toISOString().slice(0, 7) + '-01';
    const matrixUrl = `https://api.travelpayouts.com/v2/prices/month-matrix?currency=rub&origin=MOW&destination=AER&month=${today}&show_to_affiliates=true&token=${TOKEN}`;
    const mRes = await fetch(matrixUrl);
    const mJson = await mRes.json();
    if (mJson.success && Array.isArray(mJson.data)) {
      realMonthMatrix = mJson.data.map((d) => ({
        date: d.depart_date,
        priceRub: d.value,
        airline: d.gate || 'Лоукост',
        direct: d.number_of_changes === 0,
      }));
      console.log(`✅ Fetched ${realMonthMatrix.length} real calendar days!`);
    }
  } catch (mErr) {
    console.warn('Matrix fetch warning:', mErr.message);
  }

  const finalPayload = {
    updatedAt: new Date().toISOString(),
    tokenAffiliate: TOKEN,
    origins: ORIGINS,
    dataByOrigin: liveDataByOrigin,
    realMonthMatrix,
  };

  const outputPath = path.join(__dirname, '../src/data/liveTravelData.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalPayload, null, 2), 'utf-8');
  console.log(`🎉 Successfully wrote live data to ${outputPath}`);
}

syncAll();
