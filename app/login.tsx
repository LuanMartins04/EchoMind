import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { loginStyles } from "../src/styles/loginStyles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) {
      alert("Preencha e-mail e senha.");
      return;
    }

    router.push("/home");
  }

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.content}>
        <View style={loginStyles.card}>
          <Text style={loginStyles.title}>Entrar</Text>

          <Text style={loginStyles.description}>
            Acesse sua conta para continuar sua jornada no EchoMind.
          </Text>

          <Text style={loginStyles.label}>E-mail</Text>
          <TextInput
            style={loginStyles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#6F7E9C"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={loginStyles.label}>Senha</Text>
          <TextInput
            style={loginStyles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#6F7E9C"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={loginStyles.button} onPress={handleLogin}>
            <Text style={loginStyles.buttonText}>Entrar</Text>
          </Pressable>

          <Pressable
            style={loginStyles.backButton}
            onPress={() => router.back()}
          >
            <Text style={loginStyles.backButtonText}>Voltar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}