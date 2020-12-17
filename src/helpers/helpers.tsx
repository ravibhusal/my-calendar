import React from 'react'

const helpers = {
  formatElementsForTable: function(list: Array<Element>, numberOfElementsInARow: number): Array<Element>{
    var cells: Array<any> = [];
    var rows: Array<any> = [];
  
    list.forEach((row: Element, i: number) => {
      if (i % numberOfElementsInARow !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === list.length - 1) {
        rows.push(cells);
      }
    });
  
    let elements: Array<any> = []
  
    elements = rows.map((d: Element) => {
      return <tr className="flex w-full">{d}</tr>;
    });

    return elements;
  }
}

export default helpers