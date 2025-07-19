export function isDateInFuture(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    
    if (isNaN(inputDate.getTime())) {
        throw new Error("Invalid date format");
    }

    // Set today's time to 00:00:00 to only compare dates
     today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    return inputDate > today; 
}

export function formatDateToISO(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("Invalid date object");
    }
    return date.toISOString();
}