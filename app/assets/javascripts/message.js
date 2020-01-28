$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="message__user-data">
            <div class="message__user-data--talker">
              ${message.user_name}
            </div>
            <div class="message__user-data--date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__content">
            <div class="message__content--text">
              ${message.content}
            </div>
            <div class="message__content--image"> 
              <img src=${message.image} >
            </div>   
          </div>
        </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__user-data">
           <div class="message__user-data--talker">
             ${message.user_name}
           </div>
           <div class="message__user-data--date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__content">
           <div class="message__content--text">
             ${message.content}
           </div>
         </div>
       </div>`
     return html;
    };
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
      $(".submit-btn").prop("disabled", false);   
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

})
});
