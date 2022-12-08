// an ethnogrpahic camera 

let caption,ctr=0;
let lineH=610,lineV=20; //to display results of the machine learning algorithm   
let descrip,img=0;
const observations = [];
const observed_images = [];

const url = 'http://localhost:8000/query';
let myCanvas, textCanvas, video, button;

function setup() {
  myCanvas = createCanvas(1200, 400);
  background(200);
  // Create both of your off-screen graphics buffers
  //leftBuffer = createGraphics(600, 400);
  //rightBuffer = createGraphics(lineH, 400);
  createInstruction();
  createButton('save file').mousePressed(saveDataToFile);
  input = createInput();
  input.position(0, 460);
  input.size(500,60);
  greeting = createElement('h3', 'Add your observations as an ethnographer:');
  greeting.position(0, 420);
  greeting2 = createElement('h6', 'My observations as a machine learning algorithm:');
  greeting2.position(lineH, 0);
  //greeting3 = createElement('h4', 'the man is wearing glasses');
  //greeting3.position(700, 20);
  // Create video images from webcam
  video = createCapture(VIDEO);
  video.size(600, 400);
  //video.position(600,20)
  video.hide();
}

function draw() {
  // Draw on your buffers however you like
  //drawLeftBuffer();
 // drawRightBuffer();
  // Paint the off-screen buffers onto the main canvas
  //image(leftBuffer, 0, 0);
  //image(rightBuffer, lineH, 0);
  //rightBuffer.background(0);
   image(video,0,0);
   if(ctr%100==0){
    image2Txt();
    //observed_images[0] = video;
    img++;
   }
ctr+=2;
}

/*function drawLeftBuffer() {
    leftBuffer.background(0);
    //leftBuffer.fill(255, 255, 255);
    //leftBuffer.textSize(32);
    //leftBuffer.text("This is the left buffer!", 50, 50);
}

function drawRightBuffer() {
    //rightBuffer.fill(0, 0, 0);
    //rightBuffer.textSize(32);
    //rightBuffer.text("This is the right buffer!", 50, 50);
}*/

// Create some instruction text
function createInstruction() {
  //createElement('h1', 'Runway im2txt(image to  text) model with p5.js 2019');
  //createElement('p', 'I updated the official sample program of Runway im2txt model with p5.js: https://github.com/runwayml/p5js/tree/master/im2txt');
  //createElement('p', '1. Open Runway, add im2txt model to your workspace <br>2. Run the model using GPU or CPU.<br>3. Update the "url" variable in this code to the number shown in Routes > POST form in Runway "Network > HTTP" tab, e.g. http://localhost:8000/query<br>4. Run the sketch<br>5. Click the "image to text" button get a caption of the image from your webcam.');
  //createElement('p', '(c) 2019 Masaki Iwabuchi');
}

function image2Txt() {
  if (myCanvas && myCanvas.elt) {
    // Get canvas HTML element
    const canvasElt = myCanvas.elt;
    // Get image data from canvas
    const imageData = canvasElt.toDataURL('image/jpeg', 1.0);
    const postData = {
      "image": imageData
    };
    // Send HTTP Post request to Runway with image data, runway will return the image caption
    httpPost(url, 'json', postData, gotText, gotError);
  }
}

function gotError(error) {
  console.error(error);
}

function gotText(result) {
  // console.log(result.caption);
caption = createElement('h6', result.caption);
print(result.classes[0]);
caption = result.classes[0];
observations.push(caption);
//greeting.position(lineH, lineV);
//greeting.html(caption);
//lineV+= 10;
caption = result.classes[1];
observations.push(caption);
//greeting2.position(lineH, lineV);
//greeting2.html(caption);
//lineV+= 10;
caption = result.classes[2];
//observations.push(caption);
//greeting3.html(caption);
//text(result.classes[0],20,lineV);
//lineV+=10;
//if (lineV>height){lineV=20;background(200);}  
//;
background(200);
displayObs();
}

function displayObs(){
  lineV=20;
  background(200);
  textSize(15);
  for (let i=0; i<observations.length; i++){
     text(observations[i], lineH, lineV);
     lineV+= 10;
  }
}

function saveDataToFile() {
  // creates a file called 'newFile.txt'
  let writer = createWriter('newFile.txt');
  // write 'Hello world!'' to the file
  writer.write(['Hello world!']);
  // close the PrintWriter and save the file
  writer.close();
}
