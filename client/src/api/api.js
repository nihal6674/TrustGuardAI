const BASE = "https://your-backend.example.com"; // replace with your backend

export async function checkText(text, type = "sms") {
  try {
    const res = await fetch(`${BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, type }),
    });
    if (!res.ok) throw new Error("Network error");
    return res.json(); // expect { score: 0-1, label: 'smishing' }
  } catch (e) {
    console.error(e);
    return { score: 0, label: 'error' };
  }
}
