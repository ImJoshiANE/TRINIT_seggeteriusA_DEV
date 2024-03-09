export const isUpcomingOrNot = (date)  => {
    const currentDate = new Date().getTime();
    const startDate = new Date(date).getTime();
    return startDate > currentDate;
}