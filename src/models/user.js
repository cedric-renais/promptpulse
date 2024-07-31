import { Schema, model, models } from 'mongoose';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modèle d'expression régulière pour valider les noms d'utilisateur                                             //
// Le modèle impose les règles suivantes :                                                                       //
// Le nom d'utilisateur doit avoir entre 8 et 20 caractères                                                      //
// Le nom d'utilisateur ne peut pas commencer ou se terminer par un underscore (_) ou un point (.)               //
// Le nom d'utilisateur ne peut pas contenir des underscores (_) ou des points (.) consécutifs                   //
// Le nom d'utilisateur ne peut contenir que des caractères alphanumériques, des underscores (_), des points (.) //
// Le nom d'utilisateur peut contenir des caractères accentués                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const regex =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._à-ÿÀ-Ÿ]+(?<![_.])$/;

// Créer un schéma pour les utilisateurs
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Adresse e-mail déjà utilisée !'],
    required: [true, `L'adresse e-mail est requise !`],
  },
  username: {
    type: String,
    required: [true, `Le nom d'utilisateur est requis !`],
    match: [
      regex,
      `Nom d'utilisateur invalide, il doit contenir 8 à 20 caractères alphanumériques et être unique !`,
    ],
  },
  image: {
    type: String,
  },
});

// Créer un modèle pour les utilisateurs si un modèle n'existe pas déjà dans la base de données MongoDB
const User = models.User || model('User', UserSchema);

export default User;
