export const toLocalTime = (time: Date) => {
    const date = new Date(time)
    return isToday(date) ? todayFormatter.format(date) : pastFormatter.format(date)
}

const todayFormatter = new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short'
})
const pastFormatter = new Intl.DateTimeFormat('en-US', {
    day: "numeric",
    month: "short"
})

const isToday = (date: Date) => {
    const now = new Date();
    return date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
}
