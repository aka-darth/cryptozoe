importScripts('./labirintCore.js');
let board;
onmessage = function({data}) {
    switch(data.action) {
        case "init":
            console.log('Renderer init:', data.data);
            board = new BoardView(data.data);
            const tick = () => {
                try {
                    // console.time('render');
                    board.tick();
                    // console.timeEnd('render');
                    requestAnimationFrame(tick);
                } catch (err) {
                    console.error(err);
                }
            }
            tick();
            break;
        case "pause":
            board.paused = !board.paused;
            break;
        case "step":
            board.tick();
            //requestAnimationFrame(tick);
            break;
        default: console.error('Unknown message', data);
    }
};