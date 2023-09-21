// validation.ts
export const validateUsername = (username: string) => {
    if (!username.trim()) return "Le nom d'utilisateur est requis.";
    // Vous pouvez ajouter d'autres vérifications si nécessaire
    return undefined;
  };
  
  export const validatePassword = (password: string) => {
    if (!password) return "Le mot de passe est requis.";
    // if (password.length < 8) return "Le mot de passe doit comporter au moins 8 caractères.";
    // Vous pouvez ajouter d'autres vérifications si nécessaire
    return undefined;
  };
  