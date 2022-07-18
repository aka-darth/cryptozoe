const etalon = 256;
const solid = etalon/2;
const boardBufferKeys = ['s', 'r', 'g', 'b', 'o', 'm'];
const ratsBufferKeys = ['s', 'r', 'g', 'b', 'o', 'm'];
const genStr = {
    '00': 'clone',
    '01': 'sun',
    '02': 'step',
    '03': 'clone as new',
    '04': 'sex',
    '05': 'turn right',
    '06': 'turn left',
    '07': 'turn mind',
    // '08': 'kill all',
    '09': 'kill',

    '10': 'eat target',
    '11': 'take mineral',
    '12': 'eat mineral for energy',
    '13': 'feed',
    '14': 'eat organic',
    '15': 'eat target organic',
    '16': 'take target cell mineral',
    '17': 'shit',
    '18': 'give mineral',
    '19': 'make armor',

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

    '30': 'mind x 2',
    '31': 'mind / 2',
    '32': 'not mind',
    '33': 'mind--',
    '34': 'mind++',
    '35': '&lt;&lt;mind',
    '36': '&gt;&gt;mind',
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
    '03': 'Деление со сбросом счетчика копий (создание половой \ стволовой клетки)',
    '04': 'Секс',
    '05': 'Поворот направо',
    '06': 'Поворот налево',
    '07': 'Поворот по памяти (0 - вверх, далле по часовой 1 - вправо вверх, 2 - вправо, 3 - вправо вниз, 4 - вниз итд)',
    // '08': 'kill all',
    '09': 'Убить',

    '10': 'Укусить',
    '11': 'Взять минерал',
    '12': 'Переварить минерал',
    '13': 'Передать энергию организму перед носом',
    '14': 'Съесть органику',
    '15': 'Сьесть органику из клетки перед носом',
    '16': 'Взять минерал из клетки перед носом',
    '17': 'Высрать переваренный минерал',
    '18': 'Дать минерал',
    '19': 'Нарастить панцирь',

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

    '30': 'Удвоить значение памяти',
    '31': 'Ополовинить значение памяти',
    '32': 'Если в памяти ненулевое значение, поставить 0, иначе 1',
    '33': 'Отнять 1 от памяти',
    '34': 'Прибавить 1 к памяти',
    '35': 'Перейти по днк назад на число из памяти',
    '36': 'Перейти по днк вперед на число из памяти',
    '37': 'Если значение памяти > 128, запомнить 1, иначе 0.',
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
        'e': 'Энергия', 
        'p': 'Позиция рнк', 
        'organicUsed': 'Потребление органики', 
        'a': 'Нос', 
        'mineralsUsed': 'Съедено минералов', 
        'dm': 'Потребление минералов', 
        'freeze': 'Отдых', 
        'frag': 'Агрессивность', 
        'm': 'Минералов', 
        'd': 'Память', 
        'c':'Поколение', 
        'sun': 'Потребление солнца', 
        'i': 'тиков'
    })[key] || key}: ${data}`
};

const genCHPU = gen => gen ? gen.match(/.{2}/g).map(gen => genStr[gen]).join(', ') : '';

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
const mutate = gen => gen.split('').reduce((str, s) => `${str}${Math.random() > .95 ? Math.floor(Math.random()*1000) : s}`, Math.random() > .95 ? Object.keys(genStr).random() : '');
// const mutate = gen => `${gen}${Object.keys(genStr).random()}`;

const circle = (ctx, x, y, radius, color = 'white') => {
    ctx.beginPath();
    ctx.arc(x, y, radius - 1 /*muhaha*/, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

let directionVector = a => {
    let x = 0;
    let y = 0;
    if([1, 2, 3].includes(a)) x = 1;
    if([5, 6, 7].includes(a)) x = -1;
    if([0, 1, 8].includes(a)) y = 1;
    if([3, 4, 5].includes(a)) y = -1;
    return [x, y];
};

// TODO: second layer (and renderer? and buffer???) for rats
class RatsView {
    constructor({offscreen, ctx, ratsBuffer, width, height, size}){
        this.ctx = ctx || (offscreen && offscreen.getContext("2d"));
        this.ctx.canvas.width  = size * width;
        this.ctx.canvas.height = size * height;
        this.ctx.strokeStyle = '#777777';
        this.ctx.lineWidth = .1;
        this.represent = new Uint16Array(ratsBuffer);
        this.width = width;
        this.height = height;
        this.size = size;
    }
}

class BoardView {
    constructor({offscreen, ctx, boardBuffer, ratsBuffer, width, height, size}){
        this.ctx = ctx || (offscreen && offscreen.getContext("2d"));
        this.ctx.canvas.width  = size * width;
        this.ctx.canvas.height = size * height;
        this.ctx.strokeStyle = '#777777';
        this.ctx.lineWidth = .1;
        this.represent = new Uint16Array(boardBuffer);
        this.ratpresent = new Uint16Array(ratsBuffer);
        this.width = width;
        this.height = height;
        this.size = size;
    }
    tick() {
        try {
            // console.time('render');
            for(let x=0, y=0, i=0; y < this.height; i++, x++, x>=this.width && (x=0, y++)) {
                const [s, r, g, b, o, m] = this.represent.slice(boardBufferKeys.length * i, boardBufferKeys.length * (i+1));
                try {
                    this.render({x, y, s, r, g, b, o, m});
                } catch(err) {
                    console.log(i,  {x, y, s, r, g, b, o, m}, this.represent.slice(boardBufferKeys.length * i, boardBufferKeys.length * (i + 1)));
                    console.error(err);
                }
            }
            for(let x=0, y=0, i=0; y < this.height; i++, x++, x>=this.width && (x=0, y++)) {
                const [s, r, g, b, o, m] = this.ratpresent.slice(boardBufferKeys.length * i, boardBufferKeys.length * (i+1));
                if (s) {
                    try {
                        this.renderRat({x, y, s, r, g, b, o, m});
                    } catch(err) {
                        console.log(i,  {x, y, s, r, g, b, o, m}, this.represent.slice(boardBufferKeys.length * i, boardBufferKeys.length * (i + 1)));
                        console.error(err);
                    }
                }
            }
            // console.timeEnd('render');
        } catch (err) {
            console.error(err);
        }
        requestAnimationFrame(this.tick.bind(this));
    }
    renderRat(cell) {
        const halfsize = this.size>>>1;
        if(cell.s) {
            this.ctx.translate(cell.x * this.size + halfsize, cell.y * this.size + halfsize);
            circle(this.ctx, 0, 0, halfsize, `rgb(${cell.r}, ${cell.g}, ${cell.b})`);
            this.ctx.rotate((-3 + (cell.s - 1)) * Math.PI / 4);
            this.ctx.fillRect(0, 0, halfsize, halfsize);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
    render(cell) {
        const halfsize = this.size>>>1;
        this.ctx.fillStyle = `rgb(${cell.r}, ${cell.g}, ${cell.b})`;
        this.ctx.fillRect(cell.x * this.size, cell.y * this.size, this.size, this.size);
        if (cell.o) {
            this.ctx.fillStyle = 'white';
            const s = cell.o * this.size >>> 7;
            this.ctx.fillRect(cell.x * this.size + halfsize - s/2, cell.y * this.size + halfsize - s/2, s, s);
        }
        if (cell.m > solid) {
            this.ctx.strokeRect(cell.x * this.size+1, cell.y * this.size+1, this.size-1, this.size-1);
        }
    }
}
class Board2  {
    bufferKeys = ['o','m'];
    constructor(life) {
        this.life = life;
        this.width = life.width;
        this.data = new Uint8Array(life.width * life.height *  this.bufferKeys.length);
        for(let i = 0; i < life.width * life.height * this.bufferKeys.length; i+=this.bufferKeys.length) {
            this.data[i] = life.initO;
            this.data[i + 1] = uint(Math.floor(i / life.width) * life.initM * life.sizeC);
        }
    }
    get([x,y]) {
        return {x,y, o: this.data[(this.width * y + x)*2], m: this.data[(this.width * y + x)*2 + 1]}
    }
    set([x,y], {o = -1, m = -1}) {
        if(~o) this.data[(this.width * y + x)*2] = o;
        if(~m) this.data[(this.width * y + x)*2 + 1] = m;
    }
    represent([x,y]) {
        const cell = this.get([x,y]);
        return [
            0,
            this.life.getSunEnergy(x, y) - cell.m,
            this.life.getSunEnergy(x, y) >>> 1 - cell.m,
            cell.m * 2,
            cell.o, cell.m
        ].map(uint);
    }
    up_represent(x, y) {
        this.life.buffer.set(this.represent([x,y]), this.life.xyBufferPos(x, y));
    }
    smooth(cell1, cell2) {
        if(cell2.o > 0 && cell1.o < 255  && cell1.o > cell2.o) {
            const delta = Math.abs(cell1.o/cell2.o) >> 4 || 1;
            cell1.o-=delta;
            cell2.o+=delta;
        }
        if(cell1.o > 0 && cell2.o < 255 && cell1.o < cell2.o) {
            const delta = Math.abs(cell2.o/cell1.o) >> 4 || 1;
            cell1.o+=delta;
            cell2.o-=delta;
        }
        if(cell1.y === cell2.y && cell1.m > cell2.m && cell2.m < solid) {
            cell1.m--;
            cell2.m++;    
        } else if(cell1.y > cell1.y && cell1.m < solid) {
            // cell1.m++;
            // cell2.m--;
        } else if(cell1.y < cell2.y && cell1.m > solid && !this.life.getRat([cell2.x, cell2.y])) {
            [cell1.m,cell2.m] = [cell2.m, cell1.m];
        }
        if(cell1.y === cell2.y && cell1.m < cell2.m && cell1.m < solid) {
            cell1.m++;
            cell2.m--;
        } else if(cell2.y > cell1.y && cell2.m < solid) {
            // cell2.m++;
            // cell1.m--;
        } else if(cell2.y < cell1.y && cell2.m > solid) {
            // [cell1.m,cell2.m] = [cell2.m, cell1.m];
        }
    
        this.set([cell1.x,cell1.y], cell1);
        this.set([cell2.x,cell2.y], cell2);
    }
    diffusion() {
        // console.time('diffusion');
        switch(Math.floor(Math.random()*4)) {
            case 0:
                for(let x = 1, y = 0; y < this.life.height; x++, x >= this.life.width && (x = 1, y+=(Math.random()*10+2)>>>1)) {
                    this.smooth(this.get([x,y]), this.get([x - 1,y]));
                }
                break;
            case 1:
                for(let x = 0, y = 1; x < this.life.height; y++, y >= this.life.height && (y = 1, x+=(Math.random()*10+2)>>>1)) {
                    this.smooth(this.get([x,y]), this.get([x,y - 1]));
                }
                break;
            case 2:
                for(let x = this.life.width-1, y = this.life.height; y >= 0; x--, x < 0 && (x = this.life.width-1, y-=(Math.random()*10+2)>>>1)) {
                    this.smooth(this.get([x,y]), this.get([x + 1,y]));
                }
                break;
            case 3:
                for(let x = this.life.width, y = this.life.height-1; x >= 0; y--, y < 0 && (y = this.life.height-1, x-=(Math.random()*10+2)>>>1)) {
                    this.smooth(this.get([x,y]), this.get([x,y + 1]));
                }
                break;
            default: console.warn('oops');
        }
        // console.timeEnd('diffusion');
    }
    total() {
        console.log(this.data);
        return this.data.reduce((total, el, i) => {
            // console.log(i%2?'m':'o', el, total);
            total[i%2?'m':'o'] += el;
            return total;
        }, {o: 0, m: 0})
    }
}
class Rat {
    constructor({
        life,
        x, y, e = 128, m = 1, d = 0,
        a =  Math.floor(Math.random() * 8), gen = '0100', c = 0, s = 0, p = 0, sun = 0, frag = 0, mineralsUsed = 0
    }){
        this.life = life;
        this.id = this.life.id++;
        this.x = x;
        this.y = y;
        this.gen = gen;
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
        this.mineralsUsed = mineralsUsed; // min eated
        this.organicUsed = 0; // o use
        this.frag = frag; // aggressive
        this.i = 0; // ticks
        this.armor = 0; // armor
        this.life.obj.push(this);
        // this.up_represent();
    }
    bufferKeys= ['x','y','e','m','p','d','c','a','dm','organicUsed','frag','i','freeze'];
    toBuffer() {
        return this.bufferKeys.map(key => this[key]);
        /*
         [
         this.x, this.y, this.e, this.m,
         this.p, this.d, this.c, this.a,
         this.dm, this.organicUsed, this.frag, this.i,
         this.freeze,
         this.childGen, this.gen
         ];
         */
    }
    fromBuffer(buffer) {
        this.buffer = new Uint16Array(this.bufferKeys.length)
        this.bufferKeys.forEach((param, i) => {
            Object.defineProperty(this, param, {
                get: () => this.buffer[i],
                set: value => this.buffer.set(i, value)
            });
            this[param] = data[param];
        });
    }
    get xy() {
        return [this.x, this.y];
    }
    get bufferPos() {
        return boardBufferKeys.length * (this.y * this.life.width + this.x);
    }
    get target_xy() {
        const [x, y] = this.getDir();
        const target = {x: this.x + x, y: this.y + y};
        if(target.x < 0) target.x = this.life.width + target.x;
        if(target.x >= this.life.width) target.x = target.x - this.life.width;
        return [target.x, target.y];
    }
    get target() {
        return this.life.getRat(this.target_xy);
    }
    get targetCell() {
        return this.life.board.get(this.target_xy)
    }
    get totalM() {
        return this.m + this.mineralsUsed;
    }
    getDir() {
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
    getTarget() {
        const [x, y] = this.getDir();
        const target = {x: this.x + x, y: this.y + y};
        if(target.x < 0) target.x = this.life.width - target.x;
        if(target.x >= this.life.width) target.x = target.x - this.life.width;
        return [target.x, target.y];
    }
    toHTML() {
        return Object.keys(this)
                .filter(key => !['life', 'age', 'bufferKeys', 'gen', 'p'].includes(key))
                .map(key => keyCHPU(key, this[key]))
                .join('<br/>') + `<br/>
				Возраст: ${Math.floor(this.i/etalon<<1)} дней <br/>
				Позиция РНК: ${this.p>>1}<br/>
				Ген: ${this.gen.slice(this.p, this.p + 2)} (${genFullStr[this.gen.slice(this.p, this.p + 2)]})
				`;
    }
    represent() {
        switch(this.life.layer) {
            case "e":
                // console.log(a);
                return [
                    this.a + 1,
                    this.e, //r
                    this.e, //g
                    this.e, //b
                    0, 0
                ].map(uint);
            case "gen":
                const g = this.gen.length<<1;
                // console.log(a);
                return [
                    this.a + 1,
                    this.frag + this.organicUsed >> 2  + g, //r
                    this.sun >> 2 + this.organicUsed >> 2  + g, //g
                    this.dm >> 2 + g, //b
                    0, 0
                ].map(uint);
            case "age":
                const a = this.c + (this.i / (this.life.age * this.gen.length)) << 9;
                // console.log(a);
                return [
                    this.a + 1,
                    this.frag + this.organicUsed >> 2  + a, //r
                    this.sun >> 2 + this.organicUsed >> 2  + a, //g
                    this.dm >> 2 + a, //b
                    0, 0
                ].map(uint);
            default:
                return [
                    this.a + 1,
                    this.frag * 2 + this.organicUsed,
                    this.sun + this.organicUsed + (this.dm >>> 1),
                    this.dm << 2,
                    0, 0
                ].map(uint);
        }
    }
    up_represent() {
        // console.log(2 * (this.y * this.life.width + this.x), this.represent())
        this.life.buffer.set(this.represent(), this.bufferPos);
    }

    tick() {
        try {
            if(!(--this.freeze > 0)) {
                this.genAction(0);
            }
            this.live();
        } catch (err) {
            console.error(this, err);
            this.die();
        }
    }
    genAction(rec = 0) {
        if(this.p >= this.gen.length || this.p < 0) this.p = 0;
        const gen = this.gen.slice(this.p, this.p + 2);
        //console.log(gen, this);
        if(this.life.genDict[gen]) {
            this.life.genDict[gen](this);
            // this.up_represent();
            // turbo mind
            this.p += 2;
            if(+gen >= 20 && rec <= 8) this.genAction(++rec);
        } else {
            this.gen = this.gen.substr(0, this.p) + this.gen.substr(this.p + 2, this.gen.length);
            this.e -= 1;
            //console.log('bad gen', this.p, this.gen, this.gen.slice(this.p, this.p + 2));
        }
    }
    live() {
        this.e -= 1;
        if (this.e <= 0 || (this.i++ / this.life.age > this.gen.length)) {
            this.die();
        } else {
            if(this.sun >=3) this.sun-=3; // *this.photosyntheticity;
            if(this.frag > 0) this.frag--;
            if(this.organicUsed > 0) this.organicUsed--;
            if(this.dm > 0) this.dm--;
            if(this.e > 255) this.e = 255;
        }
    }
    die() {
        const cell = this.life.board.get(this.xy);
        if(cell) {
            this.life.board.set(this.xy, {
                m: cell.m + this.m + this.mineralsUsed,
                o: cell.o + (this.e > 1 ? (this.e * this.life.backO) >>> 0 : 1),
            });
        } else {
            console.error(this);
        }
        // this.life.buffer.set(this.life.board.represent(this.xy), this.bufferPos);

        this.life.obj.splice(this.life.obj.indexOf(this), 1);
        if(this.life.lookat === this) this.life.lookat = null;
        if(!this.life.obj.length) {
            console.log('Life end after', life.days, 'days', life, life.total());
            this.life.restart();
        }
    }

    step() {
        const [x,y] = this.target_xy;
        const cell = this.life.board.get([x, y]);
        if(cell.m > solid) {
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
    clone(n) {
        // console.log('clone', this);
        const [x, y] = this.target_xy;
        const cell = this.life.board.get([x,y]);
        if(this.e > 64 && this.i > this.gen.length * 4 && cell.o < 64 && cell.m < solid) {
            if(this.target) {
                this.turn();
            } else {
                const childGen = this.childGen || Math.random() < this.life.mutastable ? this.gen : mutate(this.gen);
                const pM = this.m;
                const pMu = this.mineralsUsed;
                const halfM = this.m >>> 1;
                const halfMu = this.mineralsUsed >>> 1;
                const child = new Rat({
                    life: this.life,
                    x, y,
                    c: (n || childGen !== this.gen) ? 0 : this.c + 1,
                    e: this.e >>> 1,
                    m: halfM + this.i%2,
                    mineralsUsed: halfMu + this.i%2,
                    sun: this.sun >>> 1,
                    frag: this.frag >>> 1,
                    gen: childGen,
                });
                this.e = this.e >>> 1;
                this.m = halfM + (this.i+1)%2;
                this.mineralsUsed = halfMu + (this.i+1)%2;
                this.freeze = Math.max(this.gen.length >>> 4, 8);

                if (pM > this.m + child.m) {
                    console.error('M Fail', pM, this.m, child.m, this, child, this.i);
                }
                if (pMu > this.mineralsUsed + child.mineralsUsed) {
                    console.error('MU Fail', pMu, this.mineralsUsed, child.mineralsUsed, this, child);
                }
            }
        }
        this.e--;
    }
    turn(side = this.a + 1) {
        this.a = side % 8;
        this.e--;
    }
    kill() {
        if(this.target && this.e > 4) {
            if(this.target.armor > 0) this.target.armor--;
            else this.target.die();
            this.frag += this.life.agressive;
        }
        this.freeze -= 4;
    }
    killAll(){
        let a = 9, oa = this.a;
        while(a--) {
            this.a = a;
            this.kill();
        }
        this.a = oa;
    }
    eat(type, target) {
        switch(type) {
            case 'm':
                if(this.m > 0) {
                    this.e += 1 * this.life.mineralEff;
                    this.dm += 1 * this.life.mineralEff;
                    this.m -= 1;
                    this.mineralsUsed += 1;
                }
                break;
            case 'o':
                let [x,y] = target ? this.target_xy : this.xy;
                const cell = this.life.board.get([x,y]);
                if(cell && cell.o > 0) {
                    this.e += this.life.organicEff;
                    this.organicUsed += this.life.organicEff;
                    this.life.board.set([x,y], {o: cell.o - 1});
                }
                break;
            case 'e':
                if(this.target && this.e > 4) {
                    if(this.target.armor > 0) this.target.armor--;
                    else {
                        const eate = Math.max(this.target.e, this.life.agressive);
                        this.target.e -= eate;
                        this.e += eate >>> 1;
                        this.frag += eate;
                    }
                    this.freeze = 4;
                }
                break;
            default:
                console.warn('Cant eat!', type, this);
        }
    }
    give(type, target) {
        switch(type) {
            case 'm':
                if(this.m > 0) {
                    if(target && this.target && target.totalM < solid) {
                        this.target.m += 1;
                        this.m -= 1;
                    } else if (!target) {
                        this.life.board.get(this.xy).m += 1;
                        this.mineralsUsed -= 1;
                    }
                }
                break;
            case 'o':
                let [x,y] = target ? this.target_xy : this.xy;
                const cell = this.life.board.get([x,y]);
                if(cell) {
                    this.e -= 2 * this.life.organicEff;
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
        Object.assign(this, data, {
            id: 0,
            days: 0,
            obj: [],
            tickTime: data.tickTime > 1 ? data.tickTime : 1
        });
        this.sunPower = etalon/2; // good morning
        this.sizeC = etalon/this.height;
        this.buffer = new Uint16Array(data.boardBuffer);
        this.ratsBufferR = new Uint16Array(data.ratsBuffer);
        this.board = new Board2(this);
        this.agressive = this.agressive << 2;
        for(let i = 0; this.genbank.length && i < this.width; i += Math.floor(1 + this.width / (4*this.genbank.length))) {
            new Rat({life: this, x: Math.floor(this.width * Math.random()), y:  this.height - Math.floor(Math.random() * this.height), gen: this.genbank.random()});
        }
        console.log('New life started', this, this.total());
        this.represent();
    }
    restart() {
        // this.paused = true;
        // console.log('oops..')
        // return;
        this.id = 0;
        this.days = 0;
        this.obj = [];
        this.sunPower = etalon/2; // good morning
        this.day = false; // good morning please
        this.buffer = new Uint16Array(this.boardBuffer);
        this.ratsBufferR = new Uint16Array(this.ratsBuffer);
        this.board = new Board2(this);
        for(let i = 0; this.genbank.length && i < this.width; i += Math.floor(1 + this.width / (4*this.genbank.length))) {
            new Rat({life: this, x: Math.floor(this.width * Math.random()), y:  this.height - Math.floor(Math.random() * this.height), gen: this.genbank.random()});
        }
        console.log('Life restarted', this, this.total());
        this.represent();
    }
    genDict = {
        '00': rat => rat.clone(),
        // sun
        '01': rat => {
            // console.log('eat', (this.getSunEnergy(...rat.xy) * this.photosyntheticity) >>> 2, rat);
            rat.e += (this.getSunEnergy(...rat.xy) * this.photosyntheticity) >>> 2;
            rat.sun += (this.getSunEnergy(...rat.xy) * this.photosyntheticity) >>> 2;
        },
        '02': rat => rat.step(),
        '03': rat => rat.e > 64 && rat.clone(true),
        '04': rat => rat.sex(),
        // turn right
        '05': rat => rat.turn(rat.a + 1),
        // turn left
        '06': rat => rat.turn(rat.a - 1),
        // turn mind
        '07': rat => rat.turn(rat.d),
        // kill all
        '08': rat => rat.killAll(),
        // kill
        '09': rat => rat.kill(),
        // eat e target
        '10': rat => rat.eat('e', true),
        // take m
        '11': rat => {
            const cell = this.board.get(rat.xy);
            if (cell && cell.m > 0 && rat.totalM < solid) {
                rat.m += 1;
                rat.e -= 1;
                this.board.set(rat.xy, {m: cell.m - 1})
            }
        },
        // eat m
        '12': rat => rat.eat('m'),
        // give e
        '13': rat => rat.give('e'),
        // eat o
        '14': rat => rat.eat('o'),
        // eat o target
        '15': rat => rat.eat('o', true),
        // take target m
        '16': rat => {
            const cell = this.board.get(rat.target_xy);
            if (cell && cell.m > 8 && (8 + rat.totalM) < solid) {
                rat.m += 8;
                rat.freeze = 4;
                this.board.set(rat.target_xy, {m: cell.m - 8})
            }
        },
        // shit m
        '17': rat => rat.give('m'),
        // give m
        '18': rat => rat.give('m' , true),
        // armor
        '19': rat => {
            if(rat.m > 0 && rat.armor < solid) {
                rat.armor += 1;
                rat.mineralsUsed += 1;
                rat.m -= 1;
            }
        },

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

        // X2
        '30': rat => rat.d = rat.d << 1,
        // /2
        '31': rat => rat.d = rat.d >>> 1,
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

        '40': rat => rat.d && (rat.p -= 2 * 3),
        '41': rat => rat.d && (rat.p -= 2 * 4),
        '42': rat => rat.d && (rat.p -= 2 * 5),
        '43': rat => rat.d && (rat.p -= 2 * 6),
        '44': rat => rat.d && (rat.p -= 2 * 7),
        '45': rat => rat.d && (rat.p -= 2 * 8),
        '46': rat => rat.d && (rat.p -= 2 * 9),
        '47': rat => rat.d && (rat.p -= 2 * 10),
        '48': rat => rat.d && (rat.p -= 2 * 11),
        '49': rat => rat.d && (rat.p -= 2 * 12),
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
        // virus
        '60': rat => rat.target && (rat.target.gen = `000${rat.target.gen}`),
    }
    getSunEnergy(x, y) {
        const e = (this.sunPower - y*this.sizeC) - this.getUpperCount(x,y) * this.ratOpacity;
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
        if(this.sunPower%this.diffusion === 1) this.board.diffusion();
        if(this.tickcb) this.tickcb();
        if(this.day) {
            this.sunPower--;
            if(this.sunPower <= 0) this.day = false;
        } else {
            this.sunPower++;
            if(this.sunPower >= etalon) this.day = ++this.days;
            if(this.daycb) this.daycb();
        }
        //console.timeEnd('tick');
    }
    xyBufferPos(x, y) {
        return boardBufferKeys.length * (y * this.width + x);
    }
    represent() {
        for(
            let x =0, y = 0, fade = new Array(this.width).fill(0), b = 0, sunLevel = this.sunPower;
            y < this.height;
            x++, b += boardBufferKeys.length, x >= this.width && (x = 0, y++, sunLevel -= etalon / this.height)
        ) {
            const cell = this.board.get([x,y]);
            const se = Math.max(sunLevel - (fade[x] || 0) * this.ratOpacity, 0);
            // console.log(x, y, sunLevel, se, fade[x], fade[x] * this.ratOpacity, fade);
            this.buffer.set([
                0,
                se << 1,
                se,
                cell.m * 2,
                cell.o, cell.m
            ].map(uint), b);
            const rat = this.getRat([x,y]);
            if(rat) {
                fade[x]++;
                // this.buffer.set(rat.represent(), b);
                this.ratsBufferR.set(rat.represent(), b);
            } else {
                this.ratsBufferR.set([0,0,0,0], b);
            }
        }
    }
    total(){
        const ratKeys = ['e', 'mineralsUsed', 'm', 'frag'];
        return {
            cells: this.board.total(),
            rats: this.obj.reduce((total, rat) => {
                ratKeys.forEach(key => total[key] = (total[key]||0) + rat[key]);
                return total;
            }, {length: this.obj.length}),
        }
    }
}

try {
    module.exports = {
        Life,
        BoardView
    }
} catch(err) {
    if(err.toString() !== 'ReferenceError: module is not defined') throw err;
    // else ok...
}
