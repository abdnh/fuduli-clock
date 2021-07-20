
function populateNumbers() {
    var clock = document.getElementById("clock");
    var clockNumConstantTransforms = "translateX(calc(var(--clock-width)/2))";
    for(let i = 1; i <= 12; i++) {
        let div = document.createElement("div");
        div.classList.add("clock-num");
        let deg = i * 30;
        div.style.transform = `${clockNumConstantTransforms} rotate(${deg}deg) translateY(10px)`;
        let innerDiv = document.createElement("div");
        innerDiv.innerText = i.toString();
        innerDiv.style.transform = `rotate(${-deg}deg)`;
        let offsetX = i >= 3 && i <= 9 ? 5 : -5;
        innerDiv.style.translate = `${offsetX}px`;
        div.appendChild(innerDiv);
        clock.appendChild(div);
    }

    var clockGraduationConstantTransforms = "translate(calc(var(--clock-width)/2), 0px)";
    for(let i = 1; i <= 60; i++) {
        let div = document.createElement("div");
        div.classList.add("clock-graduation");
        let deg = i * 6;
        div.style.transform = `${clockGraduationConstantTransforms} rotate(${deg}deg)`;
        let innerDiv = document.createElement("div");
        if(i % 5 == 0) {
            innerDiv.style.width = '2.5px';
        }
        div.appendChild(innerDiv);
        clock.appendChild(div);
    }
}

function updateHands(date) {
    var constantTransforms = "translate(calc(var(--clock-width)/2), calc(var(--clock-width)/2))";
    var initialDegree = -90;
    var hours = date.hour();
    var minutes = date.minute();
    var seconds = date.second();
    var hoursDegree = initialDegree + (hours + minutes / 60 + seconds / 3600) * 30;
    var minutesDegree = initialDegree + (minutes + seconds / 60) * 6;
    var secondsDegree = initialDegree + seconds * 6;
    var hourHand = document.getElementById("hour-hand");
    var minuteHand = document.getElementById("minute-hand");
    var secondHand = document.getElementById("second-hand");
    hourHand.style.transform = `${constantTransforms} rotate(${hoursDegree}deg)`;
    minuteHand.style.transform = `${constantTransforms} rotate(${minutesDegree}deg)`;
    secondHand.style.transform = `${constantTransforms} rotate(${secondsDegree}deg)`;

    if(date.hour() == 0 && date.minute() == 0) {
        var clock = document.getElementById("clock");
        clock.style.filter = 'saturate(100) hue-rotate(100deg)';
    }
}

var currentTimezone = dayjs.tz.guess();

