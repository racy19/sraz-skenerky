/** 
 * Function to get the next 40 Fridays and Saturdays
 * @param {number} daysToShow - Number of Fridays and Saturdays to show
 */

function getNextDays(daysToShow = 40) {
    const dates = [];
    const nextFriday = new Date();

    // return date in YYYY-MM-DD format
    const toDateString = (date) => {
        return date.toISOString().split('T')[0];
    }

    // find the next Friday
    while (nextFriday.getDay() !== 5) {
        nextFriday.setDate(nextFriday.getDate() + 1);
    }

    for (let i = 0; i < daysToShow; i++) {
        const friday = new Date(nextFriday);
        const saturday = new Date();
        saturday.setDate(friday.getDate() + 1);

        dates.push({
            friday: toDateString(friday),
            saturday: toDateString(saturday)
        });

        nextFriday.setDate(nextFriday.getDate() + 7);
    }

    return dates;
}

export { getNextDays };