import { useState, useEffect } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";

type Unit = "meters" | "feet" | "miles" | "kilometers" | "inches" | "centimeters" | "yards";

interface UnitOption {
    value: Unit;
    label: string;
}

function LengthConverter() {
    const [input, setInput] = useState<number>(0);
    const [fromUnit, setFromUnit] = useState<Unit>("meters");
    const [toUnit, setToUnit] = useState<Unit>("feet");
    const [result, setResult] = useState<number | null>(null);
    const [decimals, setDecimals] = useState<number>(2);

    const conversionRates: Record<Unit, number> = {
        meters: 1,
        feet: 3.281,
        miles: 0.000621371,
        kilometers: 0.001,
        inches: 39.37,
        centimeters: 100,
        yards: 1.09361,
    };

    const convert = () => {
        if (fromUnit && toUnit && conversionRates[fromUnit] && conversionRates[toUnit]) {
            const valueInMeters = input / conversionRates[fromUnit];
            setResult(valueInMeters * conversionRates[toUnit]);
        } else {
            setResult(null);
        }
    };

    useEffect(() => {
        convert();
    }, [input, fromUnit, toUnit]);

    const handleFlip = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const unitOptions: UnitOption[] = Object.keys(conversionRates).map((unit) => ({
        value: unit as Unit,
        label: unit.charAt(0).toUpperCase() + unit.slice(1),
    }));

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
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Length Converter</h2>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(Number(e.target.value))}
                    placeholder="Enter value"
                    className="w-full max-w-sm p-2 text-black border rounded-md"
                />
                <button
                    onClick={handleFlip}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Flip
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

export default LengthConverter;