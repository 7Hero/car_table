export const sortRows = (row_data, type, label) => {
  if (type == 0) {
    return row_data;
  }
  let array_for_sort = [...row_data]
  return array_for_sort.sort((a, b) => {
    if (a[label] < b[label]) {
      return type;
    }
    if (a[label] > b[label]) {
      return -type;
    }
    return 0;
  });
};

export const filterRows = (row_data, filters) => {
  // if( Object.keys(filters).length === 0 && filters.constructor === Object){
  //   return row_data;
  // }

  for (let filter of Object.entries(filters)) {
    if (filter[1][0] == undefined) continue;

    row_data = row_data.filter((row) => {
      if(filter[0] == "real_cost"){
        let number = Number(row[filter[0]].replace(/[^0-9.-]+/g,""));
        if( number >filter[1][0] && number < filter[1][1]) 
        return true
        else return false
      }

      if (filter[0] == "car_make") {
        return row[filter[0]]
          .toLowerCase()
          .includes(filter[1][0].toLowerCase());
      }
      return filter[1].includes(row[filter[0]]);
    });
  }
  return row_data;
};

export const listofUniqueValues = (row_data, key) => {
  let arr = new Set();
  row_data.forEach((el) => {
    arr.add(el[key]);
  });
  if(key == 'car_model_year' || key == 'gender' ){
    return Array.from(arr).sort();
  }
  
  let car_list = [];
  for (let car of Array.from(arr)) {
    car_list.push({
      value: car.toLowerCase(),
      label: car,
    });
  }
  return car_list;
};

export const year_list = [];
const car_lis = [
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
  "Fiat",
];

let car_list = [];
for (let car of car_lis) {
  car_list.push({
    value: car.toLowerCase(),
    label: car,
  });
}

export { car_list };
