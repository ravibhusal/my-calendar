import React from 'react';

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

    let elements: Array<any> = []

    elements = rows.map((d: any, i: any) => {
      return <tr className="w-full">{d}</tr>;
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
      <tbody>{renderYears()}</tbody>
    </table>
  );
}

export default YearSelect;