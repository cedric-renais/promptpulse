import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt requis.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag requis.'],
  },
});

// Créer un modèle pour les prompts s'il n'existe pas déjà dans la base de données MongoDB
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
