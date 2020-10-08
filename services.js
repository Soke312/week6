$('#input-box').submit(function () {
    $.post({
        url: '/',
        data: JSON.stringify({"thing": $('#my-input').val()}),
        dataType: 'json',
    })
})

function getAllItems () {
    $.getJSON({
        url: '/list',
        success: function(data){
            var list = [];
            $.each(data.docs, function(i, item){
                list.push("<li>" + item.item + "</li>");
            })
            $("<ul>", {
                html: list.join("")
            }).appendTo("#list");
        }
    })
}
getAllItems();