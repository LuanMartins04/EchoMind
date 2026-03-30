import AsyncStorage from "@react-native-async-storage/async-storage";

export type JournalEntry = {
  id: string;
  date: string;
  text: string;
  mood: string;
};

export type JournalChatContext = {
  recentEntries: JournalEntry[];
  dominantMood: string;
  averageScore: number;
  trendLabel: "positivo" | "neutro" | "sensivel";
  openingMessage: string;
};

const STORAGE_KEY = "@echomind:journals";

type MoodOption =
  | "Muito bem 😄"
  | "Bem 🙂"
  | "Ok 😐"
  | "Mal 😔"
  | "Muito mal 😞";

const moodCycle: MoodOption[] = [
  "Ok 😐",
  "Bem 🙂",
  "Mal 😔",
  "Muito bem 😄",
  "Ok 😐",
  "Bem 🙂",
  "Muito mal 😞",
  "Ok 😐",
  "Bem 🙂",
  "Mal 😔",
  "Muito bem 😄",
  "Ok 😐",
  "Mal 😔",
  "Bem 🙂",
  "Muito bem 😄",
  "Ok 😐",
  "Mal 😔",
  "Muito mal 😞",
  "Ok 😐",
  "Bem 🙂",
  "Muito bem 😄",
  "Ok 😐",
  "Mal 😔",
  "Bem 🙂",
  "Muito bem 😄",
  "Ok 😐",
  "Mal 😔",
  "Bem 🙂",
  "Ok 😐",
  "Muito bem 😄",
];

const textCycle = [
  "Hoje consegui organizar melhor a rotina e isso me deixou um pouco mais leve ao longo do dia.",
  "Senti a cabeça mais pesada em alguns momentos, mas ainda assim consegui seguir com as tarefas.",
  "Foi um dia mais estável. Não aconteceu nada muito fora do normal, mas percebi certo cansaço mental.",
  "Consegui ter um momento de paz e senti que meu humor respondeu bem ao ritmo do dia.",
  "Tive dificuldade para manter o foco e isso mexeu com a forma como enxerguei minhas próprias capacidades.",
  "Hoje me senti mais confiante e produtivo. Pequenas coisas deram certo e isso fez diferença.",
  "Foi um dia emocionalmente difícil, com pensamentos mais pesados e pouca energia para reagir.",
  "Me mantive funcional, mesmo sem grande motivação. Foi um dia mais neutro do que bom ou ruim.",
  "Percebi que conversar um pouco e não guardar tudo ajudou mais do que eu imaginava.",
  "Hoje me cobrei demais e isso afetou bastante meu humor, mesmo sem um motivo tão grande assim.",
];

function formatEntryDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function buildDemoJournalEntries(days = 30): JournalEntry[] {
  const entries: JournalEntry[] = [];

  for (let index = 0; index < days; index += 1) {
    const entryDate = new Date();
    entryDate.setHours(12, 0, 0, 0);
    entryDate.setDate(entryDate.getDate() - index);

    const mood = moodCycle[index % moodCycle.length];
    const text = textCycle[index % textCycle.length];

    entries.push({
      id: `demo-${entryDate.getTime()}-${index}`,
      date: formatEntryDate(entryDate),
      text,
      mood,
    });
  }

  return entries;
}

const defaultJournalEntries: JournalEntry[] = buildDemoJournalEntries(30);

function getMoodScore(mood: string) {
  const normalizedMood = mood.toLowerCase();

  if (normalizedMood.includes("muito bem")) return 2;
  if (normalizedMood.includes("bem")) return 1;
  if (normalizedMood.includes("ok")) return 0;
  if (normalizedMood.includes("muito mal")) return -2;
  if (normalizedMood.includes("mal")) return -1;

  return 0;
}

function getMostFrequentMood(entries: JournalEntry[]) {
  if (entries.length === 0) {
    return "Sem dados ainda";
  }

  const counter: Record<string, number> = {};

  for (const entry of entries) {
    counter[entry.mood] = (counter[entry.mood] || 0) + 1;
  }

  let mostFrequentMood = entries[0].mood;
  let highestCount = 0;

  for (const mood in counter) {
    if (counter[mood] > highestCount) {
      highestCount = counter[mood];
      mostFrequentMood = mood;
    }
  }

  return mostFrequentMood;
}

