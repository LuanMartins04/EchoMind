import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B18",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  content: {
    width: "100%",
    maxWidth: 420,
  },

  card: {
    backgroundColor: "#0D1326",
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  title: {
    color: "#F5F7FF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },

  description: {
    color: "#A8B3CF",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },

  label: {
    color: "#C9D4F2",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#111A33",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#F5F7FF",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#7C9BFF",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "800",
  },

  backButton: {
    alignItems: "center",
    marginTop: 16,
  },

  backButtonText: {
    color: "#9FB0D0",
    fontSize: 14,
    fontWeight: "600",
  },
});