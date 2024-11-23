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
    rdio1: $('#rdio1'),
    rdio2: $('#rdio2'),
    slider: $('#slider'),
    box: $('#box'),
    clientId: $('#clientId'),
    open: $('#open'),
    temperatureslider: $('#temperatureslider'),
};
const $propEvent = {
    didReceiveSettings(data) {
        if (data.settings.rdio === 'input') {
            $dom.rdio1.value = data.settings.rdio
            $dom.rdio1.checked = true
            $dom.slider.max = 100
        } else {
            $dom.rdio2.value = data.settings.rdio
            $dom.rdio2.checked = true
            $dom.slider.max = 200
        }
        $dom.slider.value = data.settings.slider
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
            $dom.temperatureslider.style.display = 'none'
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

$dom.rdio1.on('change', (e) => {//输入
    $settings.rdio = e.target.value
    $websocket.sendToPlugin({ 'rdio': e.target.value })
})

$dom.rdio2.on('change', (e) => {//输出
    $settings.rdio = e.target.value
    $websocket.sendToPlugin({ 'rdio': e.target.value })
})

$dom.slider.on('change', (e) => {
    $settings.slider = e.target.value
    $websocket.sendToPlugin({ 'rdio': $settings.rdio, 'slider': e.target.value })
})

$dom.open.on('click', () => {
    $websocket.openUrl('https://discord.com/developers/applications')
})