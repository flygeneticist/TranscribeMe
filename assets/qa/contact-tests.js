suite('Contact Page Tests', function(){
    test('contact form is present with name, email, and message fields',function(){
        assert(document.getElementsByTagName('form'), 'form tag not present');
        assert(document.getElementsByName('name').length == 1, 'name field not present');
        assert(document.getElementsByName('email').length == 1, 'email field not present');
        assert(document.getElementsByName('message').length == 1, 'message field not present');
        assert(document.getElementsByName('submit').length == 1, 'submit button not present');
    });
});