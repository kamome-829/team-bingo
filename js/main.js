$(() => {
  "use strict";

  let
    max = 99,
    bingo = [],
    status = true,
    roulette,
    random,
    number,
    result,
    $number = $("#number"),
    $result = $("#result");

  for(let i = 1; i <= max; i++) {
    bingo.push(i);
    $number.append($("<li>").text(("0" + i).slice(-2)));
  }

  $("#button").on("click", function(){
    if(status) {
      status = false;
      $(this).text("STOP");

      roulette = setInterval(function(){
        random = Math.floor(Math.random() * bingo.length);
        number = bingo[random];
        $result.text(number);
      }, 10);
    } else {
      status = true;
      $(this).text("START");

      clearInterval(roulette);

      result = bingo[random];
      bingo.splice(random, 1);

      $result.text(result);
      $number.find("li").eq(parseInt(result, 10) - 1).addClass("hit");
    }
  });
});
