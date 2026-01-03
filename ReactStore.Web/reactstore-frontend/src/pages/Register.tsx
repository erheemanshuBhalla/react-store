import { useState } from "react";
import { register } from "../auth/authApi";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await register(email, password);
    toast.success("Registered");
  };

  return (
    <>
      <h2>Register</h2>
      <input onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Register</button>
    </>
  );
}
