// JS - Jedi Solution.
const etalon = 256;
const elPerUnit = 6;
const genStr = {
    '00': 'clone',
    '01': 'sun',
    '02': 'step',
    //'03': 'clone as new',
    '04': 'sex',
    '05': 'turn right',
    '06': 'turn left',
    '07': 'резерв',
    // '08': 'kill all',
    '09': 'kill',

    '10': 'eat target',
    '11': 'take mineral',
    '12': 'eat mineral for energy',
    '13': 'feed',
    '14': 'eat organic',
    // '15': 'eat target organic',
    '16': 'take target cell mineral',
    '17': 'shit',
    '18': 'give mineral',

    '20': 'mind cell sun',
    '21': 'mind self energy',
    '22': 'mind self mineral',
    '23': 'mind target cell organic',
    '24': 'mind cell organic',
    '25': 'mind is target cell empty',
    '26': 'mind target mineral',
    '27': 'mind target gen same length',
    '28': 'mind cell mineral',
    '29': 'tell',

    '32': 'not mind',
    '33': 'mind--',
    '34': 'mind++',
    '35': '<<mind',
    '36': '>>mind',
    '37': 'deanalog',
    '38': 'mind 0',

    '40': '? <<1',
    '41': '? <<2',
    '42': '? <<3',
    '43': '? <<4',
    '44': '? <<5',
    '45': '? <<6',
    '46': '? <<7',
    '47': '? <<8',
    '48': '? <<9',
    '49': '? <<10',
    '50': '? >>1',
    '51': '? >>2',
    '52': '? >>3',
    '53': '? >>4',
    '54': '? >>5',
    '55': '? >>6',
    '56': '? >>7',
    '57': '? >>8',
    '58': '? >>9',
    '59': '? >>10',
};
const genFullStr = {
    '00': 'Деление клетки',
    '01': 'Фотосинтез',
    '02': 'Шаг',
    // '03': 'clone as new',
    '04': 'Секс',
    '05': 'Поворот направо',
    '06': 'Поворот налево',
    '07': 'Резерв..',
    // '08': 'kill all',
    '09': 'Убить',

    '10': 'Укусить',
    '11': 'Взять минерал',
    '12': 'Переварить минерал',
    '13': 'Передать энергию организму перед носом',
    '14': 'Съесть органику',
    // '15': 'eat target organic',
    '16': 'Взять минерал из клетки перед носом',
    '17': 'Высрать переваренный минерал',
    '18': 'Дать минерал',

    '20': 'Запомнить уровень освещенности своей клетки',
    '21': 'Запомнить свой запас энергии',
    '22': 'Запомнить свой запас минералов',
    '23': 'Запомнить количество органики в клетке перед носом',
    '24': 'Запомнить количество органики в своей клетке',
    '25': 'Запомнить есть ли в клетке перед носом организм',
    '26': 'Запомнить количество минералов в клетке перед носом',
    '27': 'Запомнить является ли сородичем организм перед носом',
    '28': 'Запомнить количество минералов в своей клетке',
    '29': 'Сообщить значение памяти клетке перед носом',

    '32': 'Если в памяти ненулевое значение, поставить 0, иначе 1',
    '33': 'Отнять 1 от памяти',
    '34': 'Прибавить 1 к памяти',
    '35': 'Перейти по днк назад на число из памяти',
    '36': 'Перейти по днк вперед на число из памяти',
    '37': 'Если значение памяти > 128, запомнить 1, иначе 0',
    '38': 'Запомнить 0',

    '40': 'Если в памяти не пусто, перейти на 1 ген назад',
    '41': 'Если в памяти не пусто, перейти на 2 гена назад',
    '42': 'Если в памяти не пусто, перейти на 3 гена назад',
    '43': 'Если в памяти не пусто, перейти на 4 гена назад',
    '44': 'Если в памяти не пусто, перейти на 5 генов назад',
    '45': 'Если в памяти не пусто, перейти на 6 генов назад',
    '46': 'Если в памяти не пусто, перейти на 7 генов назад',
    '47': 'Если в памяти не пусто, перейти на 8 генов назад',
    '48': 'Если в памяти не пусто, перейти на 9 генов назад',
    '49': 'Если в памяти не пусто, перейти на 10 генов назад',
    '50': 'Если в памяти не пусто, перейти на 1 ген вперед',
    '51': 'Если в памяти не пусто, перейти на 2 гена вперед',
    '52': 'Если в памяти не пусто, перейти на 3 гена вперед',
    '53': 'Если в памяти не пусто, перейти на 4 гена вперед',
    '54': 'Если в памяти не пусто, перейти на 5 генов вперед',
    '55': 'Если в памяти не пусто, перейти на 6 генов вперед',
    '56': 'Если в памяти не пусто, перейти на 7 генов вперед',
    '57': 'Если в памяти не пусто, перейти на 8 генов вперед',
    '58': 'Если в памяти не пусто, перейти на 9 генов вперед',
    '59': 'Если в памяти не пусто, перейти на 10 генов вперед',
};
const gengen = (l = 32) => {
    let gen = '';
    while(l--) {
        gen += Math.floor(99 * Math.random());
    }
    return gen;
};
Array.prototype.random = function() {
    return this[Math.floor(Math.random()*this.length)];
};
const uint = smth => smth <= 0 ? 0 : smth > 255 ? 255 : ~~smth;
const aCHPU = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖', '-'];
const keyCHPU = (key, data) => {
    if(key === 'a') data = aCHPU[data];
    return `${({
        'e': 'Энергия', 'p': 'Позиция рнк', 'uo': 'Потребление органики', 'a': 'Нос', 'dm': 'Потребление минералов', 'freeze': 'Отдых', 'frag': 'Агрессивность', 'm': 'Минералов', 'd': 'Память', 'c':'Поколение', 'sun': 'Потребление солнца', 'i': 'Возраст'
    })[key] || key}: ${data}`
};

