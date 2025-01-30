// script.js - Complete Implementation

// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};

const showResult = (elementId, content) => {
  const resultElement = document.getElementById(elementId);
  resultElement.innerHTML = content;
  resultElement.classList.add("success");
  resultElement.classList.remove("error");
};

const showError = (elementId, message) => {
  const resultElement = document.getElementById(elementId);
  resultElement.innerHTML = `Error: ${message}`;
  resultElement.classList.add("error");
  resultElement.classList.remove("success");
};

// Calculator Functions
const calculateSimpleInterest = (principal, rate, time) => {
  const interest = (principal * rate * time) / 100;
  const total = principal + interest;
  return { interest, total };
};

const calculateCompoundInterest = (principal, rate, time, frequency) => {
  const amount =
    principal * Math.pow(1 + rate / (100 * frequency), frequency * time);
  const interest = amount - principal;
  return { interest, amount };
};

const calculateGratuity = (salary, years) => {
  return (15 * salary * years) / 26;
};

const calculatePF = (salary, employerContribution, employeeContribution) => {
  const employer = (salary * employerContribution) / 100;
  const employee = (salary * employeeContribution) / 100;
  return { employer, employee, total: employer + employee };
};

const calculateSalary = (basic, hra, da, allowances, deductions) => {
  const gross = basic + hra + da + allowances;
  const net = gross - deductions;
  return { gross, net };
};

const calculatePPF = (investment, time) => {
  const rate = 7.1; // Current PPF rate
  return calculateCompoundInterest(investment, rate, time, 1).amount;
};

const calculateNPS = (monthlyContribution, returnRate, time) => {
  const yearlyContribution = monthlyContribution * 12;
  return calculateCompoundInterest(yearlyContribution, returnRate, time, 12)
    .amount;
};

const calculateRD = (monthlyDeposit, rate, time) => {
  const months = time * 12;
  const monthlyRate = rate / 12 / 100;
  return (
    monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  );
};

const calculateFD = (principal, rate, time) => {
  return calculateCompoundInterest(principal, rate, time, 4).amount;
};

const calculateLTCG = (sellingPrice, costPrice, holdingPeriod) => {
  if (holdingPeriod >= 1) {
    const gain = sellingPrice - costPrice;
    const tax = Math.max(0, gain - 100000) * 0.1;
    return { gain, tax };
  }
  return { gain: 0, tax: 0 };
};

const calculateROI = (initialInvestment, finalValue, time) => {
  return ((finalValue - initialInvestment) / initialInvestment) * 100;
};

const calculateGST = (amount, rate) => {
  const gstAmount = (amount * rate) / 100;
  return { gstAmount, total: amount + gstAmount };
};

const calculateDiscount = (price, discountPercentage) => {
  const discountAmount = (price * discountPercentage) / 100;
  return { discountAmount, finalPrice: price - discountAmount };
};

const calculateEMI = (principal, rate, time) => {
  const monthlyRate = rate / (12 * 100);
  const months = time * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  return { emi, totalAmount, totalInterest };
};

const calculateDownPayment = (assetPrice, downPaymentPercentage) => {
  const downPayment = (assetPrice * downPaymentPercentage) / 100;
  return { downPayment, loanAmount: assetPrice - downPayment };
};

const calculateCAGR = (initialValue, finalValue, time) => {
  return (Math.pow(finalValue / initialValue, 1 / time) - 1) * 100;
};

