import React, { useState, useEffect, useRef } from 'react';
import YearSelect from './YearSelect';
import MonthSelect from './MonthSelect';
import DateSelect from './DateSelect';

import useEffectUpdate from '../../custom_hooks/UseEffectUpdate'

import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat);

interface CalendaProps{
  currentDate: Dayjs;
  selectedDate: Dayjs;
  onDateSelect: (selectedDay: string, selectedMonth: string, selectedYear: string) => void;
}

function Calendar(props: CalendaProps): JSX.Element{

  const currentYear = props.currentDate.format('YYYY');
  const [selectedDay, setDay] = useState<string>(props.selectedDate.format('D'));
  const [selectedMonth, setMonth] = useState<string>(props.selectedDate.format('M'));
  const [selectedYear, setYear] = useState<string>(props.selectedDate.format('YYYY'));

  const [totalDaysInAMonth, setTotalDaysInAMonth] = useState<number>(props.selectedDate.daysInMonth());
  const [firstDayOfTheMonth, setfirstDayOfTheMonth] = useState<Dayjs>(props.selectedDate.startOf('month'));

  const[showYears, toggleShowYears] = useState<Boolean>(false)
  const[showMonths, toggleShowMonths] = useState<Boolean>(false)
  const[showDates, toggleShowDates] = useState<Boolean>(true)
  
  const[newDateSelected, toggleNewDateSelected] = useState<Boolean>(false)

  const selectedMonthAbbr: string = dayjs().month(parseInt(selectedMonth) - 1).format('MMM');


  useEffect(() =>{
    if(showYears){
      toggleShowDates(false);
      toggleShowMonths(false);
    }

    if(!showYears && !showMonths)
      toggleShowDates(true);

  }, [showYears])

  useEffect(() =>{
    if(showMonths){
      toggleShowDates(false);
      toggleShowYears(false);
    }

    if(!showYears && !showMonths)
      toggleShowDates(true);

  }, [showMonths])

  useEffect(() =>{
    if(showDates){
      toggleShowMonths(false);
      toggleShowYears(false);
    }
  }, [showDates])


  useEffectUpdate(() => {
    props.onDateSelect(selectedDay, selectedMonth, selectedYear);
  }, [newDateSelected]);

  useEffectUpdate(() => {
    console.log(totalDaysInAMonth)
    setTotalDaysInAMonth(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).daysInMonth());
    setfirstDayOfTheMonth(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).startOf('month'));
  }, [selectedYear]);

  useEffectUpdate(() => {
    setTotalDaysInAMonth(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).daysInMonth());
    setfirstDayOfTheMonth(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).startOf('month'));
  }, [selectedMonth]);

  const onDateSelect = (day: string): void => {
    setDay(day)
    toggleNewDateSelected(true);
  }

  const onMonthSelect = (month: string): void => {
    setMonth(month);
    toggleShowMonths(false)
    toggleShowDates(true)
  }

  const onYearSelect = (year: string): void => {
    setYear(year)
    toggleShowDates(true)
  }  

  return(
    <div className="flex flex-col">  
      <div className="flex shadow-lg justify-center w-full p-1">
        <button className="p-1.5" onClick={e => {
          toggleShowMonths(!showMonths)
          }}>{selectedMonthAbbr}
          </button>
          
        <button className="p-1.5" onClick={e => {
          toggleShowYears(!showYears)
          }}>{selectedYear}
          </button>
      </div>

      {showDates && <DateSelect currentDate = {props.currentDate} selectedDate={props.selectedDate} selectedDay={selectedDay} selectedMonth={selectedMonth} selectedYear={selectedYear} totalDaysInAMonth={totalDaysInAMonth} firstDayOfTheMonth={firstDayOfTheMonth} onDateSelect={onDateSelect}/>}
      {showMonths && <MonthSelect selectedMonth={selectedMonth} onMonthSelect= {onMonthSelect}/>}
      {showYears && <YearSelect currentYear = {currentYear} selectedYear={selectedYear} onYearSelect={onYearSelect}/>}
    </div>
  );
}

export default Calendar;