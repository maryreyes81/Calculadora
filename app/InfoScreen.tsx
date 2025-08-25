import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Mary Reyes</Text>

      <View style={styles.card}>
        <Text style={styles.paragraph}>
          Esta calculadora fue desarrollada como parte de un proyecto de
          programación, diseñada para proporcionar una interfaz simple y
          eficiente para realizar cálculos matemáticos básicos.
        </Text>

        <Text style={styles.paragraph}>
          La aplicación está construida con tecnologías modernas de desarrollo
          web, incluyendo React y CSS, para ofrecer una experiencia de usuario
          fluida y responsiva.
        </Text>

        <Text style={styles.footer}>
          Desarrollado con ❤️ por Mary Reyes{"\n"}Agosto 2025
        </Text>
      </View>

      {/* Botones */}
      <View style={styles.buttonRow}>
        <Link href="/HomeScreen" style={styles.btn}>
          <Text style={styles.btnText}>🏠 Volver al Inicio</Text>
        </Link>

        <Link href="/CalculadoraScreen" style={styles.btn}>
          <Text style={styles.btnText}>➗ Ir a la Calculadora</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7cc",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F60C49",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#e67a73",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    width: "65%",
    height: "65%",},
  paragraph: {
    color: "#80043A",
    fontSize: 16,
    marginTop:40,
    textAlign: "center",
  },
  footer: {
    color: "#80043A",
    fontSize: 16,
    textAlign: "center",
    marginTop: 80,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  btn: {
    backgroundColor: "#F60C49",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: "45%",
    alignItems: "center",
  },
  btnText: {
    color: "#101942",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});
