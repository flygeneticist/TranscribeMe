suite('Contact Page Tests', function(){
    test('contact form is present with username and password fields and a submit button',function(){
        assert(document.getElementsByTagName('form'), 'form tag not present');
        assert(document.getElementsByName('username').length == 1, 'name field not present');
        assert(document.getElementsByName('password').length == 1, 'email field not present');
        assert(document.getElementsByName('submit').length == 1, 'submit button not present');
    });
});