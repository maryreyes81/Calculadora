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
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>("");

  //  Formatear números sin romper cuando está vacío
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


  const sanitizeExpression = (expr: string): string => {
    return expr.replace(/(\d+(\.\d+)?)/g, (match) => {
      // Elimina ceros iniciales, pero conserva "0" y decimales como "0.5"
      if (match.startsWith("0") && !match.startsWith("0.") && match !== "0") {
        return parseFloat(match).toString();
      }
      return match;
    });
  };

  const calculate = () => {
    try {
      const cleaned = sanitizeExpression(input.replace(/x/g, "*").replace(/÷/g, "/"));
      const res = eval(cleaned);
      setExpression(input); // guarda la operación original
      setResult(res.toString()); // guarda el resultado
      setJustCalculated(true);
    } catch {
      setExpression(input);
      setResult("Error");
      setJustCalculated(true);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff7cc" }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
      {/*  Botón arriba a la izquierda */}
      <View style={styles.topBtnContainer}>
        <Link href="/HomeScreen" style={styles.btnNav}>
          <Text style={styles.btnNavText}>Regresar a Inicio</Text>
        </Link>
      </View>


      <Text style={styles.titulo}>Calculadora</Text>

      {/* Caja de la calculadora */}
      <View
            style={[
              styles.calcBox,
              { marginBottom: insets.bottom + (Platform.OS !== "web" && height < 750 ? 40 : 0) },
            ]}
          >
        {/* Pantalla */}
          <View style={styles.display}>
              <Text style={styles.displayText}>
                {result !== "" && result !== "Error"
                  ? `${expression} = ${formatNumber(result)}`
                  : input || "0"}
              </Text>
              {result === "Error" && (
                <Text
                  style={[styles.displayText, { color: "red", marginTop: 5 }]}
                >
                  Error
                </Text>
              )}
            </View>
  


        {/* Botón Limpiar y Operadores */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.btnGrayWide} onPress={clear}>
            <Text style={styles.btnTextBlack}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGray} onPress={() => handlePress("÷")}>
            <Text style={styles.btnTextRed}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGray} onPress={() => handlePress("*")}>
            <Text style={styles.btnTextRed}>*</Text>
          </TouchableOpacity>
        </View>

        {/* Filas de números */}
        <View style={styles.row}>
          {["7", "8", "9", "-"].map((val) => (
            <TouchableOpacity
              key={val}
              style={styles.btnGray}
              onPress={() => (val === "-" ? handlePress(val) : handlePress(val))}
            >
              <Text style={val === "-" ? styles.btnTextRed : styles.btnTextBlack}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          {["4", "5", "6", "+"].map((val) => (
            <TouchableOpacity
              key={val}
              style={styles.btnGray}
              onPress={() => (val === "+" ? handlePress(val) : handlePress(val))}
            >
              <Text style={val === "+" ? styles.btnTextRed : styles.btnTextBlack}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          {["1", "2", "3", "="].map((val) => (
            <TouchableOpacity
              key={val}
              style={styles.btnGray}
              onPress={val === "=" ? calculate : () => handlePress(val)}
            >
              <Text style={val === "=" ? styles.btnTextRed : styles.btnTextBlack}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btnGrayWide2} onPress={() => handlePress("0")}>
            <Text style={styles.btnTextBlack}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGray} onPress={() => handlePress(".")}>
            <Text style={styles.btnTextBlack}>.</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navegación con Links */}
      <View style={styles.bottomBtnContainer}>
        <Link href="/InfoScreen" style={styles.btnNav}>
          <Text style={styles.btnNavText}>Acerca de</Text>
        </Link>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa todo el espacio disponible
    backgroundColor: "#fff7cc",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: width*0.02,
    width: "100%", // asegura que ocupe todo el ancho
    minHeight: height // asegura que tenga al menos el alto de la pantalla
  },

  titulo: {
    fontSize: Platform.OS === "web" ? 52 : 35,
    fontWeight: "bold",
    color: "#F60C49",
    marginTop: Platform.OS === "web" ? 10 : -30,
    marginBottom: 35,
    textAlign: "center"
  },

  calcBox: {
    backgroundColor: "#101942",
    borderRadius: 20,
    padding:15,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 350 : 320,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // para Android
    marginBottom: Platform.OS !== "web" && height < 750 ? 5 : 30,
    marginHorizontal:Platform.OS !== "web" && height < 750 ? 0 : 100,
  },

  display: {
    backgroundColor: "#d9d9d9",
    width: "100%",
    borderRadius: 5,
    padding: 12,
    marginTop: 10,
    marginBottom: 15, // espacio entre pantalla y botones
    textAlign: "right",
  },
  displayText: { fontSize: width > 768 ? 22 : 16, fontWeight: "bold", textAlign: "right", color: "#000" },

  row: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginVertical: 5 },

  btnGray: {
    backgroundColor: "#d9d9d9",
    flexBasis: "22%", // 4 botones por fila
    margin: 3,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGrayWide: {
    backgroundColor: "#d9d9d9",
    flex: 2,
    margin: 3,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGrayWide2: {
    backgroundColor: "#d9d9d9",
    flex: 2,
    margin: 3,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  btnTextBlack: { color: "#000", fontSize: 18, fontWeight: "bold" },
  btnTextRed: { color: "#F60C49", fontSize: 20, fontWeight: "bold" },

  
  // Botón arriba izquierda
  topBtnContainer: {
    alignItems: "flex-start",
    marginTop: Platform.OS !== "web" && height < 750 ? 25 : 20,
    marginBottom:Platform.OS !== "web" && height < 750 ? 20 : 10,
    width: "100%", // asegura que se vaya a la izquierda
    marginLeft: Platform.OS !== "web" && height < 750 ? 40 : 50,
  },

  //  Botón abajo derecha
  
bottomBtnContainer: {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  marginTop: Platform.OS !== "web" && height < 750 ? 25 : 10,
  marginBottom: Platform.OS !== "web" && height < 750 ? 20 : 20,
  width: "100%",
},


  btnNav: {
    backgroundColor: "#F60C49",
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginRight: 50
  },
  btnNavText: { color: "#101942", fontWeight: "bold", fontSize: width < 400 ? 16 : width < 600 ? 18 : 22 },
});
