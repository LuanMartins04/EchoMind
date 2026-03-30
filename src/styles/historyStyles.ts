import { StyleSheet } from "react-native";

export const historyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B18",
  },

  content: {
    paddingTop: 72,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  wrapper: {
    width: "100%",
    maxWidth: 980,
    alignSelf: "center",
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
    maxWidth: 760,
  },

  emptyCard: {
    backgroundColor: "#0D1326",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  emptyTitle: {
    color: "#F5F7FF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  emptyText: {
    color: "#A8B3CF",
    fontSize: 15,
    lineHeight: 24,
  },

  card: {
    backgroundColor: "#0D1326",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    marginBottom: 16,
    borderLeftWidth: 5,
  },

  cardNeutral: {
    borderColor: "rgba(255,255,255,0.06)",
    borderLeftColor: "#56627D",
  },

  cardVeryGood: {
    backgroundColor: "rgba(24, 61, 52, 0.45)",
    borderColor: "rgba(77, 211, 174, 0.18)",
    borderLeftColor: "#4DD3AE",
  },

  cardGood: {
    backgroundColor: "rgba(17, 49, 66, 0.45)",
    borderColor: "rgba(83, 192, 255, 0.18)",
    borderLeftColor: "#53C0FF",
  },

  cardOk: {
    backgroundColor: "rgba(18, 26, 51, 0.68)",
    borderColor: "rgba(124,155,255,0.18)",
    borderLeftColor: "#7C9BFF",
  },

  cardBad: {
    backgroundColor: "rgba(66, 45, 15, 0.42)",
    borderColor: "rgba(255, 184, 77, 0.18)",
    borderLeftColor: "#FFB84D",
  },

  cardVeryBad: {
    backgroundColor: "rgba(67, 20, 32, 0.44)",
    borderColor: "rgba(255, 107, 129, 0.18)",
    borderLeftColor: "#FF6B81",
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap",
  },

  cardDate: {
    color: "#7C9BFF",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    flexShrink: 1,
  },

  deleteButton: {
    backgroundColor: "rgba(255, 107, 129, 0.12)",
    borderColor: "rgba(255, 107, 129, 0.26)",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  deleteButtonDisabled: {
    opacity: 0.6,
  },

  deleteButtonText: {
    color: "#FF9CAF",
    fontSize: 13,
    fontWeight: "700",
  },

  cardText: {
    color: "#E3EBFF",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 16,
  },

  moodBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  badgeNeutral: {
    backgroundColor: "#111A33",
    borderColor: "rgba(255,255,255,0.06)",
  },

  badgeVeryGood: {
    backgroundColor: "rgba(77, 211, 174, 0.12)",
    borderColor: "rgba(77, 211, 174, 0.28)",
  },

  badgeGood: {
    backgroundColor: "rgba(83, 192, 255, 0.12)",
    borderColor: "rgba(83, 192, 255, 0.28)",
  },

  badgeOk: {
    backgroundColor: "rgba(124,155,255,0.12)",
    borderColor: "rgba(124,155,255,0.28)",
  },

  badgeBad: {
    backgroundColor: "rgba(255, 184, 77, 0.12)",
    borderColor: "rgba(255, 184, 77, 0.28)",
  },

  badgeVeryBad: {
    backgroundColor: "rgba(255, 107, 129, 0.12)",
    borderColor: "rgba(255, 107, 129, 0.28)",
  },

  moodBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },

  badgeTextNeutral: {
    color: "#C9D4F2",
  },

  badgeTextVeryGood: {
    color: "#8AF0D1",
  },

  badgeTextGood: {
    color: "#8BD8FF",
  },

  badgeTextOk: {
    color: "#B8C9FF",
  },

  badgeTextBad: {
    color: "#FFD08A",
  },

  badgeTextVeryBad: {
    color: "#FF9CAF",
  },
});