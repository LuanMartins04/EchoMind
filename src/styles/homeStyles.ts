import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B18",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  glowTop: {
    position: "absolute",
    top: 120,
    left: 40,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(124, 155, 255, 0.12)",
  },

  glowBottom: {
    position: "absolute",
    bottom: 140,
    right: 10,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(93, 211, 255, 0.08)",
  },

  content: {
    width: "100%",
    maxWidth: 420,
  },

  card: {
  backgroundColor: "#101935",
  borderRadius: 28,
  padding: 32,
  borderWidth: 1,
  borderColor: "rgba(124, 155, 255, 0.25)",
  shadowColor: "#7C9BFF",
  shadowOpacity: 0.25,
  shadowRadius: 30,
  shadowOffset: {
    width: 0,
    height: 10,
  },
  elevation: 10,
},

  eyebrow: {
    color: "#7C9BFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 14,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  title: {
    color: "#F5F7FF",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 44,
    marginBottom: 14,
  },

  description: {
    color: "#A8B3CF",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 28,
  },

  button: {
    backgroundColor: "#7C9BFF",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "800",
  },
  
  
});