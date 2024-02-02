document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('carHireForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally
        carHire();
    });
});

const DAILY_CHARGES = {'S': 22.50, 'HP': 28.00, 'V': 35.00};
const INSURANCE_PREMIUM = 15.50;
const DEPOSIT = 50;
const GOLD_DISCOUNT = 18.00;

function carHire() {
    const vehicleType = document.getElementById('vehicleType').value.toUpperCase();
    const hireDays = parseInt(document.getElementById('hireDays').value, 10);
    const insurance = document.querySelector('input[name="insurance"]:checked').value === 'yes';
    const customerType = document.getElementById('customerType').value;
    const loyaltyCard = document.getElementById('loyaltyCard').value.trim();

    // Validate vehicle type
    if (!DAILY_CHARGES.hasOwnProperty(vehicleType)) {
        alert("Invalid vehicle type. Please enter S, HP, or V.");
        return;
    }

    // Validate hire days
    if (isNaN(hireDays) || hireDays < 1 || hireDays > 10) {
        alert("Invalid input. Days must be between 1 and 10.");
        return;
    }

    // Calculate base cost
    let baseCost = DAILY_CHARGES[vehicleType] * hireDays;

    // Apply a 10% discount for hires longer than 7 days
    if (hireDays > 7) {
        baseCost *= 0.9;
    }

    // Apply Gold discount for high performance vehicles
    if (customerType === 'existing' && loyaltyCard.toLowerCase() === 'gold' && vehicleType === 'HP') {
        baseCost -= GOLD_DISCOUNT;
    }

    // Add insurance premium if required
    if (insurance) {
        baseCost += INSURANCE_PREMIUM;
    }

    // Calculate total cost
    let totalCost = baseCost + DEPOSIT;

    // Display the result
    displayQuoteResult(vehicleType, hireDays, customerType, insurance, totalCost);
}

function displayQuoteResult(vehicleType, hireDays, customerType, insurance, totalCost) {
    const resultDiv = document.getElementById('quoteResult');
    resultDiv.innerHTML = `
        <h3>Car Hire Quote:</h3>
        <p>Vehicle Type: ${vehicleType}</p>
        <p>No. of Days Hired: ${hireDays}</p>
        <p>Customer Type: ${customerType.charAt(0).toUpperCase() + customerType.slice(1)}</p>
        <p>Insurance Included: ${insurance ? 'Yes' : 'No'}</p>
        <p>Total Hire Cost: £${totalCost.toFixed(2)}</p>
    `;
}
