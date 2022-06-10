const div = document.createElement('DIV');
div.setAttribute('id', 'cryptozoe');
div.innerHTML = `
<div class="panel org">
<button id="pause">Пауза</button>
<button id="step">1 ход</button>
Задержка: <input id="tickTimeI" type="range" min=1 max=2000 step=1 value=1 />
<hr/>
<div>
	Днк: <input id="genH" value="0100" /><br/>
	Расшифровка: <span id="genDesc">sun, clone</span><br/>
	<canvas id="sub" class="hidden"></canvas><br/>
	<details><summary>Гены</summary><div id="gens"></div></details>
	<details><summary>Хромосомы</summary><div id="chromosomes"></div></details>
	Записать днк как хромосому:<input id="chromoName" placeholder="Название"/><button id="chromosome">+</button><br/>
	<hr />
	<details><summary>Выбранный организм</summary><span id="hI"></span</details><br/>
</div>
</div>

<div class="panel intro">
Это вода. В ней растворены минеральные и органические вещества. Сверху светит солнце.
В воде живут организмы.  
Организмы полупрозрачны, пропускают не весь свет, слой из нескольких организмов перекрывает свет полностью. 
У организмов есть энергия. Каждый ход она уменьшается на единичку. 
Если энергия кончается, организм умирает от истощения. 
Так же организм может быть убит другим организмом либо умереть от старости. 
Время жизни зависит от длины днк. 
После смерти из организма выпадают все полученные за жизнь минералы в виде минералов и остаток энергии (если есть) в виде органики. 
Клетка, в которой очень много минералов, считается твердой, в нее нельзя шагнуть или разделится. 
В клетку, в которой много органики, нельзя разделится (шагнуть можно).
Получать энергию организм может из света, органики, минералов, откусить от другого организма либо получить от него в дар по его инициативе. 
Цвет организма зависит от его рациона.
Зеленые - фотосинтетики, красные - хищники, синие - камнееды, оттенки какашчатого - поедатели органики.
Цвет воды зависит от уровня освещенности (красный и желтый) и солености (количество минералов, синий).
У организма есть нос, который смотрит в одну из восьми сторон. 
Взаимодействовать организм может либо с клеткой, на которой стоит, либо с клеткой перед носом. 
У организмов есть геном, он состоит из генов. При делении геном с некоторой вероятностью мутирует. 
Генов чуть более пары десятков. Каждый ген отвечает за какое-то действие. 
Некоторые действия тратят дополнительную энергию (помимо единички за ход). 
У организма есть рнк, которая ползет по гену, считывает каждый ход следующий ген и прозводит действие. 
Есть гены непосредственно действий - шагнуть, убить, укусить, съесть тот или иной ресурс итд. 
Есть регуляторные гены, управляющие рнк - она может перепрыгнуть по днк вперед или назад. 
С их помощью можно совершать действия только при нужном условии, зацикливать нужные участки генома и в теории даже реализовать многоклеточное поведение. 
У организма есть память.
Есть гены, позволяющие разнюхать и положить в эту память любой параметр себя, своей клетки и клетки перед носом. 
Есть гены, работающие с памятью, позволяющие совершать оценку параметра, принятие решения, условное поведение, циклы.
<br/><button onclick="start()">Понятно...</button>
</div>

<form class="panel start" name="p" action="#">
	Масштаб (px клетка): <input name="size" value=8 /><br/>
	Задержка между тиками (мс): <input class="invert" name="tickTime" type="number" min=1 max=2000 step=1 value=20  /><br/>
	Ширина: <input name="width" value=128 /><br/>
	Высота: <input name="height" value=128 /><br/>

	Слой организмов до полной темноты: <input name="sunOpacity" type="range" min=0 max=64 value=8 /><br/>
	Запас органики:  <input name="initO" type="range" min=0 max=128  value=16 /><br/>
	Запас минералов: <input name="initM" type="range" min=0 max=1 step=.005 value=.05 /><br/>
	Выпадение органики: <input name="backO" type="range" min=0 max=1 step=.01 value=.1 /><br/>
	
	Эффективность агрессии: <input name="agressive" type="range" min=0 max=64 value=8 /><br/>
	Эффективность фотосинтеза: <input name="sunP" type="range" min=0 max=2 step=.01 value=.3 /><br/>
	Эффективность потребления органики: <input name="orgP" type="range" min=0 max=64 value=6 /><br/>
	Эффективность потребления минералов: <input name="minP" type="range" min=0 max=64 value=8 /><br/>
	
	Шанс мутации: <input class="invert" name="mutateC" type="range" min=0 max=1 value=.85 step=.05 /><br/>
	Макс возраст (геноциклов): <input name="age" type="range" min=8 max=1000 value=100 /><br/>
	Генофонд: <br/><textarea cols="60" name="genbank"></textarea><br/>
	<button>Создать мир</button>
</form>
`;
// Есть гены, работающие с памятью - отрицание (если в памяти чтото есть, то оно убирается, если нет, то кладется единичка), добавление и убирание единички, сравнение со 128 (все параметры представлены числами 0-256, так что эта операция представляет собой ответ на вопрос больше половины или меньше), обнуление.
function start () {
    document.querySelector('.intro').style.display = 'none';
    document.querySelector('.start').style.display = 'block';
}

