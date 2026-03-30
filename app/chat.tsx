import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    getJournalChatContext,
    type JournalChatContext,
} from "../src/data/journalStore";
import { chatStyles } from "../src/styles/chatStyles";

type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectIntent(message: string) {
  const text = normalizeText(message);

  const isHighRisk =
    text.includes("quero sumir") ||
    text.includes("nao quero viver") ||
    text.includes("nao aguento mais") ||
    text.includes("desistir de tudo") ||
    text.includes("machucar") ||
    text.includes("me ferir");

  const isVerySad =
    text.includes("muito ruim") ||
    text.includes("bem ruim") ||
    text.includes("péssimo") ||
    text.includes("pessimo") ||
    text.includes("triste") ||
    text.includes("cansado") ||
    text.includes("sozinho") ||
    text.includes("vazio") ||
    text.includes("inutil") ||
    text.includes("fracasso") ||
    text.includes("mal");

  const isAnxious =
    text.includes("ansioso") ||
    text.includes("ansiedade") ||
    text.includes("nervoso") ||
    text.includes("preocupado") ||
    text.includes("medo") ||
    text.includes("angustia") ||
    text.includes("angústia");

  const isAngry =
    text.includes("raiva") ||
    text.includes("odio") ||
    text.includes("ódio") ||
    text.includes("irritado") ||
    text.includes("estressado");

  const isPositive =
    text.includes("feliz") ||
    text.includes("melhor") ||
    text.includes("bem") ||
    text.includes("aliviado") ||
    text.includes("orgulhoso") ||
    text.includes("deu certo") ||
    text.includes("consegui");

  return {
    isHighRisk,
    isVerySad,
    isAnxious,
    isAngry,
    isPositive,
  };
}

function buildHumanOpeningMessage(context: JournalChatContext | null) {
  if (!context || context.recentEntries.length === 0) {
    return "Oi. Eu tô aqui com você. Podemos começar sem pressa e sem precisar organizar tudo perfeitamente. Como você tá se sentindo hoje, de verdade?";
  }

  const dominantMood = context.dominantMood;
  const trendLabel = context.trendLabel;

  if (trendLabel === "sensivel") {
    return `Oi. Antes de qualquer coisa, eu quero te receber com calma. Pelos seus registros recentes, parece que os últimos dias têm sido mais sensíveis, e "${dominantMood}" apareceu algumas vezes. Não precisa carregar isso sozinho agora. Como você tá hoje?`;
  }

  if (trendLabel === "positivo") {
    return `Oi. Eu dei uma olhada no seu diário e percebi sinais mais leves nos últimos dias, com "${dominantMood}" aparecendo bastante. Fico feliz por isso. Quero entender melhor: o que tem feito bem pra você ultimamente?`;
  }

  return `Oi. Eu dei uma olhada no que você vem registrando, e seus últimos dias parecem ter ficado mais mistos, com "${dominantMood}" aparecendo com frequência. Tô aqui pra te ouvir com calma. Como você tá hoje, sem filtro?`;
}

