export const addZeropadding = (value) => `${value < 10 ? '0' : ''}${value}`;

export default () => {
    const date = new Date();
    const times = {
        day: `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`,
        month: `${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}`,
        year: date.getFullYear(),
        hour: `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`,
        minute: `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`,
    }
    return {
        date: `${times.day}/${times.month}/${times.year}`,
        hour: `${times.hour}/${times.minute}`,
    };
}
