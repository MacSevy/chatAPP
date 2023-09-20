function generateRandomUsername() {
    const adjectives = ['happy', 'sunny', 'funny', 'lucky', 'clever', 'cool', 'friendly'];
    const nouns = ['cat', 'dog', 'rabbit', 'penguin', 'dolphin', 'unicorn', 'dragon'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomSuffix = Math.floor(Math.random() * 1000); // Ajoutez un suffixe numérique aléatoire pour plus d'unicité
    return `${randomAdjective}-${randomNoun}-${randomSuffix}`;
  }
