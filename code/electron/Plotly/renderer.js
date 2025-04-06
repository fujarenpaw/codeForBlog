const Plotly = require('plotly.js-dist-min');

// 初期設定
const layout = {
    title: '図形エディタ',
    xaxis: {
        range: [0, 10],
        title: 'X軸'
    },
    yaxis: {
        range: [0, 10],
        title: 'Y軸'
    },
    shapes: [],
    dragmode: 'drawrect'
};

// グラフの初期化
Plotly.newPlot('plot', [], layout);

// 図形の追加
let shapeCount = 0;

function addRectangle() {
    const x = Math.random() * 8 + 1;
    const y = Math.random() * 8 + 1;
    
    const newShape = {
        type: 'rect',
        x0: x,
        y0: y,
        x1: x + 1,
        y1: y + 1,
        fillcolor: 'rgba(0, 100, 255, 0.5)',
        line: {
            color: 'rgb(0, 100, 255)',
            width: 2
        },
        name: `shape_${shapeCount++}`
    };

    layout.shapes.push(newShape);
    Plotly.relayout('plot', layout);
}

function addCircle() {
    const x = Math.random() * 8 + 1;
    const y = Math.random() * 8 + 1;
    
    const newShape = {
        type: 'circle',
        x0: x - 0.5,
        y0: y - 0.5,
        x1: x + 0.5,
        y1: y + 0.5,
        fillcolor: 'rgba(255, 100, 0, 0.5)',
        line: {
            color: 'rgb(255, 100, 0)',
            width: 2
        },
        name: `shape_${shapeCount++}`
    };

    layout.shapes.push(newShape);
    Plotly.relayout('plot', layout);
}

function clearShapes() {
    layout.shapes = [];
    Plotly.relayout('plot', layout);
}

// イベントリスナーの設定
document.getElementById('addRect').addEventListener('click', addRectangle);
document.getElementById('addCircle').addEventListener('click', addCircle);
document.getElementById('clear').addEventListener('click', clearShapes);

// 図形のドラッグ＆ドロップを有効化
document.getElementById('plot').on('plotly_relayout', function(eventdata) {
    if (eventdata['shapes']) {
        layout.shapes = eventdata['shapes'];
    }
}); 