import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";

import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);
  const [expression, setExpression] = useState("");

  // Formatear números
  const formatNumber = (n: string): string => {
    if (!n) return "0";
    const parsed = parseFloat(n);
    if (isNaN(parsed)) return n;
    return parsed.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
  };

  const handlePress = (val: string) => {
    if (justCalculated) {
      setInput(val);
      setResult("");
      setExpression("");
      setJustCalculated(false);
    } else {
      setInput((prev) => prev + val);
    }
  };

  const clear = () => {
    setInput("");
    setResult("");
    setExpression("");
  };

  const sanitizeExpression = (expr: string) =>
    expr.replace(/(\d+(\.\d+)?)/g, (m) => {
      if (m.startsWith("0") && !m.startsWith("0.") && m !== "0") {
        return parseFloat(m).toString();
      }
      return m;
    });

  const calculate = () => {
    try {
      const cleaned = sanitizeExpression(
        input.replace(/x/g, "*").replace(/÷/g, "/")
      );
      // eslint-disable-next-line no-eval
      const res = eval(cleaned);

      if (res === Infinity || res === -Infinity || isNaN(res)) {
        setExpression(input);
        setResult("Error");
      } else {
        setExpression(input);
        setResult(res.toString());
      }

      setJustCalculated(true);
    } catch {
      setExpression(input);
      setResult("Error");
      setJustCalculated(true);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff7cc",
        ...(Platform.OS === "web" ? { minHeight: "100vh" as any } : null),
      }}
    >
      {/* ⬇ WEB sin scroll: View |  MÓVIL con scroll: ScrollView */}
      {Platform.OS === "web" ? (
        <View style={[styles.container, { paddingBottom: 140 }]}>
          {/* TOP BUTTON */}
          <View style={styles.topBtnContainer}>
            <Link href="/HomeScreen" style={styles.btnNav}>
              <Text style={styles.btnNavText}>Regresar a Inicio</Text>
            </Link>
          </View>

          <Text style={styles.titulo}>Calculadora</Text>

          {/* CALC BOX */}
          <View style={[styles.calcBox, { marginTop: -10 }]}>
            {/* DISPLAY */}
            <View style={styles.display}>
              <Text style={styles.displayText}>
                {result !== "" && result !== "Error"
                  ? `${expression} = ${formatNumber(result)}`
                  : input || "0"}
              </Text>
              {result === "Error" && (
                <Text style={[styles.displayText, { color: "red", marginTop: 5 }]}>
                  Error
                </Text>
              )}
            </View>

            {/* ROWS */}
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, styles.btnWide2]} onPress={clear}>
                <Text style={styles.btnTextBlack}>Limpiar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => handlePress("÷")}>
                <Text style={styles.btnTextRed}>÷</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => handlePress("*")}>
                <Text style={styles.btnTextRed}>*</Text>
              </TouchableOpacity>
            </View>

            {[
              ["7", "8", "9", "-"],
              ["4", "5", "6", "+"],
              ["1", "2", "3", "="],
            ].map((row, idx) => (
              <View style={styles.row} key={idx}>
                {row.map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={styles.btn}
                    onPress={val === "=" ? calculate : () => handlePress(val)}
                  >
                    <Text
                      style={
                        ["+", "-", "=", "÷", "*"].includes(val)
                          ? styles.btnTextRed
                          : styles.btnTextBlack
                      }
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            {/* Última fila: "0" ancho triple + "." */}
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, styles.btnWide3]} onPress={() => handlePress("0")}>
                <Text style={styles.btnTextBlack}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => handlePress(".")}>
                <Text style={styles.btnTextBlack}>.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 36 + insets.bottom }]}>
          {/* TOP BUTTON */}
          <View style={styles.topBtnContainer}>
            <Link href="/HomeScreen" style={styles.btnNav}>
              <Text style={styles.btnNavText}>Regresar a Inicio</Text>
            </Link>
          </View>

          <Text style={styles.titulo}>Calculadora</Text>

          {/* CALC BOX */}
          <View style={styles.calcBox}>
            {/* DISPLAY */}
            <View style={styles.display}>
              <Text style={styles.displayText}>
                {result !== "" && result !== "Error"
                  ? `${expression} = ${formatNumber(result)}`
                  : input || "0"}
              </Text>
              {result === "Error" && (
                <Text style={[styles.displayText, { color: "red", marginTop: 5 }]}>
                  Error
                </Text>
              )}
            </View>

            {/* ROWS */}
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, styles.btnWide2]} onPress={clear}>
                <Text style={styles.btnTextBlack}>Limpiar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => handlePress("÷")}>
                <Text style={styles.btnTextRed}>÷</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => handlePress("*")}>
                <Text style={styles.btnTextRed}>*</Text>
              </TouchableOpacity>
            </View>

            {[
              ["7", "8", "9", "-"],
              ["4", "5", "6", "+"],
              ["1", "2", "3", "="],
            ].map((row, idx) => (
              <View style={styles.row} key={idx}>
                {row.map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={styles.btn}
                    onPress={val === "=" ? calculate : () => handlePress(val)}
                  >
                    <Text
                      style={
                        ["+", "-", "=", "÷", "*"].includes(val)
                          ? styles.btnTextRed
                          : styles.btnTextBlack
                      }
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            {/* Última fila: "0" ancho triple + "." */}
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, styles.btnWide3]} onPress={() => handlePress("0")}>
                <Text style={styles.btnTextBlack}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => handlePress(".")}>
                <Text style={styles.btnTextBlack}>.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {/*  BOTTOM BUTTON */}
      <View
        style={[
          styles.bottomBtnContainerBase,
          Platform.OS === "web"
            ? styles.bottomBtnContainerWeb
            : styles.bottomBtnContainerMobile,
        ]}
      >
        <Link href="/InfoScreen" style={styles.btnNav}>
          <Text style={styles.btnNavText}>Acerca de</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7cc",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    width: "100%",
    minHeight: height,
  },

  titulo: {
    fontSize: Platform.OS === "web" ? 52 : 28,
    fontWeight: "bold",
    color: "#F60C49",
    marginTop: Platform.OS === "web" ? -25 : -16,
    marginBottom: Platform.OS === "web" ? 30 : 24,
    textAlign: "center",
  },

  calcBox: {
    backgroundColor: "#101942",
    borderRadius: 20,
    padding: Platform.OS === "web" ? 16 : 12,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 350 : 300,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: Platform.OS === "web" ? 24 : 16,
  },

  display: {
    backgroundColor: "#d9d9d9",
    width: "100%",
    borderRadius: 6,
    padding: Platform.OS === "web" ? 12 : 10,
    marginTop: 8,
    marginBottom: 10,
  },

  displayText: {
    fontSize: Platform.OS === "web" ? (width < 400 ? 18 : 22) : 16,
    fontWeight: "bold",
    textAlign: "right",
    color: "#000",
  },

  row: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 4,
  },

  btn: {
    backgroundColor: "#d9d9d9",
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 3,
    paddingVertical: Platform.OS === "web" ? 15 : 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  btnWide2: {
    flex: 2,
  },

  btnWide3: {
    flex: 3,
  },

  btnTextBlack: {
    color: "#000",
    fontSize: Platform.OS === "web" ? 18 : 16,
    fontWeight: "bold",
  },

  btnTextRed: {
    color: "#F60C49",
    fontSize: Platform.OS === "web" ? 20 : 18,
    fontWeight: "bold",
  },

  topBtnContainer: {
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 8,
    marginTop: Platform.OS !== "web" && height < 750 ? 25 : 16,
    marginBottom: 17,
  },

  bottomBtnContainerBase: {
    alignItems: "flex-end",
  },
  bottomBtnContainerMobile: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  bottomBtnContainerWeb: {
    position: "fixed",
    right: 20,
    bottom: 20,
    width: "auto",
    zIndex: 999,
    paddingHorizontal: 0,
  },

  btnNav: {
    backgroundColor: "#F60C49",
    paddingVertical: 8,
    paddingHorizontal: 44,
    borderRadius: 8,
  },

  btnNavText: {
    color: "#101942",
    fontWeight: "bold",
    fontSize: Platform.OS === "web" ? (width < 400 ? 16 : 18) : 16,
  },
});
