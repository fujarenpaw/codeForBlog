const width = 800;
const height = 600;

// SVG要素の作成
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// ドラッグ機能の定義
const drag = d3.drag()
    .on("drag", function(event) {
        d3.select(this)
            .attr("cx", event.x)
            .attr("cy", event.y);
    });

// ランダムな位置に円を配置
const circles = svg.selectAll("circle")
    .data(d3.range(5)) // 5つの円を作成
    .enter()
    .append("circle")
    .attr("r", 30)
    .attr("cx", () => Math.random() * (width - 60) + 30)
    .attr("cy", () => Math.random() * (height - 60) + 30)
    .attr("fill", "steelblue")
    .call(drag);

// 右クリックでの色変更
circles.on("contextmenu", function(event) {
    event.preventDefault();
    const colors = ["steelblue", "red", "green", "purple", "orange"];
    const currentColor = d3.select(this).attr("fill");
    const currentIndex = colors.indexOf(currentColor);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    d3.select(this).attr("fill", nextColor);
}); 