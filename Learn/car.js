function Car(carName) {
    this.carName = carName || 'Unknow name';

};
Car.prototype.logName = function() {
    console.log('Car name is  ', this.carName);
};
module.exports.CarClass = Car;
global.Car = Car;