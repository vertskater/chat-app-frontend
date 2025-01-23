export default {
    form: {
        display: "flex",
        flexDirection: "column" as "column",
        gap: "12px",
        width: "100%",
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    label: {
        fontSize: "16px",
        color: "#333",
        fontWeight: "bold" as "bold",
    },
    input: {
        padding: "10px 12px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        outline: "none",
        transition: "border-color 0.2s",
    },
    inputFocused: {
        borderColor: "#007bff",
    },
    button: {
        padding: "10px 16px",
        fontSize: "16px",
        fontWeight: "bold" as "bold",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.2s",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
};
