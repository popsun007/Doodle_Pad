//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately
var socket = io.connect();
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var pair_data = {};

//When clicking on control list items
$(".controls").on("click", "li", function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});
  
//When "New Color" is pressed
$("#revealColorSelect").click(function(){
  //Show color select or hide the color select
  changeColor();
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function(){
  //Append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});

//Erase drawing
$('.erase').click(function()
{
  var $newColor = $("<li style='visibility: hidden;'></li>");
  $newColor.css("background-color", "#FFFFFF");
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
})

//On mouse events on the canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //Draw lines
  if(mouseDown) {
    context.beginPath();

    // console.log(e);
    // console.log(context);

    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    pair_data.first = {offsetX: lastEvent.offsetX, offsetY:lastEvent.offsetY};
    context.lineTo(e.offsetX, e.offsetY);
    pair_data.last = {offsetX: e.offsetX, offsetY:e.offsetY};
    context.strokeStyle = color;
    pair_data.color = color;

    // console.log(context);

    context.stroke();
    lastEvent = e;
    


    socket.emit('drawling_req', pair_data);

  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});


socket.on('drawling_response', function(output){
    // console.log('hehe');
    // console.log(output);
    // console.log('lol');
    context.beginPath();

    // console.log(e);
    // console.log(context);

    context.moveTo(output.first.offsetX, output.first.offsetY);
    context.lineTo(output.last.offsetX, output.last.offsetY);
    context.strokeStyle = output.color;

    // console.log(context);

    context.stroke();

})












