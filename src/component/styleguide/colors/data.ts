const primaryColor = [
  { shade: "950", hexCode: "#461304" },
  { shade: "900", hexCode: "#822C0C" },
  { shade: "800", hexCode: "#a1330b" },
  { shade: "700", hexCode: "#cc4102" },
  { shade: "600", hexCode: "#ff5d01" },
  { shade: "500", hexCode: "#ff760a" },
  { shade: "400", hexCode: "#ff9532" },
  { shade: "300", hexCode: "#ffbd6d" },
  { shade: "200", hexCode: "#ffd9a5" },
  { shade: "100", hexCode: "#ffeed3" },
  { shade: "50", hexCode: "#fff7ec" },
  { shade: "0", hexCode: "#fffdf9" },
];

const secondaryColor = [
  { shade: "950", hexCode: "#2b273f" },
  { shade: "900", hexCode: "#4b4a5e" },
  { shade: "800", hexCode: "#54526b" },
  { shade: "700", hexCode: "#6b698c" },
  { shade: "600", hexCode: "#75759b" },
  { shade: "500", hexCode: "#8789aa" },
  { shade: "400", hexCode: "#9fa3bb" },
  { shade: "300", hexCode: "#bec1d2" },
  { shade: "200", hexCode: "#d9dbe4" },
  { shade: "100", hexCode: "#e9eaf0" },
  { shade: "50", hexCode: "#f6f6f8" },
  { shade: "0", hexCode: "#fbfbfb" },
];

const errorColor = [
  { shade: "950", hexCode: "#48070b" },
  { shade: "900", hexCode: "#84181f" },
  { shade: "800", hexCode: "#a0141d" },
  { shade: "700", hexCode: "#c11420" },
  { shade: "600", hexCode: "#e51d2a" },
  { shade: "500", hexCode: "#f83b48" },
  { shade: "400", hexCode: "#ff5a65" },
  { shade: "300", hexCode: "#ffa0a6" },
  { shade: "200", hexCode: "#ffc7cb" },
  { shade: "100", hexCode: "#ffe1e3" },
  { shade: "50", hexCode: "#fff1f2" },
  { shade: "0", hexCode: "#fffbfb" },
];

const warningColor = [
  { shade: "950", hexCode: "#461a02" },
  { shade: "900", hexCode: "#79350e" },
  { shade: "800", hexCode: "#93400d" },
  { shade: "700", hexCode: "#b65207" },
  { shade: "600", hexCode: "#db7604" },
  { shade: "500", hexCode: "#f79e09" },
  { shade: "400", hexCode: "#fdbd1a" },
  { shade: "300", hexCode: "#fed34b" },
  { shade: "200", hexCode: "#fee789" },
  { shade: "100", hexCode: "#fff3c6" },
  { shade: "50", hexCode: "#fffbeb" },
  { shade: "0", hexCode: "#fffef9" },
];

const successColor = [
  { shade: "950", hexCode: "#00331d" },
  { shade: "900", hexCode: "#0c5b37" },
  { shade: "800", hexCode: "#0c6f42" },
  { shade: "700", hexCode: "#088d4f" },
  { shade: "600", hexCode: "#05c168" },
  { shade: "500", hexCode: "#0ed979" },
  { shade: "400", hexCode: "#38f098" },
  { shade: "300", hexCode: "#79fcbd" },
  { shade: "200", hexCode: "#b4feda" },
  { shade: "100", hexCode: "#d8ffec" },
  { shade: "50", hexCode: "#eefff6" },
  { shade: "0", hexCode: "#fafffc" },
];

const info1Color = [
  { shade: "950", hexCode: "#112e5a" },
  { shade: "900", hexCode: "#144c94" },
  { shade: "800", hexCode: "#2753b7" },
  { shade: "700", hexCode: "#1055bd" },
  { shade: "600", hexCode: "#1d88fe" },
  { shade: "500", hexCode: "#29a1ff" },
  { shade: "400", hexCode: "#53bbff" },
  { shade: "300", hexCode: "#89d7ff" },
  { shade: "200", hexCode: "#b9e5ff" },
  { shade: "100", hexCode: "#d8f0ff" },
  { shade: "50", hexCode: "#edf9ff" },
  { shade: "0", hexCode: "#faffff" },
];

const info2Color = [
  { shade: "950", hexCode: "#191353" },
  { shade: "900", hexCode: "#27208f" },
  { shade: "800", hexCode: "#2a1db6" },
  { shade: "700", hexCode: "#3420e2" },
  { shade: "600", hexCode: "#4a3aff" },
  { shade: "500", hexCode: "#4c4cff" },
  { shade: "400", hexCode: "#6e78ff" },
  { shade: "300", hexCode: "#97a8ff" },
  { shade: "200", hexCode: "#becbff" },
  { shade: "100", hexCode: "#dbe3ff" },
  { shade: "50", hexCode: "#ebf1ff" },
  { shade: "0", hexCode: "#f9fbff" },
];

const neutralColor = [
  { shade: "950", hexCode: "#121212" },
  { shade: "900", hexCode: "#3d3d3d" },
  { shade: "800", hexCode: "#454545" },
  { shade: "700", hexCode: "#4f4f4f" },
  { shade: "600", hexCode: "#5d5d5d" },
  { shade: "500", hexCode: "#6d6d6d" },
  { shade: "400", hexCode: "#888888" },
  { shade: "300", hexCode: "#b0b0b0" },
  { shade: "200", hexCode: "#d1d1d1" },
  { shade: "100", hexCode: "#e7e7e7" },
  { shade: "50", hexCode: "#f6f6f6" },
  { shade: "0", hexCode: "#fcfcfd" },
];

export const colorBar = [
  {
    colorData: primaryColor,
    title: "Primary",
    darkTextColor: "#FF5D01",
  },
  {
    colorData: secondaryColor,
    title: "Secondary",
    darkTextColor: "#6B698C",
  },
  {
    colorData: errorColor,
    title: "Error",
    darkTextColor: "#E51D2A",
  },
  {
    colorData: warningColor,
    title: "Warning",
    darkTextColor: "#DB7604",
  },
  {
    colorData: successColor,
    title: "Success",
    darkTextColor: "#05C168",
  },
  {
    colorData: info1Color,
    title: "Info 1",
    darkTextColor: "#1D88FE",
  },
  {
    colorData: info2Color,
    title: "Info 2",
    darkTextColor: "#4A3AFF",
  },
  {
    colorData: neutralColor,
    title: "Neutral",
    darkTextColor: "#6D6D6D",
  },
];
