
export const setZerosForDates = (dateNumber)=> {
    if (dateNumber < 10) return "0" + dateNumber;
    return dateNumber;
  };

 export const setDateForOutput = (dt) => {
    let d = new Date(dt);
    let month = setZerosForDates(d.getUTCMonth() + 1);
    let day = setZerosForDates(d.getDate());
    return `${day}-${month}-${d.getFullYear()}`;
  };

  export const setTimeForOutput = (dt) => {
    let d = new Date(dt);
    let minutes =
      d.getUTCMinutes() == "0" ? d.getUTCMinutes() + "0" : d.getUTCMinutes();
    return `${d.getUTCHours()} : ${minutes}`;
  };

 export const convertToUTCdate = (dt)=> {
    let date = new Date(dt);
    let mm = setZerosForDates(date.getUTCMonth() + 1);
    let dd = setZerosForDates(date.getUTCDate());
    let yyyy = date.getUTCFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

 export const getCurrentDate = () => {
    let month = setZerosForDates(new Date().getMonth() + 1);
    let day = setZerosForDates(new Date().getDate());

    return `${new Date().getFullYear()}- ${month}-${day}`;
  };

 export const convertToOneFormat = (dt) => {
    let date = new Date(dt);
    return date.getTime();
  };

 export const validateDate = (fr, to, firstdate, lastdate) => {
    console.log(fr, to, firstdate, lastdate);
    let fdt = convertToUTCdate(firstdate);
    let ldt = convertToUTCdate(lastdate);
    console.log(fr, fdt, ldt);

    fdt = convertToOneFormat(fdt);
    ldt = convertToOneFormat(ldt);
    let frdt = convertToOneFormat(fr);
    let todt = convertToOneFormat(to);

    console.log(frdt, todt, ldt, fdt);
  };

