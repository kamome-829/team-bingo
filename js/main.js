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

  //音声ファイル初期化・読み込み
  const audio_drumroll = new Audio("../sounds/drum-roll1.mp3");
  const audio_rollfinish = new Audio("../sounds/roll-finish1.mp3");

  $("#button").on("click", function(){
    if(status) {
      status = false;
      $(this).text("STOP");

      roulette = setInterval(function(){
        random = Math.floor(Math.random() * bingo.length);
        number = bingo[random];
        $result.text(number);
        audio_drumroll.play();  //ドラムロールスタート
      }, 10);

      audio_rollfinish.pause();
      audio_rollfinish.currentTime = 0;
    } else {
      status = true;
      audio_drumroll.pause();
      audio_drumroll.currentTime = 0;     //ドラムロールストップ
      audio_rollfinish.currentTime = 0;   //ストップ時効果音
      audio_rollfinish.play();

      $(this).text("START");

      clearInterval(roulette);

      result = bingo[random];
      bingo.splice(random, 1);

      $result.text(result);
      $number.find("li").eq(parseInt(result, 10) - 1).addClass("hit");
    }
  });
});
