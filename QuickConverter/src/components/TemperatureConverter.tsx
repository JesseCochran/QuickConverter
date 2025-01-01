import { useState, useEffect } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";

type Unit = "Celsius" | "Fahrenheit" | "Kelvin";

interface UnitOption {
    value: Unit;
    label: string;
}

function TemperatureConverter() {
    const [input, setInput] = useState<string>("");
    const [fromUnit, setFromUnit] = useState<Unit>("Celsius");
    const [toUnit, setToUnit] = useState<Unit>("Fahrenheit");
    const [result, setResult] = useState<number | null>(null);
    const [decimals, setDecimals] = useState<number>(2);

    const convert = () => {
        const inputValue = parseFloat(input);
        if (!isNaN(inputValue)) {
            let valueInCelsius: number;

            // Convert from the input unit to Celsius
            switch (fromUnit) {
                case "Fahrenheit":
                    valueInCelsius = (inputValue - 32) * (5 / 9);
                    break;
                case "Kelvin":
                    valueInCelsius = inputValue - 273.15;
                    break;
                default:
                    valueInCelsius = inputValue;
            }

            // Convert from Celsius to the output unit
            let finalValue: number;
            switch (toUnit) {
                case "Fahrenheit":
                    finalValue = valueInCelsius * (9 / 5) + 32;
                    break;
                case "Kelvin":
                    finalValue = valueInCelsius + 273.15;
                    break;
                default:
                    finalValue = valueInCelsius;
            }

            setResult(finalValue);
        } else {
            setResult(null);
        }
    };

    useEffect(() => {
        convert();
    }, [input, fromUnit, toUnit, decimals]);

    const handleFlip = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const handleClear = () => {
        setInput("");
        setResult(null);
    };

    const unitOptions: UnitOption[] = [
        { value: "Celsius", label: "Celsius" },
        { value: "Fahrenheit", label: "Fahrenheit" },
        { value: "Kelvin", label: "Kelvin" },
    ];

    const customStyles: StylesConfig<UnitOption, false> = {
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
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Temperature Converter</h2>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter value"
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
                        options={unitOptions}
                        value={unitOptions.find(option => option.value === fromUnit)}
                        onChange={(option: SingleValue<UnitOption>) => setFromUnit(option?.value as Unit)}
                        className="text-black"
                        styles={customStyles}
                    />
                </div>

                <div className="w-full max-w-sm">
                    <h3 className="text-xl font-semibold mb-2 bg-blue-500 rounded-md">Convert To:</h3>
                    <Select
                        options={unitOptions}
                        value={unitOptions.find(option => option.value === toUnit)}
                        onChange={(option: SingleValue<UnitOption>) => setToUnit(option?.value as Unit)}
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
                    Result: {result.toFixed(decimals)} {toUnit}
                </p>
            )}
        </div>
    );
}

export default TemperatureConverter;