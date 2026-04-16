import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AutoLogin() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  axios.post(
    "http://127.0.0.1:8000/api/member-auto-login",
    { id },
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  )
  .then((res) => {
    const { user_id, fullname } = res.data;

    // 🔥 GUARD: stop if user_id missing
    if (!user_id) {
      console.error("❌ AutoLogin: user_id missing in response", res.data);
      alert("Auto-login failed: no user_id returned");
      return;
    }

    // 🔥 CLEAR old session completely
    localStorage.clear(); // clear everything, not just 2 keys

    // 🔥 SET new session
    localStorage.setItem("member_user_id", String(user_id));
    localStorage.setItem("memberData", JSON.stringify({ user_id, fullname }));
    localStorage.setItem("memberSession", "true");

    console.log("✅ AutoLogin success — switching to:", user_id);

    window.location.href = "/member/dashboard";
  })
  .catch((err) => {
    console.error("❌ AutoLogin API error:", err.response?.data || err.message);
    alert("Auto-login failed: " + (err.response?.data?.error || err.message));
  });
}, [id,navigate]);

  return <h2>Logging in...</h2>;
}