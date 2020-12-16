import React, { useState, useEffect, useRef } from 'react';
import YearSelect from './YearSelect';
import MonthSelect from './MonthSelect';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import DateSelect from './DateSelect';

dayjs.extend(customParseFormat);


function Calendar(props: any){

  
  const currentDay = props.currentDate.format('D');
  const currentMonth = props.currentDate.format('MM');
  const currentYear = props.currentDate.format('YYYY');

  const [selectedDay, setDay] = useState(props.selectedDate.format('D'));
  const [selectedMonth, setMonth] = useState(props.selectedDate.format('M'));
  const selectedMonthAbbr = dayjs().month(parseInt(selectedMonth) - 1).format('MMM');
  const [selectedYear, setYear] = useState(props.selectedDate.format('YYYY'));

  const [totalDaysInAMonth, setTotalDaysInAMonth] = useState(props.selectedDate.daysInMonth());
  const [firstDayOfTheMonth, setfirstDayOfTheMonth] = useState(props.selectedDate.startOf('month'));

  const[showYears, toggleShowYears] = useState<Boolean>(false)
  const[showMonths, toggleShowMonths] = useState<Boolean>(false)
  const[showDates, toggleShowDates] = useState<Boolean>(true)

  const isFirstRender = useRef<Boolean>(true)


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


  useEffect(() => {
    if(!isFirstRender.current){
      props.onDateSelect(selectedDay, selectedMonth, selectedYear)
    }
  }, [selectedDay]);

  useEffect(() => {
    if(!isFirstRender.current){
      console.log(totalDaysInAMonth)
      setTotalDaysInAMonth(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).daysInMonth());
      setfirstDayOfTheMonth(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).startOf('month'));
    }
  }, [selectedYear]);

  useEffect(() => {
    if(!isFirstRender.current){
      setTotalDaysInAMonth(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).daysInMonth());
      setfirstDayOfTheMonth(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).startOf('month'));
    }
  }, [selectedMonth]);

  useEffect(() => { 
    isFirstRender.current = false
  }, [])


  const onDateSelect = (day: any) =>{
    setDay(day.toString())
  }

  const onMonthSelect = (month: any) => {
    setMonth(month.toString());
    toggleShowMonths(false)
    toggleShowDates(true)
  }

  const onYearSelect = (year: any) => {
    setYear(year.toString())
    toggleShowDates(true)
  }  

  return(
    <div>  
      <div className="flex justify-center w-1/5 p-1">
        <button className="p-1.5 shadow-lg" onClick={e => {
          toggleShowMonths(!showMonths)
          }}>{selectedMonthAbbr}
          </button>
          
        <button className="p-1.5 shadow-lg border-red-250" onClick={e => {
          toggleShowYears(!showYears)
          }}>{selectedYear}
          </button>
      </div>

      {showDates && <DateSelect currentDate = {props.currentDate} selectedMonth={selectedMonth} selectedYear={selectedYear} totalDaysInAMonth={totalDaysInAMonth} firstDayOfTheMonth={firstDayOfTheMonth} selectedDate = {props.selectedDate} onDateSelect={onDateSelect}/>}
      {showMonths && <MonthSelect currentDate = {props.currentDate} selectedMonth={selectedMonth} selectedDate = {props.selectedDate} onMonthSelect= {onMonthSelect}/>}
      {showYears && <YearSelect currentDate = {props.currentDate} selectedYear={selectedYear} selectedDate = {props.selectedDate} onYearSelect={onYearSelect}/>}
    </div>
  );
}

export default Calendar;