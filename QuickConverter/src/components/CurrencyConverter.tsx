import { useState, useEffect } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";

type Currency = string;

interface CurrencyOption {
    value: Currency;
    label: string;
}

const currencyNames: Record<string, string> = {
  USD: "United States Dollar",
  EUR: "Euro",
  GBP: "British Pound Sterling",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  JPY: "Japanese Yen",
  CNY: "Chinese Yuan",
  INR: "Indian Rupee",
  CHF: "Swiss Franc",
  NZD: "New Zealand Dollar",
  ZAR: "South African Rand",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar",
  KRW: "South Korean Won",
  THB: "Thai Baht",
  RUB: "Russian Ruble",
  BRL: "Brazilian Real",
  MXN: "Mexican Peso",
  AED: "United Arab Emirates Dirham",
  SAR: "Saudi Riyal",
  MYR: "Malaysian Ringgit",
  IDR: "Indonesian Rupiah",
  VND: "Vietnamese Dong",
  PKR: "Pakistani Rupee",
  ILS: "Israeli Shekel",
  TRY: "Turkish Lira",
  DKK: "Danish Krone",
  PLN: "Polish Zloty",
  HUF: "Hungarian Forint",
  CZK: "Czech Koruna",
  RON: "Romanian Leu",
  BGN: "Bulgarian Lev",
  HRK: "Croatian Kuna",
  PHP: "Philippine Peso",
  EGP: "Egyptian Pound",
  NGN: "Nigerian Naira",
  ARS: "Argentine Peso",
  CLP: "Chilean Peso",
  COP: "Colombian Peso",
  PEN: "Peruvian Sol",
  KES: "Kenyan Shilling",
  TZS: "Tanzanian Shilling",
  UGX: "Ugandan Shilling",
  GHS: "Ghanaian Cedi",
  XOF: "West African CFA Franc",
  XAF: "Central African CFA Franc",
  BDT: "Bangladeshi Taka",
  LKR: "Sri Lankan Rupee",
  NPR: "Nepalese Rupee",
  JOD: "Jordanian Dinar",
  KWD: "Kuwaiti Dinar",
  BHD: "Bahraini Dinar",
  QAR: "Qatari Riyal",
  OMR: "Omani Rial",
  MAD: "Moroccan Dirham",
  TND: "Tunisian Dinar",
  DZD: "Algerian Dinar",
  XCD: "East Caribbean Dollar",
  BBD: "Barbadian Dollar",
  BSD: "Bahamian Dollar",
  KYD: "Cayman Islands Dollar",
  AWG: "Aruban Florin",
  ANG: "Netherlands Antillean Guilder",
  MUR: "Mauritian Rupee",
  SCR: "Seychellois Rupee",
  MVR: "Maldivian Rufiyaa",
  FJD: "Fijian Dollar",
  WST: "Samoan Tala",
  PGK: "Papua New Guinean Kina",
  KZT: "Kazakhstani Tenge",
  UZS: "Uzbekistani Som",
  AZN: "Azerbaijani Manat",
  GEL: "Georgian Lari",
  AMD: "Armenian Dram",
  BYN: "Belarusian Ruble",
  MDL: "Moldovan Leu",
  ISK: "Icelandic Krona",
  MKD: "Macedonian Denar",
  ALL: "Albanian Lek",
  BAM: "Bosnia-Herzegovina Convertible Mark",
  MNT: "Mongolian Tugrik",
  KGS: "Kyrgyzstani Som",
  TMT: "Turkmenistani Manat",
  AOA: "Angolan Kwanza",
  ZMW: "Zambian Kwacha",
  MWK: "Malawian Kwacha",
  BWP: "Botswana Pula",
  NAD: "Namibian Dollar",
  ZWL: "Zimbabwean Dollar",
  GMD: "Gambian Dalasi",
  CVE: "Cape Verdean Escudo",
  STN: "Sao Tome and Principe Dobra",
  SLL: "Sierra Leonean Leone",
  SOS: "Somali Shilling",
  ETB: "Ethiopian Birr",
  DJF: "Djiboutian Franc",
  SDG: "Sudanese Pound",
  RWF: "Rwandan Franc",
  BIF: "Burundian Franc",
  MZN: "Mozambican Metical",
  SZL: "Eswatini Lilangeni",
  LSL: "Lesotho Loti",
  AFN: "Afghan Afghani",
  BND: "Brunei Dollar",
  BOB: "Bolivian Boliviano",
  BTN: "Bhutanese Ngultrum",
  BZD: "Belize Dollar",
  CDF: "Congolese Franc",
  CUP: "Cuban Peso",
  DOP: "Dominican Peso",
  ERN: "Eritrean Nakfa",
  FKP: "Falkland Islands Pound",
  GIP: "Gibraltar Pound",
  GNF: "Guinean Franc",
  GTQ: "Guatemalan Quetzal",
  GYD: "Guyanese Dollar",
  HNL: "Honduran Lempira",
  HTG: "Haitian Gourde",
  IQD: "Iraqi Dinar",
  IRR: "Iranian Rial",
  JMD: "Jamaican Dollar",
  KHR: "Cambodian Riel",
  KMF: "Comorian Franc",
  KPW: "North Korean Won",
  LAK: "Lao Kip",
  LBP: "Lebanese Pound",
  LRD: "Liberian Dollar",
  LYD: "Libyan Dinar",
  MMK: "Myanmar Kyat",
  MOP: "Macanese Pataca",
  MRU: "Mauritanian Ouguiya",
  NIO: "Nicaraguan Córdoba",
  PAB: "Panamanian Balboa",
  PYG: "Paraguayan Guarani",
  RSD: "Serbian Dinar",
  SBD: "Solomon Islands Dollar",
  SRD: "Surinamese Dollar",
  SSP: "South Sudanese Pound",
  STD: "São Tomé and Príncipe Dobra",
  SYP: "Syrian Pound",
  TJS: "Tajikistani Somoni",
  TOP: "Tongan Paʻanga",
  TTD: "Trinidad and Tobago Dollar",
  UYU: "Uruguayan Peso",
  VEF: "Venezuelan Bolívar",
  VUV: "Vanuatu Vatu",
  XPF: "CFP Franc",
  YER: "Yemeni Rial",
  BMD: "Bermudian Dollar",
  GGP: "Guernsey Pound",
  CRC: "Costa Rican Colón",
  IMP: "Manx pound",
  JEP: "Jersey Pound",
  SHP: "Saint Helena Pound",
  FOK: "Falkland Islands Pound",
  MGA: "Malagasy Ariary",
  KID: "Kiribati Dollar",
  FLC: "Faroese Króna",
  TVD: "Tuvaluan Dollar",
  TWD: "New Taiwan Dollar",
  UAH: "Ukrainian Hryvnia",
  UYI: "Uruguayan Peso en Unidades Indexadas",
  SLE: "Sierra Leonean Leone",
  XDR: "Special Drawing Rights",
  VES: "Venezuelan Bolívar Soberano",
};

