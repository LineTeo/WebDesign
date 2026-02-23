"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const hobbyContent1 = document.getElementById('detail_1');
    const hobbyContent2 = document.getElementById('detail_2');
    const hobbyContent3 = document.getElementById('detail_3');
    const hobbyTitle1 = document.getElementById('btn_h1');
    const hobbyTitle2 = document.getElementById('btn_h2');
    const hobbyTitle3 = document.getElementById('btn_h3');

    // 旅行先写真のリスト
    const images1=['photo/Akagi.png','photo/Boso.png','photo/chatsubomi.png','photo/Doai.png',
        'photo/Dotonbori.png','photo/Hakone.png','photo/KafuBanda.png','photo/Kamikochi.png',
        'photo/Nikko.png','photo/Oarai.png','photo/Sirakoma.png','photo/Tomioka.png','photo/Yoshi.png'
    ]
    const images2=['photo/Dub1.png','photo/Dub2.png','photo/Dub3.png','photo/Dub4.png',
        'photo/Dub5.png','photo/Dub6.png','photo/Dub7.png','photo/Dub8.png','photo/Dub9.png'
    ]
    // 初期状態は趣味の内容は非表示
    hobbyContent1.style.display = 'none';
    hobbyContent2.style.display = 'none';
    hobbyContent3.style.display = 'none';
  
    // タイマーIDを保持する変数
    let timer1 = null;
    let timer2 = null;

    // 旅行先写真の切替を停止する関数
    function stopCarousel1() {
        if (timer1) {
            clearInterval(timer1);
            timer1 = null;
        }
    }

    // ダブリンの写真切替を停止する関数
    function stopCarousel2() {
        if (timer2) {
            clearInterval(timer2);
            timer2 = null;
        }
    }

    // ボタンのクリックイベント
    hobbyTitle1.addEventListener('click', function () {
        // まず現在のタイマーを止める（重複防止）
        stopCarousel1();
        if (hobbyContent1.style.display === 'block'){   //すでにクリックした項目が展開済みの場合
            hobbyContent1.style.display ='none'         //折りたたむ
            hobbyTitle1.classList.remove('CrBtn');      //ボタンも元に戻す
        } else {
            hobbyContent1.style.display = 'block';      // 趣味1を表示
            hobbyTitle1.classList.add('CrBtn');         // 趣味1のボタンの書式変更
            hobbyContent2.style.display = 'none';       // 趣味2を非表示
            stopCarousel2();                            // 趣味2の画像切り替えを止める
            hobbyTitle2.classList.remove('CrBtn');      // 趣味2のボタン書式をもとに戻す
            hobbyContent3.style.display = 'none';       // 趣味3を非表示
            hobbyTitle3.classList.remove('CrBtn');      // 趣味3のボタン書式をもとに戻す
        }
        // 写真の切り替え
        let currentIndex = 0;                           //写真リストのインデックスを初期化
        const timerInterval = 1500;                     //切り替えインターバルを1.5秒に設定
        const imgElement = document.getElementById('Tr-image')
        // 次の画像を表示する関数

        timer1 = setInterval(function() {
            currentIndex = (currentIndex + 1) % images1.length;                 // 配列の範囲でループ
            imgElement.src = images1[currentIndex];    // 表示する写真を指定
        }, timerInterval);
    });
    hobbyTitle2.addEventListener('click', function () {
        // まず現在のタイマーを止める（重複防止）
        stopCarousel2();
        if (hobbyContent2.style.display === 'block'){
            hobbyContent2.style.display ='none'
            hobbyTitle2.classList.remove('CrBtn');
        } else {
            hobbyContent1.style.display = 'none';       // 趣味1を非表示
            stopCarousel1();                            // 趣味1の画像切り替えを止める
            hobbyTitle1.classList.remove('CrBtn');
            hobbyContent2.style.display = 'block';      // 趣味2を書式変更して表示
            hobbyTitle2.classList.add('CrBtn');
            hobbyContent3.style.display = 'none';       // 趣味3を非表示
            hobbyTitle3.classList.remove('CrBtn');
        }
        let currentIndex = 0;
        const timerInterval = 1500;                     //切り替えインターバルを1.5秒に設定
        const imgElement = document.getElementById('Dub-image')

        // 画像切り替え
        timer2 = setInterval(function()  {
            currentIndex = (currentIndex + 1) % images2.length; // 配列の範囲でループ
            imgElement.src = images2[currentIndex];
        }  , timerInterval);
    });
    hobbyTitle3.addEventListener('click', function () {
        if (hobbyContent3.style.display === 'block'){
            hobbyContent3.style.display ='none'
            hobbyTitle3.classList.remove('CrBtn');
        } else {
            hobbyContent1.style.display = 'none';      // 趣味1を非表示
            hobbyTitle1.classList.remove('CrBtn');
            hobbyContent2.style.display = 'none';      // 趣味2を非表示
            hobbyTitle2.classList.remove('CrBtn');
            hobbyContent3.style.display = 'block';     // 趣味3を表示変更して表示
            hobbyTitle3.classList.add('CrBtn');
        }
    


    });
});