const genCHPU = gen => genDesc.innerHTML = gen ? gen.match(/.{2}/g)
    .map(gen => genStr[gen]).join(', ')
    .match(/.{1,80}\s/g).join('<br/>') : '';

const genfilter = (gen, omit = []) => gen.split('').reduce((arr, s) => {
    if(!arr[arr.length - 1]){
        arr.push(s);
    } else if(arr[arr.length - 1].length === 1){
        arr[arr.length - 1] += s;
    } else {
        arr.push(s);
    }
    return arr;
}, []).filter(pair => !!genStr[pair] && !omit.includes(pair)).join('');
const mutate = gen => gen.split('').reduce((str, s) => `${str}${Math.random() > .9 ? Object.keys(genStr).random() : s}`, Math.random() > .8 ? Object.keys(genStr).random() : '');
// const mutate = gen => `${gen}${Object.keys(genStr).random()}`;

const circle = (ctx, x, y, radius, color = 'white') => {
    ctx.beginPath();
    ctx.arc(x, y, radius - 1 /*muhaha*/, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

// TODO: second layer (and renderer?) for rats
class RatsView {}

class BoardView {
    constructor({offscreen, ctx, sharedBuffer, width, height, size}){
        this.ctx = ctx || (offscreen && offscreen.getContext("2d"));
        this.ctx.canvas.width  = size * width;
        this.ctx.canvas.height = size * height;
        this.ctx.strokeStyle = '#777777';
        this.ctx.lineWidth = .1;
        this.represent = new Uint16Array(sharedBuffer);
        this.width = width;
        this.height = height;
        this.size = size;
    }
    tick() {
        for(let x=0, y=0, i=0; y < this.height; i++, x++, x>=this.width && (x=0, y++)) {
            const [s, r, g, b, o, m] = this.represent.slice(elPerUnit * i, elPerUnit * (i+1));
            try{
                this.render({x, y, s, r, g, b, o, m})
            } catch(err) {
                console.log(i,  {x, y, s, r, g, b, o, m}, this.represent.slice(elPerUnit * i, elPerUnit * (i + 1)));
                console.error(err);
            }
        }
    }
    render(cell) {
        // console.log(cell);
        // ctx.fillStyle = `rgb(${cell.r}, ${cell.g}, ${cell.b})`;
        // ctx.fillRect(cell.x * size, cell.y * size, size, size);
        // this.circle(cell.x * size, cell.y * size, size, `rgb(${cell.r}, ${cell.g}, ${cell.b})`);
        if(cell.s) {
            circle(this.ctx, cell.x * this.size + this.size/2, cell.y * this.size + this.size/2, this.size >>> 1, `rgb(${cell.r}, ${cell.g}, ${cell.b})`);
            // const [x,y] = Rat.prototype.getDir.call({a: this.s-1});
            // this.ctx.beginPath();
            // this.ctx.moveTo(cell.x * this.size + this.size/4, cell.y * this.size + this.size/2);
            //ctx.strokeRect(cell.x * size + size/2, cell.y * size + size/2, size, size);
        } else {
            this.ctx.fillStyle = `rgb(${cell.r}, ${cell.g}, ${cell.b})`;
            this.ctx.fillRect(cell.x * this.size, cell.y * this.size, this.size, this.size);
        }
        if (cell.o) {
            this.ctx.fillStyle = 'white';
            const s = cell.o * this.size >>> 7;
            this.ctx.fillRect(cell.x * this.size + this.size/2 - s/2, cell.y * this.size + this.size/2 - s/2, s, s);
        }
    }
}
class Board2  {
    constructor(life) {
        this.life = life;
        this.width = life.width;
        this.data = new Uint8Array(life.width * life.height *  2);
        let i = 0;
        while (i < life.width * life.height *  2) {
            this.data[i] = life.initO;
            this.data[i + 1] = Math.floor(i / life.width) * (etalon/life.height) * life.initM >>> 0;
            i+=2;
        }
    }
    get([x,y]) {
        return {o: this.data[(this.width * y + x)*2], m: this.data[(this.width * y + x)*2 + 1]}
    }
    set([x,y], {o = -1, m = -1}) {
        if(~o) {
            this.data[(this.width * y + x)*2] = o;
        }
        if(~m) {
            this.data[(this.width * y + x)*2 + 1] = m;
        }
    }
    represent([x,y]) {
        const cell = this.get([x,y]);
        return [
            0,
            this.life.getSunEnergy(x, y),
            this.life.getSunEnergy(x, y) >>> 1,
            cell.m * 2,
            cell.o, cell.m
        ].map(uint);
    }
    up_represent(x, y) {
        this.life.buffer.set(this.represent([x,y]), this.life.xyBufferPos(x, y));
    }
}
class Rat {
    constructor({
                    life,
                    x, y, e = 64, m = 16, d = 0,
                    a =  Math.floor(Math.random() * 8), gen, c = 0, s = 0, p = 0, sun = 0, frag = 0
                }){
        this.life = life;
        this.x = x;
        this.y = y;
        this.gen = gen || '0100';
        this.freeze = 0;
        this.e = e; // energy
        this.m = m; // mineral
        this.p = p; // pointer
        this.d = d; // data
        // this.s = s; // signal
        this.c = c; // copy index
        this.a = a; // align
        this.sun = sun; // foto use
        this.dm = 0; // min use
        this.em = 0; // min eated
        this.uo = 0; // o use
        this.frag = frag; // aggressive
        this.i = 0; // ticks
        this.life.obj.push(this);
        // this.up_represent();
    }
    bufferKeys= ['x','y','e','m','p','d','c','a','dm','uo','frag','i','freeze']
    toBuffer(){
        return this.bufferKeys.map(key => this.key);
        /*
         [
         this.x, this.y, this.e, this.m,
         this.p, this.d, this.c, this.a,
         this.dm, this.uo, this.frag, this.i,
         this.freeze,
         this.childGen, this.gen
         ];
         */
    }
    fromBuffer(buffer){
        this.buffer = new Uint16Array(this.bufferKeys.length)
        this.bufferKeys.forEach((param, i) => {
            Object.defineProperty(this, param, {
                get: () => this.buffer[i],
                set: value => this.buffer.set(i, value)
            });
            this[param] = data[param];
        });
    }

    get xy(){
        return [this.x, this.y];
    }
    get bufferPos() {
        return elPerUnit * (this.y * this.life.width + this.x);
    }
    get target_xy() {
        const [x, y] = this.getDir();
        const target = {x: this.x + x, y: this.y + y};
        if(target.x < 0) target.x = this.life.width - target.x;
        if(target.x >= this.life.width) target.x = target.x - this.life.width;
        return [target.x, target.y];
    }
    get target(){
        return this.life.getRat(this.target_xy);
    }
    getDir(){
        let x = 0;
        let y = 0;
        if([1, 2, 3].includes(this.a)) x = 1;
        if([5, 6, 7].includes(this.a)) x = -1;
        if([0, 1, 8].includes(this.a)) y = -1;
        if([3, 4, 5].includes(this.a)) y = 1;
        if(this.y + y < 0 || this.y + y > this.life.height - 1) {
            this.turn();
            return this.getDir();
        }
        return [x, y];
    }
    getTarget(){
        const [x, y] = this.getDir();
        const target = {x: this.x + x, y: this.y + y};
        if(target.x < 0) target.x = this.life.width - target.x;
        if(target.x >= this.life.width) target.x = target.x - this.life.width;
        return [target.x, target.y];
    }
    toHTML(){
        return Object.keys(this)
                .filter(key => !['life', 'bufferKeys', 'gen', 'p', 'em'].includes(key))
                .map(key => keyCHPU(key, this[key]))
                .join('<br/>') + `<br/>
				Позиция РНК: ${this.p/2}<br/>
				Ген: ${this.gen.slice(this.p, this.p + 2)} (${genFullStr[this.gen.slice(this.p, this.p + 2)]})
				`;
    }
    represent() {
        return [
            this.a + 1,
            this.frag * 2 + this.uo,
            this.sun + this.uo + (this.dm >>> 1),
            this.dm << 2,
            0, 0
        ].map(uint);
    }
    up_represent() {
        // console.log(2 * (this.y * this.life.width + this.x), this.represent())
        this.life.buffer.set(this.represent(), this.bufferPos);
    }

    tick(){
        try {
            if(!(--this.freeze > 0)) {
                const gen = this.gen.slice(this.p, this.p + 2);
                if(this.life.genDict[gen]) {
                    this.life.genDict[gen](this);
                    // this.up_represent();
                } else {
                    this.gen = this.gen.substr(0, this.p) + this.gen.substr(this.p + 2, this.gen.length);
                    this.e -= 1;
                    //console.log('bad gen', this.p, this.gen, this.gen.slice(this.p, this.p + 2));
                }
                this.p += 2;
                if(this.p >= this.gen.length || this.p < 0) this.p = 0;
            }
            this.live();
        } catch (err) {
            console.error(this, err);
            this.die();
        }
    }
    live(){
        this.e -= 1;
        if (this.e <= 0 || (this.i++ / this.life.age > this.gen.length)) {
            this.die();
        } else {
            if(this.sun > 0) this.sun--;
            if(this.frag > 0) this.frag--;
            if(this.uo > 0) this.uo--;
            if(this.dm > 0) this.dm--;
            if(this.e > 255) this.e = 255;
        }
    }
    die(){
        const cell = this.life.board.get(this.xy);
        // console.log('die', cell, this, this.xy, this.life.board.represent(this.xy));
        if(cell) {
            this.life.board.set(this.xy, {
                m: cell.m + this.m + this.em,
                o: cell.o + (this.e > 0 ? this.e * this.life.backO >>> 0 : 1),
            });
        } else {
            console.error(this);
        }
        // this.life.buffer.set(this.life.board.represent(this.xy), this.bufferPos);

        this.life.obj.splice(this.life.obj.indexOf(this), 1);
        if(this.life.lookat === this) this.life.lookat = null;
    }

    step(){
        const [x,y] = this.target_xy;
        const cell = this.life.board.get([x, y]);
        if(cell.m > 128) {
            // console.log('cant move', this, next);
            return;
        }
        if (!this.target) {
            // const prev = [this.x, this.y];
            this.x = x;
            this.y = y;
            if(this.y < 1) this.y = 0;
            if(this.y > this.life.height - 2) this.y = this.life.height - 1;
            this.freeze = 2;
            // this.up_represent();
            // this.life.board.up_represent(...prev);
        } else {
            // console.log('cant move', this, next);
        }
    }
    clone(n){
        // console.log('clone', this);
        const [x, y] = this.target_xy;
        if(
            // y >= 0 && y < this.life.height &&
        this.life.board.get([x,y]).o < 64 && this.life.board.get([x,y]).m < 128 && this.i > this.gen.length * 4
        ) {
            if(this.target) {
                this.turn();
            } else {
                new Rat({
                    life: this.life,
                    x, y,
                    c: n ? 0 : this.c + 1,
                    e: this.e >>> 1,
                    m: this.m/2 > 1 ? Math.ceil(this.m / 2) : 0,
                    a: this.a,
                    sun: this.sun >>> 1,
                    frag: this.frag >>> 1,
                    gen: this.childGen || Math.random() < .95 ? this.gen : mutate(this.gen)
                });
                this.e = this.e >>> 1;
                this.m = this.m >>> 1;
                this.freeze = Math.max(this.gen.length >>> 2, 8);
            }
        }
        this.e--;
    }
    turn(side){
        if(side) {
            this.a--;
            if(this.a < 0) this.a = 7;
        } else {
            this.a++;
            if(this.a > 7) this.a = 0;
        }
        this.e--;
    }
    kill(){
        if(this.target && this.e > 4) {
            this.target.die();
            this.frag += this.life.agressive;
        }
        this.freeze -= this.life.aggressive >>> 1;
    }
    killAll(){
        let a = 8, oa = this.a;
        while(a--) {
            this.a = a;
            this.kill();
        }
        this.a = oa;
    }
    eat(type, target) {
        switch(type) {
            case 'm':
                if(this.m > 1) {
                    this.e += 2 * this.life.minP;
                    this.dm += 2 * this.life.minP;
                    this.m -= 2;
                    this.em += 2;
                }
                break;
            case 'o':
                let [x,y] = target ? this.target_xy : this.xy;
                const cell = this.life.board.get([x,y]);
                if(cell && cell.o > 2) {
                    this.e += 2 * this.life.orgP;
                    this.uo += 2 * this.life.orgP;
                    this.life.board.set([x,y], {o: cell.o - 2});
                }
                break;
            case 'e':
                if(this.target && this.e > 4) {
                    const eate = Math.max(this.target.e, this.life.agressive);
                    this.target.e -= eate;
                    this.e += eate >>> 1;
                    this.frag += eate >>> 1;
                } else {
                    this.e -= 4;
                }
                break;
            default:
                console.warn('Cant eat!', type, infront, this);

        }
    }
    give(type, target) {
        switch(type) {
            case 'm':
                if(this.m > 1) {
                    if(target && this.target) {
                        this.target.m += 2;
                        this.m -= 2;
                    } else {
                        this.life.board.get(this.xy).m += 2;
                        this.em -= 2;
                    }
                }
                break;
            case 'o':
                let [x,y] = target ? this.target_xy : this.xy;
                const cell = this.life.board.get([x,y]);
                if(cell) {
                    this.e -= 2 * this.life.orgP;
                    this.life.board.set([x,y], {o: cell.o - 2});
                }
                break;
            case 'e':
                if (this.target && this.e > 16) {
                    this.target.e += 8;
                    this.e -= 8;
                }
                break;
            case 'd':
                if(this.target) {
                    this.target.d = this.d;
                }
                break;
            default:
                console.warn('Cant eat!', type, infront, this);

        }
    }
    sex(){
        if(this.target) {
            this.target.childGen = '';
            for(let i = 0; i < this.gen.length; i += 2){
                this.target.childGen += ((i/2) % 2 && Math.random() > .5) ? this.target.gen.slice(i, i + 2) : this.gen.slice(i, i + 2);
            }
            this.e -= 8;
        }
    }
}

class Life {
    constructor(data) {
        console.log('New life start', data);
        Object.assign(this, data, {
            obj: [],
            tickTime: data.tickTime > 1 ? data.tickTime : 1
        });
        this.buffer = new Uint16Array(data.sharedBuffer);
        this.board = new Board2(this);
        this.sunC = etalon / this.sunOpacity;
        this.propC = etalon / this.height;
        this.agressive = this.agressive << 2;
        for(let i = 0; this.genbank.length && i < this.width; i++) {
            new Rat({life: this, x: Math.floor(this.width * Math.random()), y:  this.height - Math.floor(Math.random() * this.height / 2), gen: this.genbank[i % this.genbank.length]});
        }
        this.represent();
    }
    genDict = {
        // clone
        '00': rat => rat.clone(),
        // sun
        '01': rat => {
            // console.log('eat', (this.getSunEnergy(...rat.xy) * this.sunP) >>> 2, rat);
            rat.e += (this.getSunEnergy(...rat.xy) * this.sunP) >>> 2;
            rat.sun += (this.getSunEnergy(...rat.xy) * this.sunP) >>> 2;
        },
        // step
        '02': rat => rat.step(),
        '03': rat => rat.e > 64 && rat.clone(true),
        '04': rat => rat.sex(),
        // turn right
        '05': rat => rat.turn(),
        // turn left
        '06': rat => rat.turn(true),
        // virus
        '07': rat => {
            if(rat.target) {
                rat.target.gen = `7${rat.target.gen}`;
            }
        },
        // kill all
        '08': rat => rat.killAll(),
        // kill
        '09': rat => rat.kill(),
        // eat e target
        // '10': rat => rat.eat('e', true),
        // take m
        '11': rat => {
            const cell = this.board.get(rat.xy);
            if (cell && cell.m > 8 && rat.m < 255) {
                rat.m += 8;
                rat.e -= 1;
                this.board.set(rat.xy, {m: cell.m - 8})
            }
        },
        // eat m
        '12': rat => rat.eat('m'),
        // give e
        '13': rat => rat.give('e'),
        // eat o
        '14': rat => rat.eat('o'),
        // eat o target
        // '15': rat => rat.eat('o', true),
        // take target m
        '16': rat => {
            const cell = this.board.get(rat.target_xy);
            if (cell && cell.m > 8 && rat.m < 255) {
                rat.m += 8;
                rat.freeze = 2;
                this.board.set(rat.target_xy, {m: cell.m - 8})
            }
        },
        // shit m
        '17': rat => rat.give('m'),
        // give m
        '18': rat => rat.give('m' , true),

        // mind cell sun level
        '20': rat => rat.d = this.getSunEnergy(...rat.xy),
        // mind self e
        '21': rat => rat.d = rat.e,
        // mind self m
        '22': rat => rat.d = rat.m,
        // put d target o
        '23': rat => rat.d = this.board.get(rat.target_xy).o,
        // put d place o
        '24': rat => rat.d = this.board.get(rat.xy).o,
        // is target?
        '25': rat => rat.d = +rat.target,
        // mind target m
        '26': rat => rat.d = this.board.get(rat.target_xy) && this.board.get(rat.target_xy).m,
        // is target sibling
        '27': rat => rat.d = rat.target && rat.target.gen.length === rat.gen.length,
        // mind cell m
        '28': rat => rat.d = this.board.get(rat.xy).m,
        // tell
        '29': rat => rat.give('d'),

        // not
        '32': rat => rat.d = !rat.d,
        // --
        '33': rat => rat.d--,
        // ++
        '34': rat => rat.d++,
        // -d
        '35': rat => rat.d && (rat.p -= +rat.d),
        // +d
        '36': rat => rat.d && (rat.p += +rat.d),
        // deanalog
        '37': rat => rat.d = rat.d > 128,
        // reset
        '38': rat => rat.d = 0,

        '40': rat => rat.d && (rat.p -= 2 * 2),
        '41': rat => rat.d && (rat.p -= 2 * 3),
        '42': rat => rat.d && (rat.p -= 2 * 4),
        '43': rat => rat.d && (rat.p -= 2 * 5),
        '44': rat => rat.d && (rat.p -= 2 * 6),
        '45': rat => rat.d && (rat.p -= 2 * 7),
        '46': rat => rat.d && (rat.p -= 2 * 8),
        '47': rat => rat.d && (rat.p -= 2 * 9),
        '48': rat => rat.d && (rat.p -= 2 * 10),
        '49': rat => rat.d && (rat.p -= 2 * 11),
        '50': rat => rat.d && (rat.p += 2),
        '51': rat => rat.d && (rat.p += 2 * 2),
        '52': rat => rat.d && (rat.p += 2 * 3),
        '53': rat => rat.d && (rat.p += 2 * 4),
        '54': rat => rat.d && (rat.p += 2 * 5),
        '55': rat => rat.d && (rat.p += 2 * 6),
        '56': rat => rat.d && (rat.p += 2 * 7),
        '57': rat => rat.d && (rat.p += 2 * 8),
        '58': rat => rat.d && (rat.p += 2 * 9),
        '59': rat => rat.d && (rat.p += 2 * 10),
    }
    getSunEnergy(x, y) {
        const e = (this.height - y) * this.propC - this.getUpperCount(x,y) * this.sunC;
        return (e > 0) ? ~~(e - 1) : 0;
    }
    getUpperCount(x, y) {
        return this.obj.filter(obj => obj.x === x && obj.y < y).length;
    }
    getRat([x,y]) {
        x = x < 0 ? this.width - x : x % this.width;
        for(let i = 0; i < this.obj.length; i++) {
            if(((x || x === 0) && this.obj[i].x === x) && ((y || y === 0) && this.obj[i].y === y)) return this.obj[i];
        }
    }
    tick() {
        if (!this.paused) {
            try {
                this.step();
                setTimeout(this.tick.bind(this), this.tickTime);
            } catch(err) {
                this.paused = true;
                console.error(err);
            }
        }
    }
    step() {
        //console.time('tick');
        for(let i = 0; i < this.obj.length; i++) this.obj[i].tick();
        this.represent();
        if(this.tickcb) this.tickcb();
        //console.timeEnd('tick');
    }
    xyBufferPos(x, y) {
        return elPerUnit * (y * this.width + x);
    }
    represent() {
        for(
            let x =0, y = 0, fade = new Array(this.width).fill(0), b = 0, sunL = 256;
            y < this.height;
            x++, b += elPerUnit, x >= this.width && (x = 0, y++, sunL -= this.propC)
        ) {
            const rat = this.getRat([x,y]);
            if(rat) {
                fade[x]++;
                this.buffer.set(rat.represent(), b);
            } else {
                const cell = this.board.get([x,y]);
                const se = Math.max(sunL - (fade[x] || 0) * this.sunC, 0);
                // console.log(x, y, sunL, se, fade[x], fade[x] * this.sunC, fade);
                this.buffer.set([
                    0,
                    se << 1,
                    se,
                    cell.m * 2,
                    cell.o, cell.m
                ].map(uint), b);
            }
        }
    }
}