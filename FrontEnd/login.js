// Gèstion du processus de connexion du site 

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche le rechargement de la page par défaut

  //Récupère les valeurs des champs email et mot de passe.
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  // Envoie une requête HTTP POST à l'API de connexion
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
       
      },
      body: JSON.stringify({ email, password })
  })

  // Traitement de la réponse de l'API.
  .then(response => {
      if (response.ok) {
          return response.json(); 
      } else {
          throw new Error('Authentification échouée');
      }
  })
  .then(data => {
    
      localStorage.setItem('userToken', data.token); 
      
    
      window.location.href = "index.html"; 
  })
  .catch(error => {
      alert("Authentification incorrecte", error);
  });
});