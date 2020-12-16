import React, {useState, useEffect} from 'react'
import Calendar from '../calendar'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'


dayjs.extend(customParseFormat)

function DatePicker(){

  const [showCalendar, toggleShowCalendar] = useState(false)

  const currentDate = dayjs();
  const [selectedDate, setSelectedDate] = useState(currentDate)

  const onDateSelect = (day: any, month: any, year: any) =>{
    setSelectedDate(dayjs(`${year}-${month}-${day}`, "YYYY/M/D"))
    toggleShowCalendar(!showCalendar)
    console.log(day, month, year, selectedDate);
  }
  return (
    <div>
      <input name="date" className = "bg-red-200 w-1/5" autoComplete="off" value={selectedDate.format("YYYY/M/D")} onClick = { e => {
        toggleShowCalendar(!showCalendar)
      }} />
      {showCalendar && <Calendar currentDate={currentDate} selectedDate={selectedDate} onDateSelect = {onDateSelect}/>}
    </div>
  )
}

export default DatePicker;