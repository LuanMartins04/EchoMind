import { StyleSheet } from "react-native";

export const homeAppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B18",
  },

  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 28,
  },

  greeting: {
    color: "#7C9BFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  title: {
    color: "#F5F7FF",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 10,
  },

  subtitle: {
    color: "#A8B3CF",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 760,
  },

  heroCard: {
    backgroundColor: "#101935",
    borderRadius: 30,
    padding: 26,
    borderWidth: 1,
    borderColor: "rgba(124, 155, 255, 0.22)",
    marginBottom: 18,
    shadowColor: "#7C9BFF",
    shadowOpacity: 0.2,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 10,
  },

  heroLabel: {
    color: "#8EA7FF",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },

  heroTitle: {
    color: "#F5F7FF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },

  heroText: {
    color: "#B7C3E0",
    fontSize: 15,
    lineHeight: 24,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#0D1326",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 5,
  },

  statLabel: {
    color: "#8EA3D1",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },

  statValue: {
    color: "#F5F7FF",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 24,
  },

  card: {
    backgroundColor: "#0D1326",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 5,
  },

  cardTitle: {
    color: "#F5F7FF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },

  cardText: {
    color: "#A8B3CF",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },

  chartBlock: {
    marginTop: 4,
    marginBottom: 18,
    gap: 14,
    paddingTop: 6,
  },

  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  chartLabel: {
    width: 88,
    color: "#D2DCFF",
    fontSize: 13,
    fontWeight: "700",
  },

  chartTrack: {
    flex: 1,
    height: 12,
    backgroundColor: "#111A33",
    borderRadius: 999,
    overflow: "hidden",
  },

  chartFill: {
    height: "100%",
    borderRadius: 999,
    minWidth: 8,
  },

  chartFillVeryGood: {
    backgroundColor: "#4DD3AE",
  },

  chartFillGood: {
    backgroundColor: "#53C0FF",
  },

  chartFillOk: {
    backgroundColor: "#7C9BFF",
  },

  chartFillBad: {
    backgroundColor: "#FFB84D",
  },

  chartFillVeryBad: {
    backgroundColor: "#FF6B81",
  },

  chartValue: {
    width: 28,
    color: "#F5F7FF",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "right",
  },

  primaryButton: {
    backgroundColor: "#8EA7FF",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#7C9BFF",
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 6,
  },

  primaryButtonText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    backgroundColor: "#111A33",
    borderWidth: 1,
    borderColor: "rgba(124,155,255,0.20)",
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#B8C9FF",
    fontSize: 15,
    fontWeight: "700",
  },
});