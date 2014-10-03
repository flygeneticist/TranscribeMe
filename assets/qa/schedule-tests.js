suite('Schedule Page Tests', function(){
    test('schedule form is present with transcriptionist, event, date, and time fields and a submit button',function(){
        assert(document.getElementsByTagName('form'), 'form tag not present');
        assert(document.getElementsByName('transcriptionist').length == 1, 'name field not present');
        assert(document.getElementsByName('event').length == 1, 'event type field not present');
        assert(document.getElementsByName('date').length == 1, 'email field not present');
        assert(document.getElementsByName('start-time').length == 1, 'start time field not present');
        assert(document.getElementsByName('end-time').length == 1, 'end time field not present');
        assert(document.getElementsByName('repeat').length == 1, 'repeat checkbox not present');
        assert(document.getElementsByName('repeat-until').length == 1, 'repeat until field not present');
    });

    test('if repeat is selected, form will have an active "repeat until" date field, else blank and inactive', function () {
        var repeat = document.getElementsByName('repeat');
        var endDate = document.getElementsByName('repeat-until');
        
        assert((repeat == true && endDate == true) ? true : false, 'repeat until date field should be active only when repeat box is checked');
        assert((repeat == false && endDate == false) ? true : false, 'repeat until field should not be active when repeat box is not checked');
        assert((repeat == false && endDate == '') ? true : false, 'repeat end date field should be empty when repeat box is not checked');    
    });
});