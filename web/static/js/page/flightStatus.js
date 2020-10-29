let loadFlightStatusPage = (form, table, layDate) => {
    layDate.render({
        elem: '#p3-datePicker',
        lang: 'en'
    });

    table.init('statusInfo',{
        cols: [[
            {field: 'name', title: 'Name'},
            {field: 'age', title: 'Age'},
        ]],
    });
};

export {
    loadFlightStatusPage
}