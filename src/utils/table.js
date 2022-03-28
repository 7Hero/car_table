export const sortRows = (row_data, type, label) => {
  if(type == 0 ) {
    return row_data;
  }
  
  return row_data.sort((a,b) => {
    if(a[label] < b[label] ) {
      return type;
    } if (a[label] > b[label]) {
      return -type;
    }
    return 0;
  })
};
