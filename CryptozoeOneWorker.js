let life;
let board;
importScripts('./CryptozoeCore.js');
onmessage = function({data: {action, data}}) {
    console.log(data, action);
    switch(action) {
        case "init":
            console.log('init one worker', data, crossOriginIsolated);
            data.sharedBuffer = new ArrayBuffer(data.height * data.width * 16);
            life = new Life({
                ...data,
                tickcb: () => (life.lookat && postMessage({action: 'look', data : {
                    gen: life.lookat.gen,
                    html: life.lookat.toHTML()
                }}))
            });
            life.tick();
            board = new BoardView(data);
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
            postMessage({action: 'init'});
            break;
        //PING-PONG VER
        case "tick":
            life.tick();
            break;
        case "step":
            board.tick();
            life.step();
            break;
        case "eval":
            eval(data);
            break;
        case "click":
            const [x,y, gen] = data;
            if(life.getRat([x, y])) {
                life.lookat = life.getRat([x, y]);
            } else {
                life.lookat = new Rat({x, y, life, gen});
            }
            if(life.paused) life.step();
            break;
        case "pause":
            board.paused = !board.paused;
            if(!(life.paused = !life.paused)) life.tick();
            break;
        case "log":
            console.log(life);
            break;
        case "genChange":
            if(life.lookat) life.lookat.gen = data;
            break;
        case "tickChange":
            life.tickTime = +data > 2 ? +data : life.tickTime;
            break;
        default: console.error('Unknown message', data);
    }
};