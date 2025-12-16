document.addEventListener('DOMContentLoaded', () => {
  const receiptDiv = document.getElementById('receipt-details');
  const data = JSON.parse(localStorage.getItem('receipt'));

  if (!data) {
    receiptDiv.innerHTML = '<p>No recent transactions found.</p>';
    return;
  }

  let html = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Payment Method:</strong> ${data.payment}</p>
    <h3>Purchased Items:</h3>
    <ul>
  `;

  data.cart.forEach((item) => {
    html += `<li>${item.name} - $${item.price}</li>`;
  });

  html += `
    </ul>
    <h3>Total Paid: $${data.total}</h3>
    <p>✅ Thank you for your purchase from IFITIN Private School!</p>
  `;

  receiptDiv.innerHTML = html;
  localStorage.removeItem('receipt'); // Clear after viewing
});
