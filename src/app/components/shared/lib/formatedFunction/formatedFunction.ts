export function formatDateToRussian(dateString:string | Date) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const weekday = date.getDay();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const months = [
        "января", "февраля", "марта", "апреля",
        "мая", "июня", "июля", "августа",
        "сентября", "октября", "ноября", "декабря"
    ];

    const weekdays = [
        "вс", "пн", "вт",
        "ср", "чт", "пт", "сб"
    ];

    return `${weekdays[weekday]}, ${day} ${months[+month - 1]} ${year} г. ${hours}:${minutes}`;
}