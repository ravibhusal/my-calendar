import React from 'react';

interface MonthSelectProps{
  selectedMonth: string;
  onMonthSelect: (month: string) => void
}

function MonthSelect(props: MonthSelectProps){

  const months: Array<String> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec"]


  const onMonthSelect = (event: React.MouseEvent<HTMLElement>): void=> {
    let month: string|any = event.currentTarget.getAttribute('data-month');
    props.onMonthSelect(month);
  }

  let monthList: Array<any> = months.map((month, index) => {
    var classesToAdd: string = index + 1 === parseInt(props.selectedMonth) ? "bg-red-500" : "hover:bg-red-200"
    return <td data-month= {index + 1} className={` rounded-full w-1/3 ${classesToAdd}`} onClick={ e =>{
      onMonthSelect(e)
    }}>{month}</td>;
  })

  const renderMonths = () => {
    var cells: Array<any> = [];
    var rows: Array<any> = [];

    monthList.forEach((row, i) => {
      if (i % 3 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === monthList.length - 1) {
        rows.push(cells);
      }
    });

    let elements: Array<any> = []

    elements = rows.map((d: any, i: any) => {
      return <tr>{d}</tr>;
    });
    return elements;
  }

  return(
    <table className="table-auto w-1/5 text-center shadow-lg">
      <thead className="bg-red-200">
        <th></th>
        <th>Month</th>
        <th></th>
      </thead>
      <tbody>{renderMonths()}</tbody>
    </table>
  )
}

export default MonthSelect;