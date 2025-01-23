export default {
    chatContainer: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    messagesContainer: {
        height: "400px",
        overflowY: "scroll" as "scroll",
        border: "1px solid #ccc",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
    },
    message: {
        padding: "10px",
        marginBottom: "5px",
        borderRadius: "5px",
        display: "flex"
    },
    inputContainer: {
        display: "flex",
        gap: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};