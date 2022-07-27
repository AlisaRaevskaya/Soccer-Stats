class DateHandler {
  constructor() {}

  setDate = (dt) => {
    let d = new Date(dt);
    let month = d.getMonth() + 1;
    let date = `${d.getDate()}-${month}-${d.getFullYear()}`;
    return date;
  };

  setZerosForDates(dateNumber) {
    if (dateNumber < 9) return "0" + dateNumber;
    return dateNumber;
  }

  //setDate
  setDateforOutput = (dt) => {
    let d = new Date(dt);
    let month = d.getMonth() + 1;
    let date = `${d.getDate()}-${month}-${d.getFullYear()}`;
    return date;
  };

  getFirstOrLastDate = (item) => {
    let fdate = this.setDate(item.utcDate);
    const [dd, mm, yyyy] = fdate.split("-");

    let month = this.setZerosForDates(mm);
    let date = this.setZerosForDates(dd);

    return `${yyyy}-${month}-${date}`;
  };

  getCurrentDate = () => {
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();

    month = this.setZerosForDates(month);
    date = this.setZerosForDates(date);

    return new Date().getFullYear() + "-" + month + "-" + date;
  };
  
  setTime = (dt) => {
    let d = new Date(dt);
    let minutes =
      d.getUTCMinutes() == "0" ? d.getUTCMinutes() + "0" : d.getUTCMinutes();
    return d.getUTCHours() + " : " + minutes;
  };
}
export default new DateHandler();
