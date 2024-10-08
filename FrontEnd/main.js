// Sélectionne l'élément HTML avec la classe "gallery" et le bouton de connexion avec l'ID "userLoginBtn"
const gallery = document.querySelector(".gallery");
const logBtn = document.getElementById('userLoginBtn');


////////// 1 - Fonction de mise à jour de la galerie //////////
export const updateGallery = () => {
  fetch('http://localhost:5678/api/works')
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      // Efface la galerie actuelle
      gallery.innerHTML = "";

      // Parcourt les données récupérées et crée du HTML pour chaque projet, puis l'ajoute à la galerie
      data.forEach((project) => {
        const projects = `<figure class='${project.categoryId}'>
          <img crossorigin="anonymous" src="${project.imageUrl}" alt="${project.title}">
          <figcaption>${project.title}</figcaption>
        </figure>`;
        gallery.insertAdjacentHTML("beforeend", projects);
      });
    })
    .catch(function (err) {
      console.error('Error:', err);
    });
};

////////// 2 - Filtrage des catégories //////////
// Sélectionne tous les boutons avec la classe "btn-filter" et ajoute un gestionnaire d'événements pour le clic
const buttons = document.querySelectorAll(".btn-filter")
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Récupère l'ID du bouton cliqué et tous les éléments de figure
    const categorySelected = event.currentTarget.id;
    const categoriesArr = document.querySelectorAll('figure')
    // Applique le filtre à la catégorie du bouton cliqué
    filterCategories(categorySelected, categoriesArr)
  })
})

// Fonction pour filtrer les catégories en fonction du bouton cliqué
const filterCategories = (categorySelected, categoriesArr) => {
  categoriesArr.forEach((e) => {
    if (categorySelected === 'all') {
      e.style.display = 'block'
    } else if (e.className === categorySelected) {
      e.style.display = 'block'
    } else {
      e.style.display = 'none'
    }
  })
}

////////// 3 - Vérification de la connexion utilisateur //////////
// Initialisation au chargement de la page //
document.addEventListener('DOMContentLoaded', function() {
  updateGallery();
  // Récupère le token de l'utilisateur depuis le stockage local
  const userToken = localStorage.getItem('userToken');
  // Sélectionne à nouveau le bouton de connexion
  const logBtn = document.getElementById('userLoginBtn');
  // Sélectionne l'élément avec l'ID "edit"
  const navPortModif = document.getElementById('edit');
  // Sélectionne l'élement avec l'ID filter 
  const navfilter = document.getElementById('filter');
   // Sélectionne l'élement avec l'ID  navEdit 
  const navEdit = document.getElementById('navEdit');


  // Ajoute un gestionnaire d'événements pour le clic sur le bouton de connexion
  logBtn.addEventListener('click', function() {
    // Supprime l'userToken du stockage local et redirige vers la page de connexion
    localStorage.removeItem('userToken');
    window.location.href = "login.html";
  });

  // Vérifie si l'utilisateur est connecté en fonction de la présence du jeton
  if (userToken) {
    console.log("Utilisateur connecté !");
    // Modifie le texte du bouton et affiche le bouton "modifier" en cas de connexion
    logBtn.innerHTML = "logout";
    navPortModif.style.display = 'block';
    //fait disparaitre les filtres
    navfilter.style.display = 'none';
    navEdit.style.display = 'block';

  } else {
    console.log("Utilisateur pas connecté !");
    // Modifie le texte du bouton et cache le bouton "modifier" en cas de déconnexion
    logBtn.textContent = "login";
    navPortModif.style.display = 'none';
  }
});