function buildOpeningMessage(
  recentEntries: JournalEntry[],
  dominantMood: string,
  averageScore: number
): string {
  if (recentEntries.length === 0) {
    return "Oi. Ainda não encontrei registros no seu diário, então podemos começar do zero. Como você está se sentindo hoje?";
  }

  const lastEntry = recentEntries[0];
  const lastMood = lastEntry?.mood ?? dominantMood;

  if (averageScore <= -1) {
    return `Percebi que seus registros recentes estão mais pesados, com humor aparecendo em torno de "${lastMood}". Quero te ouvir com calma. O que mais tem pesando em você hoje?`;
  }

  if (averageScore < 0) {
    return `Notei uma fase mais sensível nos seus últimos registros, com bastante presença de "${dominantMood}". Como você está se sentindo agora, comparado aos últimos dias?`;
  }

  if (averageScore >= 1) {
    return `Seus registros recentes mostram sinais mais positivos, com "${dominantMood}" aparecendo com frequência. O que tem contribuído para isso nos últimos dias?`;
  }

  return `Olhei seus registros mais recentes e vi um padrão mais misto, com "${dominantMood}" aparecendo bastante. Como foi o seu dia hoje, comparado ao que você vinha sentindo?`;
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  try {
    const storedEntries = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedEntries) {
      return JSON.parse(storedEntries) as JournalEntry[];
    }

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultJournalEntries)
    );

    return defaultJournalEntries;
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return defaultJournalEntries;
  }
}

export async function addJournalEntry(
  text: string,
  mood = "Sem humor"
): Promise<JournalEntry[]> {
  try {
    const currentEntries = await getJournalEntries();

    const newEntry: JournalEntry = {
      id: String(Date.now()),
      date: formatEntryDate(new Date()),
      text,
      mood,
    };

    const updatedEntries = [newEntry, ...currentEntries];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

    return updatedEntries;
  } catch (error) {
    console.error("Erro ao salvar registro:", error);
    return [];
  }
}

export async function updateJournalEntry(
  entryId: string,
  text: string,
  mood: string
): Promise<JournalEntry[]> {
  try {
    const currentEntries = await getJournalEntries();

    const updatedEntries = currentEntries.map((entry) => {
      if (entry.id !== entryId) {
        return entry;
      }

      return {
        ...entry,
        text,
        mood,
      };
    });

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

    return updatedEntries;
  } catch (error) {
    console.error("Erro ao editar registro:", error);
    return [];
  }
}

export async function deleteJournalEntry(
  entryId: string
): Promise<JournalEntry[]> {
  try {
    const currentEntries = await getJournalEntries();

    const updatedEntries = currentEntries.filter(
      (entry) => entry.id !== entryId
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

    return updatedEntries;
  } catch (error) {
    console.error("Erro ao excluir registro:", error);
    return [];
  }
}

export async function seedDemoJournalEntries(): Promise<JournalEntry[]> {
  try {
    const demoEntries = buildDemoJournalEntries(30);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(demoEntries));
    return demoEntries;
  } catch (error) {
    console.error("Erro ao carregar dados demo:", error);
    return [];
  }
}

export async function getJournalChatContext(
  limit = 7
): Promise<JournalChatContext> {
  const entries = await getJournalEntries();
  const recentEntries = entries.slice(0, limit);

  if (recentEntries.length === 0) {
    return {
      recentEntries: [],
      dominantMood: "Sem dados ainda",
      averageScore: 0,
      trendLabel: "neutro",
      openingMessage:
        "Oi. Ainda não encontrei registros no seu diário, então podemos começar do zero. Como você está se sentindo hoje?",
    };
  }

  const dominantMood = getMostFrequentMood(recentEntries);

  let totalScore = 0;

  for (const entry of recentEntries) {
    totalScore += getMoodScore(entry.mood);
  }

  const averageScore = totalScore / recentEntries.length;

  let trendLabel: "positivo" | "neutro" | "sensivel" = "neutro";

  if (averageScore < 0) {
    trendLabel = "sensivel";
  } else if (averageScore > 0) {
    trendLabel = "positivo";
  }

  return {
    recentEntries,
    dominantMood,
    averageScore,
    trendLabel,
    openingMessage: buildOpeningMessage(
      recentEntries,
      dominantMood,
      averageScore
    ),
  };
}