// Event Listeners Implementation
document.addEventListener("DOMContentLoaded", () => {
  
  // Input Validation and Real-time Feedback
  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      if (e.target.value < 0) {
        e.target.value = 0;
      }
    });
  });

  // Clear Results on Input Change
  const allInputs = document.querySelectorAll("input, select");
  allInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const form = e.target.closest("form");
      const resultDiv = form.querySelector(".result");
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("success", "error");
    });
  });

  // Add Loading States
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const button = form.querySelector("button");
      const originalText = button.textContent;
      button.textContent = "Calculating...";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 500);
    });
  });

  // Additional Helper Functions for Enhanced User Experience
  const addThousandsSeparator = (input) => {
    input.addEventListener("input", (e) => {
      let value = e.target.value.replace(/,/g, "");
      if (value.length > 8) {
        e.target.value = Number(value).toLocaleString("en-IN");
      }
    });
  };

  // Apply thousands separator to all amount inputs
  const amountInputs = document.querySelectorAll(
    'input[id*="principal"], input[id*="price"], input[id*="salary"]'
  );
  amountInputs.forEach(addThousandsSeparator);

  // Initialize tooltips for help text
  const initializeTooltips = () => {
    const tooltips = document.querySelectorAll("[data-tooltip]");
    tooltips.forEach((tooltip) => {
      tooltip.style.position = "relative";
      tooltip.addEventListener("mouseover", (e) => {
        const tooltipText = document.createElement("div");
        tooltipText.className = "tooltip";
        tooltipText.textContent = tooltip.dataset.tooltip;
        tooltip.appendChild(tooltipText);
      });
      tooltip.addEventListener("mouseout", (e) => {
        const tooltipText = tooltip.querySelector(".tooltip");
        if (tooltipText) {
          tooltipText.remove();
        }
      });
    });
  };

  initializeTooltips();

  // Handle form reset
  forms.forEach((form) => {
    form.addEventListener("reset", (e) => {
      const resultDiv = form.querySelector(".result");
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("success", "error");
    });
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.ctrlKey && e.key === "Enter") {
      const activeElement = document.activeElement;
      const form = activeElement.closest("form");
      if (form) {
        const submitEvent = new Event("submit");
        form.dispatchEvent(submitEvent);
      }
    }
  });
});


const btns = document.querySelectorAll("#btn");
const popUp = document.getElementById("cal-Box");
const cross = document.getElementById("cross");
const popupBox = document.getElementById("inside-popup");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log("clicked", btn.className);
    window.scroll(200, 400);
    popUp.style.display = "flex";
