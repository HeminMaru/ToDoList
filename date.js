module.exports = getDate;

function getDate() {
    let today = new Date();
    let date = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });
    return date;
}