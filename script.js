// Variables

const mots = ["chien", "chat", "cheval", "lion", "tigre", "elephant", "rhinoceros", "vache", "singe", "cochon", "gorille", "poisson", "aigle", "baleine", "washington", "orlando", "paris", "madrid", "barcelone", "marseilles", "sydney", "tokyo", "shanghai", "pekin", "santiago", "vancouver", "montreal"];
let erreursRestantes = 10;
let motAleatoire = mots [Math.floor(Math.random() * mots.length)];
// console.log(motAleatoire);
let lettreADeviner = motAleatoire.split("").fill("_");
let lettreDevinee;
let lettresProposees = [];
let motDevine;
let motsProposes = [];


// Selection des éléments
let affMotAleatoire = document.querySelector("#affichageMot");
let message = document.querySelector("#message");
let img = document.querySelector("#pendu");
let inputProposition = document.querySelector("input");
let btn = document.querySelector("button");
let affErreursRestantes = document.querySelector("#erreurs");
let affLettresProposees = document.querySelector("#lettresProposees");
let affMotsProposes = document.querySelector("#motsProposes");

// fonction

function mAJ () {
    affErreursRestantes.textContent = "Erreurs restantes : " + erreursRestantes;       // mise à jour des erreurs restantes 
    dessinerPendu();                                                                   // mise à jour des images
    if(erreursRestantes <= 0) {                                                        // Vérification si le jeu est perdu
        gameOver();
    }

    else if (!lettreADeviner.includes("_")) {                                           // Vérification si le jeu est gagné
        victoire ();
    }
}

function victoire() {
    message.textContent = "Bravo ! Vous avez gagné !";
    desactiverClavier();
    desactiverInput();
    setTimeout(recommencer, 3000);
}

function gameOver() {
    message.textContent = "Vous avez perdu ! Le bon mot était :" + motAleatoire;
    desactiverClavier();
    desactiverInput();
    setTimeout(recommencer, 3000);
}

function dessinerPendu () {                                                            //Dessiner pendu selon les erreurs restantes
    if (erreursRestantes < 10) {
        img.setAttribute("src", "Images/" + erreursRestantes + ".svg"); 
    }
}

function verificationLettre (choix) {
        
    lettreDevinee = choix.key.toLowerCase();                                  // Forcer les minuscules

    // console.log (lettreDevinee);
    if(/^[a-z]$/.test(lettreDevinee)) {                                       // Tester si c'est bien un caractère a-z (expression trouver sur internet car NaN() et Number() n'empêche pas d'appuyer sur F1, F2, Home, insert, etc)
        message.textContent = "";

        if (lettresProposees.includes(lettreDevinee)) {                       // Verifie si l'utilisateur a déjà proposé la lettre
            message.textContent = "Vous avez déjà proposé cette lettre !";
        }
        
        else {
            lettresProposees.push(lettreDevinee);                                      // Ajout de lettre dans le tableau
            affLettresProposees.append(lettreDevinee + " / ");
            
            if(motAleatoire.includes(lettreDevinee)) {                                 // Vérifie si le mot contient la lettre
                for (let i = 0 ; i < motAleatoire.length ; i++) {                        
                    if (motAleatoire [i] == lettreDevinee){
                        lettreADeviner [i] = lettreDevinee;
                                                 
                        affMotAleatoire.textContent = lettreADeviner.join(" ");        // Mise à jour affichage mot
                        // console.log(lettreADeviner);
                        mAJ();
                    }
                }
            }
            
            else {
                if( erreursRestantes > 0) {
                    erreursRestantes--
                    mAJ();
                }
            }
        }     
    }
    else{
        message.textContent = "Uniquement des lettres de a à z!";
    }

}

function verificationMot() {
    if (inputProposition.value != "") {
        motDevine = inputProposition.value.toLowerCase();
        inputProposition.value = "";
        if (motDevine == motAleatoire) {
            affMotAleatoire.textContent = motDevine;
            victoire();
        }

        else {
            if (motsProposes.includes(motDevine)) {                                    // Verifie si l'utilisateur a déjà proposé le mot
                message.textContent = "Vous avez déjà proposé ce mot !";
            }
            else {
                erreursRestantes--;
                motsProposes.push(motDevine);
                affMotsProposes.append(motDevine + " / ");
                mAJ();
            }
        }
    }
}

function activerClavier() {                                                            // Active le clavier
    document.addEventListener("keyup", verificationLettre);
}

function desactiverClavier() {                                                         // Desactive le clavier
    document.removeEventListener("keyup", verificationLettre);
} 

function desactiverInput() {
    inputProposition.disabled = true;                                                   // Désactive les propositions de mots
}

function recommencer() {
    if (confirm ("Voulez-vous refaire une partie ?")) {
        location.reload();                                                              // Recharger la page
    }
}


// Programme

lettreADeviner = motAleatoire.split("").fill("_");
affMotAleatoire.textContent = lettreADeviner.join(" ");                                  // Mise à jour affichage en début de partie
affErreursRestantes.textContent = "Erreurs restantes : " + erreursRestantes;

activerClavier();                                                                       // Activation du clavier en début de partie

inputProposition.addEventListener("focus", desactiverClavier);                          // Active/désactive le clavier si l'utilisateur propose un mot
inputProposition.addEventListener("blur", activerClavier);
btn.addEventListener("click", verificationMot); 



