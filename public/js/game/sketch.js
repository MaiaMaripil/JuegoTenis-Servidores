let video;
let handPose;
let hands = [];

let ancho = document.documentElement.clientWidth;
let alto = document.documentElement.clientHeight;

let punto_fuga = {x: ancho/2, y: alto/2.5};

let pelota = { x: 300, y: 50, radio: 15 };

async function setup() {
  createCanvas(ancho, alto);

  video = createCapture(VIDEO);
  video.size(ancho, alto);
  video.hide();

  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);
}

function draw() {

  dibujarPasillo();

  circle(punto_fuga.x, punto_fuga.y,5);

  if (hands.length > 0) {
    
    // Arreglo con los puntos para delimitar la palma de la mano
    let palma = [
      createVector(ancho - hands[0].wrist.x, hands[0].wrist.y),
      createVector(ancho - hands[0].thumb_cmc.x, hands[0].thumb_cmc.y),
      createVector(ancho - hands[0].thumb_mcp.x, hands[0].thumb_mcp.y),
      createVector(ancho - hands[0].index_finger_mcp.x, hands[0].index_finger_mcp.y),
      createVector(ancho - hands[0].middle_finger_mcp.x, hands[0].middle_finger_mcp.y),
      createVector(ancho - hands[0].ring_finger_mcp.x, hands[0].ring_finger_mcp.y),
      createVector(ancho - hands[0].pinky_finger_mcp.x, hands[0].pinky_finger_mcp.y)
    ];
    

    // Dibujar la forma personalizada de la mano
    beginShape();
    for (let i = 0; i < palma.length; i++) {
      vertex(palma[i].x, palma[i].y);
    }
    endShape(CLOSE);

    // Verificar la colisión
    let diametro = pelota.radio*2;
    let hit = collideCirclePoly(
      pelota.x,
      pelota.y,
      diametro,
      palma,
      true
    );

    if (hit) {
      fill(255, 0, 0); // Si choca, pintar rojo
      // Aquí pones la lógica para que la pelota rebote
      // pelota.velocidadY *= -1; 
    } else {
      fill(255);
    }
  }

  // Dibujar la pelota
  circle(pelota.x, pelota.y, pelota.radio * 2);

  
}

function gotHands(results) {
  hands = results;
}

function dibujarPasillo(){
  let punto_referencia = {x: ancho/2, y: alto/2.5};
  let ancho_pared = ancho/2;

  let inicio_pared = {x: punto_referencia.x - (ancho_pared/2), y: punto_referencia.y};
  let fin_pared = {x: punto_referencia.x + (ancho_pared/2), y: punto_referencia.y};
  let esq_inferior_izq = {x: 0, y: alto};
  let esq_inferior_der = {x: ancho, y: alto};

  
  fill(234);
  // dibujamos la pared del fondo
  beginShape();
  vertex(inicio_pared.x,inicio_pared.y);
  vertex(fin_pared.x, fin_pared.y);
  vertex(fin_pared.x, 0);
  vertex(inicio_pared.x, 0);
  endShape(CLOSE);

  fill(123);
  //dibujamos las paredes laterales
  beginShape();
  vertex(inicio_pared.x,inicio_pared.y);
  vertex(0, alto);
  vertex(0,0);
  vertex(inicio_pared.x, 0);
  endShape(CLOSE);

  beginShape();
  vertex(fin_pared.x, fin_pared.y);
  vertex(ancho,alto);
  vertex(ancho,0);
  vertex(fin_pared.x, 0);
  endShape(CLOSE);

  // piso
  beginShape();
  vertex(inicio_pared.x,inicio_pared.y);
  vertex(fin_pared.x, fin_pared.y);
  vertex(ancho,alto);
  vertex(0, alto);
  endShape(CLOSE);

  /* Calculo el punto de fuga */
  

}
