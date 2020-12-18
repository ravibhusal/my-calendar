import React from 'react';
import helpers from '../../helpers/helpers';
interface MonthSelectProps{
  selectedMonth: string;
  onMonthSelect: (month: string) => void
}

function MonthSelect(props: MonthSelectProps): JSX.Element{

  const months: Array<String> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec"]


  const onMonthSelect = (event: React.MouseEvent<HTMLElement>): void=> {
    let month: string|any = event.currentTarget.getAttribute('data-month');
    props.onMonthSelect(month);
  }

  let monthList: Array<any> = months.map((month, index) => {
    var classesToAdd: string = index + 1 === parseInt(props.selectedMonth) ? "bg-black text-white" : "hover:bg-gray-200"
    return <td data-month= {index + 1} className={` rounded-full w-12 h-12 pt-2.5 ${classesToAdd}`} onClick={ e =>{
      onMonthSelect(e)
    }}>{month}</td>;
  })

  const renderMonths = () => {
    var rows: Array<any> = helpers.formatElementsForTable(monthList, 3);
  
    let elements: Array<any> = [];
    elements = rows.map((d: Element) => {
      return <tr className={`flex justify-between w-full`}>{d}</tr>;
    });

    return elements;
  }

  return(
    <table className="table-fixed w-full text-center shadow-lg">
      <thead className="flex w-full bg-white">
        <tr className="flex justify-center w-full">
          <th className="p-1 font-medium text-xs text-gray-400">Select a Month</th>
        </tr>
      </thead>
      <hr/>
      <tbody className="flex flex-col items-center h-52 pt-3 px-2 w-full">{renderMonths()}</tbody>
    </table>
  )
}

export default MonthSelect;