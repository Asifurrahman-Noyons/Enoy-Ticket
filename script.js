let seatsLeft = 40;
let seatsBooked = 0;
let selectedSeats = 0;
let totalPrice = 0;
let grandPrice = 0;
const maxSeats = 4; 
function seatData(seatId, seatClass, seatPrice) {
  const seatButton = document.getElementById(seatId);
  const selectedSeatsBody = document.getElementById('selectedSeatsBody');
  const totalPriceElement = document.getElementById('totalPrice');
  const grandPriceElement = document.getElementById('grandPrice');
  const seatsLeftElement = document.getElementById('seatsLeft');
  const seatsBookedElement = document.getElementById('seatsBooked');

  const isSelected = seatButton.classList.contains('bg-green-500');

  if (!isSelected && seatsLeft > 0 && selectedSeats < maxSeats) {
    seatButton.classList.add('bg-green-500');

    const newRow = selectedSeatsBody.insertRow();
    newRow.innerHTML = `<td>${seatId}</td><td>${seatClass}</td><td>${seatPrice}</td>`;

    seatsLeft--;
    seatsBooked++;
    selectedSeats++;
    totalPrice += seatPrice;
    grandPrice = totalPrice; // Set grand price initially equal to total price

    totalPriceElement.textContent = totalPrice;
    seatsLeftElement.textContent = seatsLeft;
    seatsBookedElement.textContent = seatsBooked;
    grandPriceElement.textContent = grandPrice;

    if (selectedSeats >= maxSeats) {
      alert("You can only select up to 4 seats.");
    }
  } else if (isSelected) {
    seatButton.classList.remove('bg-green-500');

    const rows = selectedSeatsBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].getElementsByTagName('td')[0].textContent === seatId) {
        selectedSeatsBody.deleteRow(i);
        break;
      }
    }

    seatsLeft++;
    seatsBooked--;
    selectedSeats--;
    totalPrice -= seatPrice;
    grandPrice = totalPrice;

    totalPriceElement.textContent = totalPrice;
    seatsLeftElement.textContent = seatsLeft;
    seatsBookedElement.textContent = seatsBooked;
    grandPriceElement.textContent = grandPrice;

    if (selectedSeats === 0) {
      document.getElementById('name').disabled = true;
      document.getElementById('phone').disabled = true;
      document.getElementById('email').disabled = true;
      document.getElementById('submitButton').disabled = true;
    }
  }
}

function applyCoupon() {
  const couponInput = document.getElementById('couponInput');
  const couponCode = couponInput.value.trim().toUpperCase();

  if (selectedSeats === 4) {
    if (couponCode === 'NEW15') {
      // Apply a 15% discount when 4 seats are selected and the coupon code is 'NEW15'
      grandPrice = totalPrice * 0.85; // 15% off
      document.getElementById('grandPrice').textContent = grandPrice.toFixed(2);
      alert('Coupon applied successfully!');
    } else if (couponCode === 'COUPLE20') {
      // Apply a 20% discount when 4 seats are selected and the coupon code is 'COUPLE20'
      grandPrice = totalPrice * 0.8; // 20% off
      document.getElementById('grandPrice').textContent = grandPrice.toFixed(2);
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code.');
    }
  } else {
    alert('Coupon code is only valid when 4 seats are selected.');
  }
}

function showDialog() {
  const successDialog = document.getElementById('successDialog');
  successDialog.classList.remove('hidden');
}

function closeDialog() {
  const successDialog = document.getElementById('successDialog');
  successDialog.classList.add('hidden');
}
