
$(function () {

    //https://api.github.com/repos/ZengTianShengZ/ZengTianShengZ.github.io/issues

    $('.popover-show').popover('hide');
/*
    $.ajax({
        type:'GET',
        url:'https://api.github.com/repos/ZengTianShengZ/ZengTianShengZ.github.io/issues',
        success:function (response,statue,xhr) {


            //  alert(response[0].url +"....."+   response[0].title +"....."+  response[0].updated_at   + "....."+  response[0].body                 );
        },
        error:function () {

        }
    });*/


    var converter = new showdown.Converter();
    var text      = "![Showdown][sd-logo]\r\n\r\nShowdown is a Javascript Markdown to HTML converter, based on the original works by John Gruber. It can be used client side (in the browser) or server side (with Node or io). \r\n\r\n\r\n# Installation\r\n\r\n## Download tarball\r\n\r\nYou can download the latest release tarball directly from [releases][releases]\r\n\r\n## Bower\r\n\r\n    bower install showdown\r\n\r\n## npm (server-side)\r\n\r\n    npm install showdown\r\n\r\n## CDN\r\n\r\nYou can also use one of several CDNs available: \r\n\r\n* github CDN\r\n\r\n        https://cdn.rawgit.com/showdownjs/showdown/<version tag>/dist/showdown.min.js\r\n\r\n* cdnjs\r\n\r\n        https://cdnjs.cloudflare.com/ajax/libs/showdown/<version tag>/showdown.min.js\r\n\r\n\r\n---------\r\n\r\n\r\n# Here's some of the syntax supported\r\n\r\n\r\n# Paragraphs\r\n\r\nParagraphs in Markdown are just one or more lines of consecutive text followed by one or more blank lines.\r\n\r\n    On July 2, an alien mothership entered Earth's orbit and deployed several dozen saucer-shaped \"destroyer\" spacecraft, each 15 miles (24 km) wide.\r\n    \r\n    On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, participated in an assault on a destroyer near the city of Los Angeles.\r\n\r\n# Headings\r\n\r\nYou can create a heading by adding one or more # symbols before your heading text. The number of # you use will determine the size of the heading. This is similar to [**atx style**][atx].\r\n\r\n    # The largest heading (an <h1> tag)\r\n    ## The second largest heading (an <h2> tag)\r\n    …\r\n    ###### The 6th largest heading (an <h6> tag)\r\n\r\nYou can also use [setext style][setext] headings.\r\n\r\n    This is an H1\r\n    =============\r\n    \r\n    This is an H2\r\n    -------------\r\n\r\n# Blockquotes\r\n\r\nYou can indicate blockquotes with a >.\r\n\r\n    In the words of Abraham Lincoln:\r\n    \r\n    > Pardon my french\r\n\r\n\r\n# Styling text\r\n\r\nYou can make text **bold** or *italic*.\r\n\r\n    *This text will be italic*\r\n    **This text will be bold**\r\n\r\nBoth bold and italic can use either a `*` or an `_` around the text for styling. This allows you to combine both bold and italic if needed.\r\n\r\n    **Everyone _must_ attend the meeting at 5 o'clock today.**\r\n\r\n\r\n# Lists\r\n\r\n## Unordered lists\r\n\r\nYou can make an unordered list by preceding list items with either a * or a -.\r\n\r\n    * Item\r\n    * Item\r\n    * Item\r\n\r\n    - Item\r\n    - Item\r\n    - Item\r\n\r\n## Ordered lists\r\n\r\nYou can make an ordered list by preceding list items with a number.\r\n\r\n    1. Item 1\r\n    2. Item 2\r\n    3. Item 3\r\n\r\n\r\n## Nested lists\r\n\r\nYou can create nested lists by indenting list items by two spaces.\r\n\r\n    1. Item 1\r\n      1. A corollary to the above item.\r\n      2. Yet another point to consider.\r\n    2. Item 2\r\n      * A corollary that does not need to be ordered.\r\n      * This is indented four spaces, because it's two spaces further than the item above.\r\n      * You might want to consider making a new list.\r\n    3. Item 3\r\n\r\n\r\n# Code formatting\r\n\r\n## Inline formats\r\n\r\nUse single backticks (\\`) to format text in a special monospace format. Everything within the backticks appear as-is, with no other special formatting.\r\n\r\n    Here's an idea: why don't we take `SuperiorProject` and turn it into `**Reasonable**Project`.\r\n\r\n## Multiple lines\r\n\r\nShowdown wraps a code block in both `<pre>` and `<code>` tags.\r\n\r\nTo produce a code block in Markdown, simply indent every line of the block by at least 4 spaces or 1 tab.\r\n\r\n    This is a normal paragraph:\r\n    \r\n        This is a code block.\r\n\r\nYou can also use triple backticks to format text as its own distinct block.\r\n\r\n\r\n    Check out this neat program I wrote:\r\n    \r\n    ```\r\n    x = 0\r\n    x = 2 + 2\r\n    what is x\r\n    ```\r\n\r\n\r\n# Links\r\n\r\nShowdown supports two style of links: *inline* and *reference*.\r\n\r\n## Inline\r\n\r\nYou can create an inline link by wrapping link text in brackets ( `[ ]` ), and then wrapping the link in parentheses ( `( )` ).\r\n\r\nFor example, to create a hyperlink to `showdown.github.io`, with a link text that says, Showdown is great!, you'd write this in Markdown: \r\n\r\n    [Showdown is great!](http://showdown.github.io/)\r\n\r\n## Reference\r\n\r\nReference-style links use a second set of square brackets, inside which you place a label of your choosing to identify the link:\r\n\r\n    This is [an example][id] reference-style link.\r\n\r\nThen, anywhere in the document (usually at the end), you define your link label like this, on a line by itself:\r\n\r\n    [id]: http://example.com/  \"Optional Title Here\"\r\n\r\n\r\n# Tables\r\n\r\nTables aren't part of the core Markdown spec, but they are part of GFM and Showdown supports them by turning on the flag `tables`.\r\n\r\n```\r\n| Tables        | Are           | Cool  |\r\n| ------------- |:-------------:| -----:|\r\n| **col 3 is**  | right-aligned | $1600 |\r\n| col 2 is      | *centered*    |   $12 |\r\n| zebra stripes | ~~are neat~~  |    $1 |\r\n```\r\n\r\nthis will produce this:\r\n\r\n| Tables        | Are           | Cool  |\r\n| ------------- |:-------------:| -----:|\r\n| **col 3 is**  | right-aligned | $1600 |\r\n| col 2 is      | *centered*    |   $12 |\r\n| zebra stripes | ~~are neat~~  |    $1 |\r\n\r\n\r\nColons can be used to align columns.\r\n\r\nThe outer pipes (|) are **NOT** optional. But you don't need to make the raw Markdown line up prettily.\r\n\r\nYou can also use other markdown syntax inside them.\r\n\r\n\r\n[sd-logo]: https://raw.githubusercontent.com/showdownjs/logo/master/dist/logo.readme.png\r\n[releases]: https://github.com/showdownjs/showdown/releases\r\n[atx]: http://www.aaronsw.com/2002/atx/intro\r\n[setext]: https://en.wikipedia.org/wiki/Setext\r\n"
        ,
        html      = converter.makeHtml(text);
   // alert(html);

    $('.bbc').html(html);

});















