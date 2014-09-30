suite('Global Tests', function(){
    test('page has a valid title', function(){
        assert(document.title, 'Title element does not exist');
        assert(document.title == 'TranscribeMe', 'Title was not "TranscribeMe"');
    });

    test('page has a nav with 5 elements', function(){
        var navBar = document.getElementById('navBar');
        assert(navBar, 'DOM element with ID == "navBar" does not exist');
        assert(navBar.children.length == 5, 'navBar Element does not have 5 items');
    });

    test('page has a footer area', function(){
        var footer = document.getElementsByTagName('footer');
        assert(footer, 'No footer tag found');
    });
});

/*
    test('test_name', function(){
        assert(<contdition>, 'failure message');
        assert.equal(<item1>,<item2>);
    });
*/