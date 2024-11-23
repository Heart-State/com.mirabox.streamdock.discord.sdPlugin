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
    clientId: $('#clientId'),
    open: $('#open'),
    output: $('#output'),
    outputBox: $('#outputBox'),
    input: $('#input'),
    inputBox: $('#inputBox'),
    mode: $('#mode'),
};

const $propEvent = {
    didReceiveSettings(data) {
        if ('mode' in data.settings) {
            $dom.mode.value = data.settings.mode
            // $dom.outputBox.style.display = 'flex'
            $dom.outputBox.style.display = 'none';
            $dom.inputBox.style.display = 'none';
            if ($dom.mode.value == 'input') {
                $dom.inputBox.style.display = 'flex';
            } else if ($dom.mode.value == 'output') {
                $dom.outputBox.style.display = 'flex';
            } else if ($dom.mode.value == 'both') {
                $dom.outputBox.style.display = 'flex';
                $dom.inputBox.style.display = 'flex';
            }
        }
        if ('inputDevices' in data.settings) {
            $dom.input.innerHTML = ''
            data.settings.inputDevices.forEach(item => {
                $dom.input.innerHTML += `<option value="${item.id}">${item.name}</option>`
            });
            $dom.input.value = data.settings.input
        }
        if ('outputDevices' in data.settings) {
            $dom.output.innerHTML = ''
            data.settings.outputDevices.forEach(item => {
                $dom.output.innerHTML += `<option value="${item.id}">${item.name}</option>`
            });
            $dom.output.value = data.settings.output
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

$dom.open.on('click', () => {
    $websocket.openUrl('https://discord.com/developers/applications')
})

$dom.mode.on('change', (e) => {
    $websocket.sendToPlugin({ mode: $dom.mode.value });
})

$dom.input.on('change', (e) => {
    $websocket.sendToPlugin({ input: $dom.input.value });
})

$dom.output.on('change', (e) => {
    $websocket.sendToPlugin({ output: $dom.output.value });
})