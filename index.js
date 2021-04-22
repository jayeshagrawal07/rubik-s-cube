let color = {
    color1: "FFFFFF",
    color2: "009C46",
    color3: "B80A31",
    color4: "0044AF",
    color5: "FF5700",
    color6: "FFD600"
};
let colorValue = {
    color1: "U",
    color2: "L",
    color3: "F",
    color4: "R",
    color5: "B",
    color6: "D"
};
let value = {};
let faces = ["U", "R", "F", "D", "L", "B"];
$("input[type='color']").on("change", function() {
    color[this.id] = this.value;
    document.documentElement.style.setProperty(`--${this.id}`, this.value);
})
$("select").on("change", function() {
    $(this).css("background", `var(--${this.value})`)
})
$("#solve").on("click", function() {
    $("select").each(function(i) {
        value[this.id] = colorValue[this.value];
    })
    let cubeString = "";
    for (let i = 0; i < faces.length; i++) {
        for (let j = 1; j <= 9; j++) {
            cubeString += value[`${faces[i]}${j}`];
        }
    }
    var cube = Cube.fromString(cubeString);
    console.log(cube.asString());
    if (!cube.isSolved()) {
        Cube.initSolver();
        let solution = cube.solve();
        console.log(solution);
        $("#solution").removeAttr("hidden");
        $("#solution h2").text("Solution");
        let solutionArray = solution.split(" ")
        $("#solution ol").html("");
        solutionArray.forEach((move, i) => {
            let item = (move.length < 3) ? move + new Array(4 - move.length).join('&nbsp;') : move;
            item = (solutionArray.length > 9 && i < 9) ? new Array(2).join('&nbsp;') + item : item;
            console.log((move.length < 3), item);
            let html = $("#solution ol").html();
            $("#solution ol").html(`${html} <li>${item}</li>`)
        });
    } else {
        $("#solution").removeAttr("hidden");
        $("#solution h2").text("Already solved or wrong input");
    }
})

function init(id, color) {
    $(`#${id} option[value="${color}"]`).prop('selected', true);
    for (let i = 1; i <= 9; i++) {
        $(`#${id}${i}`).css("background", `var(--${color})`)
    }
}
init("U", "color1");
init("L", "color2");
init("F", "color3");
init("R", "color4");
init("B", "color5");
init("D", "color6");