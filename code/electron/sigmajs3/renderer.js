const { Sigma } = require('sigma');
const Graph = require('graphology');

// グラフのインスタンスを作成
const graph = new Graph();

// ノードの追加
graph.addNode('1', { x: 0, y: 0, size: 15, label: 'Node 1', color: '#FF6B6B' });
graph.addNode('2', { x: 1, y: 1, size: 15, label: 'Node 2', color: '#4ECDC4' });
graph.addNode('3', { x: -1, y: -1, size: 15, label: 'Node 3', color: '#45B7D1' });

// エッジの追加
graph.addEdge('1', '2');
graph.addEdge('2', '3');
graph.addEdge('3', '1');

// Sigma.jsのインスタンスを作成
const container = document.getElementById('sigma-container');
const renderer = new Sigma(graph, container, {
    minCameraRatio: 0.1,
    maxCameraRatio: 10
});

// ドラッグ&ドロップ機能の設定
renderer.on('downNode', (e) => {
    const node = e.node;
    const nodeX = renderer.graph.getNodeAttribute(node, 'x');
    const nodeY = renderer.graph.getNodeAttribute(node, 'y');
    const mouseX = e.data.captor.x;
    const mouseY = e.data.captor.y;

    renderer.on('mousemove', (e) => {
        const newX = nodeX + (e.data.captor.x - mouseX) / renderer.camera.ratio;
        const newY = nodeY + (e.data.captor.y - mouseY) / renderer.camera.ratio;
        renderer.graph.setNodeAttribute(node, 'x', newX);
        renderer.graph.setNodeAttribute(node, 'y', newY);
        renderer.refresh();
    });

    renderer.on('mouseup', () => {
        renderer.off('mousemove');
        renderer.off('mouseup');
    });
}); 