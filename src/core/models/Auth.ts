export type LoginSchema = {
  username: string;
  password: string;
};

export type RegisterSchema = {
  name: string;
  username: string;
  email: string;
  password: string;
  birth: string;
  gender: string;
};

export type FormErrors = {
  username?: string;
  password?: string;
};

// Typage de l'erreur attendue de l'API
export type ApiError = {
  detail: string;
};

// Typage de la réponse attendue de l'API
export type ApiResponse = {
  result: {
    token: string;
    message: string;
  };
};
