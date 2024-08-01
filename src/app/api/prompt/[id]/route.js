import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

// READ - Récupérer un prompt par son id
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) {
      return new Response(JSON.stringify({}), {
        status: 404,
        message: 'Prompt non trouvé.',
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
      message: 'Prompt recupérés avec succès.',
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      message: 'Erreur lors de la récupération du prompt.',
    });
  }
};

// UPDATE - Modifier un prompt par son id
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const isExist = await Prompt.findById(params.id);
    if (!isExist) {
      return new Response(JSON.stringify({}), {
        status: 404,
        message: 'Prompt non trouvé.',
      });
    }

    isExist.prompt = prompt;
    isExist.tag = tag;
    await isExist.save();

    return new Response(JSON.stringify(isExist), {
      status: 200,
      message: 'Prompt modifié avec succès.',
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      message: 'Erreur lors de la modification du prompt.',
    });
  }
};

// DELETE - Supprimer un prompt par son id
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findByIdAndDelete(params.id);
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt non trouvé.' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: 'Prompt supprimé avec succès.' }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Erreur lors de la suppression du prompt:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la suppression du prompt.' }),
      {
        status: 500,
      }
    );
  }
};
