import React, {useState} from 'react';

function YearSelect(props: any){

  const currentYear = props.currentDate.format('YYYY');

  const onYearSelect = (event: any) =>{
    let year = event.currentTarget.dataset.year;
    props.onYearSelect(year);
  }

  let yearList: any = [];
  for ( var i = parseInt(currentYear) - 20; i <= parseInt(currentYear) + 20; i ++ ){
    var classesToAdd = i === parseInt(props.selectedYear) ? 'bg-red-500' : "hover:bg-red-200"
    yearList.push(<td key={i} data-year={i} className={` rounded-full w-1/3 ${classesToAdd}`} onClick={ e =>{
      onYearSelect(e)
    }}>{i}</td>)
  }

  const renderMonths = () => {
    var cells: Array<any> = [];
    var rows: Array<any> = [];

    yearList.forEach((row: any, i: any) => {
      if (i % 3 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === yearList.length - 1) {
        rows.push(cells);
      }
    });

    let elements: any = []

    rows.map((d: any, i: any) => {
      elements.push(<tr className="w-full">{d}</tr>);
    });
    return elements;
  }

  return(
    <table className="table-auto max-h-60 w-1/5 text-center shadow-lg">
      <thead className="bg-red-200">
        <th></th>
        <th>Year</th>
        <th></th>
      </thead>
      <tbody>{renderMonths()}</tbody>
    </table>
  );
}

export default YearSelect;