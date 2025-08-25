import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
    return (
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
                <Text style={styles.feature}>• Botón "Limpiar" para reiniciar</Text>
                <Text style={styles.feature}>• Pantalla clara y fácil de leer</Text>
            </View>

            {/* Botón para ir a la Calculadora */}
            <View style={styles.btnContainer}>
                <Link href="/CalculadoraScreen" style={styles.btn}>
                    <Text style={styles.btnText}>Comenzar a Calcular</Text>
                </Link>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa toda la pantalla
        backgroundColor: "#fff7cc",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
    },
    titulo: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#80043A",
        marginTop: 35,
        marginBottom: 60,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", // 🔹 Centrado vertical
        marginBottom: 50,
        width: "95%",
    },
    card: {
        backgroundColor: "#F09580",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        width: "28%",
        height: 160,
    },
    featureTitle: {
        color: "#80043A",
        fontWeight: "bold",
        fontSize: 18,
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
        padding: 15,
        marginBottom: 30,
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        height: 220,
    },
    feature: {
        color: "#F60C49",
        marginBottom: 5,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end", // 🔹 Botón a la derecha
        width: "100%",
    },
    btn: {
        backgroundColor: "#F60C49",
        paddingVertical: 12,
        marginRight: 60,
        height: 40,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    btnText: {
        color: "#101942",
        fontWeight: "bold",
        fontSize: 16,
       textAlign: "center",
    },
});