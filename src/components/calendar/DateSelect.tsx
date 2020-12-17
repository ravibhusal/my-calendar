import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import helpers from '../../helpers/helpers'



interface DateSelectProps{
  currentDate: Dayjs;
  selectedDate: Dayjs;
  selectedDay: string;
  selectedMonth: string;
  selectedYear: string;
  totalDaysInAMonth: number;
  firstDayOfTheMonth: any; // See line: 55
  onDateSelect: (day: string) => void
}
function DateSelect(props: DateSelectProps): JSX.Element{

  const weekdaysShortName: Array<String> = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const currentDate: string = props.currentDate.format('YYYY/M/D');
  const selectedDate: string = props.selectedDate.format('YYYY/M/D');

  const onDateSelect = (event: React.MouseEvent<HTMLElement>): void => {
    var day: string|any = event.currentTarget.getAttribute('data-date');
    props.onDateSelect(day);
  }

  const renderWeekNames = () =>{
    var weekNames: Array<any> = [];
    weekNames = weekdaysShortName.map(day => {
      return <th className="w-1/7 p-1">{day}</th>;
    })
    return weekNames;
  }

  const renderDates = () =>{
    var daysInTheMonth: Array<any> = [];
    
    for(let i: number = 1; i <= props.totalDaysInAMonth; i++){
      var classToAdd: string = i === parseInt(props.selectedDay) ? "": "hover:bg-red-200"
      var formattedDate: string = dayjs(`${props.selectedYear}/${props.selectedMonth}/${i}}`).format('YYYY/M/D');

      classToAdd += formattedDate === currentDate ? " text-red-300 " : "";
      classToAdd += formattedDate == selectedDate ? "bg-red-500" : ""
      
      daysInTheMonth.push(<td key={i} data-date={i} data-month={props.selectedMonth} data-year={props.selectedYear} className={` rounded-full w-1/6 p-1 ${classToAdd}`} onClick = {e => {
        {onDateSelect(e)}
      }}>{i}</td>)
    }

    var blankDays: Array<any> = [];

    // TODO: Find the correct api for the first day of the month in dayjs library and fix
    // firstDayOfTheMonth.$W. startOf('month').format("W") apparently doesn't work.
    for (let i: number = 0; i < parseInt(props.firstDayOfTheMonth.$W); i++) {
      blankDays.push(<td className="w-1/6 p-1">{" "}</td>);
    }

    var totalSlots: Array<any> = [...blankDays, ...daysInTheMonth];
    return helpers.formatElementsForTable(totalSlots, 7);
  }

  return(
    <table className="table-auto w-full text-center shadow-lg">
      <thead className="flex w-full bg-red-200">
        <tr className="flex justify-center w-full">
          {renderWeekNames()}
        </tr>
      </thead>
      <tbody className="flex flex-col items-center justify-between h-52 w-full">
        {renderDates()}
      </tbody>
    </table>
  )
}

export default DateSelect;