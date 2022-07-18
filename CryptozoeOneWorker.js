let life;
let board;
importScripts('./CryptozoeCore.js');
onmessage = function({data: {action, data}}) {
    // console.log(data, action);
    switch(action) {
        case "init":
            console.log('init one worker', data, crossOriginIsolated);
            // Shared... ((
            data.boardBuffer = new ArrayBuffer(data.height * data.width * 16);
            data.ratsBuffer = new ArrayBuffer(data.height * data.width * 16);// * ratsBufferKeys.length);
            life = new Life({
                ...data,
                tickcb: () => (life.lookat && postMessage({action: 'look', data : {
                    gen: life.lookat.gen,
                    html: life.lookat.toHTML(),
                    day: life.days + 1,
                }}))
            });
            life.tick();
            board = new BoardView(data);
            board.tick();
            break;
        case "step":
            life.step();
            board.tick();
            break;
        case "click":
            if(life.getRat(data)) life.lookat = life.getRat(data);
            postMessage({action: 'log', data:JSON.stringify({sun: life.getSunEnergy(...data), ...life.board.get(data)})});
            break;
        case "spawn":
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
            const {rats, cells} = life.total();
            console.log(life, rats, cells, (rats.length ? (rats.mineralsUsed + rats.m) : 0) + cells.m);
            break;
        case "genChange":
            if(life.lookat) life.lookat.gen = data;
            break;
        case "setParams":
            // console.log(life);
            Object.entries(data).forEach(([param, value]) => {
                switch(param) {
                    case "tickTime":
                        life.tickTime = +value > 2 ? +value : 3;
                        break;
                    case "size":
                        board.size = value;
                        board.ctx.canvas.width  = value * life.width;
                        board.ctx.canvas.height = value * life.height;
                        break;
                    case "layer":
                        life[param] = value;
                        break;
                    default:
                        console.log(param, value);
                        if(life[param] || life[param] === 0) life[param] = +value;
                        else console.warn(param, value)
                }
            });
            // console.log(life);
            break;
        case "tickChange":
            life.tickTime = +data > 2 ? +data : life.tickTime;
            break;
        default: console.error('Unknown message', data);
    }
};