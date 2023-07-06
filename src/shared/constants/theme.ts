export const theme = (isDarkTheme: boolean) =>
  isDarkTheme
    ? {
        dark: true,
        mainBg: "#28282c",
        darkBg: "#1c1c20",
        mainFont: "#dfdee7",
        mainBorder: "#323237",
        listBg: "#28282c",
        cardBg: "#35353a",
        scrollBtn: "#3d434a",
        mainBlue: "#7487eb",
        mainRed: "#f34c44",
        notificationGreen: "#2db953",
      }
    : {
        mainBg: "#fff",
        darkBg: "#fff",
        mainFont: "#404043",
        mainBorder: "#ededed",
        listBg: "#f0f2f5",
        cardBg: "#fff",
        scrollBtn: "#c6c9cd",
        mainBlue: "#7487eb",
        mainRed: "#f34c44",
        notificationGreen: "#2db953",
      };
