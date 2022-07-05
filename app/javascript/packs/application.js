import "bootstrap";
import "../stylesheets/application";
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

$(document).on("turbolinks:load", function(){
  $("#js-text_field").on("keyup", function(){
    let title = $.trim($(this).val());
    console.log(title);
    $.ajax({
      type: "GET",
      url: "/messages/searches",
      data: { title: title },
      dataType: "json"
    }).done(function(data){
      $(".js-messages li").remove();

      data.forEach((message, i) => {
        $(".js-messages").append(createHtml(message));
      });
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    });
  });
});

function createHtml(message) {
  return `<li class="message">
    <a href="/messages/${message.id}">${message.title}</a>
  </li>`
}
