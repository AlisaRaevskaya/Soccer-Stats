class DateHandler {
  constructor() {}


  setZerosForDates(dateNumber) {
    if (dateNumber < 10) return "0" + dateNumber;
    return dateNumber;
  }

  //setDate
  setDateForOutput = (dt) => {
    let d = new Date(dt);
    let month = this.setZerosForDates(d.getUTCMonth() + 1);
    let day =this.setZerosForDates(d.getDate());
    return `${day}-${month}-${d.getFullYear()}`;
  };

  setTimeForOutput = (dt) => {
    let d = new Date(dt);
    let minutes = d.getUTCMinutes() == "0" ? d.getUTCMinutes() + "0" : d.getUTCMinutes();
    return `${d.getUTCHours()} : ${minutes}` ;
  };

  convertToUTCdate(dt){
    let date =  new Date(dt);
    let mm = this.setZerosForDates(date.getUTCMonth()+1);
    let dd = this.setZerosForDates(date.getUTCDate());
    let yyyy = date.getUTCFullYear();
     return `${yyyy}-${mm}-${dd}`;
    }



//
 

  getCurrentDate = () => {
    let month = this.setZerosForDates(new Date().getMonth() + 1);
    let day = this.setZerosForDates(new Date().getDate());

    return `${new Date().getFullYear()}- ${month}-${day}`;
  };

}
export default new DateHandler();
