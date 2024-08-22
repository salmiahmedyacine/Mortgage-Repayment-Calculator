document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const mortgageAmountInput = document.querySelector("#inputAmount");
  const mortgageTermInput = document.querySelector(".team input");
  const interestRateInput = document.querySelector(".Rate input");
  const resultEmpty = document.querySelector(".results .Empty");
  const resultComplete = document.querySelector(".results .Complete");
  const monthlyRepaymentOutput = document.querySelector(".Complete .box-resuld h1:first-of-type");
  const totalRepaymentOutput = document.querySelector(".Complete .box-resuld h3:last-of-type");
  const requiredP = document.querySelectorAll(".requiredP");
  const redError = document.querySelector(".RedError");

  // Function to calculate mortgage repayments
  function calculateRepayments(amount, term, rate, isInterestOnly) {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    let monthlyRepayment;

    if (isInterestOnly) {
      monthlyRepayment = amount * monthlyRate;
    } else {
      const compoundRate = Math.pow(1 + monthlyRate, numberOfPayments);
      monthlyRepayment = amount * (monthlyRate * compoundRate) / (compoundRate - 1);
    }

    const totalRepayment = monthlyRepayment * numberOfPayments;
    return {
      monthlyRepayment: monthlyRepayment.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2)
    };
  }

  // Form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Hide all validation messages initially
    requiredP.forEach(p => p.style.display = "none");
    redError.style.background = "";
    redError.style.color = "";

    const amount = parseFloat(mortgageAmountInput.value);
    const term = parseInt(mortgageTermInput.value);
    const rate = parseFloat(interestRateInput.value);
    const mortgageTypeInput = document.querySelector('input[name="mortgage-type"]:checked');
    const isInterestOnly = mortgageTypeInput && mortgageTypeInput.nextElementSibling.textContent.trim() === "Interest Only";

    let isValid = true;

    // Validate inputs and show error messages if needed
    if (isNaN(amount) || amount <= 0) {
      requiredP[0].style.display = "block";
      redError.style.background = "var(--Red)";
      redError.style.color = "var(--White)";
      isValid = false;
    }
    if (isNaN(term) || term <= 0) {
      requiredP[1].style.display = "block";
      redError.style.background = "var(--Red)";
      redError.style.color = "var(--White)";
      isValid = false;
    }
    if (isNaN(rate) || rate <= 0) {
      requiredP[2].style.display = "block";
      redError.style.background = "var(--Red)";
      redError.style.color = "var(--White)";
      isValid = false;
    }
    if (!mortgageTypeInput) {
      requiredP[3].style.display = "block";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Calculate and display results
    const { monthlyRepayment, totalRepayment } = calculateRepayments(amount, term, rate, isInterestOnly);

    // Format numbers with commas
    monthlyRepaymentOutput.textContent = `£${parseFloat(monthlyRepayment).toLocaleString()}`;
    totalRepaymentOutput.textContent = `£${parseFloat(totalRepayment).toLocaleString()}`;

    resultEmpty.style.display = "none";
    resultComplete.style.display = "block";
  });

  // Clear all inputs and reset results
  document.querySelector(".header p").addEventListener("click", () => {
    form.reset();
    resultEmpty.style.display = "flex";
    resultComplete.style.display = "none";
    requiredP.forEach(p => p.style.display = "none");
  });

  // Change background color when mortgage type is selected
  const setMortgageTypeStyles = (mortgageType, type) => {
    mortgageType.addEventListener("click", () => {
      type.style.background = "var(--Lime-btn)";
      mortgageType.style.accentColor = "var(--Lime)";
    });
  };

  setMortgageTypeStyles(document.getElementById('mortgage-type'), document.getElementById('type'));
  setMortgageTypeStyles(document.getElementById('mortgage-type2'), document.getElementById('type2'));
});
