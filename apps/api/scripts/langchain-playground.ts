import { z } from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
  model: "gpt-5-mini"
});

const messageSchema = z.object({
  sentiment: z.object({
    negative: z.number().min(0).max(100),
    neutral: z.number().min(0).max(100),
    positive: z.number().min(0).max(100)
  }),
  emotions: z.object({
    primary: z.array(
      z.object({
        name: z.string(),
        score: z.number().min(0).max(100)
      })
    ).default([]),
    secondary: z.array(
      z.object({
        name: z.string(),
        score: z.number().min(0).max(100)
      })
    )
      .default([]),
    social: z.array(
      z.object({
        name: z.string(),
        score: z.number().min(0).max(100)
      })
    )
      .default([]),
    mood: z.array(
      z.object({
        name: z.string(),
        score: z.number().min(0).max(100)
      })
    )
      .default([])
  })
})

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
    You are an expert in sentiment and emotion analysis. Your task is to analyze a message in its context and return a structured output matching the provided schema.

    Instructions:
    - Use the context to interpret the message.
    - For sentiment, assign scores (negative, neutral, positive) between 0 and 100. The sum of all three must be exactly 100.
    - For emotions, identify and score relevant emotions (0-100) in four categories:
      - primary: main emotions directly expressed.
      - secondary: underlying or less obvious emotions.
      - social: emotions related to social dynamics or relationships.
      - mood: general mood or atmosphere.
    - For each emotion category, the total score must be distributed among all detected emotions in that category. The sum of the scores for all emotions in a category must be exactly 100 if at least one emotion is present, or 0 if none are detected (use an empty array).
    - Only include emotions that are relevant. If a category has no relevant emotions, return an empty array for that category.
    - If no emotions are detected, all emotion arrays must be empty.
    - If no context is provided, analyze the message alone.
    - If the message is empty, set all sentiment scores to 0 and all emotion arrays to empty.
    - Output must strictly match the provided schema.

    Context:
    {relevantContexts}
    `
  ],
  ["human", "Analyze the sentiment and emotions of this message in context: {text}"]
]);

const structured_llm = llm.withStructuredOutput(messageSchema);

const VIDEO = `
  Assimilation du soufre chez les plantes – Résumé

  Le soufre est un élément essentiel pour la croissance et le fonctionnement des plantes. Sa teneur varie selon les espèces, allant de 0,1 à 6 % du poids sec. Les plantes absorbent principalement le soufre sous forme de sulfate par les racines, qui doit ensuite être réduit en sulfure avant d’être intégré dans des composés organiques.

  #### **Absorption et transport**
  - Le sulfate est absorbé activement par les racines grâce à des transporteurs spécifiques, puis transporté vers la tige via le xylème.
  - Plusieurs familles de transporteurs de sulfate existent, avec des rôles distincts selon leur localisation (racines, tiges, feuilles, vacuoles).
  - L’absorption et le transport sont régulés par l’état nutritionnel en soufre de la plante.

  #### **Réduction et assimilation**
  - La réduction du sulfate en sulfure se fait principalement dans les chloroplastes des feuilles, en plusieurs étapes enzymatiques.
  - Le sulfure est ensuite incorporé dans la cystéine, un acide aminé soufré fondamental, qui sert de précurseur à la méthionine et à de nombreux autres composés soufrés.

  #### **Composés soufrés**
  - La majorité du soufre organique se trouve dans les protéines (cystéine et méthionine).
  - D’autres composés importants incluent le glutathion (antioxydant et transporteur de soufre), les sulfolipides (dans les membranes plastidiennes), et des composés secondaires comme les glucosinolates (Brassicacées) et les alliines (Allium).
  - Ces composés jouent des rôles dans la structure des protéines, la protection contre le stress, la détoxification, et la qualité alimentaire.

  #### **Pollution et métabolisme**
  - Les gaz soufrés atmosphériques (SO₂, H₂S) peuvent être absorbés par les feuilles et utilisés comme source de soufre, mais sont aussi potentiellement toxiques.
  - Les plantes peuvent assimiler le soufre atmosphérique, ce qui peut compenser une carence racinaire, mais une exposition excessive peut perturber le métabolisme du soufre.

  ---

  **En résumé :**
  L’assimilation du soufre chez les plantes implique l’absorption du sulfate, sa réduction en sulfure, puis son incorporation dans des acides aminés et divers composés organiques essentiels à la croissance, à la protection et à la qualité des plantes. Le métabolisme du soufre est finement régulé et peut être influencé par la pollution atmosphérique.
`

const prompt = await promptTemplate.invoke({
  text: "😒 On parle du soufre comme d’un élément essentiel, mais la pollution atmosphérique le rend parfois plus toxique qu’utile pour les plantes… #Pollution #PlantesEnDanger",
  relevantContexts: VIDEO
});

const analysis = await structured_llm.invoke(prompt);

console.log(analysis)
