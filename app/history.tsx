import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  deleteJournalEntry,
  getJournalEntries,
  type JournalEntry,
} from "../src/data/journalStore";
import { historyStyles } from "../src/styles/historyStyles";

function getMoodVariant(mood: string) {
  const normalizedMood = mood.toLowerCase();

  if (normalizedMood.includes("muito bem")) {
    return {
      cardStyle: historyStyles.cardVeryGood,
      badgeStyle: historyStyles.badgeVeryGood,
      badgeTextStyle: historyStyles.badgeTextVeryGood,
    };
  }

  if (normalizedMood.includes("bem")) {
    return {
      cardStyle: historyStyles.cardGood,
      badgeStyle: historyStyles.badgeGood,
      badgeTextStyle: historyStyles.badgeTextGood,
    };
  }

  if (normalizedMood.includes("ok")) {
    return {
      cardStyle: historyStyles.cardOk,
      badgeStyle: historyStyles.badgeOk,
      badgeTextStyle: historyStyles.badgeTextOk,
    };
  }

  if (normalizedMood.includes("muito mal")) {
    return {
      cardStyle: historyStyles.cardVeryBad,
      badgeStyle: historyStyles.badgeVeryBad,
      badgeTextStyle: historyStyles.badgeTextVeryBad,
    };
  }

  if (normalizedMood.includes("mal")) {
    return {
      cardStyle: historyStyles.cardBad,
      badgeStyle: historyStyles.badgeBad,
      badgeTextStyle: historyStyles.badgeTextBad,
    };
  }

  return {
    cardStyle: historyStyles.cardNeutral,
    badgeStyle: historyStyles.badgeNeutral,
    badgeTextStyle: historyStyles.badgeTextNeutral,
  };
}

export default function History() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadEntries() {
        try {
          setIsLoading(true);
          const storedEntries = await getJournalEntries();

          if (isActive) {
            setEntries(storedEntries);
          }
        } catch (error) {
          console.error("Erro ao carregar histórico:", error);
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }

      void loadEntries();

      return () => {
        isActive = false;
      };
    }, [])
  );

  async function handleDeleteConfirmed(entryId: string) {
    try {
      setDeletingEntryId(entryId);
      const updatedEntries = await deleteJournalEntry(entryId);
      setEntries(updatedEntries);
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
      Alert.alert("Erro", "Não foi possível excluir este registro.");
    } finally {
      setDeletingEntryId(null);
    }
  }

  function handleDeletePress(entryId: string) {
    if (Platform.OS === "web") {
      const confirmed =
        typeof globalThis.confirm === "function"
          ? globalThis.confirm("Tem certeza que deseja excluir este registro?")
          : false;

      if (confirmed) {
        void handleDeleteConfirmed(entryId);
      }

      return;
    }

    Alert.alert(
      "Excluir registro",
      "Tem certeza que deseja excluir este registro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            void handleDeleteConfirmed(entryId);
          },
        },
      ]
    );
  }

  function handleEditPress(entryId: string) {
    router.push(`/edit-entry?id=${entryId}`);
  }

  return (
    <ScrollView
      style={historyStyles.container}
      contentContainerStyle={historyStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={historyStyles.wrapper}>
        <View style={historyStyles.header}>
          <Text style={historyStyles.eyebrow}>Histórico</Text>
          <Text style={historyStyles.title}>Seus registros</Text>
          <Text style={historyStyles.subtitle}>
            Aqui você acompanha como os seus dias foram se acumulando ao longo do
            tempo.
          </Text>
        </View>

        {isLoading ? (
          <View style={historyStyles.emptyCard}>
            <Text style={historyStyles.emptyTitle}>Carregando registros...</Text>
            <Text style={historyStyles.emptyText}>
              Aguarde um instante enquanto o EchoMind busca seu histórico.
            </Text>
          </View>
        ) : entries.length === 0 ? (
          <View style={historyStyles.emptyCard}>
            <Text style={historyStyles.emptyTitle}>Nenhum registro ainda</Text>
            <Text style={historyStyles.emptyText}>
              Assim que você salvar sua primeira entrada, ela vai aparecer aqui.
            </Text>
          </View>
        ) : (
          entries.map((entry) => {
            const moodVariant = getMoodVariant(entry.mood);
            const isDeleting = deletingEntryId === entry.id;

            return (
              <View
                key={entry.id}
                style={[historyStyles.card, moodVariant.cardStyle]}
              >
                <View style={historyStyles.cardTop}>
                  <Text style={historyStyles.cardDate}>{entry.date}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <Pressable
                      style={[
                        historyStyles.deleteButton,
                        {
                          backgroundColor: "rgba(124, 155, 255, 0.12)",
                          borderColor: "rgba(124, 155, 255, 0.26)",
                        },
                      ]}
                      onPress={() => handleEditPress(entry.id)}
                      disabled={isDeleting}
                    >
                      <Text
                        style={[
                          historyStyles.deleteButtonText,
                          { color: "#B8C9FF" },
                        ]}
                      >
                        Editar
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        historyStyles.deleteButton,
                        isDeleting && historyStyles.deleteButtonDisabled,
                      ]}
                      onPress={() => handleDeletePress(entry.id)}
                      disabled={isDeleting}
                    >
                      <Text style={historyStyles.deleteButtonText}>
                        {isDeleting ? "Excluindo..." : "Excluir"}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <Text style={historyStyles.cardText}>{entry.text}</Text>

                <View style={[historyStyles.moodBadge, moodVariant.badgeStyle]}>
                  <Text
                    style={[
                      historyStyles.moodBadgeText,
                      moodVariant.badgeTextStyle,
                    ]}
                  >
                    Humor: {entry.mood}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}