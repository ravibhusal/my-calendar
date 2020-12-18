import React, {useState, useEffect} from 'react'
import Calendar from '../calendar'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'


dayjs.extend(customParseFormat)

function DatePicker(): JSX.Element{

  const [showCalendar, toggleShowCalendar] = useState<Boolean>(false)

  const currentDate = dayjs();
  const [selectedDate, setSelectedDate] = useState(currentDate)

  const onDateSelect = (day: string, month: string, year: string) =>{
    setSelectedDate(dayjs(`${year}-${month}-${day}`, "YYYY/M/D"))
    toggleShowCalendar(!showCalendar)
  }
  return (
    <div className="w-72">
      <input name="date" className = "bg-white border-black border-2 h-8 rounded-lg p-2 w-full" autoComplete="off" value={selectedDate.format("YYYY/M/D")} onClick = { e => {
        toggleShowCalendar(!showCalendar)
      }} />
      {showCalendar && <Calendar currentDate={currentDate} selectedDate={selectedDate} onDateSelect = {onDateSelect}/>}
    </div>
  )
}

export default DatePicker;