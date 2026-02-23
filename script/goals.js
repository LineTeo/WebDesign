"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleGoals');
    const goalList = document.getElementById('goalList');

    toggleButton.addEventListener('click', function () {
        if (goalList.style.display === 'none' || goalList.style.display === '') {
            goalList.style.display = 'block';              // 目標一覧を表示
            toggleButton.textContent = '目標一覧を非表示'; // ボタンのテキストを変更
        } else {
            goalList.style.display = 'none';              // 目標一覧を非表示
            toggleButton.textContent = '目標一覧を表示';  // ボタンのテキストを変更
        }
    });
});