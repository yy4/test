$(document).ready(function () {
    // #first_game,#start_game,#re_game
    // $('#first_game').children("img").click(function (e) {
    //
    // })
    $('#first_game').on("click","img:last-child",function (e) {
        // console.log("???")
        $(e.delegateTarget).fadeOut(100);
        $('#start_game').fadeIn(300);
    })
    // $('#start_game').on("click",function (e) {
    //     $(e.delegateTarget).fadeOut(100);
    // })
  
})