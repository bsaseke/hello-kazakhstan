/* =========================================================================
   Tour catalogue — static, local data. No backend.
   Source of truth for the tour line-up and pricing is the operator's price
   sheet (per-person price by group size, 1–8 people). Free-text content is
   localised per language via `Loc` / `LocList`; shared enumerated labels
   (category, region, duration, services, group size) reference the i18n
   `catalog` block so they're translated once, not per tour.
   ========================================================================= */

import type { LangCode } from '../i18n/types'

/** A string translated into every supported language. */
export type Loc = Record<LangCode, string>
/** A list of strings translated into every supported language. */
export type LocList = Record<LangCode, string[]>

export type TourGroup = 'multiDay' | 'oneDay'
export type CategoryKey =
  | 'canyons'
  | 'lakes'
  | 'mountains'
  | 'desertWildlife'
  | 'cityEscape'
  | 'culture'
export type RegionKey = 'almatyRegion' | 'tienShan' | 'almaty'
export type DurationKey = 'd1' | 'd2n1' | 'd3n2'
export type ServiceKey =
  | 'pickup'
  | 'transport'
  | 'transport4x4'
  | 'guide'
  | 'parkFees'
  | 'allFees'
  | 'lunch'
  | 'packedLunch'
  | 'breakfastDinner'
  | 'water'
  | 'stay1'
  | 'stay2'
  | 'cableCar'
  | 'kokTobe'
  | 'borderPermit'

/** A row in the per-group-size price table (price is per person, USD). */
export interface PriceTier {
  people: number
  price: number
}

export interface Tour {
  id: string
  slug: string
  /** which home-page section the tour belongs to */
  group: TourGroup
  region: RegionKey
  category: CategoryKey
  durationKey: DurationKey
  days: number
  included: ServiceKey[]
  /** per-person price by group size (from the operator's price sheet) */
  pricing: PriceTier[]
  /** lowest per-person price across group sizes ("starting from") */
  priceFrom: number
  rating: number
  reviewCount: number
  bestseller?: boolean
  bestPrice?: boolean
  placeholder: { from: string; to: string }
  image: string
  title: Loc
  description: Loc
  longDescription: Loc
  highlights: LocList
  alt: Loc
}

/** build a 1..N price table from per-person values */
const P = (...vals: number[]): PriceTier[] =>
  vals.map((price, i) => ({ people: i + 1, price }))

