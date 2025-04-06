const mx = require('mxgraph')({
    mxBasePath: 'mxgraph'
});

// mxGraphの初期化
const container = document.getElementById('graphContainer');
const graph = new mx.mxGraph(container);

// 基本的なスタイル設定
const style = graph.getStylesheet().getDefaultVertexStyle();
style[mx.mxConstants.STYLE_FILLCOLOR] = '#ffffff';
style[mx.mxConstants.STYLE_STROKECOLOR] = '#000000';
style[mx.mxConstants.STYLE_FONTCOLOR] = '#000000';

// グラフの編集を有効化
graph.setEnabled(true);

// 基本的な図形の作成
graph.getModel().beginUpdate();
try {
    const parent = graph.getDefaultParent();
    
    // 頂点の作成
    const v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30);
    const v2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30);
    
    // エッジの作成
    graph.insertEdge(parent, null, '', v1, v2);
} finally {
    graph.getModel().endUpdate();
} 