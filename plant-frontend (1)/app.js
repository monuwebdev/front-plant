const aadhaarEl = document.getElementById('aadhaar');
const methodEl = document.getElementById('method');
const otpWrap = document.getElementById('otpWrap');
const otpEl = document.getElementById('otp');
const qtyEl = document.getElementById('qty');
const totalEl = document.getElementById('total');
const outEl = document.getElementById('out');
const btn = document.getElementById('btn');

qtyEl.addEventListener('change', updateTotal);
methodEl.addEventListener('change', () => {
  otpWrap.style.display = methodEl.value === 'otp' ? 'block' : 'none';
});
function updateTotal() {
  const qty = parseInt(qtyEl.value || '0', 10);
  totalEl.textContent = "₹" + (qty * 5);
}
updateTotal();

async function submitDistribution() {
  const aadhaar = (aadhaarEl.value || '').trim();
  const qty = parseInt(qtyEl.value || '0', 10);
  const method = methodEl.value;
  const otp = otpEl ? otpEl.value.trim() : "";

  if (!/^[0-9]{12}$/.test(aadhaar)) {
    return toast("Enter valid 12-digit Aadhaar.");
  }
  if (qty < 0 || qty > 5) {
    return toast("Quantity must be between 0 and 5.");
  }
  if (method === 'otp' && !/^[0-9]{6}$/.test(otp)) {
    return toast("Enter 6-digit OTP.");
  }

  btn.disabled = true;
  outEl.textContent = "Submitting...";

  try {
    await fetch(API_BASE + "/api/health").catch(()=>null);

    const payload = {
      aadhaar,
      method,
      qty,
      price: 5,
      total: qty * 5,
      timestamp: new Date().toISOString()
    };

    const res = await fetch(API_BASE + "/api/distribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const t = await res.text();
      throw new Error("Server: " + t);
    }
    const data = await res.json();
    outEl.textContent = "✅ Success\n" + JSON.stringify(data, null, 2);
  } catch (e) {
    outEl.textContent = "❌ " + e.message + "\n(Ensure backend route POST /api/distribute exists and CORS is enabled.)";
  } finally {
    btn.disabled = false;
  }
}

function toast(msg) {
  outEl.textContent = msg;
}