function buildBotReply(message: string, context: JournalChatContext | null) {
  const text = normalizeText(message);
  const { isHighRisk, isVerySad, isAnxious, isAngry, isPositive } =
    detectIntent(message);

  const dominantMood = context?.dominantMood ?? "Ok 😐";
  const trendLabel = context?.trendLabel ?? "neutro";
  const lastEntry = context?.recentEntries?.[0];

  if (isHighRisk) {
    return "Obrigado por me contar isso. O mais importante agora é você não ficar sozinho com esse peso. Procure imediatamente um adulto de confiança, um familiar, um amigo próximo ou um profissional para ficar com você agora. Também vale buscar um canal de apoio emocional da sua região neste momento. Sua segurança vem primeiro.";
  }

  if (isVerySad) {
    if (trendLabel === "sensivel") {
      return `Poxa... eu sinto muito que esteja assim. E pelo que você vinha registrando no diário, dá pra perceber que isso não começou só agora. Eu quero ficar nesse ponto com você, com calma. O que mais machucou hoje: o trabalho, a forma como você se viu, ou alguma situação específica que aconteceu?`;
    }

    if (lastEntry) {
      return `Sinto muito que hoje tenha pesado desse jeito. No seu último registro já existia um sinal disso, especialmente com "${lastEntry.mood}". Eu tô aqui com você agora. Qual foi a parte do dia que mais te derrubou?`;
    }

    return "Sinto muito que esteja assim. Eu tô aqui com você agora, sem pressa. Me conta só uma coisa por enquanto: o que mais doeu hoje?";
  }

  if (isAnxious) {
    return "Entendi. Quando a cabeça acelera, tudo parece maior mesmo. Vamos tentar deixar isso mais respirável juntos: o que está te consumindo mais agora, algo que já aconteceu ou algo que você está com medo que aconteça?";
  }

  if (isAngry) {
    return "Faz sentido isso te atingir desse jeito. Às vezes a raiva aparece quando alguma coisa encosta bem no limite da gente. Quero entender melhor contigo: o que foi que te atravessou hoje?";
  }

  if (isPositive) {
    if (trendLabel === "positivo") {
      return `Isso é muito bom de ouvir. E sabe o melhor? Isso combina com os sinais que você vinha deixando no diário. Eu fico feliz por esse momento. O que você fez, decidiu ou mudou que ajudou a chegar nisso?`;
    }

    return "Que bom ler isso. De verdade. Momentos assim importam muito e merecem ser reconhecidos. Eu fico feliz por você. O que aconteceu hoje que te fez se sentir assim?";
  }

  if (
    text.includes("trabalho") ||
    text.includes("servico") ||
    text.includes("serviço")
  ) {
    return "Entendi... então isso encostou direto no teu valor pessoal. Quando o trabalho pesa desse jeito, ele não bate só na rotina, bate na forma como a gente se enxerga. Mas o que você sente agora não define quem você é. O que aconteceu no trabalho que fez essa sensação crescer tanto?";
  }

  if (
    text.includes("ninguem liga") ||
    text.includes("ninguem se importa") ||
    text.includes("ninguém liga") ||
    text.includes("ninguém se importa")
  ) {
    return "Eu sinto muito que esteja vindo essa sensação. Quando a dor aperta, ela costuma tentar convencer a gente de que está sozinho, mesmo quando isso não traduz tudo o que é real. Eu tô aqui com você agora. Teve alguma situação específica hoje que despertou isso?";
  }

  if (trendLabel === "sensivel") {
    return `Eu tô te ouvindo de verdade. Como seus registros recentes já vinham mostrando uma fase mais delicada, eu quero ir com cuidado. Me fala só o principal: o que mais tem pesado no seu coração ou na sua cabeça hoje?`;
  }

  if (trendLabel === "positivo") {
    return `Tô aqui com você. Mesmo quando a fase parece melhor, ainda podem existir dias difíceis. Quero entender o que aconteceu hoje. O que te abalou ou te marcou mais?`;
  }

  return `Tô aqui com você. Pelo seu diário, "${dominantMood}" apareceu bastante nos últimos dias, então quero te ouvir com atenção de verdade. O que você gostaria que alguém entendesse sobre como você está se sentindo agora?`;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(true);
  const [chatContext, setChatContext] = useState<JournalChatContext | null>(
    null
  );

  const headerSubtitle = useMemo(() => {
    return "Um espaço acolhedor para conversar com base no que você vem vivendo e registrando.";
  }, []);

  useEffect(() => {
    async function loadChatContext() {
      try {
        const context = await getJournalChatContext(7);
        setChatContext(context);

        setMessages([
          {
            id: "opening-message",
            sender: "bot",
            text: buildHumanOpeningMessage(context),
          },
        ]);
      } catch (error) {
        console.error("Erro ao carregar contexto do chat:", error);

        setMessages([
          {
            id: "fallback-message",
            sender: "bot",
            text: "Oi. Eu tô aqui com você. Não consegui ler seus registros agora, mas ainda quero te ouvir com calma. Como você tá hoje?",
          },
        ]);
      } finally {
        setIsLoadingContext(false);
      }
    }

    loadChatContext();
  }, []);

  function handleGoBack() {
    router.back();
  }

  function handleSendMessage() {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isSending || isLoadingContext) {
      return;
    }

    const now = Date.now();

    const userMessage: ChatMessage = {
      id: `${now}-user`,
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `${Date.now()}-bot`,
        sender: "bot",
        text: buildBotReply(trimmedMessage, chatContext),
      };

      setMessages((current) => [...current, botMessage]);
      setIsSending(false);
    }, 700);
  }

  return (
    <KeyboardAvoidingView
      style={chatStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={chatStyles.content}>
        <View style={chatStyles.header}>
          <Text style={chatStyles.eyebrow}>Conversar</Text>
          <Text style={chatStyles.title}>Seu espaço de conversa</Text>
          <Text style={chatStyles.subtitle}>{headerSubtitle}</Text>
        </View>

        {isLoadingContext ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <ActivityIndicator size="small" color="#8EA7FF" />
            <Text style={{ color: "#A8B3CF", fontSize: 15 }}>
              Preparando um espaço mais acolhedor para você...
            </Text>
          </View>
        ) : (
          <ScrollView
            style={chatStyles.messagesList}
            contentContainerStyle={chatStyles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => {
              const isBot = message.sender === "bot";

              return (
                <View
                  key={message.id}
                  style={isBot ? chatStyles.botBubble : chatStyles.userBubble}
                >
                  <Text style={isBot ? chatStyles.botText : chatStyles.userText}>
                    {message.text}
                  </Text>
                </View>
              );
            })}

            {isSending ? (
              <View style={chatStyles.typingBubble}>
                <Text style={chatStyles.typingText}>
                  EchoMind está pensando com carinho...
                </Text>
              </View>
            ) : null}
          </ScrollView>
        )}

        <View style={chatStyles.composer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Escreva do seu jeito. Eu tô aqui pra te ouvir..."
            placeholderTextColor="#6F7E9C"
            multiline
            editable={!isSending && !isLoadingContext}
            style={chatStyles.input}
          />

          <View style={chatStyles.actionsRow}>
            <Pressable
              onPress={handleGoBack}
              style={chatStyles.secondaryButton}
            >
              <Text style={chatStyles.secondaryButtonText}>Voltar</Text>
            </Pressable>

            <Pressable
              onPress={handleSendMessage}
              disabled={isSending || isLoadingContext}
              style={[
                chatStyles.primaryButton,
                (isSending || isLoadingContext) &&
                  chatStyles.primaryButtonDisabled,
              ]}
            >
              <Text style={chatStyles.primaryButtonText}>
                {isSending ? "Enviando..." : "Enviar"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}