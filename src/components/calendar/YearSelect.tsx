import React, {useRef, useEffect} from 'react';
import helpers from '../../helpers/helpers';

interface YearSelectProps{
  currentYear: string;
  selectedYear: string;
  onYearSelect: (year: string) => void
}
function YearSelect(props: YearSelectProps){

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
      yearList.push(<td key={i} ref={selectedYearRef} data-year={i} className={` bg-red-500 rounded-full w-1/3`} onClick={ e =>{
        onYearSelect(e)
      }}>{i}</td>)
    }
    else{
      yearList.push(<td key={i} data-year={i} className={` hover:bg-red-200 rounded-full w-1/3`} onClick={ e =>{
        onYearSelect(e)
      }}>{i}</td>)
    }
  }

  const renderYears = () => {
    return helpers.formatElementsForTable(yearList, 3);
  }

  return(
    <table className="table-fixed w-full text-center shadow-lg">
      <thead className="flex w-full bg-red-200">
        <tr className="flex justify-center w-full">
          <th>Year</th>
        </tr>
      </thead>
      <tbody className="flex flex-col items-center justify-between h-52 overflow-y-scroll w-full">{renderYears()}</tbody>
    </table>
  );
}

export default YearSelect;