function populateTimezones() {
    var timezoneSelect = document.getElementById("timezone-select");
    timezoneSelect.addEventListener('change', e => {
        currentTimezone = e.target.value;
        updateDisplay();
    });
    // From https://stackoverflow.com/questions/38399465/how-to-get-list-of-all-timezones-in-javascript
    var timezones = [
        'Europe/Andorra',
        'Asia/Dubai',
        'Asia/Kabul',
        'Europe/Tirane',
        'Asia/Yerevan',
        'Antarctica/Casey',
        'Antarctica/Davis',
        'Antarctica/DumontDUrville',
        'Antarctica/Mawson',
        'Antarctica/Palmer',
        'Antarctica/Rothera',
        'Antarctica/Syowa',
        'Antarctica/Troll',
        'Antarctica/Vostok',
        'America/Argentina/Buenos_Aires',
        'America/Argentina/Cordoba',
        'America/Argentina/Salta',
        'America/Argentina/Jujuy',
        'America/Argentina/Tucuman',
        'America/Argentina/Catamarca',
        'America/Argentina/La_Rioja',
        'America/Argentina/San_Juan',
        'America/Argentina/Mendoza',
        'America/Argentina/San_Luis',
        'America/Argentina/Rio_Gallegos',
        'America/Argentina/Ushuaia',
        'Pacific/Pago_Pago',
        'Europe/Vienna',
        'Australia/Lord_Howe',
        'Antarctica/Macquarie',
        'Australia/Hobart',
        'Australia/Currie',
        'Australia/Melbourne',
        'Australia/Sydney',
        'Australia/Broken_Hill',
        'Australia/Brisbane',
        'Australia/Lindeman',
        'Australia/Adelaide',
        'Australia/Darwin',
        'Australia/Perth',
        'Australia/Eucla',
        'Asia/Baku',
        'America/Barbados',
        'Asia/Dhaka',
        'Europe/Brussels',
        'Europe/Sofia',
        'Atlantic/Bermuda',
        'Asia/Brunei',
        'America/La_Paz',
        'America/Noronha',
        'America/Belem',
        'America/Fortaleza',
        'America/Recife',
        'America/Araguaina',
        'America/Maceio',
        'America/Bahia',
        'America/Sao_Paulo',
        'America/Campo_Grande',
        'America/Cuiaba',
        'America/Santarem',
        'America/Porto_Velho',
        'America/Boa_Vista',
        'America/Manaus',
        'America/Eirunepe',
        'America/Rio_Branco',
        'America/Nassau',
        'Asia/Thimphu',
        'Europe/Minsk',
        'America/Belize',
        'America/St_Johns',
        'America/Halifax',
        'America/Glace_Bay',
        'America/Moncton',
        'America/Goose_Bay',
        'America/Blanc-Sablon',
        'America/Toronto',
        'America/Nipigon',
        'America/Thunder_Bay',
        'America/Iqaluit',
        'America/Pangnirtung',
        'America/Atikokan',
        'America/Winnipeg',
        'America/Rainy_River',
        'America/Resolute',
        'America/Rankin_Inlet',
        'America/Regina',
        'America/Swift_Current',
        'America/Edmonton',
        'America/Cambridge_Bay',
        'America/Yellowknife',
        'America/Inuvik',
        'America/Creston',
        'America/Dawson_Creek',
        'America/Fort_Nelson',
        'America/Vancouver',
        'America/Whitehorse',
        'America/Dawson',
        'Indian/Cocos',
        'Europe/Zurich',
        'Africa/Abidjan',
        'Pacific/Rarotonga',
        'America/Santiago',
        'America/Punta_Arenas',
        'Pacific/Easter',
        'Asia/Shanghai',
        'Asia/Urumqi',
        'America/Bogota',
        'America/Costa_Rica',
        'America/Havana',
        'Atlantic/Cape_Verde',
        'America/Curacao',
        'Indian/Christmas',
        'Asia/Nicosia',
        'Asia/Famagusta',
        'Europe/Prague',
        'Europe/Berlin',
        'Europe/Copenhagen',
        'America/Santo_Domingo',
        'Africa/Algiers',
        'America/Guayaquil',
        'Pacific/Galapagos',
        'Europe/Tallinn',
        'Africa/Cairo',
        'Africa/El_Aaiun',
        'Europe/Madrid',
        'Africa/Ceuta',
        'Atlantic/Canary',
        'Europe/Helsinki',
        'Pacific/Fiji',
        'Atlantic/Stanley',
        'Pacific/Chuuk',
        'Pacific/Pohnpei',
        'Pacific/Kosrae',
        'Atlantic/Faroe',
        'Europe/Paris',
        'Europe/London',
        'Asia/Tbilisi',
        'America/Cayenne',
        'Africa/Accra',
        'Europe/Gibraltar',
        'America/Godthab',
        'America/Danmarkshavn',
        'America/Scoresbysund',
        'America/Thule',
        'Europe/Athens',
        'Atlantic/South_Georgia',
        'America/Guatemala',
        'Pacific/Guam',
        'Africa/Bissau',
        'America/Guyana',
        'Asia/Hong_Kong',
        'America/Tegucigalpa',
        'America/Port-au-Prince',
        'Europe/Budapest',
        'Asia/Jakarta',
        'Asia/Pontianak',
        'Asia/Makassar',
        'Asia/Jayapura',
        'Europe/Dublin',
        'Asia/Jerusalem',
        'Asia/Kolkata',
        'Indian/Chagos',
        'Asia/Baghdad',
        'Asia/Tehran',
        'Atlantic/Reykjavik',
        'Europe/Rome',
        'America/Jamaica',
        'Asia/Amman',
        'Asia/Tokyo',
        'Africa/Nairobi',
        'Asia/Bishkek',
        'Pacific/Tarawa',
        'Pacific/Enderbury',
        'Pacific/Kiritimati',
        'Asia/Pyongyang',
        'Asia/Seoul',
        'Asia/Almaty',
        'Asia/Qyzylorda',
        'Asia/Qostanay',
        'Asia/Aqtobe',
        'Asia/Aqtau',
        'Asia/Atyrau',
        'Asia/Oral',
        'Asia/Beirut',
        'Asia/Colombo',
        'Africa/Monrovia',
        'Europe/Vilnius',
        'Europe/Luxembourg',
        'Europe/Riga',
        'Africa/Tripoli',
        'Africa/Casablanca',
        'Europe/Monaco',
        'Europe/Chisinau',
        'Pacific/Majuro',
        'Pacific/Kwajalein',
        'Asia/Yangon',
        'Asia/Ulaanbaatar',
        'Asia/Hovd',
        'Asia/Choibalsan',
        'Asia/Macau',
        'America/Martinique',
        'Europe/Malta',
        'Indian/Mauritius',
        'Indian/Maldives',
        'America/Mexico_City',
        'America/Cancun',
        'America/Merida',
        'America/Monterrey',
        'America/Matamoros',
        'America/Mazatlan',
        'America/Chihuahua',
        'America/Ojinaga',
        'America/Hermosillo',
        'America/Tijuana',
        'America/Bahia_Banderas',
        'Asia/Kuala_Lumpur',
        'Asia/Kuching',
        'Africa/Maputo',
        'Africa/Windhoek',
        'Pacific/Noumea',
        'Pacific/Norfolk',
        'Africa/Lagos',
        'America/Managua',
        'Europe/Amsterdam',
        'Europe/Oslo',
        'Asia/Kathmandu',
        'Pacific/Nauru',
        'Pacific/Niue',
        'Pacific/Auckland',
        'Pacific/Chatham',
        'America/Panama',
        'America/Lima',
        'Pacific/Tahiti',
        'Pacific/Marquesas',
        'Pacific/Gambier',
        'Pacific/Port_Moresby',
        'Pacific/Bougainville',
        'Asia/Manila',
        'Asia/Karachi',
        'Europe/Warsaw',
        'America/Miquelon',
        'Pacific/Pitcairn',
        'America/Puerto_Rico',
        'Asia/Gaza',
        'Asia/Hebron',
        'Europe/Lisbon',
        'Atlantic/Madeira',
        'Atlantic/Azores',
        'Pacific/Palau',
        'America/Asuncion',
        'Asia/Qatar',
        'Indian/Reunion',
        'Europe/Bucharest',
        'Europe/Belgrade',
        'Europe/Kaliningrad',
        'Europe/Moscow',
        'Europe/Simferopol',
        'Europe/Kirov',
        'Europe/Astrakhan',
        'Europe/Volgograd',
        'Europe/Saratov',
        'Europe/Ulyanovsk',
        'Europe/Samara',
        'Asia/Yekaterinburg',
        'Asia/Omsk',
        'Asia/Novosibirsk',
        'Asia/Barnaul',
        'Asia/Tomsk',
        'Asia/Novokuznetsk',
        'Asia/Krasnoyarsk',
        'Asia/Irkutsk',
        'Asia/Chita',
        'Asia/Yakutsk',
        'Asia/Khandyga',
        'Asia/Vladivostok',
        'Asia/Ust-Nera',
        'Asia/Magadan',
        'Asia/Sakhalin',
        'Asia/Srednekolymsk',
        'Asia/Kamchatka',
        'Asia/Anadyr',
        'Asia/Riyadh',
        'Pacific/Guadalcanal',
        'Indian/Mahe',
        'Africa/Khartoum',
        'Europe/Stockholm',
        'Asia/Singapore',
        'America/Paramaribo',
        'Africa/Juba',
        'Africa/Sao_Tome',
        'America/El_Salvador',
        'Asia/Damascus',
        'America/Grand_Turk',
        'Africa/Ndjamena',
        'Indian/Kerguelen',
        'Asia/Bangkok',
        'Asia/Dushanbe',
        'Pacific/Fakaofo',
        'Asia/Dili',
        'Asia/Ashgabat',
        'Africa/Tunis',
        'Pacific/Tongatapu',
        'Europe/Istanbul',
        'America/Port_of_Spain',
        'Pacific/Funafuti',
        'Asia/Taipei',
        'Europe/Kiev',
        'Europe/Uzhgorod',
        'Europe/Zaporozhye',
        'Pacific/Wake',
        'America/New_York',
        'America/Detroit',
        'America/Kentucky/Louisville',
        'America/Kentucky/Monticello',
        'America/Indiana/Indianapolis',
        'America/Indiana/Vincennes',
        'America/Indiana/Winamac',
        'America/Indiana/Marengo',
        'America/Indiana/Petersburg',
        'America/Indiana/Vevay',
        'America/Chicago',
        'America/Indiana/Tell_City',
        'America/Indiana/Knox',
        'America/Menominee',
        'America/North_Dakota/Center',
        'America/North_Dakota/New_Salem',
        'America/North_Dakota/Beulah',
        'America/Denver',
        'America/Boise',
        'America/Phoenix',
        'America/Los_Angeles',
        'America/Anchorage',
        'America/Juneau',
        'America/Sitka',
        'America/Metlakatla',
        'America/Yakutat',
        'America/Nome',
        'America/Adak',
        'Pacific/Honolulu',
        'America/Montevideo',
        'Asia/Samarkand',
        'Asia/Tashkent',
        'America/Caracas',
        'Asia/Ho_Chi_Minh',
        'Pacific/Efate',
        'Pacific/Wallis',
        'Pacific/Apia',
        'Africa/Johannesburg'
    ];
    timezones.sort();
    for(timezone of timezones) {
        let option = document.createElement("option");
        option.value = timezone;
        option.innerText = timezone;
        if(timezone == currentTimezone) {
            option.selected = true;
        }
        timezoneSelect.appendChild(option);
    }
}

