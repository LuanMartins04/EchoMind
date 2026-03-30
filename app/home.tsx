import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
  getJournalEntries,
  seedDemoJournalEntries,
  type JournalEntry,
} from "../src/data/journalStore";
import { homeAppStyles } from "../src/styles/homeAppStyles";

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

function getMoodScore(mood: string) {
  const normalizedMood = mood.toLowerCase();

  if (normalizedMood.includes("muito bem")) return 2;
  if (normalizedMood.includes("bem")) return 1;
  if (normalizedMood.includes("ok")) return 0;
  if (normalizedMood.includes("muito mal")) return -2;
  if (normalizedMood.includes("mal")) return -1;

  return 0;
}

function getTrendText(entries: JournalEntry[]) {
  if (entries.length === 0) {
    return "Assim que você salvar seus primeiros registros, o EchoMind vai começar a identificar tendências emocionais.";
  }

  const recentEntries = entries.slice(0, 5);

  let totalScore = 0;
  let negativeCount = 0;
  let positiveCount = 0;

  for (const entry of recentEntries) {
    const score = getMoodScore(entry.mood);
    totalScore += score;

    if (score < 0) negativeCount += 1;
    if (score > 0) positiveCount += 1;
  }

  const average = totalScore / recentEntries.length;

  if (negativeCount >= 3 || average <= -1.2) {
    return "Seus registros recentes mostram uma sequência mais pesada. Vale acompanhar com mais atenção como os próximos dias vão se comportar.";
  }

  if (average < 0) {
    return "Seu histórico recente mostra uma inclinação para dias mais pesados, mas ainda com alguma oscilação.";
  }

  if (positiveCount >= 3 || average >= 1.2) {
    return "Os registros mais recentes mostram um momento mais favorável, com sinais mais positivos aparecendo com frequência.";
  }

  if (average > 0) {
    return "Seu histórico recente indica uma leve melhora emocional, ainda que com alguma variação entre os dias.";
  }

  return "Seus registros recentes ainda mostram um padrão neutro ou misto. Com mais constância, o EchoMind vai entender melhor essa fase.";
}

function getMoodDistribution(entries: JournalEntry[]) {
  const last30 = entries.slice(0, 30);

  return {
    veryGood: last30.filter((entry) =>
      entry.mood.toLowerCase().includes("muito bem")
    ).length,
    good: last30.filter(
      (entry) =>
        entry.mood.toLowerCase().includes("bem") &&
        !entry.mood.toLowerCase().includes("muito bem")
    ).length,
    ok: last30.filter((entry) => entry.mood.toLowerCase().includes("ok")).length,
    bad: last30.filter(
      (entry) =>
        entry.mood.toLowerCase().includes("mal") &&
        !entry.mood.toLowerCase().includes("muito mal")
    ).length,
    veryBad: last30.filter((entry) =>
      entry.mood.toLowerCase().includes("muito mal")
    ).length,
  };
}

function getMaxValue(values: number[]) {
  const max = Math.max(...values);
  return max <= 0 ? 1 : max;
}

function getEntriesInLastDays(entries: JournalEntry[], days: number) {
  return entries.slice(0, days).length;
}

function getMoodAverage(entries: JournalEntry[]) {
  if (entries.length === 0) {
    return 0;
  }

  let total = 0;

  for (const entry of entries) {
    total += getMoodScore(entry.mood);
  }

  return total / entries.length;
}

function getWeeklyMoodSummary(entries: JournalEntry[]) {
  const last7 = entries.slice(0, 7);

  if (last7.length === 0) {
    return "Sem dados";
  }

  return getMostFrequentMood(last7);
}

function getComparisonText(entries: JournalEntry[]) {
  const last7 = entries.slice(0, 7);
  const last30 = entries.slice(0, 30);

  if (last7.length === 0 || last30.length === 0) {
    return "Ainda não há registros suficientes para comparar períodos.";
  }

  const weeklyAverage = getMoodAverage(last7);
  const monthlyAverage = getMoodAverage(last30);

  if (weeklyAverage > monthlyAverage + 0.25) {
    return "Os últimos 7 dias estão melhores do que a média do mês.";
  }

  if (weeklyAverage < monthlyAverage - 0.25) {
    return "Os últimos 7 dias estão mais pesados do que a média do mês.";
  }

  return "Os últimos 7 dias estão próximos da média emocional do mês.";
}

