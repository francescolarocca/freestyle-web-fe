export function isDateInFuture(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Set today's time to 00:00:00 to only compare dates
    today.setHours(0, 0, 0, 0);

    return inputDate > today;
}