function showDate(date) {
    var dateDisplay = document.getElementById('date-display')
    dateDisplay.innerText = date.format('LLLL');
}

var currentLocale = dayjs.locale();
var selectedLocaleScript = null;

function loadLocale(locale) {
    if(selectedLocaleScript) {
        document.head.removeChild(selectedLocaleScript);
    }
    selectedLocaleScript = document.createElement("script");
    selectedLocaleScript.src = `https://unpkg.com/dayjs@1.10.5/locale/${locale}.js`;
    selectedLocaleScript.async = true;
    selectedLocaleScript.onload = function() {
        dayjs.locale(locale);
        currentLocale = locale;
        updateDisplay();
    };
    document.head.appendChild(selectedLocaleScript);
}

function populateLocales() {
    var localeSelect = document.getElementById("locale-select");
    fetch('https://unpkg.com/dayjs@1.10.5/locale.json')
    .then(response => response.json())
    .then(list => {
        for(locale of list) {
            let option = document.createElement("option");
            option.value = locale.key;
            option.innerText = locale.name;
            // load first preferred locale
            if(dayjs.locale() == 'en' && navigator.languages.indexOf(locale.key) != -1) {
                loadLocale(locale.key);
            }
            if(dayjs.locale() == locale.key) {
                option.selected = true;
            }
            localeSelect.appendChild(option);
        }
    });
    localeSelect.addEventListener('change', e => {
        loadLocale(e.target.value);
    });
}

function updateDisplay() {
    var date = dayjs().tz(currentTimezone);
    updateHands(date);
    showDate(date);
}

function setCustomDate(date) {
    clearInterval(updateDisplayIntervalID);
    updateHands(date);
    showDate(date);
}

populateNumbers();
updateDisplay();
var updateDisplayIntervalID  = setInterval(updateDisplay, 1000);
populateTimezones();
populateLocales();

if(navigator.language.startsWith('ar')) {
    document.head.getElementsByTagName("title")[0].textContent = "ساعة فضولي";
    var timezoneLabel = document.getElementById("timezone-label");
    var localeLabel = document.getElementById("locale-label");
    timezoneLabel.childNodes[0].textContent = "التوقيت: ";
    localeLabel.childNodes[0].textContent = "اللغة: ";
    timezoneLabel.dir = "rtl";
    localeLabel.dir = "rtl";
    document.documentElement.lang = "ar";
}
