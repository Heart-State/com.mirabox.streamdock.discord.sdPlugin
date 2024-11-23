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
};

const $propEvent = {
    didReceiveSettings(data) {

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

        // if('count' in data){
        //     const canvas = document.createElement('canvas');
        //     const ctx = canvas.getContext('2d');

        //     const image = new Image();
        //     // image.crossOrigin = 'Anonymous'; // 如果图片来自不同的域名，确保它允许跨域请求
        //     // image.src = data.url;
        //     image.src = '../../static/icon/05.捠抦[Discord].png';

        //     image.onload = () => {
        //         // 调整 canvas 尺寸以适应图片
        //         canvas.width = image.width;
        //         canvas.height = image.height;

        //         // 在 canvas 上绘制图片
        //         ctx.drawImage(image, 0, 0);

        //         // 定义圆圈的半径
        //         const circleRadius = 40;
        //         const circleX = canvas.width - circleRadius - 10; // 右上角，留出10px的边距
        //         const circleY = circleRadius + 10; // 上方，留出10px的边距

        //         // 绘制红色圆圈
        //         ctx.beginPath();
        //         ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        //         ctx.fillStyle = 'red';
        //         ctx.fill();

        //         // 绘制白色数字
        //         ctx.font = 'bold 50px Arial';
        //         ctx.fillStyle = 'white';
        //         ctx.textAlign = 'center';
        //         ctx.textBaseline = 'middle';
        //         ctx.fillText(data.count, circleX, circleY);
        //         $websocket.setImage(canvas.toDataURL("image/png"));
        //         $websocket.setTitle(data.title,3,6);
        //     };
        // }
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