function shuffleArray(array) {
    const arr = [...array]; // Copia per non modificare l'originale
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // indice casuale
      [arr[i], arr[j]] = [arr[j], arr[i]]; // scambia gli elementi
    }
    return arr;
  }
export { shuffleArray };