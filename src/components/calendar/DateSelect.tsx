import React from 'react'
import dayjs from 'dayjs'

function DateSelect(props: any){

  const weekdaysShortName: Array<String> = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const currentDate = props.currentDate.format('YYYY/M/D');

  const onDateSelect = (event: any) => {
    let day = event.currentTarget.dataset.date;
    props.onDateSelect(day);
  }

  const renderWeekNames = () =>{
    let weekNames: any = [];
    weekdaysShortName.map(day => {
      weekNames.push(<th className="w-1/7 p-1">{day}</th>)
    })
    return weekNames;
  }

  const renderDates = () =>{
    var daysInTheMonth = [];
    
    for(let i = 1; i <= props.totalDaysInAMonth; i++){
      var classToAdd: string = i === parseInt(props.selectedDay) ? "bg-red-500": "hover:bg-red-200"
      var formattedDate = dayjs(`${props.selectedYear}/${props.selectedMonth}/${i}}`).format('YYYY/M/D');
      classToAdd +=  formattedDate === currentDate ? " text-red-300 " : "";
      
      daysInTheMonth.push(<td key={i} data-date={i} data-month={props.selectedMonth} data-year={props.selectedYear} className={` rounded-full ${classToAdd}`} onClick = {e => {
        {onDateSelect(e)}
      }}>{i}</td>)
    }

    var blankDays = [];

    for (let i = 0; i < parseInt(props.firstDayOfTheMonth.$W); i++) {
      blankDays.push(<td>{""}</td>);
    }

    var totalSlots = [...blankDays, ...daysInTheMonth];
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

    let elements: any = []

    rows.map((d: any, i: any) => {
      elements.push(<tr>{d}</tr>);
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