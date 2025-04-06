document.addEventListener('DOMContentLoaded', () => {
    let nodeCount = 0;
    const cy = cytoscape({
        container: document.getElementById('cy'),
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)',
                    'width': 40,
                    'height': 40
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle'
                }
            }
        ],
        elements: {
            nodes: [
                { data: { id: 'a' } },
                { data: { id: 'b' } },
                { data: { id: 'c' } }
            ],
            edges: [
                { data: { source: 'a', target: 'b' } },
                { data: { source: 'b', target: 'c' } },
                { data: { source: 'c', target: 'a' } }
            ]
        },
        layout: {
            name: 'circle'
        }
    });

    // ノードの追加
    cy.on('tap', function(evt) {
        if (evt.target === cy) {
            const pos = evt.position;
            const newNodeId = 'node' + (++nodeCount);
            cy.add({
                group: 'nodes',
                data: { id: newNodeId },
                position: { x: pos.x, y: pos.y }
            });
        }
    });

    // ノードの削除
    cy.on('cxttap', 'node', function(evt) {
        const node = evt.target;
        cy.remove(node);
    });

    // レイアウトの切り替え
    document.getElementById('circleLayout').addEventListener('click', () => {
        cy.layout({ name: 'circle' }).run();
    });

    document.getElementById('gridLayout').addEventListener('click', () => {
        cy.layout({ name: 'grid' }).run();
    });

    document.getElementById('randomLayout').addEventListener('click', () => {
        cy.layout({ name: 'random' }).run();
    });

    // ズーム機能
    cy.on('mousewheel', function(evt) {
        const zoom = evt.originalEvent.wheelDeltaY > 0 ? 1.1 : 0.9;
        cy.zoom({
            level: cy.zoom() * zoom,
            renderedPosition: { x: evt.renderedPosition.x, y: evt.renderedPosition.y }
        });
    });

    // ノードのドラッグ＆ドロップ
    cy.nodes().on('drag', function(evt) {
        const node = evt.target;
        node.style('background-color', '#ff6b6b');
    });

    cy.nodes().on('dragfree', function(evt) {
        const node = evt.target;
        node.style('background-color', '#666');
    });
}); 