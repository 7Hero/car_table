

class CarService {

  static getCars() {
    return new Promise( resolve => {
      fetch('http://localhost:5001/cars')
      .then(res => res.json())
      .then( res => resolve(res))
    })
  }

}