# PromptPulse

PromptPulse est une plateforme permettant de découvrir, créer et partager des prompts

## Technologie

Ce projet utilise le framework Next.js

## Dépendances

Ce projet utilise les dépendances suivantes

- next-auth
- mongoDB
- mongoose
- sass

## Installation

### Cloner le projet

Pour cloner ce projet, exécutez la commande suivante dans votre terminal

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

Assurez-vous de remplacer votre-utilisateur et votre-repo par les informations appropriées pour votre projet

### Installation des dépendances

Après avoir cloné le projet, installez les dépendances nécessaires en exécutant

```bash
npm install
```

### Configuration des variables d'environnement

Créez un nouveau fichier nommé `.env` à la racine du projet et ajoutez les lignes suivantes

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
```

### Lancer le projet

Pour démarrer le serveur de développement, utilisez la commande suivante

```bash
npm run dev
```

L'application sera accessible à l'adresse http://localhost:3000