function CurrencyConverter() {
    const [input, setInput] = useState<string>("");
    const [fromCurrency, setFromCurrency] = useState<Currency>("USD");
    const [toCurrency, setToCurrency] = useState<Currency>("AUD");
    const [result, setResult] = useState<number | null>(null);
    const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
    const [decimals, setDecimals] = useState<number>(2);

    useEffect(() => {
        // Fetch exchange rates from an API
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
                const data = await response.json();
                setExchangeRates(data.rates);
            } catch (error) {
                console.error("Failed to fetch exchange rates:", error);
            }
        };
        fetchExchangeRates();
    }, []);

    const convert = () => {
        const inputValue = parseFloat(input);
        if (
            fromCurrency &&
            toCurrency &&
            exchangeRates[fromCurrency] &&
            exchangeRates[toCurrency] &&
            !isNaN(inputValue)
        ) {
            const valueInUSD = inputValue / exchangeRates[fromCurrency];
            setResult(valueInUSD * exchangeRates[toCurrency]);
        } else {
            setResult(null);
        }
    };

    useEffect(() => {
        convert();
    }, [input, fromCurrency, toCurrency, decimals]);

    const handleFlip = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleClear = () => {
        setInput("");
        setResult(null);
    };

    const currencyOptions: CurrencyOption[] = Object.keys(exchangeRates).map((currency) => ({
        value: currency,
        label: `${currency} - ${currencyNames[currency] || currency}`,
    }));

    const customStyles: StylesConfig<CurrencyOption, false> = {
        control: (provided) => ({
            ...provided,
            minWidth: '200px',
        }),
        menu: (provided) => ({
            ...provided,
            width: '200px',
        }),
        option: (provided) => ({
            ...provided,
            whiteSpace: 'nowrap',
        }),
    };

    return (
        <div className="flex flex-col items-center justify-center text-center bg-blue-100 min-h-screen p-4">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Currency Converter</h2>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full max-w-sm p-2 text-black border rounded-md"
                />
                <button
                    onClick={handleFlip}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Flip
                </button>
                <button
                    onClick={handleClear}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Clear
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                <div className="w-full max-w-sm">
                    <h3 className="text-xl font-semibold mb-2 bg-blue-500 rounded-md">Convert From:</h3>
                    <Select
                        options={currencyOptions}
                        value={currencyOptions.find(option => option.value === fromCurrency)}
                        onChange={(option: SingleValue<CurrencyOption>) => setFromCurrency(option?.value as Currency)}
                        className="text-black"
                        styles={customStyles}
                    />
                </div>

                <div className="w-full max-w-sm">
                    <h3 className="text-xl font-semibold mb-2 bg-blue-500 rounded-md">Convert To:</h3>
                    <Select
                        options={currencyOptions}
                        value={currencyOptions.find(option => option.value === toCurrency)}
                        onChange={(option: SingleValue<CurrencyOption>) => setToCurrency(option?.value as Currency)}
                        className="text-black"
                        styles={customStyles}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <label htmlFor="decimals" className="text-lg font-semibold text-blue-900">Decimals:</label>
                <input
                    type="number"
                    id="decimals"
                    value={decimals}
                    onChange={(e) => setDecimals(Number(e.target.value))}
                    min="0"
                    className="w-16 p-2 text-black border rounded-md"
                />
            </div>

            {result !== null && (
                <p className="mt-4 text-lg font-semibold text-blue-900">
                    Result: {result.toFixed(decimals)} {toCurrency}
                </p>
            )}
        </div>
    );
}

export default CurrencyConverter;