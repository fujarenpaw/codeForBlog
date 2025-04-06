const width = 800;
const height = 600;

// SVG要素の作成
const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// 接続線用のグループ
const linksGroup = svg.append("g");

// ドラッグ機能の定義
const drag = d3.drag()
    .on("start", function() {
        d3.select(this).classed("dragging", true);
    })
    .on("drag", function(event) {
        d3.select(this)
            .attr("cx", event.x)
            .attr("cy", event.y);
        updateConnections();
        updateStatus();
    })
    .on("end", function() {
        d3.select(this).classed("dragging", false);
    });

// 円のデータを生成
const circleData = d3.range(5).map(i => ({
    id: i,
    value: Math.floor(Math.random() * 100),
    group: Math.floor(i / 2)
}));

// カラースケールの定義
const colorScale = d3.scaleOrdinal()
    .domain([0, 1])
    .range(["steelblue", "orange"]);

// 円の作成
const circles = svg.selectAll("circle")
    .data(circleData)
    .enter()
    .append("circle")
    .attr("r", 30)
    .attr("cx", () => Math.random() * (width - 60) + 30)
    .attr("cy", () => Math.random() * (height - 60) + 30)
    .attr("fill", d => colorScale(d.group))
    .attr("opacity", 1)
    .attr("data-id", d => d.id)
    .call(drag);

// ラベルの作成
const labels = svg.selectAll("text")
    .data(circleData)
    .enter()
    .append("text")
    .text(d => d.value)
    .attr("text-anchor", "middle")
    .attr("dy", ".3em")
    .style("fill", "white")
    .style("pointer-events", "none");

// 接続線の更新関数
function updateConnections() {
    const links = [];
    circles.each(function(d1, i) {
        circles.each(function(d2, j) {
            if (i < j) {
                links.push({
                    source: d1,
                    target: d2
                });
            }
        });
    });

    const lines = linksGroup.selectAll("line")
        .data(links);

    lines.enter()
        .append("line")
        .merge(lines)
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        .attr("x1", d => d3.select(`circle[data-id="${d.source.id}"]`).attr("cx"))
        .attr("y1", d => d3.select(`circle[data-id="${d.source.id}"]`).attr("cy"))
        .attr("x2", d => d3.select(`circle[data-id="${d.target.id}"]`).attr("cx"))
        .attr("y2", d => d3.select(`circle[data-id="${d.target.id}"]`).attr("cy"));

    lines.exit().remove();
    
    // 接続線の数を更新
    d3.select("#connectionCount").text(links.length);
}

// 状態更新関数
function updateStatus() {
    d3.select("#circleCount").text(circles.size());
}

// 初期接続線の描画
updateConnections();
updateStatus();

// ホイールスクロールでのサイズ変更
circles.on("wheel", function(event) {
    event.preventDefault();
    const currentRadius = +d3.select(this).attr("r");
    const newRadius = Math.max(10, Math.min(50, currentRadius + (event.deltaY > 0 ? -5 : 5)));
    d3.select(this)
        .attr("r", newRadius)
        .transition()
        .duration(200)
        .attr("r", newRadius);
});

// ダブルクリックでの透明度変更
circles.on("dblclick", function() {
    const currentOpacity = +d3.select(this).attr("opacity");
    const newOpacity = currentOpacity === 1 ? 0.5 : 1;
    d3.select(this)
        .transition()
        .duration(500)
        .attr("opacity", newOpacity);
});

// 右クリックでの色変更
circles.on("contextmenu", function(event) {
    event.preventDefault();
    const colors = ["steelblue", "red", "green", "purple", "orange"];
    const currentColor = d3.select(this).attr("fill");
    const currentIndex = colors.indexOf(currentColor);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    d3.select(this)
        .transition()
        .duration(500)
        .attr("fill", nextColor);
});

// ラベルの位置更新
function updateLabels() {
    labels.attr("x", d => d3.select(`circle[data-id="${d.id}"]`).attr("cx"))
          .attr("y", d => d3.select(`circle[data-id="${d.id}"]`).attr("cy"));
}

// アニメーション効果
circles.on("mouseover", function() {
    d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 35)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
})
.on("mouseout", function() {
    d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 30)
        .attr("stroke", "none");
});

// 定期的なラベル更新
d3.interval(updateLabels, 100);

// カラーパレットのクリックイベント
d3.selectAll(".color-box").on("click", function() {
    const color = d3.select(this).style("background-color");
    circles.transition()
        .duration(500)
        .attr("fill", color);
}); 