document.body.appendChild(div);
document.forms.p.onsubmit = e => {
    e.preventDefault();
    const params = {
        size: 8,
        height: 128,
        width: 128,
        sunOpacity: 8,
        agressive: 8,
        mutateC: .95,
        initO: 8,
        initM: .1,
        sunP: 1,
        orgP: 1,
        minP: 1,
        age: 100,
        backO: .1,
        tickTime: 100,
        genbank: ['0100']
    };
    [...document.forms.p].forEach(el => (params[el.name] && (params[el.name] = +el.value)) || console.warn(el));
    params.genbank = document.forms.p.genbank.value.split('\n').map(gen => gen.replace(/[^\d]/g, '').trim()).filter(gen => !!gen);
    console.log(params);
    document.forms.p.style.display = 'none';
    document.querySelector('.org').style.display = 'block';
    run(params);
};

[...document.getElementsByClassName('panel')].forEach(panel => panel.onmousedown = e => {
    if(e.target !== panel) return;
    const deltaX = e.pageX - panel.offsetLeft;
    const deltaY = e.pageY - panel.offsetTop;
    const listener = e => {
        panel.style.top = (e.pageY - deltaY) + 'px';
        panel.style.left = (e.pageX - deltaX) + 'px';
    }
    document.addEventListener('mouseup', e => document.removeEventListener('mousemove', listener));
    document.addEventListener('mousemove', listener);
});


div.querySelector('#gens').innerHTML = Object.keys(genStr).sort().map(key => `
<button class="gen" title="${genFullStr[key]}" data-id="${key}">${genStr[key]}</button>`).join('');
[...document.getElementsByClassName('gen')].forEach(button => button.onclick = e => (genH.value += button.getAttribute('data-id'), genDesc.innerHTML = genCHPU(genH.value)));

const chromosomes = {};
try {
    Object.assign(chromosomes, JSON.parse(localStorage.getItem('chromosomes')));
} catch(err) {
    console.error(err);
}
function up_chromosomes() {
    div.querySelector('#chromosomes').innerHTML = Object.keys(chromosomes).map(key => `
<button class="chromosome" data-gen="${chromosomes[key]}">${key}</button>`).join('<br/>');
    [...document.getElementsByClassName('chromosome')].forEach(button =>
        button.onclick = e => genH.value += button.getAttribute('data-gen')
    );
}
up_chromosomes();

const worker = new Worker("./CryptozoeOneWorker.js");
const workers = [worker];

const broadcast = (action, data) => workers.forEach(worker => worker.postMessage({action, data}));

function run(data) {
    const {size, height, width, tickTime} = data;
    const etoxy = e => [Math.floor(e.offsetX / size), Math.floor(e.offsetY / size)];

    tickTimeI.value = tickTime;
    try {
        offscreen = canvas.transferControlToOffscreen();
        worker.postMessage({action: 'init', data: {offscreen, width, height, size, ...data}}, [offscreen]);
        worker.onmessage = function({data}) {
            switch (data.action) {
                case 'init':
					/*
					 const animation = () => {
					 console.time('render');
					 board.render();
					 console.timeEnd('render');
					 requestAnimationFrame(animation);
					 }
					 requestAnimationFrame(animation);
					 */
                    break;
                case 'tickChange':
                    tickTime.value = data.data;
                    break;
                case 'look':
                    genH.value = data.data.gen;
                    genDesc.innerHTML = genCHPU(data.data.gen);
                    hI.innerHTML = data.data.html;
                    break;
                default:
                    console.log('Message received from worker', data);
            }
        };
    } catch(err) {
        console.error(err);
    }


	/*

	 00010110111213142517151630111202010001
	 00010125171516301112020101
	 004014702230300527131623
	 400112111213701207501414
	 00020923043016901002
	 0012112227902550
	 005011012723696013843
	 006203576030120111030625
	 0050110127286296011180
	 62014662226270103020411
	 9201423042570902925
	 0030232990
	 0002701690
	 */
	/*
	 .reduce((acc, el, i ,j) => {
	 if(!(i%8)) acc.push([el]);
	 else acc[acc.length - 1].push(el);
	 return acc;
	 }, []).map(([x, y, s, r, g, b, o, m]) => ({x, y, s, r, g, b, o, m}));
	 */
    step.onclick = e => broadcast('step');
    pause.onclick = e => {
        if(pause.innerHTML === 'Пауза') pause.innerHTML = 'Пуск';
        else pause.innerHTML = 'Пауза';
        broadcast('pause');
    };
    chromosome.onclick = e => {
        chromosomes[chromoName.value] = genH.value;
        localStorage.setItem('chromosomes', JSON.stringify(chromosomes));
        up_chromosomes();
    };

    canvas.onclick = e => worker.postMessage({action: 'click', data: [...etoxy(e), genH.value]});
    genH.oninput = e => {
        genDesc.innerHTML = genCHPU(genH.value);
        worker.postMessage({action: 'genChange', data: genH.value});
    };
    tickTimeI.oninput = e => worker.postMessage({action: 'tickChange', data: tickTimeI.value});
    canvas.onmousemove = e => {
        const x = Math.floor(e.offsetX / size);
        const y = Math.floor(e.offsetY / size);
        // console.log(mirror.getObj([x,y]);
    };
}