let DATA = [];
const out = document.getElementById('adminOut');
const wrap = document.getElementById('tableWrap');
const searchEl = document.getElementById('search');

async function load() {
  out.textContent = "Loading...";
  try {
    const r = await fetch(API_BASE + "/api/distributions");
    if (!r.ok) throw new Error(await r.text());
    DATA = await r.json();
    out.textContent = "";
    render();
  } catch (e) {
    out.textContent = "❌ " + e.message + "\n(Ensure backend route GET /api/distributions exists and CORS is enabled.)";
  }
}

function render() {
  const q = (searchEl.value || "").trim();
  const rows = (q ? DATA.filter(x => (x.aadhaar||'').includes(q)) : DATA)
    .map(x => `<tr>
      <td>${x.id ?? ""}</td>
      <td>${x.aadhaar ?? ""}</td>
      <td>${x.method ?? ""}</td>
      <td>${x.qty ?? ""}</td>
      <td>${x.total ?? ""}</td>
      <td>${x.timestamp ?? ""}</td>
    </tr>`).join("");
  wrap.innerHTML = `<table>
    <thead><tr><th>ID</th><th>Aadhaar</th><th>Method</th><th>Qty</th><th>Total</th><th>Time</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}
