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
  
    return rows;
  }
}

export default helpers