// ==UserScript==
// @name         temu-Automatically click to disagree
// @namespace    https:www.pw0n.xyz
// @version      0.5
// @description  自动点击指定的元素，并增加开始和暂停按钮
// @author       pw0n
// @match        https://seller.kuajingmaihuo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let isRunning = false; // 标记当前状态，是否自动点击
    let intervalId;

    function clickElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.click();
        });
    }

    function autoClick() {
        // 点击class为 RD_textWrapper_5-111-0 的元素
        clickElements('div.RD_textWrapper_5-111-0.RD_prevRadio_5-111-0');
        clickElements('div.RD_radioWrapper_5-114-0')

        // 点击"我已知晓风险，本次不再提醒"的元素
        clickElements('div.CBX_squareInputWrapper_5-114-0');
        // 点击确认按钮
        clickElements('button[data-tracking-id="zIb_kvR_JvmInKd9"].BTN_outerWrapper_5-111-0.BTN_danger_5-111-0.BTN_medium_5-111-0.BTN_outerWrapperBtn_5-111-0[data-testid="beast-core-button"]');
    }


    function startAutoClick() {
        if (!isRunning) {
            autoClick(); // 执行一次点击
            intervalId = setInterval(autoClick, 3000); // 每3秒执行一次
            isRunning = true;
        }
    }

    function stopAutoClick() {
        if (isRunning) {
            clearInterval(intervalId);
            isRunning = false;
        }
    }

    // 创建按钮
    function createControlButtons() {
        const startButton = document.createElement('button');
        const stopButton = document.createElement('button');

        startButton.textContent = '开始';
        stopButton.textContent = '暂停';

        startButton.style.position = 'fixed';
        startButton.style.top = '10px';
        startButton.style.left = '10px';
        startButton.style.zIndex = '9999';

        stopButton.style.position = 'fixed';
        stopButton.style.top = '10px';
        stopButton.style.left = '70px';
        stopButton.style.zIndex = '9999';

        startButton.addEventListener('click', startAutoClick);
        stopButton.addEventListener('click', stopAutoClick);

        document.body.appendChild(startButton);
        document.body.appendChild(stopButton);
    }

    // 页面加载后创建按钮
    window.onload = function() {
        createControlButtons();
    };
})();
