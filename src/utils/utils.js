//Create utils with time conversion functions
const utils = {
    secondsToMinutes: seconds => {
        const minutes = Math.floor(seconds / 60)
        const secondsLeft = (seconds % 60).toFixed(0)

        return `${minutes}m ${secondsLeft}s`
    },
    averageMinutes: arr => {
        const total = arr.reduce((acc, curr) => acc + curr.duration, 0)
        return total / arr.length
    },
    average: arr => {
        const total = arr.reduce((acc, curr) => acc + curr.duration, 0)
        return total / arr.length
    },
    getPercentage: (amount, total) => {
        const percent = (amount / total) * 100
        return percent.toFixed(2) + ' %'
    },
    debug: (...args) => {
        console.log(...args)
    }
}

export default utils;
