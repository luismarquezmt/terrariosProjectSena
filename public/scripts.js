function transformDate(datetoTransform) {

    // Formatear la fecha como YYYY-MM-DD
    const formatDate = (date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1; // Los meses empiezan desde 0
        const year = date.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return `${year}-${month}-${day}`;
    };

    // Establecer el valor del campo de fecha con la fecha formateada
    return formatDate(datetoTransform);
}