//  for simple intrest popup
    if (btn.className.includes("sic")) {
      popupBox.innerHTML = `
            
            <div class="calculator-grid">
            <!-- Simple Interest Calculator -->
            <div class="calculator-tile">
                <h2>Simple Interest Calculator</h2>
                
                <form id="simple-interest-form" class="calculator-form">
                <div class="input-group">
                <label for="si-principal">Principal Amount (₹)</label>
                <input type="number" id="si-principal" required min="0" >
                </div>
                <div class="input-group">
                <label for="si-rate">Interest Rate (%)</label>
                <input type="number" id="si-rate" step="0.01" required min="0">
                </div>
                <div class="input-group">
                <label for="si-time">Time (Years)</label>
                <input type="number" id="si-time" step="0.1" required min="0">
                </div>
                <button type="submit">Calculate</button>
                <div class="result" id="si-result"></div>
                </form>
                </div>
                `;

      // Simple Interest Calculator
      document
        .getElementById("simple-interest-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          try {
            const principal = parseFloat(
              document.getElementById("si-principal").value
            );
            const rate = parseFloat(document.getElementById("si-rate").value);
            const time = parseFloat(document.getElementById("si-time").value);

            const result = calculateSimpleInterest(principal, rate, time);
            showResult(
              "si-result",
              `
                Interest: ${formatCurrency(result.interest)}<br>
                Total Amount: ${formatCurrency(result.total)}
            `
            );
          } catch (error) {
            showError("si-result", "Invalid input values");
          }
        });
    }

    // for compound intrest popup
    else if(btn.className.includes("cic")){
        popupBox.innerHTML = `
         <!-- Compound Interest Calculator -->
            <div class="calculator-tile none">
                <h2>Compound Interest Calculator</h2>
                <form id="compound-interest-form" class="calculator-form">
                    <div class="input-group">
                        <label for="ci-principal">Principal Amount (₹)</label>
                        <input type="number" id="ci-principal" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="ci-rate">Interest Rate (%)</label>
                        <input type="number" id="ci-rate" step="0.01" required min="0">
                    </div>
                    <div class="input-group">
                        <label for="ci-time">Time (Years)</label>
                        <input type="number" id="ci-time" step="0.1" required min="0">
                    </div>
                    <div class="input-group">
                        <label for="ci-frequency">Compounding Frequency</label>
                        <select id="ci-frequency">
                            <option value="1">Annually</option>
                            <option value="2">Semi-annually</option>
                            <option value="4">Quarterly</option>
                            <option value="12">Monthly</option>
                        </select>
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="ci-result"></div>
                </form>
            </div>

        `
        // Compound Interest Calculator
  document
  .getElementById("compound-interest-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const principal = parseFloat(
        document.getElementById("ci-principal").value
      );
      const rate = parseFloat(document.getElementById("ci-rate").value);
      const time = parseFloat(document.getElementById("ci-time").value);
      const frequency = parseInt(
        document.getElementById("ci-frequency").value
      );

      const result = calculateCompoundInterest(
        principal,
        rate,
        time,
        frequency
      );
      showResult(
        "ci-result",
        `
              Interest Earned: ${formatCurrency(result.interest)}<br>
              Maturity Amount: ${formatCurrency(result.amount)}
          `
      );
    } catch (error) {
      showError("ci-result", "Invalid input values");
    }
  });

    }

    // for gratuity cal popup

    else if(btn.className.includes("gc")){
        popupBox.innerHTML = `
         <!-- Gratuity Calculator -->
            <div class="calculator-tile none">
                <h2>Gratuity Calculator</h2>
                <form id="gratuity-form" class="calculator-form">
                    <div class="input-group">
                        <label for="gratuity-salary">Last Drawn Salary (₹)</label>
                        <input type="number" id="gratuity-salary" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="gratuity-years">Years of Service</label>
                        <input type="number" id="gratuity-years" required min="0">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="gratuity-result"></div>
                </form>
            </div>
        `
         // Gratuity Calculator
  document.getElementById("gratuity-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const salary = parseFloat(
        document.getElementById("gratuity-salary").value
      );
      const years = parseFloat(document.getElementById("gratuity-years").value);

      const gratuity = calculateGratuity(salary, years);
      showResult(
        "gratuity-result",
        `
                Gratuity Amount: ${formatCurrency(gratuity)}
            `
      );
    } catch (error) {
      showError("gratuity-result", "Invalid input values");
    }
  });
    }

    // for pf popup
    else if(btn.className.includes("pf")){
        popupBox.innerHTML = `
         <!-- PF Calculator -->
            <div class="calculator-tile none">
                <h2>PF Calculator</h2>
                <form id="pf-form" class="calculator-form">
                    <div class="input-group">
                        <label for="pf-salary">Basic Salary (₹)</label>
                        <input type="number" id="pf-salary" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="pf-employer">Employer Contribution (%)</label>
                        <input type="number" id="pf-employer" value="12" min="0" max="100">
                    </div>
                    <div class="input-group">
                        <label for="pf-employee">Employee Contribution (%)</label>
                        <input type="number" id="pf-employee" value="12" min="0" max="100">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="pf-result"></div>
                </form>
            </div>
        `
        // PF Calculator
  document.getElementById("pf-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const salary = parseFloat(document.getElementById("pf-salary").value);
      const employerContribution = parseFloat(
        document.getElementById("pf-employer").value
      );
      const employeeContribution = parseFloat(
        document.getElementById("pf-employee").value
      );

      const result = calculatePF(
        salary,
        employerContribution,
        employeeContribution
      );
      showResult(
        "pf-result",
        `
                Employer Contribution: ${formatCurrency(result.employer)}<br>
                Employee Contribution: ${formatCurrency(result.employee)}<br>
                Total Monthly PF: ${formatCurrency(result.total)}
            `
      );
    } catch (error) {
      showError("pf-result", "Invalid input values");
    }
  });

    }

    // for salary popup
    else if(btn.className.includes("salary")){
        popupBox.innerHTML = `
          <!-- Salary Calculator -->
            <div class="calculator-tile none">
                <h2>Salary Calculator</h2>
                <form id="salary-form" class="calculator-form">
                    <div class="input-group">
                        <label for="salary-basic">Basic Salary (₹)</label>
                        <input type="number" id="salary-basic" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="salary-hra">HRA (₹)</label>
                        <input type="number" id="salary-hra" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="salary-da">DA (₹)</label>
                        <input type="number" id="salary-da" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="salary-allowances">Other Allowances (₹)</label>
                        <input type="number" id="salary-allowances" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="salary-deductions">Deductions (₹)</label>
                        <input type="number" id="salary-deductions" required min="0"  >
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="salary-result"></div>
                </form>
            </div>

        `
        // Salary Calculator
  document.getElementById("salary-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const basic = parseFloat(document.getElementById("salary-basic").value);
      const hra = parseFloat(document.getElementById("salary-hra").value);
      const da = parseFloat(document.getElementById("salary-da").value);
      const allowances = parseFloat(
        document.getElementById("salary-allowances").value
      );
      const deductions = parseFloat(
        document.getElementById("salary-deductions").value
      );

      const result = calculateSalary(basic, hra, da, allowances, deductions);
      showResult(
        "salary-result",
        `
                Gross Salary: ${formatCurrency(result.gross)}<br>
                Net Salary: ${formatCurrency(result.net)}
            `
      );
    } catch (error) {
      showError("salary-result", "Invalid input values");
    }
  });
    }

    // for ppf popup
    else if(btn.className.includes("publicProvidentFund")){
        popupBox.innerHTML = `
         <div class="calculator-tile ">
                <h2>PPF Calculator</h2>
                <form id="ppf-form" class="calculator-form">
                    <div class="input-group">
                        <label for="ppf-investment">Yearly Investment (₹)</label>
                        <input type="number" id="ppf-investment" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="ppf-time">Time Period (Years)</label>
                        <input type="number" id="ppf-time" required min="15" max="50">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="ppf-result"></div>
                </form>
            </div>
        `
        // PPF Calculator
  document.getElementById("ppf-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const investment = parseFloat(
        document.getElementById("ppf-investment").value
      );
      const time = parseFloat(document.getElementById("ppf-time").value);

      const maturityAmount = calculatePPF(investment, time);
      const totalInvestment = investment * time;
      const interest = maturityAmount - totalInvestment;

      showResult(
        "ppf-result",
        `
                Total Investment: ${formatCurrency(totalInvestment)}<br>
                Interest Earned: ${formatCurrency(interest)}<br>
                Maturity Amount: ${formatCurrency(maturityAmount)}
            `
      );
    } catch (error) {
      showError("ppf-result", "Invalid input values");
    }
  });
    }

    // for nps popup
    else if(btn.className.includes("nps")){
        popupBox.innerHTML = `
         <!-- NPS Calculator -->
            <div class="calculator-tile none">
                <h2>NPS Calculator</h2>
                <form id="nps-form" class="calculator-form">
                    <div class="input-group">
                        <label for="nps-contribution">Monthly Contribution (₹)</label>
                        <input type="number" id="nps-contribution" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="nps-return">Expected Return (%)</label>
                        <input type="number" id="nps-return" step="0.1" required min="0">
                    </div>
                    <div class="input-group">
                        <label for="nps-time">Investment Period (Years)</label>
                        <input type="number" id="nps-time" required min="0">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="nps-result"></div>
                </form>
            </div>

        `
        // NPS Calculator
  document.getElementById("nps-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const monthlyContribution = parseFloat(
        document.getElementById("nps-contribution").value
      );
      const returnRate = parseFloat(
        document.getElementById("nps-return").value
      );
      const time = parseFloat(document.getElementById("nps-time").value);

      const maturityAmount = calculateNPS(
        monthlyContribution,
        returnRate,
        time
      );
      const totalInvestment = monthlyContribution * 12 * time;
      const interest = maturityAmount - totalInvestment;

      showResult(
        "nps-result",
        `
                Total Investment: ${formatCurrency(totalInvestment)}<br>
                Interest Earned: ${formatCurrency(interest)}<br>
                Maturity Amount: ${formatCurrency(maturityAmount)}
            `
      );
    } catch (error) {
      showError("nps-result", "Invalid input values");
    }
  });
    }

    // for rd popup
    else if(btn.className.includes("rd")){

        popupBox.innerHTML = `
         <!-- RD Calculator -->
            <div class="calculator-tile none">
                <h2>RD Calculator</h2>
                <form id="rd-form" class="calculator-form">
                    <div class="input-group">
                        <label for="rd-deposit">Monthly Deposit (₹)</label>
                        <input type="number" id="rd-deposit" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="rd-rate">Interest Rate (%)</label>
                        <input type="number" id="rd-rate" step="0.01" required min="0">
                    </div>
                    <div class="input-group">
                        <label for="rd-time">Time Period (Years)</label>
                        <input type="number" id="rd-time" required min="0">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="rd-result"></div>
                </form>
            </div>
        `

        // RD Calculator
  document.getElementById("rd-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const monthlyDeposit = parseFloat(
        document.getElementById("rd-deposit").value
      );
      const rate = parseFloat(document.getElementById("rd-rate").value);
      const time = parseFloat(document.getElementById("rd-time").value);

      const maturityAmount = calculateRD(monthlyDeposit, rate, time);
      const totalInvestment = monthlyDeposit * 12 * time;
      const interest = maturityAmount - totalInvestment;

      showResult(
        "rd-result",
        `
                Total Investment: ${formatCurrency(totalInvestment)}<br>
                Interest Earned: ${formatCurrency(interest)}<br>
                Maturity Amount: ${formatCurrency(maturityAmount)}
            `
      );
    } catch (error) {
      showError("rd-result", "Invalid input values");
    }
  });
    }

    // for fd popup
    else if(btn.className.includes("fd")){
        popupBox.innerHTML = `
            <!-- FD Calculator -->
            <div class="calculator-tile none">
                <h2>FD Calculator</h2>
                <form id="fd-form" class="calculator-form">
                    <div class="input-group">
                        <label for="fd-principal">Principal Amount (₹)</label>
                        <input type="number" id="fd-principal" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="fd-rate">Interest Rate (%)</label>
                        <input type="number" id="fd-rate" step="0.01" required min="0">
                    </div>
                    <div class="input-group">
                        <label for="fd-time">Time Period (Years)</label>
                        <input type="number" id="fd-time" step="0.25" required min="0">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="fd-result"></div>
                </form>
            </div>        
        `
        // FD Calculator
  document.getElementById("fd-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const principal = parseFloat(
        document.getElementById("fd-principal").value
      );
      const rate = parseFloat(document.getElementById("fd-rate").value);
      const time = parseFloat(document.getElementById("fd-time").value);

      const maturityAmount = calculateFD(principal, rate, time);
      const interest = maturityAmount - principal;

      showResult(
        "fd-result",
        `
                Principal Amount: ${formatCurrency(principal)}<br>
                Interest Earned: ${formatCurrency(interest)}<br>
                Maturity Amount: ${formatCurrency(maturityAmount)}
            `
      );
    } catch (error) {
      showError("fd-result", "Invalid input values");
    }
  });

    }

    // for ltcg calculator
    else if(btn.className.includes("ltcg")){
        popupBox.innerHTML = `
            <!-- LTCG Calculator -->
            <div class="calculator-tile none">
                <h2>LTCG Calculator</h2>
                <form id="ltcg-form" class="calculator-form">
                    <div class="input-group">
                        <label for="ltcg-selling">Selling Price (₹)</label>
                        <input type="number" id="ltcg-selling" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="ltcg-cost">Cost Price (₹)</label>
                        <input type="number" id="ltcg-cost" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="ltcg-period">Holding Period (Years)</label>
                        <input type="number" id="ltcg-period" step="0.1" required min="0">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="ltcg-result"></div>
                </form>
            </div>
        `
         // LTCG Calculator
  document.getElementById("ltcg-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const sellingPrice = parseFloat(
        document.getElementById("ltcg-selling").value
      );
      const costPrice = parseFloat(document.getElementById("ltcg-cost").value);
      const holdingPeriod = parseFloat(
        document.getElementById("ltcg-period").value
      );

      const result = calculateLTCG(sellingPrice, costPrice, holdingPeriod);
      showResult(
        "ltcg-result",
        `
                Capital Gains: ${formatCurrency(result.gain)}<br>
                Tax Amount: ${formatCurrency(result.tax)}
            `
      );
    } catch (error) {
      showError("ltcg-result", "Invalid input values");
    }
  });
    }

    // for roi popup
    else if(btn.className.includes("roi")){
        popupBox.innerHTML = `
         <div class="calculator-tile none">
                <h2>ROI Calculator</h2>
                <form id="roi-form" class="calculator-form">
                    <div class="input-group">
                        <label for="roi-initial">Initial Investment (₹)</label>
                        <input type="number" id="roi-initial" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="roi-final">Final Value (₹)</label>
                        <input type="number" id="roi-final" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="roi-time">Time Period (Years)</label>
                        <input type="number" id="roi-time" step="0.1" required min="0">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="roi-result"></div>
                </form>
            </div>
        `

        // ROI Calculator
  document.getElementById("roi-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const initialInvestment = parseFloat(
        document.getElementById("roi-initial").value
      );
      const finalValue = parseFloat(document.getElementById("roi-final").value);
      const time = parseFloat(document.getElementById("roi-time").value);

      const roi = calculateROI(initialInvestment, finalValue, time);
      showResult(
        "roi-result",
        `
                Return on Investment: ${formatPercentage(roi)}<br>
                Absolute Return: ${formatCurrency(
                  finalValue - initialInvestment
                )}
            `
      );
    } catch (error) {
      showError("roi-result", "Invalid input values");
    }
  });

    }

    // for gst popup
    else if(btn.className.includes("gst")){
        popupBox.innerHTML = `
         <!-- GST Calculator -->
            <div class="calculator-tile none">
                <h2>GST Calculator</h2>
                <form id="gst-form" class="calculator-form">
                    <div class="input-group">
                        <label for="gst-amount">Amount (₹)</label>
                        <input type="number" id="gst-amount" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="gst-rate">GST Rate (%)</label>
                        <select id="gst-rate">
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                        </select>
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="gst-result"></div>
                </form>
            </div>
        `

        // GST Calculator
  document.getElementById("gst-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const amount = parseFloat(document.getElementById("gst-amount").value);
      const rate = parseFloat(document.getElementById("gst-rate").value);

      const result = calculateGST(amount, rate);
      showResult(
        "gst-result",
        `
                GST Amount: ${formatCurrency(result.gstAmount)}<br>
                Total Amount: ${formatCurrency(result.total)}
            `
      );
    } catch (error) {
      showError("gst-result", "Invalid input values");
    }
  });

    }

    // for discount popup
    else if(btn.className.includes("discount")){
        popupBox.innerHTML = `
            <!-- Discount Calculator -->
            <div class="calculator-tile none">
                <h2>Discount Calculator</h2>
                <form id="discount-form" class="calculator-form">
                    <div class="input-group">
                        <label for="discount-price">Original Price (₹)</label>
                        <input type="number" id="discount-price" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="discount-percentage">Discount (%)</label>
                        <input type="number" id="discount-percentage" required min="0" max="100">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="discount-result"></div>
                </form>
            </div>
        `
        // Discount Calculator
  document.getElementById("discount-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const price = parseFloat(document.getElementById("discount-price").value);
      const discountPercentage = parseFloat(
        document.getElementById("discount-percentage").value
      );

      const result = calculateDiscount(price, discountPercentage);
      showResult(
        "discount-result",
        `
                Discount Amount: ${formatCurrency(result.discountAmount)}<br>
                Final Price: ${formatCurrency(result.finalPrice)}
            `
      );
    } catch (error) {
      showError("discount-result", "Invalid input values");
    }
  });
    }

    // for emi popup
    else if(btn.className.includes("emi")){
        popupBox.innerHTML = `
            <!-- EMI Calculator -->
            <div class="calculator-tile none">
                <h2>EMI Calculator</h2>
                <form id="emi-form" class="calculator-form">
                    <div class="input-group">
                        <label for="emi-principal">Loan Amount (₹)</label>
                        <input type="number" id="emi-principal" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="emi-rate">Interest Rate (% p.a.)</label>
                        <input type="number" id="emi-rate" step="0.1" required min="0">
                    </div>
                    <div class="input-group">
                        <label for="emi-time">Loan Tenure (Years)</label>
                        <input type="number" id="emi-time" required min="0">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="emi-result"></div>
                </form>
            </div>

        `
        // EMI Calculator
  document.getElementById("emi-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const principal = parseFloat(
        document.getElementById("emi-principal").value
      );
      const rate = parseFloat(document.getElementById("emi-rate").value);
      const time = parseFloat(document.getElementById("emi-time").value);

      const result = calculateEMI(principal, rate, time);
      showResult(
        "emi-result",
        `
                Monthly EMI: ${formatCurrency(result.emi)}<br>
                Total Interest: ${formatCurrency(result.totalInterest)}<br>
                Total Amount: ${formatCurrency(result.totalAmount)}
            `
      );
    } catch (error) {
      showError("emi-result", "Invalid input values");
    }
  });
    }

    // for downPayment popup
    else if(btn.className.includes("downPayment")){
        popupBox.innerHTML = `
             <!-- Down Payment Calculator -->
            <div class="calculator-tile none">
                <h2>Down Payment Calculator</h2>
                <form id="down-payment-form" class="calculator-form">
                    <div class="input-group">
                        <label for="dp-price">Asset Price (₹)</label>
                        <input type="number" id="dp-price" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="dp-percentage">Down Payment (%)</label>
                        <input type="number" id="dp-percentage" required min="0" max="100">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="down-payment-result"></div>
                </form>
            </div>
        `

        // Down Payment Calculator
  document
  .getElementById("down-payment-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const assetPrice = parseFloat(
        document.getElementById("dp-price").value
      );
      const downPaymentPercentage = parseFloat(
        document.getElementById("dp-percentage").value
      );

      const result = calculateDownPayment(assetPrice, downPaymentPercentage);
      showResult(
        "down-payment-result",
        `
              Down Payment Amount: ${formatCurrency(result.downPayment)}<br>
              Loan Amount Required: ${formatCurrency(result.loanAmount)}
          `
      );
    } catch (error) {
      showError("down-payment-result", "Invalid input values");
    }
  });

    }

    // for cagr calculator
    else if(btn.className.includes("cagr")){
        popupBox.innerHTML = `
            <!-- CAGR Calculator -->
            <div class="calculator-tile none">
                <h2>CAGR Calculator</h2>
                <form id="cagr-form" class="calculator-form">
                    <div class="input-group">
                        <label for="cagr-initial">Initial Value (₹)</label>
                        <input type="number" id="cagr-initial" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="cagr-final">Final Value (₹)</label>
                        <input type="number" id="cagr-final" required min="0"  >
                    </div>
                    <div class="input-group">
                        <label for="cagr-time">Time Period (Years)</label>
                        <input type="number" id="cagr-time" step="0.1" required min="0">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="cagr-result"></div>
                </form>
            </div>
        `
        // CAGR Calculator
  document.getElementById("cagr-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const initialValue = parseFloat(
        document.getElementById("cagr-initial").value
      );
      const finalValue = parseFloat(
        document.getElementById("cagr-final").value
      );
      const time = parseFloat(document.getElementById("cagr-time").value);

      const cagr = calculateCAGR(initialValue, finalValue, time);
      showResult(
        "cagr-result",
        `
                CAGR: ${formatPercentage(cagr)}<br>
                Absolute Growth: ${formatCurrency(finalValue - initialValue)}
            `
      );
    } catch (error) {
      showError("cagr-result", "Invalid input values");
    }
  });
    }










  });
});

cross.addEventListener("click", () => {
  popUp.style.display = "none";
});