function getCurrentStreak(entries: JournalEntry[]) {
  if (entries.length === 0) {
    return 0;
  }

  const normalizedDates = new Set(
    entries.map((entry) => {
      const date = new Date(entry.date);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    })
  );

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (true) {
    const currentKey = cursor.getTime();

    if (!normalizedDates.has(currentKey)) {
      break;
    }

    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeedingDemo, setIsSeedingDemo] = useState(false);

  const loadEntries = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedEntries = await getJournalEntries();
      setEntries(storedEntries);
    } catch (error) {
      console.error("Erro ao carregar dados da home:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadEntries();
    }, [loadEntries])
  );

  async function handleLoadDemo() {
    try {
      setIsSeedingDemo(true);
      const demoEntries = await seedDemoJournalEntries();
      setEntries(demoEntries);
      alert("Dados de demonstração carregados.");
    } catch (error) {
      console.error("Erro ao carregar dados demo:", error);
      alert("Não foi possível carregar os dados de demonstração.");
    } finally {
      setIsSeedingDemo(false);
    }
  }

  const totalEntries = entries.length;
  const lastEntry = entries[0];
  const lastMood = lastEntry?.mood ?? "Nenhum ainda";
  const lastDate = lastEntry?.date ?? "Sem registros";

  const mostFrequentMood = useMemo(
    () => getMostFrequentMood(entries),
    [entries]
  );

  const trendText = useMemo(() => getTrendText(entries), [entries]);

  const moodDistribution = useMemo(
    () => getMoodDistribution(entries),
    [entries]
  );

  const maxMoodCount = getMaxValue([
    moodDistribution.veryGood,
    moodDistribution.good,
    moodDistribution.ok,
    moodDistribution.bad,
    moodDistribution.veryBad,
  ]);

  const last7Total = useMemo(() => getEntriesInLastDays(entries, 7), [entries]);
  const last30Total = useMemo(() => getEntriesInLastDays(entries, 30), [entries]);
  const weeklyMood = useMemo(() => getWeeklyMoodSummary(entries), [entries]);
  const comparisonText = useMemo(() => getComparisonText(entries), [entries]);
  const currentStreak = useMemo(() => getCurrentStreak(entries), [entries]);

  return (
    <ScrollView
      style={homeAppStyles.container}
      contentContainerStyle={homeAppStyles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={homeAppStyles.header}>
        <Text style={homeAppStyles.greeting}>Seu espaço</Text>
        <Text style={homeAppStyles.title}>Bem-vindo ao EchoMind</Text>
        <Text style={homeAppStyles.subtitle}>
          Registre seu dia, acompanhe seu humor e comece a enxergar padrões
          emocionais com mais clareza.
        </Text>
      </View>

      <View style={homeAppStyles.heroCard}>
        <Text style={homeAppStyles.heroLabel}>Resumo atual</Text>
        <Text style={homeAppStyles.heroTitle}>
          {isLoading
            ? "Carregando seu painel..."
            : `${totalEntries} registro${
                totalEntries === 1 ? "" : "s"
              } salvo${totalEntries === 1 ? "" : "s"}`}
        </Text>
        <Text style={homeAppStyles.heroText}>
          {isLoading
            ? "Aguarde enquanto o EchoMind organiza suas informações."
            : totalEntries === 0
            ? "Comece com seu primeiro registro para transformar esta tela em um painel real do seu diário."
            : "Seu diário já começou a construir um histórico emocional real."}
        </Text>
      </View>

      <View style={homeAppStyles.statsRow}>
        <View style={homeAppStyles.statCard}>
          <Text style={homeAppStyles.statLabel}>Total de registros</Text>
          <Text style={homeAppStyles.statValue}>
            {isLoading ? "..." : String(totalEntries)}
          </Text>
        </View>

        <View style={homeAppStyles.statCard}>
          <Text style={homeAppStyles.statLabel}>Humor mais frequente</Text>
          <Text style={homeAppStyles.statValue}>
            {isLoading ? "..." : mostFrequentMood}
          </Text>
        </View>
      </View>

      <View style={homeAppStyles.statsRow}>
        <View style={homeAppStyles.statCard}>
          <Text style={homeAppStyles.statLabel}>Últimos 7 dias</Text>
          <Text style={homeAppStyles.statValue}>
            {isLoading ? "..." : String(last7Total)}
          </Text>
        </View>

        <View style={homeAppStyles.statCard}>
          <Text style={homeAppStyles.statLabel}>Sequência atual</Text>
          <Text style={homeAppStyles.statValue}>
            {isLoading ? "..." : `${currentStreak} dia${currentStreak === 1 ? "" : "s"}`}
          </Text>
        </View>
      </View>

      <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Seu momento atual</Text>
        <Text style={homeAppStyles.cardText}>
          {isLoading
            ? "Carregando seu estado mais recente..."
            : totalEntries === 0
            ? "Você ainda não registrou como está se sentindo."
            : `Seu último registro foi em ${lastDate}, com humor ${lastMood}.`}
        </Text>
      </View>

      <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Tendência emocional</Text>
        <Text style={homeAppStyles.cardText}>
          {isLoading ? "Lendo seus registros mais recentes..." : trendText}
        </Text>
      </View>

      <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Leitura da semana</Text>
        <Text style={homeAppStyles.cardText}>
          {isLoading
            ? "Organizando sua leitura semanal..."
            : `Nos últimos 7 dias, o humor predominante foi ${weeklyMood}.`}
        </Text>
      </View>

      <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Comparação de período</Text>
        <Text style={homeAppStyles.cardText}>
          {isLoading ? "Comparando semana e mês..." : comparisonText}
        </Text>
        <Text style={homeAppStyles.cardText}>
          {isLoading
            ? ""
            : `Registros considerados neste painel: ${last30Total} nos últimos 30 dias.`}
        </Text>
      </View>

      <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Dashboard do mês</Text>
        <Text style={homeAppStyles.cardText}>
          Leitura simples dos últimos 30 registros para enxergar distribuição de
          humor ao longo do período.
        </Text>

        <View style={homeAppStyles.chartBlock}>
          <View style={homeAppStyles.chartRow}>
            <Text style={homeAppStyles.chartLabel}>Muito bem</Text>
            <View style={homeAppStyles.chartTrack}>
              <View
                style={[
                  homeAppStyles.chartFill,
                  homeAppStyles.chartFillVeryGood,
                  {
                    width: `${(moodDistribution.veryGood / maxMoodCount) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={homeAppStyles.chartValue}>
              {moodDistribution.veryGood}
            </Text>
          </View>

          <View style={homeAppStyles.chartRow}>
            <Text style={homeAppStyles.chartLabel}>Bem</Text>
            <View style={homeAppStyles.chartTrack}>
              <View
                style={[
                  homeAppStyles.chartFill,
                  homeAppStyles.chartFillGood,
                  {
                    width: `${(moodDistribution.good / maxMoodCount) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={homeAppStyles.chartValue}>{moodDistribution.good}</Text>
          </View>

          <View style={homeAppStyles.chartRow}>
            <Text style={homeAppStyles.chartLabel}>Ok</Text>
            <View style={homeAppStyles.chartTrack}>
              <View
                style={[
                  homeAppStyles.chartFill,
                  homeAppStyles.chartFillOk,
                  {
                    width: `${(moodDistribution.ok / maxMoodCount) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={homeAppStyles.chartValue}>{moodDistribution.ok}</Text>
          </View>

          <View style={homeAppStyles.chartRow}>
            <Text style={homeAppStyles.chartLabel}>Mal</Text>
            <View style={homeAppStyles.chartTrack}>
              <View
                style={[
                  homeAppStyles.chartFill,
                  homeAppStyles.chartFillBad,
                  {
                    width: `${(moodDistribution.bad / maxMoodCount) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={homeAppStyles.chartValue}>{moodDistribution.bad}</Text>
          </View>

          <View style={homeAppStyles.chartRow}>
            <Text style={homeAppStyles.chartLabel}>Muito mal</Text>
            <View style={homeAppStyles.chartTrack}>
              <View
                style={[
                  homeAppStyles.chartFill,
                  homeAppStyles.chartFillVeryBad,
                  {
                    width: `${(moodDistribution.veryBad / maxMoodCount) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={homeAppStyles.chartValue}>
              {moodDistribution.veryBad}
            </Text>
          </View>
        </View>

        <Pressable
          style={homeAppStyles.secondaryButton}
          onPress={handleLoadDemo}
          disabled={isSeedingDemo}
        >
          <Text style={homeAppStyles.secondaryButtonText}>
            {isSeedingDemo ? "Carregando dados demo..." : "Carregar 30 dias demo"}
          </Text>
        </Pressable>
      </View>

      <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Novo registro</Text>
        <Text style={homeAppStyles.cardText}>
          Escreva como foi seu dia, o que sentiu e o que passou pela sua cabeça.
        </Text>

        <Pressable
          style={homeAppStyles.primaryButton}
          onPress={() => router.push("/new-entry")}
        >
          <Text style={homeAppStyles.primaryButtonText}>Escrever agora</Text>
        </Pressable>
      </View>

            <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Conversar</Text>
        <Text style={homeAppStyles.cardText}>
          Entre em um espaço mais acolhedor para escrever livremente, desabafar
          e começar uma conversa guiada dentro do EchoMind.
        </Text>

        <Pressable
          style={homeAppStyles.primaryButton}
          onPress={() => router.push("/chat")}
        >
          <Text style={homeAppStyles.primaryButtonText}>Abrir conversa</Text>
        </Pressable>
      </View>

      <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Último registro salvo</Text>
        <Text style={homeAppStyles.cardText}>
          {isLoading
            ? "Carregando seu último registro..."
            : lastEntry
            ? lastEntry.text
            : "Você ainda não salvou nenhuma entrada no diário."}
        </Text>
      </View>

      <View style={homeAppStyles.card}>
        <Text style={homeAppStyles.cardTitle}>Seu histórico</Text>
        <Text style={homeAppStyles.cardText}>
          Reveja registros anteriores e acompanhe como seus dias estão
          evoluindo.
        </Text>

        <Pressable
          style={homeAppStyles.primaryButton}
          onPress={() => router.push("/history")}
        >
          <Text style={homeAppStyles.primaryButtonText}>Ver histórico</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}