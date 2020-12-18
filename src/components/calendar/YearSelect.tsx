import React, {useRef, useEffect} from 'react';
import helpers from '../../helpers/helpers';

interface YearSelectProps{
  currentYear: string;
  selectedYear: string;
  onYearSelect: (year: string) => void
}
function YearSelect(props: YearSelectProps): JSX.Element{

  const selectedYearRef = useRef<any>();

  const scrollToBottom = () :void => {
    selectedYearRef.current.scrollIntoView({
      behavior: "smooth"
    });
  };
  useEffect(() => {
    if(selectedYearRef.current){
      scrollToBottom();
    }
  }, [selectedYearRef])

  const onYearSelect = (event: React.MouseEvent<HTMLElement>): void =>{
    let year: string|any = event.currentTarget.getAttribute("data-year");
    props.onYearSelect(year);
  }

  let yearList: Array<any> = [];
  for ( var i = parseInt(props.currentYear) - 20; i <= parseInt(props.currentYear) + 20; i ++ ){
    if(i === parseInt(props.selectedYear)){
      yearList.push(<td key={i} ref={selectedYearRef} data-year={i} className={` bg-black text-white rounded-full w-12 h-12 pt-2.5`} onClick={ e =>{
        onYearSelect(e)
      }}>{i}</td>)
    }
    else{
      yearList.push(<td key={i} data-year={i} className={` hover:bg-gray-200 rounded-full w-12 h-12 pt-2.5`} onClick={ e =>{
        onYearSelect(e)
      }}>{i}</td>)
    }
  }

  const renderYears = () => {
    let rows: Array<any> = helpers.formatElementsForTable(yearList, 3);
  
    let elements: Array<any> = [];

    elements = rows.map((d: Array<any>, i: number) => {
      if(d.length > 0 && d.length < 3) {
        for(let i: number = d.length; i < 3; i++) {
          d.push(<td className="w-12 h-12 pt-2.5">{""}</td>);
        }
      }
      return <tr className={`flex justify-between w-full`}>{d}</tr>;
    });

    return elements;
  }

  return(
    <table className="table-fixed w-full text-center shadow-lg">
      <thead className="flex w-full bg-white">
        <tr className="flex justify-center w-full">
          <th className="p-1 font-medium text-xs text-gray-400">Select a Year</th>
        </tr>
      </thead>
      <hr/>
      <tbody className="flex flex-col items-center justify-between h-64 pb-0.5 px-4 overflow-y-scroll w-full">{renderYears()}</tbody>
    </table>
  );
}

export default YearSelect;