# STRUCTURE

src/
│
├── core/                        # Logique métier pure et modèles de domaines
│   ├── models/                  # Modèles de données et interfaces
│   │   ├── User.ts
│   │   └── ...
│   ├── services/                # Logique métier
│   │   ├── authService.ts
│   │   └── ...
│   └── utils/                   # Fonctions utilitaires liées à la logique métier
│       ├── constants.ts
│       └── ...
│
├── ports/                       # Ports pour les fonctionnalités
│   ├── auth/                    # Ports pour la fonctionnalité d'authentification
│   │   ├── useLogin.ts          # Hook pour la logique de connexion
│   │   └── ...
│   └── ...                      # Autres ports pour d'autres fonctionnalités
│
├── adapters/                    # Adapters pour communiquer avec le monde extérieur
│   ├── api/                     # Adapters pour les appels API
│   │   ├── axiosConfig.ts       # Configuration Axios
│   │   └── ...
│   ├── components/              # Composants UI (adapters pour l'interface utilisateur)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   └── state/                   # Gestion d'état global (peut être considéré comme un adapter pour le stockage d'état)
│       ├── AuthContext.tsx
│       └── ...
│
├── App.tsx                      # Composant racine
└── index.tsx                    # Point d'entrée principal
