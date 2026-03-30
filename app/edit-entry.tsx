import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import {
    getJournalEntries,
    updateJournalEntry,
} from "../src/data/journalStore";
import { newEntryStyles } from "../src/styles/newEntryStyles";

const moodOptions = [
  "Muito bem 😄",
  "Bem 🙂",
  "Ok 😐",
  "Mal 😔",
  "Muito mal 😞",
];

export default function EditEntry() {
  const params = useLocalSearchParams<{ id?: string }>();
  const entryId = typeof params.id === "string" ? params.id : "";

  const [entryText, setEntryText] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadEntry() {
      try {
        const entries = await getJournalEntries();
        const entry = entries.find((item) => item.id === entryId);

        if (!isActive) {
          return;
        }

        if (!entry) {
          alert("Registro não encontrado.");
          router.back();
          return;
        }

        setEntryText(entry.text);
        setSelectedMood(entry.mood);
      } catch (error) {
        console.error("Erro ao carregar registro:", error);
        alert("Não foi possível carregar este registro.");
        router.back();
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    if (!entryId) {
      alert("Registro inválido.");
      router.back();
      return;
    }

    void loadEntry();

    return () => {
      isActive = false;
    };
  }, [entryId]);

  async function handleSaveEdit() {
    if (!entryText.trim()) {
      alert("Escreva algo antes de salvar.");
      return;
    }

    if (!selectedMood) {
      alert("Selecione seu humor antes de salvar.");
      return;
    }

    try {
      setIsSaving(true);
      await updateJournalEntry(entryId, entryText, selectedMood);
      alert("Registro atualizado com sucesso.");
      router.replace("/history");
    } catch (error) {
      console.error("Erro ao atualizar registro:", error);
      alert("Não foi possível atualizar este registro.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <View style={newEntryStyles.container}>
        <View style={newEntryStyles.header}>
          <Text style={newEntryStyles.eyebrow}>Editar registro</Text>
          <Text style={newEntryStyles.title}>Carregando...</Text>
          <Text style={newEntryStyles.subtitle}>
            Aguarde enquanto o EchoMind busca seu registro.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={newEntryStyles.container}>
      <View style={newEntryStyles.header}>
        <Text style={newEntryStyles.eyebrow}>Editar registro</Text>
        <Text style={newEntryStyles.title}>Atualize sua entrada</Text>
        <Text style={newEntryStyles.subtitle}>
          Ajuste o texto e o humor deste dia do jeito que fizer mais sentido.
        </Text>
      </View>

      <View style={newEntryStyles.card}>
        <Text style={newEntryStyles.label}>Seu humor neste dia</Text>

        <View style={newEntryStyles.moodGrid}>
          {moodOptions.map((mood) => {
            const isSelected = selectedMood === mood;

            return (
              <Pressable
                key={mood}
                style={[
                  newEntryStyles.moodButton,
                  isSelected && newEntryStyles.moodButtonActive,
                ]}
                onPress={() => setSelectedMood(mood)}
                disabled={isSaving}
              >
                <Text
                  style={[
                    newEntryStyles.moodButtonText,
                    isSelected && newEntryStyles.moodButtonTextActive,
                  ]}
                >
                  {mood}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={newEntryStyles.label}>Seu registro</Text>

        <TextInput
          style={newEntryStyles.input}
          placeholder="Digite aqui seu registro..."
          placeholderTextColor="#6F7E9C"
          multiline
          value={entryText}
          onChangeText={setEntryText}
          editable={!isSaving}
        />

        <Pressable
          style={newEntryStyles.primaryButton}
          onPress={handleSaveEdit}
          disabled={isSaving}
        >
          <Text style={newEntryStyles.primaryButtonText}>
            {isSaving ? "Salvando..." : "Salvar alterações"}
          </Text>
        </Pressable>

        <Pressable
          style={newEntryStyles.secondaryButton}
          onPress={() => router.back()}
          disabled={isSaving}
        >
          <Text style={newEntryStyles.secondaryButtonText}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}