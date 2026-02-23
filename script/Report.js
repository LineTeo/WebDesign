"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const Rabbit_Btn_H = document.getElementById('Btn-HTML');
    const Rabbit_Btn_J = document.getElementById('Btn-JAVA');
    const About_H = document.getElementById('About-H');
    const About_J = document.getElementById('About-J');

    const container = document.querySelector('main'); 
    const MainMenu = document.getElementById('btn_menu_cm');

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const buttonWidth_H = Rabbit_Btn_H.offsetWidth;
    const buttonHeight_H = Rabbit_Btn_H.offsetHeight;
 //   let mainPos = container.getBoundingClientRect();

    About_H.style.display = 'none';
    About_J.style.display = 'none';

    Rabbit_Btn_H.style.left = MainMenu.style.left;
    Rabbit_Btn_H.style.top = MainMenu.style.bottom;

    Rabbit_Btn_J.style.left = Rabbit_Btn_H.style.left;
    Rabbit_Btn_J.style.top = Rabbit_Btn_H.style.bottom;


    let counter = 0;
    let newX_H = 0;
    let newY_H = 0;
    Rabbit_Btn_H.addEventListener('click', function () {
        switch (counter) {
            case 0:
            newX_H = Math.random() * (containerWidth - buttonWidth_H);
            newY_H = Math.random() * (containerHeight - buttonHeight_H);
            // ボタンを移動
            Rabbit_Btn_H.style.left = newX_H + 'px';
            Rabbit_Btn_H.style.top = newY_H + 'px';
            Rabbit_Btn_H.textContent= "知りたい？";
            Rabbit_Btn_J.style.display = 'none';
            counter=counter+1;
            break;
            case 1:
            newX_H = Math.random() * (containerWidth - buttonWidth_H);
            newY_H = Math.random() * (containerHeight - buttonHeight_H);
            // ボタンを移動
            Rabbit_Btn_H.style.left = newX_H + 'px';
            Rabbit_Btn_H.style.top = newY_H + 'px';
            Rabbit_Btn_H.textContent= "どうしよっかなぁ～";
            counter=counter+1;
            break;
            case 2:
            newX_H = Math.random() * (containerWidth - buttonWidth_H);
            newY_H = Math.random() * (containerHeight - buttonHeight_H);
            // ボタンを移動
            Rabbit_Btn_H.style.left = newX_H + 'px';
            Rabbit_Btn_H.style.top = newY_H + 'px';
            Rabbit_Btn_H.textContent= "悩むなぁ～";
            counter=counter+1;
            break;
            case 3:
            newX_H = Math.random() * (containerWidth - buttonWidth_H);
            newY_H = Math.random() * (containerHeight - buttonHeight_H);
            // ボタンを移動
            Rabbit_Btn_H.style.left = newX_H + 'px';
            Rabbit_Btn_H.style.top = newY_H + 'px';
            Rabbit_Btn_H.textContent= "そこまでいうなら・・・";
            counter=counter+1;
            break;
            default:
            About_H.style.display = 'block';
            Rabbit_Btn_H.style.left = About_H.style.left;
            Rabbit_Btn_H.style.top = About_H.style.top;
            Rabbit_Btn_H.textContent= "HTMLについて";
            Rabbit_Btn_H.classList.add('CrBtn');
            Rabbit_Btn_H.style.position="static"
            About_J.style.display = 'block';
            Rabbit_Btn_J.style.display = 'block';
            Rabbit_Btn_J.style.left = About_J.style.left;
            Rabbit_Btn_J.style.top = About_J.style.top;
            Rabbit_Btn_J.classList.add('CrBtn');
            Rabbit_Btn_J.style.position="static"
        }
    });
    
    Rabbit_Btn_J.addEventListener('click', function () {
        if (About_H.style.display === 'none') {
            window.alert('先に「HTMLについて」を読んでください');
//        } else {
//            About_J.style.display = 'block';
        }
    });
    window.addEventListener('resize', function() {
        // 新しい要素位置を取得
        if (About_H.style.display === 'none' && Rabbit_Btn_J.style.display !== 'none'){
            mainPos = container.getBoundingClientRect();
            IniX_H = mainPos.left + 20;
            IniY_H = mainPos.top + 170;
            IniX_J = mainPos.left + 20;
            IniY_J = mainPos.top +220;
            Rabbit_Btn_H.style.left = IniX_H + 'px';
            Rabbit_Btn_H.style.top = IniY_H + 'px';
            Rabbit_Btn_J.style.left = IniX_J + 'px';
            Rabbit_Btn_J.style.top = IniY_J + 'px';
        } else{
            if(About_H.style.display === 'block'){
                IniPos_H = About_H.getBoundingClientRect();
                IniPos_J = About_J.getBoundingClientRect();
                Rabbit_Btn_H.style.left = IniPos_H.left + 'px';
                Rabbit_Btn_H.style.top = IniPos_H.top + 'px';
                Rabbit_Btn_J.style.left = IniPos_J.left + 'px';
            }
        }

    });
});