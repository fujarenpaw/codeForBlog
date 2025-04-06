document.addEventListener('DOMContentLoaded', () => {
    const cy = cytoscape({
        container: document.getElementById('cy'),
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)'
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

    // 基本的なインタラクション
    cy.on('tap', 'node', function(evt){
        const node = evt.target;
        alert('Node ' + node.id() + ' clicked');
    });
}); 