export const formattingDate = (date, arrFormat) => {
    function addZeroToDate(num){
        if (num <=9){
            return "0" + num;
        }
        return num
    }

    function formatDateSub(date, arrFormat){
        let day = addZeroToDate(date.getDate()),
            month = addZeroToDate(date.getMonth() + 1),
            year = date.getFullYear(), 
            dayIndex = date.getDay(),
            hour = addZeroToDate(date.getHours()),
            minute = addZeroToDate(date.getMinutes()),
            second = addZeroToDate(date.getSeconds())
            
        // let millisecond = date.getMilliseconds();

        let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agst', 'Sep', 'Okt', 'Nov', 'Des'];
        let dayNameInIndonesia = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

        switch (arrFormat) {
            case 'ymd':
                return [year, month, day].join('-')
            case 'ymd-time': {
                let formatDate = [year, month, day].join("-");
                let formatTime = [hour, minute, second].join(":");
                return [formatDate, formatTime, dayNameInIndonesia[dayIndex]].join(' ');
            }
            case 'dmmy':
                return [day, monthName[month-1], year].join(' ');
            case 'dmmy-time': {
                    let formatDate = [day, monthName[month-1], year].join("-");
                    return [dayNameInIndonesia[dayIndex], formatDate].join(' ');
                }
            default: {
                let formatDate = [day, month, year].join("-");
                let formatTime = [hour, minute, second].join(":");
                return [formatDate, formatTime, dayNameInIndonesia[dayIndex]].join(' ');
            }
        }
        
    }

    return formatDateSub(date, arrFormat)
}

export const phoneValidator = (phone) => {

    const standardizePhoneNumber = (phone) => {
        let phoneNumber = String(phone).trim();

        if(phoneNumber.startsWith('+62')){
            phoneNumber = '0' + phoneNumber.slice(3);
        } else if (phoneNumber.startsWith('62')){
            phoneNumber = '0' + phoneNumber.slice(2)
        }

        return phoneNumber.replace(/[- .]/g, "");
    }

    const isCorrectFormat = (phone) => {
        if(!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)){
            return false
        }
        return true
    }

    const cellularProviderInIndonesia = (phone) =>{
        const prefix = phone.slice(0, 4);
        if (['0831', '0832', '0833', '0838'].includes(prefix)) return 'axis';
        if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) return 'three';
        if (['0817', '0818', '0819', '0859', '0878', '0877'].includes(prefix)) return 'xl';
        if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix)) return 'indosat';
        if (['0812', '0813', '0852', '0853', '0821', '0823', '0822', '0851', '0811'].includes(prefix)) return 'telkomsel';
        if (['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'].includes(prefix)) return 'smartfren';
        if (['0840'].includes(prefix)) return 'untuk_percobaan';
        return null;
    }

    let standardNumber = standardizePhoneNumber(phone)
    if (isCorrectFormat(standardNumber) && cellularProviderInIndonesia(standardNumber)){
        return standardNumber
    }

    return null
} 

// set limit booking date
export const maxDate = (maxNum) => {
    let today = new Date();
    let maxDay = today.addDays(maxNum);

    
    return maxDay;
}

// Prototype Date for limit booking date
Date.prototype.addDays = function(days){
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date
}

export const sortDateArr = (arr) => {
    let newArr = [...arr]
    
    function compare(a, b){
        if (a.bookingdate < b.bookingdate){
            return -1
        }
        if (a.bookingdate > b.bookingdate){
            return 1
        }
        return 0
    }

    return newArr.sort(compare)
}

export const addNewBookToArr = (arr, newBook) => {
    let tempArr = [ ...arr, newBook ];
    console.log("add new to arr")
    console.log(arr)
    console.log(newBook)
    console.log(tempArr)
}
