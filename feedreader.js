$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // Ensures it has a URL DEFINED and that the URL IS NOT EMPTY.
        it('URL defined', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        // Ensure it has a name defined and that the name is not empty.
        it('name defined', function(){
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        const toolBar = document.querySelector('body');
        // Ensure the menu element is hidden by default.
        it('default hidden menu', function() {
            expect(toolBar.classList.contains('menu-hidden')).toBe(true);
        });
        // test whether the menu changes visibility when the menu icon is clicked. This test
        //https://www.w3schools.com/jsref/event_onclick.asp
        it('menu changes visibiity on click', function() {
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(toolBar.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(toolBar.classList.contains('menu-hidden')).toBe(true);
        });
    });
    

    /* Test that when the loadFeed is CALLED and COMPLETES its work, there is AT LEAST a single .entry element within the .feed container.
    Use  Jasmine's beforeEach and asynchronous done() functions
    //https://jasmine.github.io/tutorials/async
    */ 

    describe('Initial Entries', function() {
        beforeEach((done) => loadFeed(0, done));
        it('calls and completes loadFeed with one or more entries', function(){
            const entriesInFeed = document.querySelectorAll('.feed .entry');
            //const entry = document.querySelectorAll('.entry');
            //there is at least a single entry in the feed container
            //finish
            expect((entriesInFeed).length>=1).toBe(true);
        });
    });
    
    /* https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
    This test  ensures when a NEW FEED is loaded
    by the loadFeed function that the Content ACTUALLY CHANGES.
    ALSO loadFeed() is asynchronous.
    */

    describe('New Feed Selection', function() {
        const firstFeed = document.querySelector('.feed');
        const firstEntries = firstFeed.children;
        blogPost = [];
        cssPost = [];

        beforeEach((done) => {
            loadFeed(0,() => {
            //https://www.w3schools.com/jsref/prop_element_children.asp
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
            Array.from(firstEntries).forEach((entry) => {
                //get the inner text content and add it to an array 
                blogPost.push(entry.innerText);
            });
            //load the second CSS when asynchronous work has been completed
            loadFeed(1, done);
            });          
        });

        it('content changes', function() {
            //define the second feed from the newly loaded page
            const secondFeed = document.querySelector('.feed');
            const secondEntries = secondFeed.children;
            //create an array from the children elements of secondFeed
                Array.from(secondEntries).forEach((entry) => {
                    //push the array into my cssPost array 
                    cssPost.push(entry.innerText);
                });
            //is the first thing in the blogpost array to not be the same as the first thing in the cssPost array
            expect(blogPost[0] !== cssPost[0]).toBe(true);
        });
    });
}());