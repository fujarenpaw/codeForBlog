// DOMの読み込み完了を待つ
document.addEventListener('DOMContentLoaded', () => {
    // グラフのインスタンスを作成
    const graph = new graphology.Graph();

    // サンプルノードとエッジを追加
    graph.addNode('1', { 
        x: 0, 
        y: 0, 
        size: 10, 
        label: 'Node 1', 
        color: '#FF6B6B'
    });
    graph.addNode('2', { 
        x: 2, 
        y: 2, 
        size: 10, 
        label: 'Node 2', 
        color: '#4ECDC4'
    });
    graph.addNode('3', { 
        x: -2, 
        y: 2, 
        size: 10, 
        label: 'Node 3', 
        color: '#45B7D1'
    });
    graph.addNode('4', { 
        x: 0, 
        y: 4, 
        size: 10, 
        label: 'Node 4', 
        color: '#96CEB4'
    });

    // エッジを追加
    graph.addEdge('1', '2', { color: '#666' });
    graph.addEdge('1', '3', { color: '#666' });
    graph.addEdge('2', '4', { color: '#666' });
    graph.addEdge('3', '4', { color: '#666' });

    // Sigma.jsのインスタンスを作成
    const container = document.getElementById('graph-container');
    const renderer = new sigma.Sigma(graph, container, {
        minCameraRatio: 0.1,
        maxCameraRatio: 10,
        labelRenderedSizeThreshold: 6,
        labelSize: 12,
        defaultNodeColor: '#999',
        defaultEdgeColor: '#666',
        defaultEdgeSize: 2,
        renderEdgeLabels: true
    });

    // カメラの位置を調整
    const camera = renderer.getCamera();
    camera.setState({
        ratio: 2,
        x: 0,
        y: 0
    });

    // ランダムな色を生成する関数
    function getRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }

    // ノードのクリックイベントを設定
    renderer.on('clickNode', (event) => {
        const node = event.node;
        // 左クリックで色を変更
        graph.setNodeAttribute(node, 'color', getRandomColor());
        renderer.refresh();
    });

    // ノードの右クリックイベントを設定
    renderer.on('rightClickNode', (event) => {
        const node = event.node;
        // 右クリックでサイズを変更
        const currentSize = graph.getNodeAttribute(node, 'size');
        const newSize = currentSize === 10 ? 20 : 10;
        graph.setNodeAttribute(node, 'size', newSize);
        renderer.refresh();
    });

    // マウスホイールでズーム
    renderer.getMouseCaptor().on('wheel', (event) => {
        const factor = event.delta > 0 ? 1.1 : 0.9;
        camera.animatedZoom({ duration: 200, factor });
    });

    // ドラッグでパン
    renderer.getMouseCaptor().on('mousedown', (event) => {
        if (event.originalEvent.button === 0) { // 左クリック
            renderer.getMouseCaptor().on('mousemove', (event) => {
                camera.animate({
                    x: camera.x - event.deltaX / camera.ratio,
                    y: camera.y - event.deltaY / camera.ratio
                }, { duration: 0 });
            });
        }
    });

    // マウスアップでドラッグ終了
    renderer.getMouseCaptor().on('mouseup', () => {
        renderer.getMouseCaptor().off('mousemove');
    });
}); 