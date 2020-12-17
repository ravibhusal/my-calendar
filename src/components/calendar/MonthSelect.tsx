import React from 'react';
import helpers from '../../helpers/helpers';
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
    return helpers.formatElementsForTable(monthList, 3);
  }

  return(
    <table className="table-fixed w-full text-center shadow-lg">
      <thead className="flex w-full bg-red-200">
        <tr className="flex justify-center w-full">
          <th>Month</th>
        </tr>
      </thead>
      <tbody className="flex flex-col items-center justify-between h-52 w-full">{renderMonths()}</tbody>
    </table>
  )
}

export default MonthSelect;