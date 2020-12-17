const helpers = {
  formatElementsForTable: function(list: Array<Element>, numberOfElementsInARow: number){
    var cells: Array<any> = [];
    var rows: Array<any> = [];
  
    list.forEach((row, i) => {
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
  
    elements = rows.map((d: any) => {
      return <tr>{d}</tr>;
    });

    return elements;
  }
}

export default helpers