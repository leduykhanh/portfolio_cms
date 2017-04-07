var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#save-pdf').click(function () {
    doc.fromHTML($('#body').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('Le-Duy-Khanh-resume.pdf');
});