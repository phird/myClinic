import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

// Avatars Imports
import avatar1 from '@src/assets/images/avatars/1.png'
import avatar2 from '@src/assets/images/avatars/2.png'
import avatar3 from '@src/assets/images/avatars/3.png'
import avatar4 from '@src/assets/images/avatars/4.png'
import avatar5 from '@src/assets/images/avatars/5.png'
import avatar6 from '@src/assets/images/avatars/6.png'
import avatar7 from '@src/assets/images/avatars/7.png'
import avatar8 from '@src/assets/images/avatars/8.png'
import avatar9 from '@src/assets/images/avatars/9.png'
import avatar10 from '@src/assets/images/avatars/10.png'

const data = {
  users: [
    {
      id: 1,
      patientID: '111',
      billing: 'Manual - Credit Card',
      fullName: 'Galen Slixby',
      company: 'Yotz PVT LTD',
      role: 'admin',
      username: 'gslixby0',
      country: 'El Salvador',
      contact: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      addedDate: '19 มิถุนายน 2565',
      status: 'inactive',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 2,
      patientID: '112',
      billing: 'Manual - Paypal',
      fullName: 'Halsey Redmore',
      company: 'Skinder PVT LTD',
      role: 'admin',
      username: 'hredmore1',
      country: 'Albania',
      contact: '(472) 607-9137',
      email: 'hredmore1@imgur.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'pending',
      avatar: avatar10
    },
    {
      id: 3,
      patientID: '113',
      billing: 'Auto Debit',
      fullName: 'Marjory Sicely',
      company: 'Oozz PVT LTD',
      role: 'admin',
      username: 'msicely2',
      country: 'Russia',
      contact: '(321) 264-4599',
      email: 'msicely2@who.int',
      addedDate: '19 มิถุนายน 2565',
      status: 'active',
      avatar: avatar1
    },
    {
      id: 4,
      patientID: '114',
      billing: 'Manual - Credit Card',
      fullName: 'Cyrill Risby',
      company: 'Oozz PVT LTD',
      role: 'admin',
      username: 'crisby3',
      country: 'China',
      contact: '(923) 690-6806',
      email: 'crisby3@wordpress.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'inactive',
      avatar: avatar9
    },
    {
      id: 5,
      patientID: '115',
      billing: 'Auto Debit',
      fullName: 'Maggy Hurran',
      company: 'Aimbo PVT LTD',
      role: 'admin',
      username: 'mhurran4',
      country: 'Pakistan',
      contact: '(669) 914-1078',
      email: 'mhurran4@yahoo.co.jp',
      addedDate: '19 มิถุนายน 2565',
      status: 'pending',
      avatar: avatar10
    },
    {
      id: 6,
      patientID: '116',
      billing: 'Auto Debit',
      fullName: 'Silvain Halstead',
      company: 'Jaxbean PVT LTD',
      role: 'admin',
      username: 'shalstead5',
      country: 'China',
      contact: '(958) 973-3093',
      email: 'shalstead5@shinystat.com',
      addedDate: '9 พฤษจิกายน 2565',
      status: 'active',
      avatar: '',
      avatarColor: 'light-success'
    },
    {
      id: 7,
      patientID: '117',
      billing: 'Manual - Paypal',
      fullName: 'Breena Gallemore',
      company: 'Jazzy PVT LTD',
      role: 'admin',
      username: 'bgallemore6',
      country: 'Canada',
      contact: '(825) 977-8152',
      email: 'bgallemore6@boston.com',
      addedDate: '9 พฤษจิกายน 2565',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-danger'
    },
    {
      id: 8,
      patientID: '118',
      billing: 'Manual - Cash',
      fullName: 'Kathryne Liger',
      company: 'Pixoboo PVT LTD',
      role: 'admin',
      username: 'kliger7',
      country: 'France',
      contact: '(187) 440-0934',
      email: 'kliger7@vinaora.com',
      addedDate: '19 มิถุนายน 2565',
      status: 'pending',
      avatar: avatar9
    },
    
    {
      id: 9,
      patientID: '119',
      billing: 'Auto Debit',
      fullName: 'Franz Scotfurth',
      company: 'Tekfly PVT LTD',
      role: 'admin',
      username: 'fscotfurth8',
      country: 'China',
      contact: '(978) 146-5443',
      email: 'fscotfurth8@dailymotion.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'pending',
      avatar: avatar2
    },
    {
      id: 10,
      patientID: '1110',
      billing: 'Auto Debit',
      fullName: 'Jillene Bellany',
      company: 'Gigashots PVT LTD',
      role: 'admin',
      username: 'jbellany9',
      country: 'Jamaica',
      contact: '(589) 284-6732',
      email: 'jbellany9@kickstarter.com',
      addedDate: '9 พฤษจิกายน 2565',
      status: 'inactive',
      avatar: avatar9
    },
    /* {
      id: 11,
      billing: 'Manual - Paypal',
      fullName: 'Jonah Wharlton',
      company: 'Eare PVT LTD',
      role: 'subscriber',
      username: 'jwharltona',
      country: 'United States',
      contact: '(176) 532-6824',
      email: 'jwharltona@oakley.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'inactive',
      avatar: avatar4
    },
    {
      id: 12,
      billing: 'Manual - Credit Card',
      fullName: 'Seth Hallam',
      company: 'Yakitri PVT LTD',
      role: 'subscriber',
      username: 'shallamb',
      country: 'Peru',
      contact: '(234) 464-0600',
      email: 'shallamb@hugedomains.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'pending',
      avatar: avatar5
    },
    {
      id: 13,
      billing: 'Auto Debit',
      fullName: 'Yoko Pottie',
      company: 'Leenti PVT LTD',
      role: 'subscriber',
      username: 'ypottiec',
      country: 'Philippines',
      contact: '(907) 284-5083',
      email: 'ypottiec@privacy.gov.au',
      addedDate: 'basic',
      status: 'inactive',
      avatar: avatar7
    },
    {
      id: 14,
      billing: 'Auto Debit',
      fullName: 'Maximilianus Krause',
      company: 'Digitube PVT LTD',
      role: 'author',
      username: 'mkraused',
      country: 'Democratic Republic of the Congo',
      contact: '(167) 135-7392',
      email: 'mkraused@stanford.edu',
      addedDate: '4 สิงหาคม 2565',
      status: 'active',
      avatar: avatar9
    },
    {
      id: 15,
      billing: 'Auto Debit',
      fullName: 'Zsazsa McCleverty',
      company: 'Kaymbo PVT LTD',
      role: 'maintainer',
      username: 'zmcclevertye',
      country: 'France',
      contact: '(317) 409-6565',
      email: 'zmcclevertye@soundcloud.com',
      addedDate: '19 มิถุนายน 2565',
      status: 'active',
      avatar: avatar2
    },
    {
      id: 16,
      billing: 'Auto Debit',
      fullName: 'Bentlee Emblin',
      company: 'Yambee PVT LTD',
      role: 'author',
      username: 'bemblinf',
      country: 'Spain',
      contact: '(590) 606-1056',
      email: 'bemblinf@wired.com',
      addedDate: 'company',
      status: 'active',
      avatar: avatar6
    },
    {
      id: 17,
      billing: 'Manual - Paypal',
      fullName: 'Brockie Myles',
      company: 'Wikivu PVT LTD',
      role: 'maintainer',
      username: 'bmylesg',
      country: 'Poland',
      contact: '(553) 225-9905',
      email: 'bmylesg@amazon.com',
      addedDate: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'light-warning'
    },
    {
      id: 18,
      billing: 'Manual - Cash',
      fullName: 'Bertha Biner',
      company: 'Twinte PVT LTD',
      role: 'editor',
      username: 'bbinerh',
      country: 'Yemen',
      contact: '(901) 916-9287',
      email: 'bbinerh@mozilla.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'active',
      avatar: avatar7
    },
    {
      id: 19,
      billing: 'Manual - Cash',
      fullName: 'Travus Bruntjen',
      company: 'Cogidoo PVT LTD',
      role: 'admin',
      username: 'tbruntjeni',
      country: 'France',
      contact: '(524) 586-6057',
      email: 'tbruntjeni@sitemeter.com',
      addedDate: '19 มิถุนายน 2565',
      status: 'active',
      avatar: '',
      avatarColor: 'light-info'
    },
    {
      id: 20,
      billing: 'Auto Debit',
      fullName: 'Wesley Burland',
      company: 'Bubblemix PVT LTD',
      role: 'editor',
      username: 'wburlandj',
      country: 'Honduras',
      contact: '(569) 683-1292',
      email: 'wburlandj@uiuc.edu',
      addedDate: '4 สิงหาคม 2565',
      status: 'inactive',
      avatar: avatar6
    },
    {
      id: 21,
      billing: 'Auto Debit',
      fullName: 'Selina Kyle',
      company: 'Wayne 19 มิถุนายน 2565s',
      role: 'admin',
      username: 'catwomen1940',
      country: 'USA',
      contact: '(829) 537-0057',
      email: 'irena.dubrovna@wayne.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'active',
      avatar: avatar1
    },
    {
      id: 22,
      billing: 'Auto Debit',
      fullName: 'Jameson Lyster',
      company: 'Quaxo PVT LTD',
      role: 'editor',
      username: 'jlysterl',
      country: 'Ukraine',
      contact: '(593) 624-0222',
      email: 'jlysterl@guardian.co.uk',
      addedDate: 'company',
      status: 'inactive',
      avatar: avatar8
    },
    {
      id: 23,
      billing: 'Manual - Paypal',
      fullName: 'Kare Skitterel',
      company: 'Ainyx PVT LTD',
      role: 'maintainer',
      username: 'kskitterelm',
      country: 'Poland',
      contact: '(254) 845-4107',
      email: 'kskitterelm@washingtonpost.com',
      addedDate: 'basic',
      status: 'pending',
      avatar: avatar3
    },
    {
      id: 24,
      billing: 'Manual - Paypal',
      fullName: 'Cleavland Hatherleigh',
      company: 'Flipopia PVT LTD',
      role: 'admin',
      username: 'chatherleighn',
      country: 'Brazil',
      contact: '(700) 783-7498',
      email: 'chatherleighn@washington.edu',
      addedDate: '4 สิงหาคม 2565',
      status: 'pending',
      avatar: avatar2
    },
    {
      id: 25,
      billing: 'Manual - Credit Card',
      fullName: 'Adeline Micco',
      company: 'Topicware PVT LTD',
      role: 'admin',
      username: 'amiccoo',
      country: 'France',
      contact: '(227) 598-1841',
      email: 'amiccoo@whitehouse.gov',
      addedDate: '19 มิถุนายน 2565',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 26,
      billing: 'Manual - Cash',
      fullName: 'Hugh Hasson',
      company: 'Skinix PVT LTD',
      role: 'admin',
      username: 'hhassonp',
      country: 'China',
      contact: '(582) 516-1324',
      email: 'hhassonp@bizjournals.com',
      addedDate: 'basic',
      status: 'inactive',
      avatar: avatar4
    },
    {
      id: 27,
      billing: 'Manual - Cash',
      fullName: 'Germain Jacombs',
      company: 'Youopia PVT LTD',
      role: 'editor',
      username: 'gjacombsq',
      country: 'Zambia',
      contact: '(137) 467-5393',
      email: 'gjacombsq@jigsy.com',
      addedDate: '19 มิถุนายน 2565',
      status: 'active',
      avatar: avatar10
    },
    {
      id: 28,
      billing: 'Manual - Credit Card',
      fullName: 'Bree Kilday',
      company: 'Jetpulse PVT LTD',
      role: 'maintainer',
      username: 'bkildayr',
      country: 'Portugal',
      contact: '(412) 476-0854',
      email: 'bkildayr@mashable.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'active',
      avatar: '',
      avatarColor: 'light-success'
    },
    {
      id: 29,
      billing: 'Auto Debit',
      fullName: 'Candice Pinyon',
      company: 'Kare PVT LTD',
      role: 'maintainer',
      username: 'cpinyons',
      country: 'Sweden',
      contact: '(170) 683-1520',
      email: 'cpinyons@behance.net',
      addedDate: '4 สิงหาคม 2565',
      status: 'active',
      avatar: avatar7
    },
    {
      id: 30,
      billing: 'Manual - Credit Card',
      fullName: 'Isabel Mallindine',
      company: 'Voomm PVT LTD',
      role: 'subscriber',
      username: 'imallindinet',
      country: 'Slovenia',
      contact: '(332) 803-1983',
      email: 'imallindinet@shinystat.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-warning'
    },
    {
      id: 31,
      billing: 'Manual - Cash',
      fullName: 'Gwendolyn Meineken',
      company: 'Oyondu PVT LTD',
      role: 'admin',
      username: 'gmeinekenu',
      country: 'Moldova',
      contact: '(551) 379-7460',
      email: 'gmeinekenu@hc360.com',
      addedDate: 'basic',
      status: 'pending',
      avatar: avatar1
    },
    {
      id: 32,
      billing: 'Manual - Paypal',
      fullName: 'Rafaellle Snowball',
      company: 'Fivespan PVT LTD',
      role: 'editor',
      username: 'rsnowballv',
      country: 'Philippines',
      contact: '(974) 829-0911',
      email: 'rsnowballv@indiegogo.com',
      addedDate: 'basic',
      status: 'pending',
      avatar: avatar5
    },
    {
      id: 33,
      billing: 'Auto Debit',
      fullName: 'Rochette Emer',
      company: 'Thoughtworks PVT LTD',
      role: 'admin',
      username: 'remerw',
      country: 'North Korea',
      contact: '(841) 889-3339',
      email: 'remerw@blogtalkradio.com',
      addedDate: 'basic',
      status: 'active',
      avatar: avatar8
    },
    {
      id: 34,
      billing: 'Manual - Cash',
      fullName: 'Ophelie Fibbens',
      company: 'Jaxbean PVT LTD',
      role: 'subscriber',
      username: 'ofibbensx',
      country: 'Indonesia',
      contact: '(764) 885-7351',
      email: 'ofibbensx@booking.com',
      addedDate: 'company',
      status: 'active',
      avatar: avatar4
    },
    {
      id: 35,
      billing: 'Manual - Paypal',
      fullName: 'Stephen MacGilfoyle',
      company: 'Browseblab PVT LTD',
      role: 'maintainer',
      username: 'smacgilfoyley',
      country: 'Japan',
      contact: '(350) 589-8520',
      email: 'smacgilfoyley@bigcartel.com',
      addedDate: 'company',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-danger'
    },
    {
      id: 36,
      billing: 'Manual - Paypal',
      fullName: 'Bradan Rosebotham',
      company: 'Agivu PVT LTD',
      role: 'subscriber',
      username: 'brosebothamz',
      country: 'Belarus',
      contact: '(882) 933-2180',
      email: 'brosebothamz@tripadvisor.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'inactive',
      avatar: '',
      avatarColor: 'light-info'
    },
    {
      id: 37,
      billing: 'Manual - Cash',
      fullName: 'Skip Hebblethwaite',
      company: 'Katz PVT LTD',
      role: 'admin',
      username: 'shebblethwaite10',
      country: 'Canada',
      contact: '(610) 343-1024',
      email: 'shebblethwaite10@arizona.edu',
      addedDate: 'company',
      status: 'inactive',
      avatar: avatar9
    },
    {
      id: 38,
      billing: 'Manual - Credit Card',
      fullName: 'Moritz Piccard',
      company: 'Twitternation PVT LTD',
      role: 'maintainer',
      username: 'mpiccard11',
      country: 'Croatia',
      contact: '(365) 277-2986',
      email: 'mpiccard11@vimeo.com',
      addedDate: '19 มิถุนายน 2565',
      status: 'inactive',
      avatar: avatar1
    },
    {
      id: 39,
      billing: 'Manual - Cash',
      fullName: 'Tyne Widmore',
      company: 'Yombu PVT LTD',
      role: 'subscriber',
      username: 'twidmore12',
      country: 'Finland',
      contact: '(531) 731-0928',
      email: 'twidmore12@bravesites.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 40,
      billing: 'Manual - Cash',
      fullName: 'Florenza Desporte',
      company: 'Kamba PVT LTD',
      role: 'author',
      username: 'fdesporte13',
      country: 'Ukraine',
      contact: '(312) 104-2638',
      email: 'fdesporte13@omniture.com',
      addedDate: 'company',
      status: 'active',
      avatar: avatar6
    },
    {
      id: 41,
      billing: 'Manual - Credit Card',
      fullName: 'Edwina Baldetti',
      company: 'Dazzlesphere PVT LTD',
      role: 'maintainer',
      username: 'ebaldetti14',
      country: 'Haiti',
      contact: '(315) 329-3578',
      email: 'ebaldetti14@theguardian.com',
      addedDate: '4 สิงหาคม 2565',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-success'
    },
    {
      id: 42,
      billing: 'Manual - Cash',
      fullName: 'Benedetto Rossiter',
      company: 'Mybuzz PVT LTD',
      role: 'editor',
      username: 'brossiter15',
      country: 'Indonesia',
      contact: '(323) 175-6741',
      email: 'brossiter15@craigslist.org',
      addedDate: '4 สิงหาคม 2565',
      status: 'inactive',
      avatar: '',
      avatarColor: 'light-danger'
    },
    {
      id: 43,
      billing: 'Manual - Credit Card',
      fullName: 'Micaela McNirlan',
      company: 'Tambee PVT LTD',
      role: 'admin',
      username: 'mmcnirlan16',
      country: 'Indonesia',
      contact: '(242) 952-0916',
      email: 'mmcnirlan16@hc360.com',
      addedDate: 'basic',
      status: 'inactive',
      avatar: '',
      avatarColor: 'light-warning'
    },
    {
      id: 44,
      billing: 'Manual - Paypal',
      fullName: 'Vladamir Koschek',
      company: 'Centimia PVT LTD',
      role: 'author',
      username: 'vkoschek17',
      country: 'Guatemala',
      contact: '(531) 758-8335',
      email: 'vkoschek17@abc.net.au',
      addedDate: '4 สิงหาคม 2565',
      status: 'active',
      avatar: '',
      avatarColor: 'light-info'
    },
    {
      id: 45,
      billing: 'Manual - Paypal',
      fullName: 'Corrie Perot',
      company: 'Flipopia PVT LTD',
      role: 'subscriber',
      username: 'cperot18',
      country: 'China',
      contact: '(659) 385-6808',
      email: 'cperot18@goo.ne.jp',
      addedDate: '4 สิงหาคม 2565',
      status: 'pending',
      avatar: avatar3
    },
    {
      id: 46,
      billing: 'Auto Debit',
      fullName: 'Saunder Offner',
      company: 'Skalith PVT LTD',
      role: 'maintainer',
      username: 'soffner19',
      country: 'Poland',
      contact: '(200) 586-2264',
      email: 'soffner19@mac.com',
      addedDate: '19 มิถุนายน 2565',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 47,
      billing: 'Manual - Paypal',
      fullName: 'Karena Courtliff',
      company: 'Feedfire PVT LTD',
      role: 'admin',
      username: 'kcourtliff1a',
      country: 'China',
      contact: '(478) 199-0020',
      email: 'kcourtliff1a@bbc.co.uk',
      addedDate: 'basic',
      status: 'active',
      avatar: avatar1
    },
    {
      id: 48,
      billing: 'Manual - Paypal',
      fullName: 'Onfre Wind',
      company: 'Thoughtmix PVT LTD',
      role: 'admin',
      username: 'owind1b',
      country: 'Ukraine',
      contact: '(344) 262-7270',
      email: 'owind1b@yandex.ru',
      addedDate: 'basic',
      status: 'pending',
      avatar: '',
      avatarColor: 'light-success'
    },
    {
      id: 49,
      billing: 'Manual - Cash',
      fullName: 'Paulie Durber',
      company: 'Babbleblab PVT LTD',
      role: 'subscriber',
      username: 'pdurber1c',
      country: 'Sweden',
      contact: '(694) 676-1275',
      email: 'pdurber1c@gov.uk',
      addedDate: '4 สิงหาคม 2565',
      status: 'inactive',
      avatar: '',
      avatarColor: 'light-danger'
    },
    {
      id: 50,
      billing: 'Auto Debit',
      fullName: 'Beverlie Krabbe',
      company: 'Kaymbo PVT LTD',
      role: 'editor',
      username: 'bkrabbe1d',
      country: 'China',
      contact: '(397) 294-5153',
      email: 'bkrabbe1d@home.pl',
      addedDate: 'company',
      status: 'active',
      avatar: avatar9
    } */
  ]
}

// GET ALL DATA
mock.onGet('/api/users/list/all-data').reply(200, data.users)

// POST: Add new user
mock.onPost('/apps/users/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data)
  const highestValue = data.users.reduce((a, b) => (a.id > b.id ? a : b)).id

  user.id = highestValue + 1

  data.users.push(user)

  return [201, { user }]
})

// GET Updated DATA
mock.onGet('/api/users/list/data').reply(config => {
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    addedDate = '',
    sortColumn = 'fullName',
    patientID = '',
    contact = ''
  } = config

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = data.users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user =>
      (user.email.toLowerCase().includes(queryLowered) ||
        user.fullName.toLowerCase().includes(queryLowered)) &&
      user.patientID === (patientID || user.patientID) &&
      user.addedDate === (addedDate || user.addedDate)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      users: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/users/user').reply(config => {
  const { id } = config
  const user = data.users.find(i => i.id === id)
  return [200, { user }]
})

// DELETE: Deletes User
mock.onDelete('/apps/users/delete').reply(config => {
  // Get user id from URL
  let userId = config.id

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})
