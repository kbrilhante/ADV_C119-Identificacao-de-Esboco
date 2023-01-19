const lblNome = document.getElementById("label");
const lblPrecisao = document.getElementById("confidence");
const corDeFundo = "#fff";
var classifier;
var canvas;
var synth;

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background(corDeFundo);
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw() {
    strokeWeight(10);
    stroke(0); // preto
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function limpaTela() {
    background(corDeFundo);
    lblNome.textContent = "";
    lblPrecisao.textContent = "";
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        let result = results[0].label;
        let confidence = results[0].confidence;
        confidence = Math.round(confidence * 100);

        lblNome.textContent = result;
        lblPrecisao.textContent = confidence;
    }
}