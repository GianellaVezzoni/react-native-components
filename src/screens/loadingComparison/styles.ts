import { StyleSheet } from "react-native";

export const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f7fa",
    },
    containerDark: {
      backgroundColor: "#0f1419",
    },
    scrollContent: {
      padding: 20,
    },
    header: {
      marginBottom: 32,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: "#1a202c",
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    titleDark: {
      color: "#e2e8f0",
    },
    subtitle: {
      fontSize: 14,
      color: "#718096",
    },
    subtitleDark: {
      color: "#a0aec0",
    },
    controlsContainer: {
      marginBottom: 32,
      gap: 16,
    },
    segmentedControl: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    segmentedControlDark: {
      backgroundColor: "#1a1f2e",
    },
    segment: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    segmentActive: {
      backgroundColor: "#667eea",
    },
    segmentActiveDark: {
      backgroundColor: "#7c3aed",
    },
    segmentText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#718096",
    },
    segmentTextActive: {
      color: "#ffffff",
    },
    segmentTextActiveDark: {
      color: "#ffffff",
    },
    loadButton: {
      backgroundColor: "#667eea",
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#667eea",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    loadButtonDark: {
      backgroundColor: "#7c3aed",
      shadowColor: "#7c3aed",
    },
    loadButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    loaderContainer: {
      flex: 1,
      minHeight: 400,
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
    loaderText: {
      fontSize: 16,
      color: "#718096",
      fontWeight: "500",
    },
    loaderTextDark: {
      color: "#a0aec0",
    },
    skeletonContainer: {
      marginTop: 8,
    },
    skeletonContent: {
      gap: 0,
    },
    skeletonCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      backgroundColor: "#ffffff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
    skeletonCardDark: {
      backgroundColor: "#1a1f2e",
    },
    skeletonCardHeader: {
      flexDirection: "row",
      marginBottom: 16,
      alignItems: "center",
      gap: 14,
    },
    skeletonAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#e8ecf0",
    },
    skeletonHeaderText: {
      flex: 1,
      justifyContent: "center",
    },
    skeletonCardBody: {
      gap: 8,
      marginTop: 4,
    },
    skeletonLine: {
      height: 16,
      borderRadius: 8,
      backgroundColor: "#e8ecf0",
    },
    dataContainer: {
      marginTop: 8,
      gap: 16,
    },
    dataCard: {
      backgroundColor: "#ffffff",
      borderRadius: 16,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    dataCardDark: {
      backgroundColor: "#1a1f2e",
    },
    dataCardHeader: {
      flexDirection: "row",
      marginBottom: 12,
      alignItems: "center",
      gap: 12,
    },
    dataAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#667eea",
      alignItems: "center",
      justifyContent: "center",
    },
    dataAvatarDark: {
      backgroundColor: "#7c3aed",
    },
    dataAvatarText: {
      color: "#ffffff",
      fontSize: 20,
      fontWeight: "700",
    },
    dataHeaderText: {
      flex: 1,
    },
    dataAuthor: {
      fontSize: 12,
      color: "#718096",
      marginBottom: 4,
      fontWeight: "500",
    },
    dataAuthorDark: {
      color: "#a0aec0",
    },
    dataTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#1a202c",
      lineHeight: 24,
    },
    dataTitleDark: {
      color: "#e2e8f0",
    },
    dataDescription: {
      fontSize: 14,
      color: "#4a5568",
      lineHeight: 20,
    },
    dataDescriptionDark: {
      color: "#cbd5e0",
    },
  });

