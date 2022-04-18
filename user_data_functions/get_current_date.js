function get_current_date(){
    let unformatted_date = new Date();
    month = unformatted_date.getMonth();
    day = unformatted_date.getDate();
    year = unformatted_date.getFullYear();

    let date = month+"-"+day+"-"+year
    return date;
}

module.exports = get_current_date;