export const tours: Tour[] = [
  /* ================= MULTIPLE-DAY TOURS ================================= */
  {
    id: 'altyn-emel',
    slug: 'altyn-emel',
    group: 'multiDay',
    region: 'almatyRegion',
    category: 'desertWildlife',
    durationKey: 'd2n1',
    days: 2,
    included: ['pickup', 'transport4x4', 'guide', 'stay1', 'breakfastDinner', 'parkFees', 'water'],
    pricing: P(745, 404, 290, 233, 210, 192, 174, 165),
    priceFrom: 165,
    rating: 4.9,
    reviewCount: 96,
    bestseller: true,
    placeholder: { from: '#d9a441', to: '#9c6b1f' },
    image: '/images/altyn-emel10.jpg',
    title: {
      en: 'Altyn Emel National Park',
      ru: 'Национальный парк Алтын-Эмель',
      zh: '阿尔金-埃梅尔国家公园',
      ar: 'متنزّه ألتين إيمل الوطني',
    },
    description: {
      en: 'Two days in the steppe national park for the giant Singing Dune, chalk-white Aktau mountains and herds of wild kulan.',
      ru: 'Два дня в степном национальном парке: гигантский Поющий бархан, меловые горы Актау и стада диких куланов.',
      zh: '在草原国家公园度过两天：巨大的鸣沙丘、洁白的阿克套山，以及成群的野驴。',
      ar: 'يومان في المتنزّه الوطني السهوبي: الكثيب المغنّي العملاق، وجبال أكتاو البيضاء، وقطعان الكولان البرّية.',
    },
    longDescription: {
      en: 'Altyn Emel is a vast steppe national park where the landscape changes by the hour. Over two days we climb the giant Singing Dune, walk among the chalk-white Aktau and fiery Katutau mountains, and watch for herds of wild kulan and gazelle on the plains, with a night spent inside the park.',
      ru: 'Алтын-Эмель — огромный степной национальный парк, где пейзаж меняется каждый час. За два дня мы поднимаемся на гигантский Поющий бархан, гуляем среди меловых гор Актау и огненных гор Катутау и высматриваем стада диких куланов и джейранов на равнинах, с ночёвкой внутри парка.',
      zh: '阿尔金-埃梅尔是一座辽阔的草原国家公园，景观每小时都在变化。两天里我们登上巨大的鸣沙丘，行走于洁白的阿克套山与火红的卡图套山之间，并在平原上寻觅成群的野驴与瞪羚，并在公园内过夜一晚。',
      ar: 'ألتين إيمل متنزّه وطني سهوبي شاسع تتبدّل تضاريسه ساعة بساعة. على مدى يومين نصعد الكثيب المغنّي العملاق، ونتجوّل بين جبال أكتاو البيضاء وجبال كاتوتاو النارية، ونترقّب قطعان الكولان والغزلان في السهول، مع مبيت ليلة داخل المتنزّه.',
    },
    highlights: {
      en: ['The Singing Dune', 'Aktau chalk mountains', 'Katutau volcanic mountains', 'Kulan & wildlife plains'],
      ru: ['Поющий бархан', 'Меловые горы Актау', 'Вулканические горы Катутау', 'Равнины с куланами и дикой природой'],
      zh: ['鸣沙丘', '阿克套白垩山', '卡图套火山群', '野驴与野生动物平原'],
      ar: ['الكثيب المغنّي', 'جبال أكتاو الطباشيرية', 'جبال كاتوتاو البركانية', 'سهول الكولان والحياة البرّية'],
    },
    alt: {
      en: 'The vast Singing Dune of Altyn Emel rising from golden steppe at sunset',
      ru: 'Гигантский Поющий бархан Алтын-Эмеля, поднимающийся над золотой степью на закате',
      zh: '日落时分，阿尔金-埃梅尔巨大的鸣沙丘从金色草原上隆起',
      ar: 'الكثيب المغنّي الشاسع في ألتين إيمل يرتفع من السهوب الذهبية عند الغروب',
    },
  },
  {
    id: 'kolsai-kaindy-charyn',
    slug: 'kolsai-kaindy-charyn-black-canyon',
    group: 'multiDay',
    region: 'almatyRegion',
    category: 'lakes',
    durationKey: 'd2n1',
    days: 2,
    included: ['pickup', 'transport4x4', 'guide', 'stay1', 'breakfastDinner', 'allFees', 'water'],
    pricing: P(800, 750, 700, 650, 600, 550, 500, 450),
    priceFrom: 450,
    rating: 5.0,
    reviewCount: 168,
    placeholder: { from: '#1f6f78', to: '#0c3b46' },
    image: '/images/kaindy1.jpg',
    title: {
      en: 'Kolsai, Kaindy, Charyn & Black Canyon',
      ru: 'Кольсай, Каинды, Чарын и Чёрный каньон',
      zh: '科尔赛湖、凯恩迪湖、恰伦与黑峡谷',
      ar: 'كولساي وكايندي وشارين والوادي الأسود',
    },
    description: {
      en: 'Two days that pair the alpine Kolsai and Kaindy lakes with the red rock of Charyn and the Black Canyon.',
      ru: 'Два дня, соединяющие высокогорные озёра Кольсай и Каинды с красными скалами Чарына и Чёрным каньоном.',
      zh: '两天将高山科尔赛湖与凯恩迪湖，同恰伦的红色岩石与黑峡谷结合。',
      ar: 'يومان يجمعان بحيرتي كولساي وكايندي الجبليتين بصخور شارين الحمراء والوادي الأسود.',
    },
    longDescription: {
      en: 'A two-day loop through the best of the region: the first Kolsai lake and the sunken forest of Kaindy in the mountains, plus the Valley of Castles and the quieter Black Canyon at Charyn. We stay overnight in a mountain village in between.',
      ru: 'Двухдневный маршрут по лучшему в регионе: первое Кольсайское озеро и затопленный лес Каинды в горах, а также Долина замков и более тихий Чёрный каньон на Чарыне. Ночуем в горном селе между днями.',
      zh: '两天环游这一地区的精华：山中的第一科尔赛湖与凯恩迪“水下森林”，以及恰伦的“城堡谷”与更为幽静的黑峡谷。中途在山村过夜。',
      ar: 'جولة يومين عبر أجمل ما في المنطقة: بحيرة كولساي الأولى وغابة كايندي الغارقة في الجبال، إضافة إلى وادي القلاع والوادي الأسود الأهدأ في شارين. نبيت ليلة في قرية جبلية بينهما.',
    },
    highlights: {
      en: ['First Kolsai lake', 'Kaindy sunken forest', 'Charyn Valley of Castles', 'Black Canyon', 'Overnight in a mountain village'],
      ru: ['Первое Кольсайское озеро', 'Затопленный лес Каинды', 'Долина замков Чарына', 'Чёрный каньон', 'Ночёвка в горном селе'],
      zh: ['第一科尔赛湖', '凯恩迪“水下森林”', '恰伦“城堡谷”', '黑峡谷', '山村过夜'],
      ar: ['بحيرة كولساي الأولى', 'غابة كايندي الغارقة', 'وادي القلاع في شارين', 'الوادي الأسود', 'مبيت في قرية جبلية'],
    },
    alt: {
      en: 'Submerged tree trunks in the clear turquoise water of Kaindy Lake',
      ru: 'Затопленные стволы деревьев в прозрачной бирюзовой воде озера Каинды',
      zh: '凯恩迪湖清澈碧绿湖水中沉没的树干',
      ar: 'جذوع أشجار غارقة في ماء بحيرة كايندي الفيروزي الصافي',
    },
  },
  {
    id: 'altyn-emel-charyn-kolsai-kaindy',
    slug: 'altyn-emel-charyn-kolsai-kaindy',
    group: 'multiDay',
    region: 'almatyRegion',
    category: 'canyons',
    durationKey: 'd3n2',
    days: 3,
    included: ['pickup', 'transport4x4', 'guide', 'stay2', 'breakfastDinner', 'allFees', 'water'],
    pricing: P(1260, 690, 505, 425, 370, 330, 325, 300),
    priceFrom: 300,
    rating: 5.0,
    reviewCount: 74,
    bestseller: true,
    placeholder: { from: '#a9552f', to: '#143f46' },
    image: '/images/charyn6.jpg',
    title: {
      en: 'Altyn Emel, Charyn Canyon, Kolsai & Kaindy',
      ru: 'Алтын-Эмель, Чарынский каньон, Кольсай и Каинды',
      zh: '阿尔金-埃梅尔、恰伦大峡谷、科尔赛湖与凯恩迪湖',
      ar: 'ألتين إيمل ووادي شارين وكولساي وكايندي',
    },
    description: {
      en: 'Our biggest trip: the Altyn Emel steppe, Charyn Canyon and the Kolsai & Kaindy lakes over three unhurried days.',
      ru: 'Наша самая большая поездка: степь Алтын-Эмель, Чарынский каньон и озёра Кольсай и Каинды за три неспешных дня.',
      zh: '我们规模最大的行程：三天从容游览阿尔金-埃梅尔草原、恰伦大峡谷与科尔赛湖、凯恩迪湖。',
      ar: 'أكبر رحلاتنا: سهوب ألتين إيمل ووادي شارين وبحيرتا كولساي وكايندي على مدى ثلاثة أيام دون عجلة.',
    },
    longDescription: {
      en: 'Three days for the whole region. We explore the Altyn Emel steppe with its dunes and chalk mountains, walk Charyn’s Valley of Castles, and spend a day at the Kolsai lakes and the sunken forest of Kaindy — with two nights in mountain villages so nothing feels rushed.',
      ru: 'Три дня на весь регион. Мы исследуем степь Алтын-Эмель с барханами и меловыми горами, идём по Долине замков Чарына и проводим день на Кольсайских озёрах и в затопленном лесу Каинды — с двумя ночами в горных сёлах, чтобы ничто не спешило.',
      zh: '用三天领略整个地区。我们探索阿尔金-埃梅尔草原的沙丘与白垩山，走过恰伦“城堡谷”，并用一天游览科尔赛湖与凯恩迪“水下森林”——在山村过两晚，让一切都不匆忙。',
      ar: 'ثلاثة أيام للمنطقة كلها. نستكشف سهوب ألتين إيمل بكثبانها وجبالها الطباشيرية، ونسير في وادي القلاع بشارين، ونقضي يوماً في بحيرات كولساي وغابة كايندي الغارقة — مع ليلتين في قرى جبلية كي لا يكون شيء على عجل.',
    },
    highlights: {
      en: ['Altyn Emel dunes & Aktau mountains', 'Charyn Valley of Castles', 'Kolsai lakes', 'Kaindy sunken forest', 'Two nights in mountain villages'],
      ru: ['Барханы Алтын-Эмеля и горы Актау', 'Долина замков Чарына', 'Кольсайские озёра', 'Затопленный лес Каинды', 'Две ночи в горных сёлах'],
      zh: ['阿尔金-埃梅尔沙丘与阿克套山', '恰伦“城堡谷”', '科尔赛湖群', '凯恩迪“水下森林”', '山村两晚'],
      ar: ['كثبان ألتين إيمل وجبال أكتاو', 'وادي القلاع في شارين', 'بحيرات كولساي', 'غابة كايندي الغارقة', 'ليلتان في قرى جبلية'],
    },
    alt: {
      en: 'Split landscape of Charyn Canyon red rock and a turquoise mountain lake',
      ru: 'Совмещённый пейзаж: красные скалы Чарынского каньона и бирюзовое горное озеро',
      zh: '拼合景观：恰伦大峡谷的红色岩石与碧绿的山中湖泊',
      ar: 'منظر مزدوج: صخور وادي شارين الحمراء وبحيرة جبلية فيروزية',
    },
  },
  {
    id: 'four-lakes',
    slug: 'big-almaty-issyk-kolsai-kaindy-2day',
    group: 'multiDay',
    region: 'tienShan',
    category: 'lakes',
    durationKey: 'd2n1',
    days: 2,
    included: ['pickup', 'transport4x4', 'guide', 'stay1', 'breakfastDinner', 'allFees', 'water'],
    pricing: P(580, 329, 245, 203, 179, 172, 176, 164),
    priceFrom: 164,
    rating: 4.9,
    reviewCount: 61,
    placeholder: { from: '#2f8fa8', to: '#123f2e' },
    image: '/images/issyk1.jpg',
    title: {
      en: 'Big Almaty, Issyk, Kolsai & Kaindy lakes',
      ru: 'Большое Алматинское, Иссык, Кольсай и Каинды',
      zh: '大阿拉木图湖、伊塞克湖、科尔赛湖与凯恩迪湖',
      ar: 'بحيرات ألماتي الكبرى وإيسيك وكولساي وكايندي',
    },
    description: {
      en: 'Four lakes in two days: Big Almaty and Issyk on day one, Kolsai and Kaindy on day two.',
      ru: 'Четыре озера за два дня: Большое Алматинское и Иссык в первый день, Кольсай и Каинды — во второй.',
      zh: '两天四湖：第一天大阿拉木图湖与伊塞克湖，第二天科尔赛湖与凯恩迪湖。',
      ar: 'أربع بحيرات في يومين: ألماتي الكبرى وإيسيك في اليوم الأول، وكولساي وكايندي في اليوم الثاني.',
    },
    longDescription: {
      en: 'A lake-lover’s two days across the Tien Shan. Day one takes in turquoise Big Almaty Lake and historic Issyk Lake; day two heads deeper into the mountains for the first Kolsai lake and the sunken forest of Kaindy, with a night in a mountain village in between.',
      ru: 'Два дня для любителей озёр по Тянь-Шаню. Первый день — бирюзовое Большое Алматинское озеро и историческое озеро Иссык; второй день — глубже в горы к первому Кольсайскому озеру и затопленному лесу Каинды, с ночёвкой в горном селе.',
      zh: '为爱湖之人准备的天山两日。第一天游览碧绿的大阿拉木图湖与历史悠久的伊塞克湖；第二天深入群山，前往第一科尔赛湖与凯恩迪“水下森林”，中途在山村过夜。',
      ar: 'يومان لعشّاق البحيرات عبر تيان شان. اليوم الأول يشمل بحيرة ألماتي الكبرى الفيروزية وبحيرة إيسيك التاريخية؛ واليوم الثاني يتوغّل في الجبال نحو بحيرة كولساي الأولى وغابة كايندي الغارقة، مع مبيت ليلة في قرية جبلية.',
    },
    highlights: {
      en: ['Big Almaty Lake', 'Issyk Lake', 'First Kolsai lake', 'Kaindy sunken forest', 'A night in the mountains'],
      ru: ['Большое Алматинское озеро', 'Озеро Иссык', 'Первое Кольсайское озеро', 'Затопленный лес Каинды', 'Ночь в горах'],
      zh: ['大阿拉木图湖', '伊塞克湖', '第一科尔赛湖', '凯恩迪“水下森林”', '山中一晚'],
      ar: ['بحيرة ألماتي الكبرى', 'بحيرة إيسيك', 'بحيرة كولساي الأولى', 'غابة كايندي الغارقة', 'ليلة في الجبال'],
    },
    alt: {
      en: 'Turquoise mountain lake ringed by the peaks of the Tien Shan',
      ru: 'Бирюзовое горное озеро в кольце вершин Тянь-Шаня',
      zh: '被天山群峰环抱的碧绿山中湖泊',
      ar: 'بحيرة جبلية فيروزية تطوّقها قمم تيان شان',
    },
  },

  /* ================= ONE-DAY TOURS ===================================== */
  {
    id: 'charyn',
    slug: 'charyn-canyon',
    group: 'oneDay',
    region: 'almatyRegion',
    category: 'canyons',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport', 'guide', 'parkFees', 'lunch', 'water'],
    pricing: P(245, 136, 99, 81, 70, 67, 63, 59),
    priceFrom: 59,
    rating: 5.0,
    reviewCount: 212,
    bestseller: true,
    placeholder: { from: '#b4582f', to: '#7a2f1c' },
    image: '/images/charyn1.jpg',
    title: {
      en: 'Charyn Canyon — Black & Moon canyons',
      ru: 'Чарынский каньон — Чёрный и Лунный каньоны',
      zh: '恰伦大峡谷——黑峡谷与月亮峡谷',
      ar: 'وادي شارين — الوادي الأسود ووادي القمر',
    },
    description: {
      en: 'Walk the Valley of Castles and the lesser-seen Black and Moon canyons, with a quiet riverbank lunch at the bottom.',
      ru: 'Прогулка по Долине замков и менее известным Чёрному и Лунному каньонам, со спокойным обедом у реки на дне.',
      zh: '漫步“城堡谷”以及较少人到访的黑峡谷与月亮峡谷，并在谷底河边享用宁静午餐。',
      ar: 'تجوّل في وادي القلاع والواديين الأقل شهرة: الأسود والقمر، مع غداء هادئ عند ضفة النهر في القاع.',
    },
    longDescription: {
      en: 'Charyn Canyon is one of the most striking landscapes in Kazakhstan — a deep gorge of red sandstone that wind and river have carved into towers and walls over millions of years. We drive out early to beat the crowds, walk the Valley of Castles down to the Charyn river, take in the quieter Black and Moon canyons, and share a relaxed lunch by the water.',
      ru: 'Чарынский каньон — один из самых впечатляющих ландшафтов Казахстана: глубокое ущелье из красного песчаника, которое ветер и река миллионы лет вытачивали в башни и стены. Мы выезжаем рано, чтобы опередить толпы, спускаемся по Долине замков к реке Чарын, осматриваем более тихие Чёрный и Лунный каньоны и неспешно обедаем у воды.',
      zh: '恰伦大峡谷是哈萨克斯坦最壮观的景观之一——一道由红色砂岩构成的深谷，历经数百万年被风与河流雕琢成塔楼与岩壁。我们一早出发以避开人潮，沿“城堡谷”步行下到恰伦河，探访更为幽静的黑峡谷与月亮峡谷，并在水边悠闲午餐。',
      ar: 'وادي شارين من أكثر المناظر إثارة في كازاخستان — أخدود عميق من الحجر الرملي الأحمر نحتته الرياح والنهر إلى أبراج وجدران عبر ملايين السنين. ننطلق باكراً لتفادي الزحام، ونسير في وادي القلاع نزولاً إلى نهر شارين، ونزور الواديين الأهدأ الأسود والقمر، ونتناول غداءً هادئاً عند الماء.',
    },
    highlights: {
      en: ['Valley of Castles', 'Black Canyon', 'Moon Canyon', 'Charyn river & riverside lunch'],
      ru: ['Долина замков', 'Чёрный каньон', 'Лунный каньон', 'Река Чарын и обед на берегу'],
      zh: ['城堡谷', '黑峡谷', '月亮峡谷', '恰伦河与河边午餐'],
      ar: ['وادي القلاع', 'الوادي الأسود', 'وادي القمر', 'نهر شارين وغداء على الضفة'],
    },
    alt: {
      en: 'Aerial view of the red sandstone columns of Charyn Canyon under a wide blue sky',
      ru: 'Вид с воздуха на красные песчаниковые столбы Чарынского каньона под широким синим небом',
      zh: '广阔蓝天下恰伦大峡谷红色砂岩石柱的航拍景观',
      ar: 'منظر جوي لأعمدة الحجر الرملي الحمراء في وادي شارين تحت سماء زرقاء واسعة',
    },
  },
  {
    id: 'big-almaty-lake',
    slug: 'big-almaty-lake',
    group: 'oneDay',
    region: 'tienShan',
    category: 'lakes',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport', 'guide', 'borderPermit', 'water'],
    pricing: P(550, 500, 450, 400, 350, 300, 250, 200),
    priceFrom: 200,
    rating: 4.9,
    reviewCount: 304,
    bestseller: true,
    placeholder: { from: '#2f8fa8', to: '#13525f' },
    image: '/images/big-almaty-lake2.jpeg',
    title: {
      en: 'Big Almaty Lake & Ayu-Sai visit center',
      ru: 'Большое Алматинское озеро и визит-центр Аю-Сай',
      zh: '大阿拉木图湖与阿尤萨伊游客中心',
      ar: 'بحيرة ألماتي الكبرى ومركز زوّار آيو-ساي',
    },
    description: {
      en: 'A short drive from the city to a bright turquoise reservoir ringed by peaks, plus the Ayu-Sai valley. Easy walking, big views, back by evening.',
      ru: 'Короткая поездка из города к яркому бирюзовому водохранилищу в кольце вершин и в долину Аю-Сай. Лёгкие прогулки, большие виды, возвращение к вечеру.',
      zh: '从城市出发短途车程，抵达群峰环抱、碧绿明亮的水库以及阿尤萨伊山谷。轻松步行，视野开阔，傍晚返程。',
      ar: 'مسافة قصيرة بالسيارة من المدينة إلى خزّان فيروزي زاهٍ تحيط به القمم، إضافة إلى وادي آيو-ساي. مشي سهل، ومناظر واسعة، وعودة قبل المساء.',
    },
    longDescription: {
      en: 'A favourite escape from the city. We drive up into the mountains to Big Almaty Lake, a brilliant turquoise reservoir held between the peaks, stop in the Ayu-Sai valley and at the visit center and best viewpoints, and you are back in Almaty by evening. Easy walking, huge views, and a real breath of mountain air.',
      ru: 'Любимый способ сбежать из города. Мы поднимаемся в горы к Большому Алматинскому озеру — яркому бирюзовому водохранилищу среди вершин, заезжаем в долину Аю-Сай, к визит-центру и лучшим смотровым точкам, и к вечеру вы снова в Алматы. Лёгкие прогулки, огромные виды и настоящий глоток горного воздуха.',
      zh: '深受喜爱的城市逃离之旅。我们驱车上山前往大阿拉木图湖——一座镶嵌在群峰之间、碧绿夺目的水库，途中在阿尤萨伊山谷、游客中心与最佳观景点停留，傍晚便回到阿拉木图。轻松步行、壮阔视野，以及一口真正的山间空气。',
      ar: 'وسيلة مفضّلة للهروب من المدينة. نصعد بالسيارة إلى الجبال نحو بحيرة ألماتي الكبرى، خزّان فيروزي لامع بين القمم، ونتوقف في وادي آيو-ساي وعند مركز الزوّار وأجمل المطلّات، وتعود إلى ألماتي قبل المساء. مشي سهل، ومناظر هائلة، ونسمة حقيقية من هواء الجبال.',
    },
    highlights: {
      en: ['Big Almaty Lake viewpoints', 'Ayu-Sai valley & visit center', 'Tien Shan observatory road', 'Alpine meadows'],
      ru: ['Смотровые точки Большого Алматинского озера', 'Долина Аю-Сай и визит-центр', 'Дорога к Тянь-Шаньской обсерватории', 'Альпийские луга'],
      zh: ['大阿拉木图湖观景点', '阿尤萨伊山谷与游客中心', '天山天文台之路', '高山草甸'],
      ar: ['مطلّات بحيرة ألماتي الكبرى', 'وادي آيو-ساي ومركز الزوّار', 'طريق مرصد تيان شان', 'مروج جبلية'],
    },
    alt: {
      en: 'Turquoise Big Almaty Lake surrounded by snow-dusted Tien Shan peaks',
      ru: 'Бирюзовое Большое Алматинское озеро в окружении заснеженных вершин Тянь-Шаня',
      zh: '被薄雪覆盖的天山群峰环抱的碧绿大阿拉木图湖',
      ar: 'بحيرة ألماتي الكبرى الفيروزية تحيط بها قمم تيان شان المكسوّة بالثلج',
    },
  },
  {
    id: 'almaty-city',
    slug: 'almaty-city-tour',
    group: 'oneDay',
    region: 'almaty',
    category: 'cityEscape',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport', 'guide', 'kokTobe', 'cableCar', 'water'],
    pricing: P(215, 139, 114, 104, 95, 90, 86, 83),
    priceFrom: 83,
    rating: 4.9,
    reviewCount: 158,
    bestPrice: true,
    placeholder: { from: '#7a6f9c', to: '#3a3357' },
    image: '/images/almaty2.jpg',
    title: {
      en: 'Almaty city tour',
      ru: 'Обзорный тур по Алматы',
      zh: '阿拉木图城市游',
      ar: 'جولة مدينة ألماتي',
    },
    description: {
      en: 'The city in a day: Shymbulak and Kok-Tobe, the Green Bazaar, Panfilov Park and the wooden Ascension (Zenkov) cathedral.',
      ru: 'Город за день: Шымбулак и Кок-Тобе, Зелёный базар, парк Панфилова и деревянный Вознесенский собор.',
      zh: '一天玩转城市：琴布拉克与科克托别、绿色巴扎、潘菲洛夫公园与木造的升天（曾科夫）大教堂。',
      ar: 'المدينة في يوم: شيمبولاك وكوك-توبه، والسوق الأخضر، وحديقة بانفيلوف، وكاتدرائية الصعود (زنكوف) الخشبية.',
    },
    longDescription: {
      en: 'A relaxed day getting to know Almaty. We ride up to Shymbulak and the Kok-Tobe viewpoint over the city, wander the lively Green Bazaar, and visit the wooden Ascension (Zenkov) Cathedral in Panfilov Park — with time for a real plov at the best spot in town.',
      ru: 'Спокойный день, чтобы узнать Алматы. Мы поднимаемся на Шымбулак и смотровую площадку Кок-Тобе над городом, гуляем по оживлённому Зелёному базару и заходим в деревянный Вознесенский собор в парке Панфилова — со временем на настоящий плов в лучшем месте города.',
      zh: '悠闲地认识阿拉木图的一天。我们登上琴布拉克与俯瞰城市的科克托别观景点，漫步热闹的绿色巴扎，参观潘菲洛夫公园里木造的升天（曾科夫）大教堂——并有时间在城里最佳去处吃正宗手抓饭。',
      ar: 'يوم هادئ للتعرّف على ألماتي. نصعد إلى شيمبولاك ومطلّ كوك-توبه المطلّ على المدينة، ونتجوّل في السوق الأخضر النابض، ونزور كاتدرائية الصعود (زنكوف) الخشبية في حديقة بانفيلوف — مع وقت لتذوّق البلوف الأصيل في أفضل مكان بالمدينة.',
    },
    highlights: {
      en: ['Shymbulak & Kok-Tobe', 'Green Bazaar', 'Panfilov Park & Ascension Cathedral', 'Local lunch — real plov'],
      ru: ['Шымбулак и Кок-Тобе', 'Зелёный базар', 'Парк Панфилова и Вознесенский собор', 'Местный обед — настоящий плов'],
      zh: ['琴布拉克与科克托别', '绿色巴扎', '潘菲洛夫公园与升天大教堂', '本地午餐——正宗手抓饭'],
      ar: ['شيمبولاك وكوك-توبه', 'السوق الأخضر', 'حديقة بانفيلوف وكاتدرائية الصعود', 'غداء محلي — بلوف أصيل'],
    },
    alt: {
      en: 'Almaty rooftops with the green foothills of the Tien Shan rising behind the city',
      ru: 'Крыши Алматы и зелёные предгорья Тянь-Шаня, поднимающиеся за городом',
      zh: '阿拉木图的屋顶，城市后方是天山郁葱的山麓',
      ar: 'أسطح ألماتي وسفوح تيان شان الخضراء ترتفع خلف المدينة',
    },
  },
  {
    id: 'medeu-shymbulak',
    slug: 'medeu-shymbulak',
    group: 'oneDay',
    region: 'almaty',
    category: 'mountains',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport', 'guide', 'cableCar', 'water'],
    pricing: P(145, 92, 74, 67, 61, 58, 55, 53),
    priceFrom: 53,
    rating: 4.8,
    reviewCount: 341,
    bestPrice: true,
    placeholder: { from: '#5a7d8c', to: '#2b4651' },
    image: '/images/shymbulak5.jpg',
    title: {
      en: 'Medeu & Shymbulak',
      ru: 'Медеу и Шымбулак',
      zh: '梅迪奥与琴布拉克',
      ar: 'ميديو وشيمبولاك',
    },
    description: {
      en: 'Up from the famous Medeu skating rink to Shymbulak by cable car, with mountain-air views over the whole valley.',
      ru: 'Подъём от знаменитого катка Медеу к Шымбулаку по канатной дороге, с видами на всю долину в горном воздухе.',
      zh: '从著名的梅迪奥滑冰场乘缆车上行至琴布拉克，在清新山风中俯瞰整条山谷。',
      ar: 'صعود من حلبة ميديو الشهيرة للتزلج إلى شيمبولاك بالتلفريك، مع إطلالات على الوادي كله في هواء الجبال.',
    },
    longDescription: {
      en: 'A relaxed mountain day right above the city. We start at the iconic Medeu high-altitude skating rink, ride the cable car up to Shymbulak, and take in sweeping views of the valley and the surrounding peaks — with plenty of time for photos and a mountain-air coffee.',
      ru: 'Спокойный горный день прямо над городом. Мы начинаем у знаменитого высокогорного катка Медеу, поднимаемся по канатной дороге к Шымбулаку и любуемся широкими видами долины и окружающих вершин — с временем на фото и кофе в горном воздухе.',
      zh: '在城市上方度过悠闲的山间一日。我们从标志性的高海拔梅迪奥滑冰场出发，乘缆车上行至琴布拉克，饱览山谷与四周群峰的开阔景色——并有充足时间拍照，以及在山风中喝杯咖啡。',
      ar: 'يوم جبلي هادئ فوق المدينة مباشرة. نبدأ من حلبة ميديو الشهيرة المرتفعة، ونصعد بالتلفريك إلى شيمبولاك، ونتمتّع بإطلالات واسعة على الوادي والقمم المحيطة — مع وقت وافر للصور وفنجان قهوة في هواء الجبال.',
    },
    highlights: {
      en: ['Medeu skating rink', 'Shymbulak cable car', 'Talgar pass viewpoint', 'Mountain cafes'],
      ru: ['Каток Медеу', 'Канатная дорога Шымбулака', 'Смотровая площадка перевала Талгар', 'Горные кафе'],
      zh: ['梅迪奥滑冰场', '琴布拉克缆车', '塔尔加尔山口观景台', '山间咖啡馆'],
      ar: ['حلبة ميديو للتزلج', 'تلفريك شيمبولاك', 'مطلّ ممر تالغار', 'مقاهٍ جبلية'],
    },
    alt: {
      en: 'Cable car climbing toward Shymbulak resort above Medeu with snowy peaks behind',
      ru: 'Канатная дорога, поднимающаяся к курорту Шымбулак над Медеу, на фоне заснеженных вершин',
      zh: '缆车在梅迪奥上方向琴布拉克度假区攀升，背后是积雪的山峰',
      ar: 'تلفريك يصعد نحو منتجع شيمبولاك فوق ميديو وخلفه قمم مكسوّة بالثلج',
    },
  },
  {
    id: 'kolsai-day',
    slug: 'kolsai-first-lake',
    group: 'oneDay',
    region: 'tienShan',
    category: 'lakes',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport', 'guide', 'parkFees', 'packedLunch', 'water'],
    pricing: P(260, 143, 103, 84, 72, 64, 61, 58),
    priceFrom: 58,
    rating: 5.0,
    reviewCount: 87,
    bestPrice: true,
    placeholder: { from: '#2c7a5b', to: '#123f2e' },
    image: '/images/kolsai1.jpg',
    title: {
      en: 'Kolsai lake',
      ru: 'Кольсайское озеро',
      zh: '科尔赛湖',
      ar: 'بحيرة كولساي',
    },
    description: {
      en: 'A long but worth-it day to the first Kolsai lake — pine-forest reflections, a gentle lakeside trail, packed lunch by the water.',
      ru: 'Длинный, но стоящий день к первому Кольсайскому озеру — отражения соснового леса, лёгкая тропа вдоль берега, обед с собой у воды.',
      zh: '前往第一科尔赛湖的漫长却值得的一天——松林倒影、平缓的湖畔小径，以及水边的便携午餐。',
      ar: 'يوم طويل لكنه يستحق العناء إلى بحيرة كولساي الأولى — انعكاسات غابة الصنوبر، ودرب لطيف على ضفة البحيرة، وغداء مُعبّأ عند الماء.',
    },
    longDescription: {
      en: 'A long but rewarding day trip to the first Kolsai lake. We drive through the steppe and up into the Tien Shan, walk the gentle lakeside trail through pine forest, and enjoy a packed lunch by the water before heading back to Almaty.',
      ru: 'Длинная, но благодарная однодневная поездка к первому Кольсайскому озеру. Мы едем через степь и поднимаемся в Тянь-Шань, идём по лёгкой тропе вдоль берега через сосновый лес и обедаем с собой у воды, прежде чем вернуться в Алматы.',
      zh: '前往第一科尔赛湖的漫长却充实的一日游。我们穿过草原驶入天山，沿穿越松林的平缓湖畔小径漫步，在水边享用便携午餐，然后返回阿拉木图。',
      ar: 'رحلة يوم طويلة لكنها مُجزية إلى بحيرة كولساي الأولى. نقود عبر السهوب صعوداً إلى تيان شان، ونسير على الدرب اللطيف بمحاذاة البحيرة عبر غابة الصنوبر، ونتناول غداءً مُعبّأ عند الماء قبل العودة إلى ألماتي.',
    },
    highlights: {
      en: ['First Kolsai lake', 'Lakeside forest trail', 'Saty village', 'Pine-forest viewpoints'],
      ru: ['Первое Кольсайское озеро', 'Лесная тропа вдоль берега', 'Село Саты', 'Смотровые точки в сосновом лесу'],
      zh: ['第一科尔赛湖', '湖畔森林小径', '萨特村', '松林观景点'],
      ar: ['بحيرة كولساي الأولى', 'درب الغابة على ضفة البحيرة', 'قرية ساتي', 'مطلّات غابة الصنوبر'],
    },
    alt: {
      en: 'Calm first Kolsai lake mirroring the surrounding pine forest and ridgeline',
      ru: 'Спокойное первое Кольсайское озеро, отражающее окружающий сосновый лес и хребет',
      zh: '平静的第一科尔赛湖映照着周围的松林与山脊',
      ar: 'بحيرة كولساي الأولى الهادئة تعكس غابة الصنوبر المحيطة وخط الجبال',
    },
  },
  {
    id: 'kolsai-kaindy-day',
    slug: 'kolsai-kaindy-day-trip',
    group: 'oneDay',
    region: 'tienShan',
    category: 'lakes',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport4x4', 'guide', 'parkFees', 'packedLunch', 'water'],
    pricing: P(300, 163, 117, 94, 80, 71, 69, 63),
    priceFrom: 63,
    rating: 4.9,
    reviewCount: 118,
    placeholder: { from: '#1f6f78', to: '#0c3b46' },
    image: '/images/kolsai3.jpg',
    title: {
      en: 'Kolsai & Kaindy lakes',
      ru: 'Озёра Кольсай и Каинды',
      zh: '科尔赛湖与凯恩迪湖',
      ar: 'بحيرتا كولساي وكايندي',
    },
    description: {
      en: 'Both mountain lakes in one long day — the first Kolsai lake and the sunken forest of Kaindy.',
      ru: 'Оба горных озера за один длинный день — первое Кольсайское озеро и затопленный лес Каинды.',
      zh: '一天走遍两座山中湖泊——第一科尔赛湖与凯恩迪“水下森林”。',
      ar: 'كلتا البحيرتين الجبليتين في يوم واحد طويل — بحيرة كولساي الأولى وغابة كايندي الغارقة.',
    },
    longDescription: {
      en: 'A full day into the Tien Shan to see both of the region’s most famous lakes. We walk the shore of the first Kolsai lake through pine forest, then drive on to Kaindy, where the bare trunks of a submerged spruce forest rise out of clear turquoise water.',
      ru: 'Полный день в Тянь-Шане, чтобы увидеть оба самых знаменитых озера региона. Мы идём по берегу первого Кольсайского озера через сосновый лес, затем едем на Каинды, где голые стволы затопленного елового леса поднимаются из прозрачной бирюзовой воды.',
      zh: '在天山度过一整天，看遍这一地区最著名的两座湖泊。我们沿第一科尔赛湖畔穿过松林漫步，再驱车前往凯恩迪——沉没云杉林的光秃树干从清澈碧绿的湖水中升起。',
      ar: 'يوم كامل في تيان شان لرؤية أشهر بحيرتين في المنطقة. نسير على ضفة بحيرة كولساي الأولى عبر غابة الصنوبر، ثم ننتقل إلى كايندي حيث ترتفع جذوع غابة تنوب غارقة من ماء فيروزي صافٍ.',
    },
    highlights: {
      en: ['First Kolsai lake', 'Kaindy sunken forest', 'Saty mountain village', 'Tien Shan mountain roads'],
      ru: ['Первое Кольсайское озеро', 'Затопленный лес Каинды', 'Горное село Саты', 'Горные дороги Тянь-Шаня'],
      zh: ['第一科尔赛湖', '凯恩迪“水下森林”', '萨特山村', '天山山路'],
      ar: ['بحيرة كولساي الأولى', 'غابة كايندي الغارقة', 'قرية ساتي الجبلية', 'طرق جبال تيان شان'],
    },
    alt: {
      en: 'Submerged spruce trunks in the turquoise water of Kaindy Lake',
      ru: 'Затопленные стволы елей в бирюзовой воде озера Каинды',
      zh: '凯恩迪湖碧绿湖水中沉没的云杉树干',
      ar: 'جذوع تنوب غارقة في ماء بحيرة كايندي الفيروزي',
    },
  },
  {
    id: 'kolsai-charyn-day',
    slug: 'kolsai-charyn-day-trip',
    group: 'oneDay',
    region: 'almatyRegion',
    category: 'lakes',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport4x4', 'guide', 'parkFees', 'packedLunch', 'water'],
    pricing: P(280, 155, 113, 93, 80, 72, 76, 70),
    priceFrom: 70,
    rating: 4.9,
    reviewCount: 64,
    placeholder: { from: '#2c7a5b', to: '#7a2f1c' },
    image: '/images/charyn2.jpg',
    title: {
      en: 'Kolsai lake & Charyn Canyon',
      ru: 'Кольсайское озеро и Чарынский каньон',
      zh: '科尔赛湖与恰伦大峡谷',
      ar: 'بحيرة كولساي ووادي شارين',
    },
    description: {
      en: 'Lake and canyon in a single day — the alpine first Kolsai lake and the red walls of Charyn.',
      ru: 'Озеро и каньон за один день — высокогорное первое Кольсайское озеро и красные стены Чарына.',
      zh: '一天领略湖泊与峡谷——高山第一科尔赛湖与恰伦的红色岩壁。',
      ar: 'بحيرة ووادٍ في يوم واحد — بحيرة كولساي الأولى الجبلية وجدران شارين الحمراء.',
    },
    longDescription: {
      en: 'A big, varied day that pairs the mountains with the canyons. We drive to the first Kolsai lake for a lakeside walk through pine forest, then cross to Charyn Canyon to walk the Valley of Castles among its red sandstone walls before heading home.',
      ru: 'Большой насыщенный день, соединяющий горы и каньоны. Мы едем к первому Кольсайскому озеру на прогулку по берегу через сосновый лес, затем перебираемся к Чарынскому каньону, чтобы пройти по Долине замков среди красных песчаниковых стен, и возвращаемся домой.',
      zh: '丰富多样的一天，将群山与峡谷结合。我们驱车前往第一科尔赛湖，沿湖畔穿过松林漫步，随后转往恰伦大峡谷，在红色砂岩岩壁间走过“城堡谷”，然后返程。',
      ar: 'يوم حافل ومتنوّع يجمع الجبال بالأخاديد. نقود إلى بحيرة كولساي الأولى لنزهة على الضفة عبر غابة الصنوبر، ثم ننتقل إلى وادي شارين لنسير في وادي القلاع بين جدرانه الحجرية الحمراء قبل العودة.',
    },
    highlights: {
      en: ['First Kolsai lake', 'Charyn Valley of Castles', 'Pine-forest lakeside trail', 'Steppe drive'],
      ru: ['Первое Кольсайское озеро', 'Долина замков Чарына', 'Тропа вдоль берега в сосновом лесу', 'Дорога через степь'],
      zh: ['第一科尔赛湖', '恰伦“城堡谷”', '松林湖畔小径', '穿越草原的车程'],
      ar: ['بحيرة كولساي الأولى', 'وادي القلاع في شارين', 'درب على الضفة في غابة الصنوبر', 'قيادة عبر السهوب'],
    },
    alt: {
      en: 'A turquoise mountain lake and the red rock of Charyn Canyon',
      ru: 'Бирюзовое горное озеро и красные скалы Чарынского каньона',
      zh: '碧绿的山中湖泊与恰伦大峡谷的红色岩石',
      ar: 'بحيرة جبلية فيروزية وصخور وادي شارين الحمراء',
    },
  },
  {
    id: 'altyn-emel-day',
    slug: 'altyn-emel-day-trip',
    group: 'oneDay',
    region: 'almatyRegion',
    category: 'desertWildlife',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport4x4', 'guide', 'parkFees', 'lunch', 'water'],
    pricing: P(424, 223, 155, 122, 134, 98, 87, 82),
    priceFrom: 82,
    rating: 4.8,
    reviewCount: 52,
    placeholder: { from: '#d9a441', to: '#9c6b1f' },
    image: '/images/altyn-emel5.jpg',
    title: {
      en: 'Altyn Emel National Park',
      ru: 'Национальный парк Алтын-Эмель',
      zh: '阿尔金-埃梅尔国家公园',
      ar: 'متنزّه ألتين إيمل الوطني',
    },
    description: {
      en: 'An express day out to Altyn Emel — chalk-white Aktau mountains, sand dunes, ancient burial mounds and rock carvings.',
      ru: 'Экспресс-поездка на день в Алтын-Эмель — меловые горы Актау, песчаные барханы, древние курганы и наскальные рисунки.',
      zh: '前往阿尔金-埃梅尔的快捷一日游——洁白的阿克套山、沙丘、古墓冢与岩刻。',
      ar: 'رحلة يوم سريعة إلى ألتين إيمل — جبال أكتاو الطباشيرية البيضاء، وكثبان رملية، وتلال دفن قديمة، ونقوش صخرية.',
    },
    longDescription: {
      en: 'A long but rewarding express day in the Altyn Emel steppe national park. We head out to the chalk-white Aktau mountains and the sand dunes, and take in the ancient burial mounds and rock carvings that dot the plains — a lot of Kazakhstan in a single day.',
      ru: 'Длинный, но благодарный экспресс-день в степном парке Алтын-Эмель. Мы едем к меловым горам Актау и песчаным барханам, осматриваем древние курганы и наскальные рисунки на равнинах — много Казахстана за один день.',
      zh: '在阿尔金-埃梅尔草原公园度过漫长却充实的快捷一日。我们前往洁白的阿克套山与沙丘，观赏散布平原的古墓冢与岩刻——一天领略大量哈萨克斯坦风貌。',
      ar: 'يوم سريع طويل لكنه مُجزٍ في متنزّه ألتين إيمل السهوبي. نتوجّه إلى جبال أكتاو البيضاء والكثبان الرملية، ونتأمّل تلال الدفن القديمة والنقوش الصخرية المنتشرة في السهول — كازاخستان كثيرة في يوم واحد.',
    },
    highlights: {
      en: ['Aktau chalk mountains', 'Sand dunes', 'Ancient burial mounds', 'Rock carvings'],
      ru: ['Меловые горы Актау', 'Песчаные барханы', 'Древние курганы', 'Наскальные рисунки'],
      zh: ['阿克套白垩山', '沙丘', '古墓冢', '岩刻'],
      ar: ['جبال أكتاو الطباشيرية', 'كثبان رملية', 'تلال دفن قديمة', 'نقوش صخرية'],
    },
    alt: {
      en: 'Chalk-white Aktau mountain ridges in Altyn Emel National Park',
      ru: 'Меловые хребты гор Актау в национальном парке Алтын-Эмель',
      zh: '阿尔金-埃梅尔国家公园洁白的阿克套山脊',
      ar: 'سلاسل جبال أكتاو الطباشيرية البيضاء في متنزّه ألتين إيمل',
    },
  },
  {
    id: 'ethno-village',
    slug: 'ethno-village-the-hunns',
    group: 'oneDay',
    region: 'almaty',
    category: 'culture',
    durationKey: 'd1',
    days: 1,
    included: ['pickup', 'transport', 'guide', 'lunch', 'water'],
    pricing: P(120, 100, 95, 90, 88, 85, 83, 82),
    priceFrom: 82,
    rating: 4.8,
    reviewCount: 44,
    placeholder: { from: '#8a6d3b', to: '#3a2f1c' },
    image: '/images/ethno-village2.jpg',
    title: {
      en: 'Ethno Village "The Hunns"',
      ru: 'Этно-деревня «Гунны»',
      zh: '民族村“匈奴”',
      ar: 'القرية الإثنية «الهون»',
    },
    description: {
      en: 'Step into the world of the nomads — yurts, crafts, archery and horse games at a living ethno-village near Almaty.',
      ru: 'Погрузитесь в мир кочевников — юрты, ремёсла, стрельба из лука и конные игры в живой этно-деревне под Алматы.',
      zh: '走进游牧世界——阿拉木图近郊的活态民族村里有毡房、手工艺、射箭与马术游戏。',
      ar: 'ادخل عالم الرُّحّل — خيام (يورت)، وحِرف، ورماية بالقوس، وألعاب الخيل في قرية إثنية حيّة قرب ألماتي.',
    },
    longDescription: {
      en: 'A relaxed cultural day just outside the city. At the ethno-village "The Hunns" you walk among traditional yurts, watch craftspeople at work, try archery and see horseback games — a warm, hands-on look at the nomadic way of life and its customs.',
      ru: 'Спокойный культурный день рядом с городом. В этно-деревне «Гунны» вы гуляете среди традиционных юрт, смотрите на работу мастеров, пробуете стрельбу из лука и наблюдаете конные игры — тёплое живое знакомство с кочевым укладом и обычаями.',
      zh: '在城郊度过悠闲的文化一日。在“匈奴”民族村，你可以漫步于传统毡房之间，观看匠人劳作，尝试射箭，观赏马术游戏——亲切而亲身地了解游牧生活方式与习俗。',
      ar: 'يوم ثقافي هادئ قرب المدينة. في قرية «الهون» الإثنية تتجوّل بين الخيام التقليدية، وتشاهد الحِرفيين، وتجرّب الرماية بالقوس، وترى ألعاب الخيل — تعرّف دافئ وعملي على حياة الرُّحّل وعاداتهم.',
    },
    highlights: {
      en: ['Traditional Kazakh yurts', 'Craft & folk demonstrations', 'Archery & horseback games', 'Nomad customs & history'],
      ru: ['Традиционные казахские юрты', 'Ремёсла и фольклор', 'Стрельба из лука и конные игры', 'Обычаи и история кочевников'],
      zh: ['传统哈萨克毡房', '手工艺与民俗表演', '射箭与马术游戏', '游牧习俗与历史'],
      ar: ['خيام كازاخية تقليدية', 'عروض الحِرف والفنون الشعبية', 'الرماية بالقوس وألعاب الخيل', 'عادات الرُّحّل وتاريخهم'],
    },
    alt: {
      en: 'Traditional Kazakh yurts and nomadic life at an ethno-village near Almaty',
      ru: 'Традиционные казахские юрты и кочевой быт в этно-деревне под Алматы',
      zh: '阿拉木图近郊民族村的传统哈萨克毡房与游牧生活',
      ar: 'خيام كازاخية تقليدية وحياة بدوية في قرية إثنية قرب ألماتي',
    },
  },
]

export function getTourBySlug(slug: string | undefined): Tour | undefined {
  return tours.find((tour) => tour.slug === slug)
}

export function toursByGroup(group: TourGroup): Tour[] {
  return tours.filter((tour) => tour.group === group)
}
