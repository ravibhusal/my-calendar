import React from 'react'
import dayjs, { Dayjs } from 'dayjs'



interface DateSelectProps{
  currentDate: Dayjs;
  selectedDate: Dayjs;
  selectedDay: string;
  selectedMonth: string;
  selectedYear: string;
  totalDaysInAMonth: number;
  firstDayOfTheMonth: any;
  onDateSelect: (day: string) => void
}
function DateSelect(props: DateSelectProps){

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
      
      daysInTheMonth.push(<td key={i} data-date={i} data-month={props.selectedMonth} data-year={props.selectedYear} className={` rounded-full ${classToAdd}`} onClick = {e => {
        {onDateSelect(e)}
      }}>{i}</td>)
    }

    var blankDays: Array<any> = [];

    for (let i: number = 0; i < parseInt(props.firstDayOfTheMonth.$W); i++) {
      blankDays.push(<td>{""}</td>);
    }

    var totalSlots: Array<any> = [...blankDays, ...daysInTheMonth];
    var cells: Array<any> = [];
    var rows: Array<any> = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    let elements: Array<any> = []

    elements = rows.map((d: any) => {
      return <tr>{d}</tr>;
    });
    return elements;
  }

  return(
    <table className="table-auto w-1/5 text-center shadow-lg">
        <thead className="bg-red-200">
          <tr>
            {renderWeekNames()}
          </tr>
        </thead>
        <tbody>
          {renderDates()}
        </tbody>
    </table>
  )
}

export default DateSelect;