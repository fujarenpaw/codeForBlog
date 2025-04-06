let selectedWindow = null;
let connections = [];

jsPlumb.ready(function() {
    // 基本的な接続設定
    jsPlumb.defaults = {
        connector: "Bezier",
        paintStyle: { stroke: "#456", strokeWidth: 2 },
        endpoint: "Dot",
        anchors: ["Right", "Left"]
    };

    // 初期接続の設定
    setupInitialConnections();

    // ドラッグ可能に設定
    jsPlumb.draggable("window1");
    jsPlumb.draggable("window2");
    jsPlumb.draggable("window3");

    // ウィンドウのクリックイベントを設定
    document.querySelectorAll('.window').forEach(window => {
        // 左クリックで選択
        window.addEventListener('click', function(e) {
            e.stopPropagation();
            selectWindow(this);
        });

        // 右クリックで接続
        window.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            if (selectedWindow && selectedWindow !== this) {
                toggleConnection(selectedWindow, this);
            }
        });
    });

    // ドキュメント全体のクリックで選択解除
    document.addEventListener('click', function() {
        if (selectedWindow) {
            selectedWindow.classList.remove('selected');
            selectedWindow = null;
        }
    });
});

function setupInitialConnections() {
    connections.push(jsPlumb.connect({
        source: "window1",
        target: "window2"
    }));
    connections.push(jsPlumb.connect({
        source: "window2",
        target: "window3"
    }));
    connections.push(jsPlumb.connect({
        source: "window1",
        target: "window3"
    }));
}

function selectWindow(window) {
    if (selectedWindow) {
        selectedWindow.classList.remove('selected');
    }
    selectedWindow = window;
    window.classList.add('selected');
}

function toggleConnection(source, target) {
    const existingConnection = connections.find(conn => 
        (conn.sourceId === source.id && conn.targetId === target.id) ||
        (conn.sourceId === target.id && conn.targetId === source.id)
    );

    if (existingConnection) {
        jsPlumb.deleteConnection(existingConnection);
        connections = connections.filter(conn => conn !== existingConnection);
    } else {
        connections.push(jsPlumb.connect({
            source: source.id,
            target: target.id
        }));
    }
} 