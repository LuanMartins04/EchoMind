import { StyleSheet } from "react-native";

export const newEntryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B18",
    paddingHorizontal: 24,
    paddingTop: 72,
  },

  header: {
    marginBottom: 24,
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

  card: {
    backgroundColor: "#0D1326",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 18,
  },

  label: {
    color: "#C9D4F2",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 4,
  },

  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },

  moodButton: {
    backgroundColor: "#111A33",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
  },

  moodButtonActive: {
    backgroundColor: "rgba(124,155,255,0.18)",
    borderColor: "#7C9BFF",
  },

  moodButtonText: {
    color: "#C9D4F2",
    fontSize: 14,
    fontWeight: "600",
  },

  moodButtonTextActive: {
    color: "#F5F7FF",
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
    minHeight: 180,
    textAlignVertical: "top",
  },

  primaryButton: {
    backgroundColor: "#7C9BFF",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 14,
  },

  primaryButtonText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    alignItems: "center",
    marginTop: 16,
  },

  secondaryButtonText: {
    color: "#9FB0D0",
    fontSize: 14,
    fontWeight: "600",
  },
});