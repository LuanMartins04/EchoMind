import { StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B18",
  },

  content: {
    flex: 1,
    paddingTop: 72,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  header: {
    marginBottom: 20,
  },

  eyebrow: {
    color: "#7C9BFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  title: {
    color: "#F5F7FF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },

  subtitle: {
    color: "#A8B3CF",
    fontSize: 16,
    lineHeight: 24,
  },

  messagesList: {
    flex: 1,
  },

  messagesContent: {
    paddingBottom: 20,
    gap: 12,
  },

  botBubble: {
    alignSelf: "flex-start",
    maxWidth: "88%",
    backgroundColor: "#0D1326",
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  userBubble: {
    alignSelf: "flex-end",
    maxWidth: "88%",
    backgroundColor: "#8EA7FF",
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  botText: {
    color: "#E3EBFF",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
  },

  userText: {
    color: "#081120",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
  },

  typingBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#0D1326",
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  typingText: {
    color: "#A8B3CF",
    fontSize: 14,
    fontWeight: "600",
  },

  composer: {
    backgroundColor: "#0D1326",
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginTop: 12,
  },

  input: {
    minHeight: 90,
    maxHeight: 140,
    color: "#F5F7FF",
    fontSize: 15,
    lineHeight: 22,
    textAlignVertical: "top",
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 12,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#111A33",
    borderWidth: 1,
    borderColor: "rgba(124,155,255,0.20)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },

  secondaryButtonText: {
    color: "#B8C9FF",
    fontSize: 15,
    fontWeight: "700",
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#8EA7FF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },

  primaryButtonDisabled: {
    opacity: 0.7,
  },

  primaryButtonText: {
    color: "#081120",
    fontSize: 15,
    fontWeight: "800",
  },
});