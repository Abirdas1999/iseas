
  document.addEventListener('DOMContentLoaded', function () {
    const loanAmountInput = document.getElementById("loanAmount");
    const interestRateInput = document.getElementById("interestRate");
    const loanTenureInput = document.getElementById("loanTenure");

    const loanEMIValue = document.getElementById("loanEmiValue");
    const totalInterestValue = document.getElementById("totalInterestValue");
    const totalAmountValue = document.getElementById("totalAmountValue");

    const calculateBtn = document.getElementById("calculateBtn");

    let loanAmount = parseFloat(loanAmountInput.value);
    let interestRate = parseFloat(interestRateInput.value);
    let loanTenure = parseFloat(loanTenureInput.value);

    let interest = interestRate / 12 / 100;

    let myChart;

    const checkValues = () => {
      let loanAmountValue = loanAmountInput.value;
      let interestRateValue = interestRateInput.value;
      let loanTenureValue = loanTenureInput.value;

      let regexNumber = /^[0-9]+$/;
      if (!loanAmountValue.match(regexNumber)) {
        loanAmountInput.value = "10000";
      }

      if (!loanTenureValue.match(regexNumber)) {
        loanTenureInput.value = "12";
      }

      let regexDecimalNumber = /^(\d*\.)?\d+$/;
      if (!interestRateValue.match(regexDecimalNumber)) {
        interestRateInput.value = "7.5";
      }
    };

    const displayChart = (totalInterestPayableValue) => {
      const ctx = document.getElementById("myChart").getContext("2d");
      myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Total Interest", "Principal Loan Amount"],
          datasets: [
            {
              data: [totalInterestPayableValue, loanAmount],
              backgroundColor: ["#1F2B38", "#FED81D"],
              borderWidth: 0,
            },
          ],
        },
      });
    };

    const updateChart = (totalInterestPayableValue) => {
      myChart.data.datasets[0].data[0] = totalInterestPayableValue;
      myChart.data.datasets[0].data[1] = loanAmount;
      myChart.update();
    };

    const refreshInputValues = () => {
      loanAmount = parseFloat(loanAmountInput.value);
      interestRate = parseFloat(interestRateInput.value);
      loanTenure = parseFloat(loanTenureInput.value);
      interest = interestRate / 12 / 100;
    };

    const calculateEMI = () => {
      checkValues();
      refreshInputValues();
      let emi =
        loanAmount *
        interest *
        (Math.pow(1 + interest, loanTenure) /
          (Math.pow(1 + interest, loanTenure) - 1));

      return emi;
    };

    const updateData = (emi) => {
      loanEMIValue.innerHTML = '₹' + Math.round(emi);

      let totalAmount = Math.round(loanTenure * emi);
      totalAmountValue.innerHTML = '₹' + totalAmount;

      let totalInterestPayable = Math.round(totalAmount - loanAmount);
      totalInterestValue.innerHTML = '₹' + totalInterestPayable;

      if (myChart) {
        updateChart(totalInterestPayable);
      } else {
        displayChart(totalInterestPayable);
      }
    };

    const init = () => {
      let emi = calculateEMI();
      updateData(emi);
    };

    init();

    calculateBtn.addEventListener("click", init);
  });
