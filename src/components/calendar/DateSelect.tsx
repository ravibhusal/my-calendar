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

  const weekdaysShortName: Array<String> = ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const currentDate: string = props.currentDate.format('YYYY/M/D');
  const selectedDate: string = props.selectedDate.format('YYYY/M/D');

  const onDateSelect = (event: React.MouseEvent<HTMLElement>): void => {
    var day: string|any = event.currentTarget.getAttribute('data-date');
    props.onDateSelect(day);
  }

  const renderWeekNames = () =>{
    var weekNames: Array<any> = [];
    weekNames = weekdaysShortName.map(day => {
      return <th className="w-10 p-1 font-medium text-xs text-gray-400 ">{day}</th>;
    })
    return weekNames;
  }

  const renderDates = () =>{
    var daysInTheMonth: Array<any> = [];
    
    for(let i: number = 1; i <= props.totalDaysInAMonth; i++){
      var classToAdd: string = i === parseInt(props.selectedDay) ? "": "hover:bg-gray-200"
      var formattedDate: string = dayjs(`${props.selectedYear}/${props.selectedMonth}/${i}}`).format('YYYY/M/D');

      classToAdd += formattedDate === currentDate ? " text-gray-300 " : "";
      classToAdd += formattedDate == selectedDate ? "bg-black text-white" : ""
      
      daysInTheMonth.push(<td key={i} data-date={i} data-month={props.selectedMonth} data-year={props.selectedYear} className={` rounded-full h-10 w-10 pt-1.5 ${classToAdd}`} onClick = {e => {
        {onDateSelect(e)}
      }}>{i}</td>)
    }

    var blankDays: Array<any> = [];

    // TODO: Find the correct api for the first day of the month in dayjs library and fix
    // firstDayOfTheMonth.$W. startOf('month').format("W") apparently doesn't work.
    for (let i: number = 0; i < parseInt(props.firstDayOfTheMonth.$W); i++) {
      blankDays.push(<td className="w-10">{" "}</td>);
    }

    var totalSlots: Array<any> = [...blankDays, ...daysInTheMonth];

    let rows: Array<any> = helpers.formatElementsForTable(totalSlots, 7);
  
    let elements: Array<any> = [];
    elements = rows.map((d: Element) => {
      return <tr className={`flex w-full`}>{d}</tr>;
    });

    return elements;
  }

  return(
    <table className="table-fixed w-full text-center shadow-lg">
      <thead className="flex w-full bg-white">
        <tr className="flex justify-center w-full">
          {renderWeekNames()}
        </tr>
      </thead>
      <hr/>
      <tbody className="flex flex-col items-center justify-between h-64 w-full pt-1 pl-1">
        {renderDates()}
      </tbody>
    </table>
  )
}

export default DateSelect;