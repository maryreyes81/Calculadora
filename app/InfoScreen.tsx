import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Link } from "expo-router";

export default function AboutScreen() {
  const { width, height } = useWindowDimensions();

  // Breakpoints simples
  const bp = useMemo(() => {
    const sm = width < 480;
    const md = width >= 480 && width < 1024;
    const lg = width >= 1024;

    return {
      sm,
      md,
      lg,
      titleSize: lg ? 40 : md ? 34 : 28,
      paragraphSize: lg ? 22 : md ? 18 : 16,
      footerSize: md ? 16 : 14,
      cardWidth: lg ? "66%" : md ? "82%" : "92%",
      buttonsWidth: lg ? "60%" : md ? "80%" : "92%",
      btnDirection: lg ? "row" : "column", // fila en web grande, columna en móvil
      btnPaddingV: lg ? 14 : 12,
      btnRadius: 12,
    };
  }, [width]);

  const s = useMemo(() => makeStyles(), []);

  return (
    <View
      style={[
        s.container,
        { minHeight: height }, // sin "100vh" para evitar errores en RN Web
      ]}
    >
      <Text
        style={[
          s.title,
          {
            fontSize: bp.titleSize,
            marginTop: Platform.OS === "web" ? 35 : 5, //  web vs móvil
          },
        ]}
      >
        Calculadora de Mary Reyes
      </Text>

      {/* Card con footer adentro */}
      <View style={[s.card, { width: bp.cardWidth as import("react-native").DimensionValue }]}>
        <Text style={[s.paragraph, { fontSize: bp.paragraphSize }]}>
          Esta calculadora fue desarrollada como parte de un proyecto de
          programación, diseñada para proporcionar una interfaz simple y
          eficiente para realizar cálculos matemáticos básicos.
        </Text>

        <Text style={[s.paragraph, { fontSize: bp.paragraphSize }]}>
          La aplicación está construida con tecnologías modernas de desarrollo
          web, incluyendo React y CSS, para ofrecer una experiencia de usuario
          fluida y responsiva.
        </Text>

        <Text style={[s.footerInside, { fontSize: bp.footerSize }]}>
          Desarrollado con ❤️ por Mary Reyes{"\n"}Agosto 2025
        </Text>
      </View>

      {/* Botones (sin 'gap'; uso márgenes condicionales) */}
      <View
        style={[
          s.buttonRow,
          { width: bp.buttonsWidth as `${number}%`, flexDirection: bp.btnDirection as "row" | "column" | "row-reverse" | "column-reverse" },
        ]}
      >
        <Link
          href="/HomeScreen"
          style={[
            s.btn,
            bp.btnDirection === "row" ? s.btnHalf : s.btnFull,
            bp.btnDirection === "column" ? { marginBottom: 12 } : null,
            { paddingVertical: bp.btnPaddingV, borderRadius: bp.btnRadius },
          ]}
        >
          <Text style={s.btnText}>🏠 Volver al Inicio</Text>
        </Link>

        <Link
          href="/CalculadoraScreen"
          style={[
            s.btn,
            bp.btnDirection === "row" ? s.btnHalf : s.btnFull,
            { paddingVertical: bp.btnPaddingV, borderRadius: bp.btnRadius },
          ]}
        >
          <Text style={s.btnText}>➗ Ir a la Calculadora</Text>
        </Link>
      </View>
    </View>
  );
}

function makeStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff7cc",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
    title: {
      fontWeight: "700",
      color: "#F60C49",
      textAlign: "center",
      marginBottom: 16,
    },
    card: {
      backgroundColor: "#e67a73",
      borderRadius: 14,
      paddingVertical: 28,
      paddingHorizontal: 22,
      marginTop: 8,
      marginBottom: 22,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 3,
    },
    paragraph: {
      color: "#80043A",
      textAlign: "center",
      lineHeight: 30,
      marginVertical: 12,
    },
    footerInside: {
      color: "#80043A",
      textAlign: "center",
      marginTop: 24,
      opacity: 0.95,
    },
    buttonRow: {
      alignSelf: "center",
      justifyContent: "space-between",
    },
    btn: {
      backgroundColor: "#F60C49",
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    btnFull: { width: "100%" },
    btnHalf: { width: "48%" },
    btnText: {
      color: "#101942",
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
      letterSpacing: 0.2,
    },
  });
}

