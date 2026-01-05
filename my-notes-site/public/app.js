// public/app.js
// 前端：用 fetch 呼叫後端 API 並更新畫面

const form = document.querySelector("#noteForm");
const list = document.querySelector("#list");
const msg = document.querySelector("#msg");

async function loadNotes() {
  const res = await fetch("/api/notes");
  const notes = await res.json();

  list.innerHTML = notes
    .map(
      (n) => `
      <article class="note">
        <h3>${escapeHtml(n.title)}</h3>
        <p>${escapeHtml(n.content)}</p>
        <small>${new Date(n.createdAt).toLocaleString()}</small>
      </article>
    `
    )
    .join("");
}

// 簡單防 XSS（demo 用）
function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;

  msg.textContent = "";

  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  const data = await res.json();

  if (!res.ok) {
    // 例如 400 / 409
    msg.textContent = `❌ ${data.message}`;
    return;
  }

  msg.textContent = "✅ 新增成功！";
  form.reset();
  loadNotes();
});

// 初次載入
loadNotes();
