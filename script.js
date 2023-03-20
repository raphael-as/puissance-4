const LIGNES = 6;
const COLONNES = 7;
const VIDE = 0;
const ROUGE = 1;
const JAUNE = 2;

let plateau = [];
let joueurActuel = ROUGE;
document.getElementById("status").innerHTML = `C'est au tour du joueur ${joueurActuel}`;

function initPlateau() {
  for (let ligne = 0; ligne < LIGNES; ligne++) {
    plateau[ligne] = [];
    for (let col = 0; col < COLONNES; col++) {
      plateau[ligne][col] = VIDE;
    }
  }
}

function placerJeton(col) {
  for (let ligne = LIGNES - 1; ligne >= 0; ligne--) {
    if (plateau[ligne][col] === VIDE) {
      plateau[ligne][col] = joueurActuel;
      return ligne;
    }
  }
  return -1;
}

function verifierGagne(ligne, col) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let d = 0; d < directions.length; d++) {
    const [dx, dy] = directions[d];
    let count = 1;
    let r = ligne + dx;
    let c = col + dy;
    while (r >= 0 && r < LIGNES && c >= 0 && c < COLONNES && plateau[r][c] === joueurActuel) {
      count++;
      r += dx;
      c += dy;
    }
    r = ligne - dx;
    c = col - dy;
    while (r >= 0 && r < LIGNES && c >= 0 && c < COLONNES && plateau[r][c] === joueurActuel) {
      count++;
      r -= dx;
      c -= dy;
    }
    if (count >= 4) {
      return true;
    }
  }

  return false;
}

function changerJoueur() {
  joueurActuel = (joueurActuel === ROUGE) ? JAUNE : ROUGE;
  document.getElementById("status").innerHTML = `C'est au tour du joueur ${joueurActuel}`;

}

function mettreAJourPlateauUI() {
  const table = document.getElementById("plateau");
  for (let ligne = 0; ligne < LIGNES; ligne++) {
    for (let col = 0; col < COLONNES; col++) {
      const cellule = table.rows[ligne].cells[col];
      cellule.className = (plateau[ligne][col] === VIDE) ? "vide" : (plateau[ligne][col] === ROUGE) ? "rouge" : "jaune";
    }
  }
}

function handleClick(event) {
  const col = event.target.cellIndex;
  const ligne = placerJeton(col);
  if (ligne >= 0) {
    mettreAJourPlateauUI();
    if (verifierGagne(ligne, col)) {
        document.getElementById("status").innerHTML = `Le joueur ${joueurActuel} a gagné!`;
      initPlateau();
      mettreAJourPlateauUI();
    } else {
      changerJoueur();
    }
  }
}

function initJeu() {
  const table = document.createElement("table");
  table.setAttribute("id", "plateau");
  for (let ligne = 0; ligne < LIGNES; ligne++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < COLONNES; col++) {
      const td = document.createElement("td");
      td.addEventListener("click", handleClick);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.getElementById("jeu").appendChild(table);
  initPlateau();
  mettreAJourPlateauU();
}

initJeu();

