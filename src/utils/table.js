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

export const filterRows = (row_data, filters) => {
  // if( Object.keys(filters).length === 0 && filters.constructor === Object){
  //   return row_data;
  // }

  for( let filter of Object.entries(filters) ) {
    if(filter[1][0] == undefined) continue;
    row_data = row_data.filter( row => {
      return filter[1].includes(row[filter[0]])
    })
  }
  return row_data;
}

export const listofUniqueValues = (row_data,key) => {
  let arr = new Set();
  row_data.forEach( el => {
    arr.add(el[key]);
  })
  return arr;
}

export const year_list = [
  
]

export const car_list = [
  "Volkswagen",
  "Oldsmobile",
  "Mercedes-Benz",
  "Mercury",
  "Cadillac",
  "Ford",
  "Nissan",
  "Toyota",
  "Dodge",
  "Corbin",
  "Kia",
  "Ram",
  "Mitsubishi",
  "Lincoln",
  "BMW",
  "Saab",
  "Chevrolet",
  "Spyker",
  "Subaru",
  "Volvo",
  "Lexus",
  "Suzuki",
  "GMC",
  "Isuzu",
  "Lamborghini",
  "Pontiac",
  "Mazda",
  "Porsche",
  "Hyundai",
  "Austin",
  "Audi",
  "Saturn",
  "Jeep",
  "Honda",
  "Infiniti",
  "Foose",
  "Alfa Romeo",
  "Chrysler",
  "Scion",
  "Lotus",
  "Acura",
  "Buick",
  "Aston Martin",
  "Maserati",
  "Hummer",
  "Aptera",
  "Ferrari",
  "Plymouth",
  "MINI",
  "Maybach",
  "Land Rover",
  "Eagle",
  "Jaguar",
  "Daewoo",
  "Smart",
  "Daihatsu",
  "Bentley",
  "Geo",
  "Jensen",
  "Rolls-Royce",
  "Tesla",
  "Panoz",
  "Fiat"
]