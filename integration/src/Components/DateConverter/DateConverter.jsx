import React, { useState } from 'react';
import './DateConverter.css';
import Header from '../Header/Header';

function DateConverter() {
  const [date, setDate] = useState('');
  const [hebrewDate, setHebrewDate] = useState('');
  const [error, setError] = useState('');

  const convertDate = async () => {
    if (!date) {
      setError('Select Date...');
      return;
    }

    try {
      const response = await fetch(`https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&strict=1`);
      const data = await response.json();

      if (data.error) {
        setError('canot find the date...');
        setHebrewDate('');
      } else {
        setHebrewDate(`${data.hebrew}`);
        setError('');
      }
    } catch {
      setError('cant connection');
      setHebrewDate('');
    }
  };

  return (
    <>
    <Header/>
     <div className="date-converter">
      <h3>select date</h3>
      
      <input 
        type="date" 
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="date-input"
      />
      
      <button 
        onClick={convertDate}
        className="convert-button"
      >
        convert
      </button>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {hebrewDate && (
        <div className="hebrew-date-result">
         {date} = {hebrewDate}
        </div>
      )}
    </div>
    </>
   
  );
}

export default DateConverter;
