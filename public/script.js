
async function sendMessage() {
  const input = document.getElementById("input");
  const message = input.value.trim();
  if (!message) return;

  const messagesDiv = document.getElementById("messages");
  const userMsg = document.createElement("div");
  userMsg.textContent = "You: " + message;
  userMsg.className = "user-msg";
  messagesDiv.appendChild(userMsg);

  input.value = "";

  const responseDiv = document.createElement("div");
  responseDiv.textContent = "AT AI: ...";
  responseDiv.className = "bot-msg";
  messagesDiv.appendChild(responseDiv);

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    responseDiv.textContent = "AT AI: " + data.reply;
  } catch (err) {
    responseDiv.textContent = "AT AI: Error contacting AI server.";
  }
}
