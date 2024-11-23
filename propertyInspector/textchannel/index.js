/// <reference path="../utils/common.js" />
/// <reference path="../utils/action.js" />

// $local 是否国际化
// $back 是否自行决定回显时机
// $dom 获取文档元素 - 不是动态的都写在这里面
const $local = true, $back = false, $dom = {
    main: $('.sdpi-wrapper'),
    authorizeBtn: $('#authorizeBtn'),
    authorizeBox: $('#authorizeBox'),
    initiateBox: $('#initiateBox'),
    initiateBoxx: $('#initiateBoxx'),
    select: $('#select'),
    select2: $('#select2'),
    box: $('#box'),
    box2: $('#box2'),
    open: $('#open'),
    clientId: $('#clientId'),
};
const $propEvent = {
    didReceiveSettings(data) {
        $dom.select.innerHTML = ''
        console.log(data.settings);
        data.settings.guilds.forEach(function (option) {
            let optionElement = document.createElement("option");
            optionElement.value = option.id;
            optionElement.innerText = option.name;
            $dom.select.appendChild(optionElement);
        });
        $dom.select2.innerHTML = ''
        data.settings.channels.forEach(function (option) {
            let optionElement = document.createElement("option");
            optionElement.value = option.id;
            optionElement.innerText = option.name;
            $dom.select2.appendChild(optionElement);
        });
        if (data.settings.select) {
            $dom.select.value = data.settings.select
        }
        if (data.settings.channel) {
            $dom.select2.value = data.settings.channel
        }

    },
    sendToPropertyInspector(data) {

        // console.log(data);
        if ('access_token' in data) {
            if (!data.access_token) {
                $dom.authorizeBox.style.display = 'block'
            } else {
                $dom.authorizeBox.style.display = 'none'
            }
        }
        if ('status' in data) {
            $dom.authorizeBox.style.display = 'block'
            $dom.box.style.display = 'none'
            $dom.box2.style.display = 'none'
        }
        if (data?.msg == "RPC_CONNECTION_TIMEOUT") {
            $dom.initiateBoxx.style.display = 'flex'
        }
        if (!data.initiate) {
            $dom.initiateBox.style.display = 'flex'
        } else {
            $dom.initiateBox.style.display = 'none'
        }
    }
};

$dom.authorizeBtn.on('click', (e) => {
    if ($dom.clientId.value != null && $dom.clientId.value != '') {
        $websocket.openUrl("http://127.0.0.1:3002/authorization?clientId=" + $dom.clientId.value)
    }
})

$dom.select.on('change', (e) => {
    $settings.select = e.target.value
    $websocket.sendToPlugin({ 'select': e.target.value, 'guilds': $settings.guilds })
})

$dom.select2.on('change', (e) => {
    $settings.channel = e.target.value
    $websocket.sendToPlugin({ 'select': $settings.select, 'guilds': $settings.guilds, 'channels': $settings.channels, 'channel': e.target.value })
})

$dom.open.on('click',() => {
    $websocket.openUrl('https://discord.com/developers/applications')
})