export const githubConfig = {
  username: "DhirajB05",
  githubLink: "https://github.com/DhirajB05",
  subtitle: "",
  // 5% smaller than the 14.4/4.5/16.2 values.
  blockSize: 13.68,
  blockMargin: 4.275,
  fontSize: 15.39,
  maxLevel: 4,

  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  weekDays: ["", "M", "", "W", "", "F", ""],
  totalCountLabel: `{{count}} contributions in the last year`,
  theme: {
    dark: [
      "rgb(22, 27, 34)", // No contributions
      "rgb(10, 66, 38)", // Dark green
      "rgb(0, 150, 70)", // Medium green
      "rgb(0, 220, 110)", // Bright green
      "rgb(57, 255, 20)", // Electric green
    ],
    light: [
      "rgb(235, 237, 240)", // Light gray
      "rgb(170, 255, 190)", // Light green
      "rgb(90, 245, 140)", // Medium green
      "rgb(25, 210, 100)", // Bright green
      "rgb(0, 175, 80)", // Deep green
    ],
  },

  errorState: {
    title: "Unable to load GitHub Contributions",
    description: "Check out my profile directly for the latest activity",
    buttonText: "View on GitHub",
  },

  loadingState: {
    title: "Loading GitHub activities...",
    description: "Fetching the latest data from the GitHub",
  },
};
