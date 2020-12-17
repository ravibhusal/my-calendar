import React from 'react';
import helpers from '../../helpers/helpers';

interface YearSelectProps{
  currentYear: string;
  selectedYear: string;
  onYearSelect: (year: string) => void
}
function YearSelect(props: YearSelectProps){

  const onYearSelect = (event: React.MouseEvent<HTMLElement>): void =>{
    let year: string|any = event.currentTarget.getAttribute("data-year");
    props.onYearSelect(year);
  }

  let yearList: any = [];
  for ( var i = parseInt(props.currentYear) - 20; i <= parseInt(props.currentYear) + 20; i ++ ){
    var classesToAdd = i === parseInt(props.selectedYear) ? 'bg-red-500' : "hover:bg-red-200"
    yearList.push(<td key={i} data-year={i} className={` rounded-full w-1/3 ${classesToAdd}`} onClick={ e =>{
      onYearSelect(e)
    }}>{i}</td>)
  }

  const renderYears = () => {
    return helpers.formatElementsForTable(yearList, 3);
  }

  return(
    <table className="table-auto max-h-60 w-1/5 text-center shadow-lg">
      <thead className="bg-red-200">
        <th></th>
        <th>Year</th>
        <th></th>
      </thead>
      <tbody>{renderYears()}</tbody>
    </table>
  );
}

export default YearSelect;