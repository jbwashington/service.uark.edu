$(function (){
    $.ajax({
        type: 'GET',
        url: '{{f:47389}}',
        data: { requrl: "http://volunteer.uark.edu/rss/volunteer-opportunity-calendar.xml" },
        success: function (xml) {

            // get most recent entry
            var today = new Date();


            var list_data = "";
            var terms = $(xml).find('item').get();
            terms.sort(function (t1, t2) {


                var h1 = (new Date($(t1).find('pubDate').text())),
                h2 = (new Date($(t2).find('pubDate').text()));

                return (h1 < h2) ? -1 : (h1 > h2) ? 1 : 0;
            });

            var i = 1;

            $.each(terms, function () {

                var pubDate = $(this).find('pubDate').text();

                if(new Date(pubDate) >= new Date())
                    {
                        if(i <= 5) {
                            var title = $(this).find('title').text();
                            var description = $(this).find('description').text();
                            description = description.replace("â€˜","'").replace("â€™","'").replace("â€œ","\"").replace("â€","\"");
                            var link = $(this).find('link').text();

                            list_data += '<div class="listEvent" style="margin: 10px 0;"><h4><a href="' + link + '">' + title + '</a></h4><p>' + description + '</p></div>';
                            i++;
                        }
                    }
            });
            $("#serviceEvents").append(list_data);

        }
    });


});

