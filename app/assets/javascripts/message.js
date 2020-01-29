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
  });
  
  
  var buildHTML = function(message) {
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
  };
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
