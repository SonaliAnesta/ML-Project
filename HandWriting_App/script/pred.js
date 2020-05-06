let model;

$( document ).ready(async function () {
    console.log( "Loading model..." );
    model = await tf.loadLayersModel('tfjs-model/model.json');
    console.log( "Model loaded." );
});

async function predict_letter() {
	let offset = tf.scalar(255.0);
	let image = $('#canvas').get(0);
	console.log( "Loading image..." );
	let tensor = tf.browser.fromPixels(image, 3)
		.resizeNearestNeighbor([80, 50])
		.expandDims()
		.toFloat();
	let normalized  = tensor.div(offset);
	let predictions = await model.predict(normalized).data();
	let maxPrediction = Math.max.apply(Math, predictions);
	let index = predictions.indexOf(maxPrediction);

	let resultCanvas = document.getElementById("canvas_rslt");
	let resultDiv = document.getElementById("resultText");
	var ctx = resultCanvas.getContext("2d");
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
	ctx.font = "300px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.fillText(TARGET_CLASSES[index], 200, 250);
	resultCanvas.style.opacity=1;
	resultDiv.style.opacity=1;
	inputLetter(TARGET_CLASSES[index]);
}

function inputLetter(letter){
	let input = document.getElementById('textinput');
	let str = input.value;
	str= str.concat(letter);
	input.value = str;
}