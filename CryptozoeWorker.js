let life;
importScripts('./CryptozoeCore.js');
onmessage = function({data}) {
    switch(data.action) {
        case "init":
            console.log('init worker', data.data, crossOriginIsolated);
            life = new Life({
                ...data.data,
                tickcb: () => (life.lookat && postMessage({action: 'look', data : {
                    gen: life.lookat.gen,
                    html: life.lookat.toHTML()
                }}))
            });
            life.tick();
            postMessage({action: 'init'});
            break;
        //PING-PONG VER
        case "tick":
            life.tick();
            break;
        case "step":
            life.step();
            break;
        case "eval":
            eval(data.data);
            break;
        case "click":
            const [x,y, gen] = data.data;
            if(life.getRat([x, y])) {
                life.lookat = life.getRat([x, y]);
            } else {
                life.lookat = new Rat({x, y, life, gen});
            }
            if(life.paused) life.step();
            break;
        case "pause":
            if(!(life.paused = !life.paused)) life.tick();
            break;
        case "log":
            console.log(life);
            break;
        case "genChange":
            if(life.lookat) life.lookat.gen = data.data;
            break;
        case "tickChange":
            life.tickTime = +data.data > 2 ? +data.data : life.tickTime;
            break;
        default: console.error('Unknown message', data);
    }
};