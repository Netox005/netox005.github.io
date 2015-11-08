/* TODO:
    > Add format to project items:
        - "*text*"       ->        "<b>text</b>"
        - "-text-"       ->        "<i>text</i>"
        - "[[text]]"     ->  "<code>text</code>"
        - "[text](url)"  ->  "<a href="url" target="_blank">text</a>"
        - "´text´"       ->  "<small>text</small>"
 */

$(document).ready(function() {
    var projectsEl = $('.wrapper section'),
        removeIfLoadedEl = $('.wrapper section #remove-if-loaded');

    $.getJSON(
        './projects.json',
        null,
        function(data) {
            for(var projectId in data) {
                var project = data[projectId];
                var projectEl = $('<div class="project" id="' + projectId + '"></div>').appendTo(projectsEl), descEl, infoEl;

                projectEl.append('<a href="#' + projectId + '"><h1 class="title" title="Click to get the permalink">' + project.title + '</h1></a>');

                descEl = $('<div class="description"></div>').appendTo(projectEl);
                project.description.split('\n').forEach(function(descLine) {
                    descEl.append('<p>' + descLine + '</p>');
                });

                infoEl = $('<div class="info"></div>').appendTo(projectEl);
                project['info-items'].forEach(function(item) {
                    console.log(item);
                    var itemEl = $('<div class="info-item"></div>').appendTo(infoEl),
                        isArray = item.text.constructor === Array;
                    itemEl.append('<span class="info-item' + (isArray ? ' display-block' : '') + '">' + item.name + '</span>');
                    if(!isArray) {
                        item.text.split('\n').forEach(function(textLine) {
                            itemEl.append('<p>' + textLine + '</p>');
                        })
                    } else {
                        var listEl = $('<ul></ul>').appendTo(itemEl);
                        item.text.forEach(function(listItem) {
                            listEl.append('<li>' + listItem + '</li>')
                        })
                        if(item['list-profit']) {
                            listEl.append([
                                '<li>',
                                    '<span style="cursor: help;" onmouseover="$(this).parent().find(\'span.hidden-text\').show();" onmouseout="$(this).parent().find(\'span.hidden-text\').hide();">???</span > ',
                                    '<span class="hidden-text">' + item['list-profit'] + '</span>',
                                '</li>'
                            ].join(''));
                            listEl.append('<li>Profit!</li>');
                        }
                    }
                });
            }
            removeIfLoadedEl.remove();
        }
    );
})