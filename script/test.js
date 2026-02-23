      document.addEventListener("DOMContentLoaded", function () {
        const hobbyContent1 = document.getElementById("detail_1");
        const hobbyContent2 = document.getElementById("detail_2");
        const hobbyTitle1 = document.getElementById("hobbyTitle1");
        const hobbyTitle2 = document.getElementById("btn_h2");

        // タイマーIDを保持する変数
        let timer1 = null;
        let timer2 = null;

        const images1 = ["photo/1.png", "photo/2.png", "photo/3.png"];
        const images2 = ["photo/1.png", "photo/2.png", "photo/3.png"];

        // 初期状態は非表示
        hobbyContent1.style.display = "none";
        hobbyContent2.style.display = "none";

        // 趣味1の画像切替を停止する関数
        function stopCarousel1() {
          if (timer1) {
            clearInterval(timer1);
            timer1 = null;
          }
        }

        // 趣味2の画像切替を停止する関数
        function stopCarousel2() {
          if (timer2) {
            clearInterval(timer2);
            timer2 = null;
          }
        }

        // 趣味1のクリックイベント
        hobbyTitle1.addEventListener("click", function () {
          // まず現在のタイマーを止める（重複防止）
          stopCarousel1();

          if (hobbyContent1.style.display === "block") {
            hobbyContent1.style.display = "none";
          } else {
            // 他のセクションを閉じてタイマーを止める
            hobbyContent2.style.display = "none";
            stopCarousel2();

            hobbyContent1.style.display = "block";

            // 新しくタイマーを開始
            let currentIndex = 0;
            const imgElement = document.getElementById("Tr-image");
            const timerInterval = 1500;

            timer1 = setInterval(function () {
              currentIndex = (currentIndex + 1) % images1.length;
              imgElement.src = images1[currentIndex];
            }, timerInterval);
          }
        });

        // 趣味2のクリックイベント
        hobbyTitle2.addEventListener("click", function () {
          // まず現在のタイマーを止める（重複防止）
          stopCarousel2();

          if (hobbyContent2.style.display === "block") {
            hobbyContent2.style.display = "none";
          } else {
            // 他のセクションを閉じてタイマーを止める
            hobbyContent1.style.display = "none";
            stopCarousel1();
            hobbyContent2.style.display = "block";

            // 新しくタイマーを開始
            let currentIndex = 0;
            const imgElement = document.getElementById("Dub-image");
            const timerInterval = 1500;

            timer2 = setInterval(function () {
              currentIndex = (currentIndex + 1) % images2.length;
              imgElement.src = images2[currentIndex];
            }, timerInterval);
          }
        });
      });
