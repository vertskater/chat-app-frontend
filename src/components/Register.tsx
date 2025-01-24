import {ChangeEvent, FormEvent, useState} from "react";
import {NavLink} from "react-router-dom";

type User = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    [key: string]: string
};

export default function Register() {
    const [formData, setFormData] = useState<User>({
        firstname: '',
        lastname: "",
        email: "",
        username: "",
        password: "",
        ["pass-confirm"]: "",
    })
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        for (const [key, value] of Object.entries(formData)) {
            if (!value.trim()) {
                setError(`The ${key} field is required.`);
                return;
            }
        }

        try {
            console.log(JSON.stringify({...formData}));
            const response = await fetch(`${import.meta.env.VITE_FETCH_URL}/auth/register`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({...formData})
                })
            const data = await response.json()
            console.log(data);
            if(data.success) {
                //TODO: change to client side routing
                alert('successfully logged in')
                return;
            }
            setError(data.msg);
        }catch(err){
            setError((err as Error).message)
        }
    }
    return (
        <>
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: "400px",
                margin: "0 auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Register</h2>
            {error && (
                <div
                    style={{
                        color: "red",
                        marginBottom: "10px",
                        fontSize: "14px",
                        textAlign: "center",
                    }}
                >
                    {error}
                </div>
            )}
            <div style={{marginBottom: "15px"}}>
                <label htmlFor="firstname" style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
                    First Name
                </label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
            </div>
            <div style={{marginBottom: "15px"}}>
                <label htmlFor="lastname" style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
            </div>
            <div style={{marginBottom: "15px"}}>
                <label htmlFor="email" style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
            </div>
            <div style={{marginBottom: "15px"}}>
                <label htmlFor="username" style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
            </div>
            <div style={{marginBottom: "15px"}}>
                <label htmlFor="password" style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
            </div>
            <div style={{marginBottom: "15px"}}>
                <label htmlFor="pass-confirm" style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="pass-confirm"
                    name="pass-confirm"
                    value={formData["pass-confirm"]}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
            </div>
            <button
                type="submit"
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
            >
                Register
            </button>
        </form>
            Already a Member? <NavLink to="/login">Login now</NavLink>
        </>
    );
}