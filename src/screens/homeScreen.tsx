import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { homeStyles } from "../styles/homeStyles";

export default function HomeScreen() {
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.glowTop} />
      <View style={homeStyles.glowBottom} />

      <View style={homeStyles.content}>
        <View style={homeStyles.card}>
          <Text style={homeStyles.eyebrow}>Diário com IA</Text>

          <Text style={homeStyles.title}>EchoMind</Text>

          <Text style={homeStyles.description}>
            Registre seus pensamentos, acompanhe seu humor e receba insights
            inteligentes sobre sua rotina e emoções.
          </Text>

          <Pressable style={homeStyles.button} onPress={() => router.push("/login")}>
            <Text style={homeStyles.buttonText}>Começar agora</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}