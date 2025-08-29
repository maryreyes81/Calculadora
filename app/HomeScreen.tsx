import { View, Text, StyleSheet, Dimensions, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
    const insets = useSafeAreaInsets();


    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.titulo}>Bienvenido a la Calculadora</Text>

                {/* Cajas superiores */}
                <View style={styles.row}>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>Operaciones Básicas:</Text>
                        <Text style={styles.cardText}>Suma</Text>
                        <Text style={styles.cardText}>Resta</Text>
                        <Text style={styles.cardText}>Multiplicación</Text>
                        <Text style={styles.cardText}>División</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardText}>Números Decimales</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardText}>Función Limpiar</Text>
                    </View>
                </View>

                {/* Caja inferior */}
                <View style={styles.featuresBox}>
                    <Text style={styles.featureTitle}>Características Incluidas</Text>
                    <Text style={styles.feature}>• Números del 0 al 9</Text>
                    <Text style={styles.feature}>• Operaciones: +, -, *, ÷</Text>
                    <Text style={styles.feature}>• Botón de igual (=) para calcular</Text>
                    <Text style={styles.feature}>• Punto decimal para números decimales</Text>
                    <Text style={styles.feature}>• Botón Limpiar para reiniciar</Text>
                    <Text style={styles.feature}>• Pantalla clara y fácil de leer</Text>
                </View>

                {/* Botón para ir a la Calculadora */}

                <View style={[styles.btnContainer, { paddingBottom: insets.bottom + 10 }]}>
                    <Link href="/CalculadoraScreen" style={styles.btn}>
                        <Text style={styles.btnText}>Comenzar a Calcular</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa toda la pantalla
        backgroundColor: "#fff7cc",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: Platform.OS !== "web" && height < 750 ? 20 : 40,
        width: "100%",
    },
    titulo: {
        fontSize: width < 400 ? 24 : 32,
        fontWeight: "bold",
        color: "#80043A",
        marginTop: height * 0.01,
        marginBottom: height * 0.02,
        textAlign: "center",
    },
    row: {
        flexDirection: width < 600 ? "column" : "row",
        justifyContent: "space-around",
        alignItems: "center", // 🔹 Centrado vertical
        marginBottom: 20,
        width: "95%",
    },
    card: {
        backgroundColor: "#F09580",
        borderRadius: 10,
        padding: width * 0.04,
        alignItems: width < 600 ? "stretch" : "center",
        justifyContent: "center",
        marginVertical: width < 600 ? 10 : 0,
        marginHorizontal: width < 600 ? 0 : 10,
        width: width < 600 ? "80%" : "28%", //  ocupa más ancho en móvil
        height: height * 0.25,

    },
    featureTitle: {
        color: "#80043A",
        fontWeight: "bold",
        fontSize: width < 400 ? 16 : 18,
        marginBottom: 10,
        textAlign: "center",
    },
    cardText: {
        color: "#F60C49",
        fontWeight: "bold",
        marginVertical: 2,
        textAlign: "center",
    },
    featuresBox: {
        backgroundColor: "#F09580",
        borderRadius: 10,
        padding: width * 0.04,
        marginBottom: height * 0.04,
        width: "90%",
        alignSelf: "center",
        minHeight: height * 0.30,
        alignItems: width < 600 ? "flex-start" : "center",
    },
    feature: {
        color: "#F60C49",
        marginBottom: 5,
        textAlign: width < 600 ? "left" : "center",
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end", // Botón a la derecha
        width: "100%",
        marginBottom: Platform.OS !== "web" && height < 750 ? 40 : 20,
    },
    btn: {
        backgroundColor: "#F60C49",
        paddingVertical: 12,
        marginRight: width < 400 ? 20 : 60,
        height: 40,
        paddingHorizontal: width * 0.08,
        borderRadius: 8,
    },
    btnText: {
        color: "#101942",
        fontWeight: "bold",
        fontSize: width < 400 ? 14 : 16,
        textAlign: "center",
    },
});