// testForceBruteLogin.js
import axios from "axios";

const testLoginBruteForce = async () => {
  const URL = "http://localhost:3005/api/auth/login";

  const payload = {
    email: "estheticatelier64@gmail.com",
    password: "1234567890", // Utilisez un mot de passe incorrect pour simuler une attaque par force brute
  };

  for (let i = 1; i <= 6; i++) {
    try {
      const response = await axios.post(URL, payload, {
        withCredentials: true,
      });
      console.log(`Tentative ${i}:`, response.data.message);
    } catch (error) {
      if (error.response) {
        console.log(`Tentative ${i}:`, error.response.status, error.response.data.message);
      } else {
        console.error(`Tentative ${i}: Erreur inconnue`, error.message);
      }
    }
  }
};

testLoginBruteForce();