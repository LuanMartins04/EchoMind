import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { addJournalEntry } from "../src/data/journalStore";
import { newEntryStyles } from "../src/styles/newEntryStyles";

const moodOptions = [
  "Muito bem 😄",
  "Bem 🙂",
  "Ok 😐",
  "Mal 😔",
  "Muito mal 😞",
];

export default function NewEntry() {
  const [entryText, setEntryText] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSaveEntry() {
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
      await addJournalEntry(entryText, selectedMood);
      setEntryText("");
      setSelectedMood("");
      alert("Registro salvo com sucesso.");
      router.push("/history");
    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar o registro.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={newEntryStyles.container}>
      <View style={newEntryStyles.header}>
        <Text style={newEntryStyles.eyebrow}>Novo registro</Text>
        <Text style={newEntryStyles.title}>Como foi seu dia?</Text>
        <Text style={newEntryStyles.subtitle}>
          Escreva livremente sobre o que você sentiu, pensou ou viveu hoje.
        </Text>
      </View>

      <View style={newEntryStyles.card}>
        <Text style={newEntryStyles.label}>Seu humor hoje</Text>

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
          onPress={handleSaveEntry}
          disabled={isSaving}
        >
          <Text style={newEntryStyles.primaryButtonText}>
            {isSaving ? "Salvando..." : "Salvar registro"}
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