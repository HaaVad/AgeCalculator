import React, { useState, useEffect } from 'react';
import  line  from './dividerandlogo.jpg';

export const AgeCalculator: React.FC = () => {
    const [day, setDay] = useState<number | undefined>(undefined);
    const [month, setMonth] = useState<number | undefined>(undefined);
    const [year, setYear] = useState<number | undefined>(undefined);
    const [age, setAge] = useState<{ years: number | string; months: number | string; days: number | string } | undefined>(undefined);

    useEffect(() => {
        const currentDate: Date = new Date();
        if (day !== undefined && month !== undefined && year !== undefined) {
            const birthdate: Date = new Date(year, month - 1, day);
            const timeDiff: number = Math.abs(currentDate.getTime() - birthdate.getTime());
            const diffYears: number = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
            const diffMonths: number = Math.floor((timeDiff % (1000 * 3600 * 24 * 365.25)) / (1000 * 3600 * 24 * (365.25 / 12)));
            const diffDays: number = Math.floor((timeDiff % (1000 * 3600 * 24 * (365.25 / 12))) / (1000 * 3600 * 24));

            setAge({ years: diffYears, months: diffMonths, days: diffDays });
        } else {
            setAge({ years: "--", months: "--", days: "--" }); 
        }
    }, [day, month, year]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number | undefined>>): void => {
        const value = parseInt(event.target.value, 10);
        setState(isNaN(value) ? undefined : value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <label htmlFor="day">DAY</label>
                    <input type="number" id="day" value={day ?? ''} onChange={(event) => handleInputChange(event, setDay)} min={1} max={31} />
                </div>
                <div className="col">
                    <label htmlFor="month">MONTH</label>
                    <input type="number" id="month" value={month ?? ''} onChange={(event) => handleInputChange(event, setMonth)} min={1} max={12} />
                </div>
                <div className="col">
                    <label htmlFor="year">YEAR</label>
                    <input type="number" id="year" value={year ?? ''} onChange={(event) => handleInputChange(event, setYear)} />
                </div>
            </div>
            <div className="divider">
                <img src={line} alt="" style={{ width: '100%' }} />
            </div>
            {age && (
                    <div className="results">
                    <div className="result">
                        <div className="number">{age.years}</div>
                        <div>years</div>
                    </div>
                    <div className="result">
                        <div className="number">{age.months}</div>
                        <div>months</div>
                    </div>
                    <div className="result">
                        <div className="number">{age.days}</div>
                        <div>days</div>
                    </div>
                    </div>
            )}
        </div>

    );
};