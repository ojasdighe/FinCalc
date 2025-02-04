// script.js - Complete Implementation
function removeCommas(str) {
  while (str.search(",") >= 0) {
      str = (str + "").replace(',', '');
  }
  return str;
};


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
  // next step is for displaying result box
  resultElement.classList.add('flex')
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
  principal = parseFloat(principal);
  rate = parseFloat(rate);
  time = parseFloat(time);
  const interest = (principal * rate * time) / 100;
  const total = parseFloat(principal) + interest;
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


  // document
  //       .getElementById("simple-interest-form")
  //       .addEventListener("submit", (e) => {
  //         e.preventDefault();
  //         // showResultBox()
  //         try {
  //           // resultSection.style.display = "flex"
  //           const principal = parseFloat(
  //             document.getElementById("si-principal").value
  //           );
  //           principal = formatCurrency(principal)
  //           const rate = parseFloat(document.getElementById("si-rate").value);
  //           const time = parseFloat(document.getElementById("si-time").value);

  //           const result = calculateSimpleInterest(principal, rate, time);
  //           showResult(
  //             "si-result",
  //             `
  //             <div class="col">
  //               <p> <span class="bold"> Interest: </span> ${formatCurrency(result.interest)} </p> <br>
  //               <p> <span class="bold">Total Amount:  </span> ${formatCurrency(result.total)}</p>
  //               </div>
  //           `
  //           );
  //         } catch (error) {
  //           showError("si-result", "Invalid input values");
  //         }
  //       });



  // Input Validation and Real-time Feedback
  // function inputs () {
  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      if (e.target.value < 0) {
        e.target.value = 0;
        console.log("run 0")
      }
    });
  });
  // }
  // Clear Results on Input Change
  // function clearResultOnInputChange () {}
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
    console.log("worjing thousand separator")
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
  function keyBoard (){
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
 }
});

function inputs (principle) {
  let rawValue ;
  let numericValue;
  const numberInputs = document.querySelectorAll('.amount');
  numberInputs.forEach((input) => {
    input.addEventListener("focusout", function (e) {

      rawValue = e.target.value;
      console.log("Raw Input Value:", rawValue);

      numericValue = parseFloat(rawValue);
      //  if(e.target.value>0){
        
        let formattedValue = formatCurrency(numericValue);
        console.log("Formatted Value:", formattedValue);
        console.log(input.classList.value.includes('amount'))

        if(input.classList.value.includes('amount')){
        // Display formatted value 
        e.target.setAttribute('type','text')
        e.target.value = formattedValue
        e.target.setAttribute('data',numericValue)
        
        

        
        // Keep the actual number value in the input field
        // e.target.value = numericValue;
        }
        // }
        
      });
  
  });
  }

  // Initialize inputs function
inputs();

const btns = document.querySelectorAll(".card-container");
const popUp = document.getElementById("cal-Box");
const cross = document.getElementById("cross");
const popupBox = document.getElementById("inside-popup");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log("clicked", btn.className);
    const width = window.innerWidth;
    if(width <= 767){
      // for mobile screen
    window.scroll(100,400);
    
    popUp.style.display = "flex";
    }
    else if(width >= 768 && width <= 1024){
      // for tablate screen
      window.scroll(950, 290);
      popUp.style.display = "flex";
    }
    else{
      // for desktop screen
      window.scroll(200, 650);
      popUp.style.display = "flex";
    }
    //  for simple intrest popup
    if (btn.id.includes("sic")) {
      popupBox.innerHTML = `
            
          <!--   <div class="calculator-grid"> -->
            <!-- Simple Interest Calculator -->
            <div class="calculator-tile">
                <h2 class="popup-heading">Simple Interest Calculator</h2>
                
                <form class ="form" id="simple-interest-form" class="calculator-form">
                <div class="input-group">
                <label for="si-principal">Principal Amount (₹)</label>
                <input type="number" step="1" class = "inputs amount" id="si-principal" required min="0" placeholder="Principal Amount (₹)">
                </div>
                <div class="input-group">
                <label for="si-rate">Interest Rate (%)</label>
                <input type="number" class = "inputs"  id="si-rate" step="0.1" required min="0" placeholder="Interest Rate (%)">
                </div>
                <div class="input-group">
                <label for="si-time">Time (Years)</label>
                <input type="number" class = "inputs"  id="si-time" step="1" required min="0" placeholder="Time (Years)">
                </div>
                <button type="submit" id="pop">Calculate</button>
                </form>
                <div class="result" id="si-result"></div>
                </div>
                `;
                
                let principalValue = parseFloat(
                  document.getElementById("si-principal").value 
                );
              
              inputs(principalValue)
               
              
      document
        .getElementById("simple-interest-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          
          try {
            
            const principal = document.getElementById("si-principal").getAttribute('data');
            
            const rate = parseFloat(document.getElementById("si-rate").value);
            const time = parseFloat(document.getElementById("si-time").value);

            const result = calculateSimpleInterest(principal, rate, time);
            

            showResult(
              "si-result",
              `
              <div class="col">
                <p class="result-p"> <span class="bold"> Interest: </span> ${formatCurrency(result.interest)} </p> <br>
                <p class="result-p"> <span class="bold">Total Amount:  </span> ${formatCurrency(result.total)}</p>
                </div>
            `
            );
          } catch (error) {
            showError("si-result", "Invalid input values");
          }
        });
    }

    // for compound intrest popup
    else if (btn.id.includes("cic")) {
      popupBox.innerHTML = `
         <!-- Compound Interest Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">Compound Interest Calculator</h2>
                <form class ="form" id="compound-interest-form" class="calculator-form">
                    <div class="input-group">
                        <label for="ci-principal">Principal Amount (₹)</label>
                        <input class = "inputs amount" type="number" step="1" id="ci-principal" required min="0" placeholder="Principal Amount (₹)"  >
                    </div>
                    <div class="input-group">
                        <label for="ci-rate">Interest Rate (%)</label>
                        <input class = "inputs" type="number" id="ci-rate" step="0.1" required min="0" placeholder="Interest Rate (%)">
                    </div>
                    <div class="input-group">
                        <label for="ci-time">Time (Years)</label>
                        <input class = "inputs" type="number" id="ci-time" step="0.1" required min="0" placeholder="Time (Years)">
                    </div>
                    <div class="input-group">
                        <label for="ci-frequency">Compounding Frequency</label>
                        <select class = "inputs" id="ci-frequency">
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

        `;
        const principal = parseFloat(
          document.getElementById("ci-principal").value
        );
        inputs(principal)
      // Compound Interest Calculator
      document
        .getElementById("compound-interest-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          try {
            const principal = parseFloat(
              document.getElementById("ci-principal").getAttribute('data')
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
              <div class="col">
               <p class="result-p"> <span class="bold">  
              Interest Earned:</span>  ${formatCurrency(result.interest)}</p> <br>
              <p class="result-p"> <span class="bold">
              Maturity Amount: </span>${formatCurrency(result.amount)}</p>
                </div>
          `
            );
          } catch (error) {
            showError("ci-result", "Invalid input values");
          }
        });
    }

    // for gratuity cal popup
    else if (btn.id.includes("gc")) {
      popupBox.innerHTML = `
         <!-- Gratuity Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">Gratuity Calculator</h2>
                <form class ="form" id="gratuity-form" class="calculator-form">
                    <div class="input-group">
                        <label for="gratuity-salary">Last Drawn Salary (₹)</label>
                        <input class = "inputs amount" type="number" step="1" id="gratuity-salary" required min="0" placeholder="Last Drawn Salary (₹)" >
                    </div>
                    <div class="input-group">
                        <label for="gratuity-years">Years of Service</label>
                        <input class = "inputs" type="number" id="gratuity-years" required min="0" placeholder="Years of Service">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="gratuity-result"></div>
                </form>
            </div>
        `;
        let salary = parseFloat(
          document.getElementById("gratuity-salary").value
        );
        inputs(salary)
      // Gratuity Calculator
      document
        .getElementById("gratuity-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          try {
            const salary = parseFloat(
              document.getElementById("gratuity-salary").getAttribute('data')
            );
            const years = parseFloat(
              document.getElementById("gratuity-years").value
            );

            const gratuity = calculateGratuity(salary, years);
            showResult(
              "gratuity-result",
              `
              <div class="col">
               <p class="result-p"> <span class="bold"> 
                Gratuity Amount:</span> ${formatCurrency(gratuity)}</p>
                </div>
            `
            );
          } catch (error) {
            showError("gratuity-result", "Invalid input values");
          }
        });
    }

    // for pf popup
    else if (btn.id.includes("pf")) {
      popupBox.innerHTML = `
         <!-- PF Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">PF Calculator</h2>
                <form class ="form" id="pf-form" class="calculator-form">
                    <div class="input-group">
                        <label for="pf-salary">Basic Salary (₹)</label>
                        <input class = "inputs amount" type="number" step="1" id="pf-salary" required min="0" placeholder="Basic Salary (₹)" >
                    </div>
                    <div class="input-group">
                        <label for="pf-employer">Employer Contribution (%)</label>
                        <input class = "inputs" type="number" id="pf-employer" value="12" min="0" max="100" placeholder="Employer Contribution (%)">
                    </div>
                    <div class="input-group">
                        <label for="pf-employee">Employee Contribution (%)</label>
                        <input class = "inputs" type="number" id="pf-employee" value="12" min="0" max="100" placeholder="Employee Contribution (%)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="pf-result"></div>
                </form>
            </div>
        `;
        const salary = parseFloat(document.getElementById("pf-salary").value);
        inputs(salary)
      // PF Calculator
      document.getElementById("pf-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const salary = parseFloat(document.getElementById("pf-salary").getAttribute('data'));
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
            <div class="col">
               <p class="result-p"> <span class="bold">
                Employer Contribution: </span> ${formatCurrency(result.employer)}</p> <br>
                <p class="result-p"> <span class="bold">
                Employee Contribution: </span> ${formatCurrency(result.employee)}<p/><br>
                <p class="result-p"> <span class="bold">
                Total Monthly PF: </span> ${formatCurrency(result.total)}</p>
            `
          );
        } catch (error) {
          showError("pf-result", "Invalid input values");
        }
      });
    }

    // for salary popup
    else if (btn.id.includes("salary")) {
      popupBox.innerHTML = `
          <!-- Salary Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">Salary Calculator</h2>
                <form class ="form" id="salary-form" class="calculator-form">
                    <div class="input-group">
                        <label for="salary-basic">Basic Salary (₹)</label>
                        <input class = "inputs amount" type="number" id="salary-basic" required min="0" placeholder="Basic Salary (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="salary-hra">HRA (₹)</label>
                        <input class = "inputs" type="number" id="salary-hra" required min="0" placeholder="HRA (₹)" step="1" >
                    </div>
                    <div class="input-group">
                        <label for="salary-da">DA (₹)</label>
                        <input class = "inputs" type="number" id="salary-da" required min="0" placeholder="DA (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="salary-allowances">Other Allowances (₹)</label>
                        <input class = "inputs" type="number" id="salary-allowances" required min="0" placeholder="Other Allowances (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="salary-deductions">Deductions (₹)</label>
                        <input class = "inputs" type="number" id="salary-deductions" required min="0" placeholder="Deductions (₹)" step="1" >
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="salary-result"></div>
                </form>
            </div>

        `;
        const basic = parseFloat(
          document.getElementById("salary-basic").value
        );
        inputs(basic)
        
      // Salary Calculator
      document.getElementById("salary-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const basic = parseFloat(
            document.getElementById("salary-basic").getAttribute('data')
          );
          const hra = parseFloat(document.getElementById("salary-hra").value);
          const da = parseFloat(document.getElementById("salary-da").value);
          const allowances = parseFloat(
            document.getElementById("salary-allowances").value
          );
          const deductions = parseFloat(
            document.getElementById("salary-deductions").value
          );

          const result = calculateSalary(
            basic,
            hra,
            da,
            allowances,
            deductions
          );
          showResult(
            "salary-result",
            `
            <div class="col">
               <p class="result-p"> <span class="bold">
                Gross Salary:</span> ${formatCurrency(result.gross)}</p><br>
                 <p class="result-p"> <span class="bold">
                Net Salary: </span> ${formatCurrency(result.net)}</p>
                </div>
            `
          );
        } catch (error) {
          showError("salary-result", "Invalid input values");
        }
      });
    }

    // for ppf popup
    else if (btn.id.includes("publicProvidentFund")) {
      popupBox.innerHTML = `
         <div class="calculator-tile ">
                <h2 class="popup-heading">PPF Calculator</h2>
                <form class ="form" id="ppf-form" class="calculator-form">
                    <div class="input-group">
                        <label for="ppf-investment">Yearly Investment (₹)</label>
                        <input class = "inputs amount" type="number" id="ppf-investment" required min="0" placeholder="Yearly Investment (₹)" step="1" >
                    </div>
                    <div class="input-group">
                        <label for="ppf-time">Time Period (Years)</label>
                        <input class = "inputs" type="number" id="ppf-time" required min="15" max="50" placeholder="Time Period (Years)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="ppf-result"></div>
                </form>
            </div>
        `;
        const investment = parseFloat(
          document.getElementById("ppf-investment").value
        );
        inputs(investment)
      // PPF Calculator
      document.getElementById("ppf-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const investment = parseFloat(
            document.getElementById("ppf-investment").getAttribute('data')
          );
          const time = parseFloat(document.getElementById("ppf-time").value);

          const maturityAmount = calculatePPF(investment, time);
          const totalInvestment = investment * time;
          const interest = maturityAmount - totalInvestment;

          showResult(
            "ppf-result",
            `
            <div class="col">
               <p class="result-p"> <span class="bold">
                Total Investment: </span>${formatCurrency(totalInvestment)}</p><br>
                <p class="result-p"> <span class="bold">
                Interest Earned:</span> ${formatCurrency(interest)}</p><br>
                <p class="result-p"> <span class="bold">
                Maturity Amount: </span> ${formatCurrency(maturityAmount)} </p>
                </div>
            `
          );
        } catch (error) {
          showError("ppf-result", "Invalid input values");
        }
      });
    }

    // for nps popup
    else if (btn.id.includes("nps")) {
      popupBox.innerHTML = `
         <!-- NPS Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">NPS Calculator</h2>
                <form class ="form" id="nps-form" class="calculator-form">
                    <div class="input-group">
                        <label for="nps-contribution">Monthly Contribution (₹)</label>
                        <input class = "inputs amount" type="number" id="nps-contribution" required min="0" placeholder="Monthly Contribution (₹)" step="1" >
                    </div>
                    <div class="input-group">
                        <label for="nps-return">Expected Return (%)</label>
                        <input class = "inputs" type="number" id="nps-return" step="0.1" required min="0" placeholder="Expected Return (%)">
                    </div>
                    <div class="input-group">
                        <label for="nps-time">Investment Period (Years)</label>
                        <input class = "inputs" type="number" id="nps-time" required min="0" placeholder="Investment Period (Years)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="nps-result"></div>
                </form>
            </div>

        `;
        const monthlyContribution = parseFloat(
          document.getElementById("nps-contribution").value
        );
        inputs(monthlyContribution)
      // NPS Calculator
      document.getElementById("nps-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const monthlyContribution = parseFloat(
            document.getElementById("nps-contribution").getAttribute('data')
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
            <div class="col">
               <p class="result-p"> <span class="bold">
                Total Investment: </span> ${formatCurrency(totalInvestment)}</p><br>
                <p class="result-p"> <span class="bold">
                Interest Earned: </span> ${formatCurrency(interest)}</p><br>
                <p class="result-p"> <span class="bold">
                Maturity Amount: </span>${formatCurrency(maturityAmount)}</p>
                </div>
            `
          );
        } catch (error) {
          showError("nps-result", "Invalid input values");
        }
      });
    }

    // for rd popup
    else if (btn.id.includes("rd")) {
      popupBox.innerHTML = `
         <!-- RD Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">RD Calculator</h2>
                <form class ="form" id="rd-form" class="calculator-form">
                    <div class="input-group">
                        <label for="rd-deposit">Monthly Deposit (₹)</label>
                        <input class = "inputs amount" type="number" id="rd-deposit" required min="0" placeholder="Monthly Deposit (₹)" step="1" >
                    </div>
                    <div class="input-group">
                        <label for="rd-rate">Interest Rate (%)</label>
                        <input class = "inputs" type="number" id="rd-rate" step="0.1" required min="0" placeholder="Interest Rate (%)">
                    </div>
                    <div class="input-group">
                        <label for="rd-time">Time Period (Years)</label>
                        <input class = "inputs" type="number" id="rd-time" required min="0" placeholder="Time Period (Years)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="rd-result"></div>
                </form>
            </div>
        `;
        const monthlyDeposit = parseFloat(
          document.getElementById("rd-deposit").value
        );
        inputs(monthlyDeposit)

      // RD Calculator
      document.getElementById("rd-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const monthlyDeposit = parseFloat(
            document.getElementById("rd-deposit").getAttribute('data')
          );
          const rate = parseFloat(document.getElementById("rd-rate").value);
          const time = parseFloat(document.getElementById("rd-time").value);

          const maturityAmount = calculateRD(monthlyDeposit, rate, time);
          const totalInvestment = monthlyDeposit * 12 * time;
          const interest = maturityAmount - totalInvestment;

          showResult(
            "rd-result",
            `
            <div class="col">
               <p class="result-p"> <span class="bold">
                Total Investment: </span>${formatCurrency(totalInvestment)}</p><br>
               <p class="result-p"> <span class="bold">
                Interest Earned:</span> ${formatCurrency(interest)}</p><br>
               <p class="result-p"> <span class="bold">
                Maturity Amount: </span>${formatCurrency(maturityAmount)}</p>
                </div>
            `
          );
        } catch (error) {
          showError("rd-result", "Invalid input values");
        }
      });
    }

    // for fd popup
    else if (btn.id.includes("fd")) {
      popupBox.innerHTML = `
            <!-- FD Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">FD Calculator</h2>
                <form class ="form" id="fd-form" class="calculator-form">
                    <div class="input-group">
                        <label for="fd-principal">Principal Amount (₹)</label>
                        <input class = "inputs amount" type="number" id="fd-principal" required min="0" placeholder="Principal Amount (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="fd-rate">Interest Rate (%)</label>
                        <input class = "inputs" type="number" id="fd-rate" step="0.1" required min="0" placeholder="Interest Rate (%)">
                    </div>
                    <div class="input-group">
                        <label for="fd-time">Time Period (Years)</label>
                        <input class = "inputs" type="number" id="fd-time" step="1" required min="0" placeholder="Time Period (Years)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="fd-result"></div>
                </form>
            </div>        
        `;
        const principal = parseFloat(
          document.getElementById("fd-principal").value
        );
        inputs(principal)

      // FD Calculator
      document.getElementById("fd-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const principal = parseFloat(
            document.getElementById("fd-principal").getAttribute('data')
          );
          const rate = parseFloat(document.getElementById("fd-rate").value);
          const time = parseFloat(document.getElementById("fd-time").value);

          const maturityAmount = calculateFD(principal, rate, time);
          const interest = maturityAmount - principal;

          showResult(
            "fd-result",
            `
            <div class="col">
               <p class="result-p"> <span class="bold">
                Principal Amount: </span>${formatCurrency(principal)}</p><br>
                <p class="result-p"> <span class="bold">
                Interest Earned: </span> ${formatCurrency(interest)}</p><br>
                <p class="result-p"> <span class="bold">
                Maturity Amount: </span>${formatCurrency(maturityAmount)}</p>
                </div>
            `
          );
        } catch (error) {
          showError("fd-result", "Invalid input values");
        }
      });
    }

    // for ltcg calculator
    else if (btn.id.includes("ltcg")) {
      popupBox.innerHTML = `
            <!-- LTCG Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">LTCG Calculator</h2>
                <form class ="form" id="ltcg-form" class="calculator-form">
                    <div class="input-group">
                        <label for="ltcg-selling">Selling Price (₹)</label>
                        <input class = "inputs" type="number" id="ltcg-selling" required min="0" placeholder="Selling Price (₹)" step="1" >
                    </div>
                    <div class="input-group">
                        <label for="ltcg-cost">Cost Price (₹)</label>
                        <input class = "inputs" type="number" id="ltcg-cost" required min="0" placeholder="Cost Price (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="ltcg-period">Holding Period (Years)</label>
                        <input class = "inputs" type="number" id="ltcg-period" step="1" required min="0" placeholder="Holding Period (Years)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="ltcg-result"></div>
                </form>
            </div>
        `;
      // LTCG Calculator
      document.getElementById("ltcg-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const sellingPrice = parseFloat(
            document.getElementById("ltcg-selling").value
          );
          const costPrice = parseFloat(
            document.getElementById("ltcg-cost").value
          );
          const holdingPeriod = parseFloat(
            document.getElementById("ltcg-period").value
          );

          const result = calculateLTCG(sellingPrice, costPrice, holdingPeriod);
          showResult(
            "ltcg-result",
            `
            <div class="col">
               <p class="result-p"> <span class="bold">
                Capital Gains:</span> ${formatCurrency(result.gain)}</p><br>
               <p class="result-p"> <span class="bold">
                Tax Amount: </span>${formatCurrency(result.tax)}</p>
                </div>
            `
          );
        } catch (error) {
          showError("ltcg-result", "Invalid input values");
        }
      });
    }

    // for roi popup
    else if (btn.id.includes("roi")) {
      popupBox.innerHTML = `
         <div class="calculator-tile none">
                <h2 class="popup-heading">ROI Calculator</h2>
                <form class ="form" id="roi-form" class="calculator-form">
                    <div class="input-group">
                        <label for="roi-initial">Initial Investment (₹)</label>
                        <input class = "inputs" type="number" id="roi-initial" required min="0" placeholder="Initial Investment (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="roi-final">Final Value (₹)</label>
                        <input class = "inputs" type="number" id="roi-final" required min="0" placeholder="Final Value (₹)" step="1" >
                    </div>
                    <div class="input-group">
                        <label for="roi-time">Time Period (Years)</label>
                        <input class = "inputs" type="number" id="roi-time" step="1" required min="0" placeholder="Time Period (Years)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="roi-result"></div>
                </form>
            </div>
        `;

      // ROI Calculator
      document.getElementById("roi-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const initialInvestment = parseFloat(
            document.getElementById("roi-initial").value
          );
          const finalValue = parseFloat(
            document.getElementById("roi-final").value
          );
          const time = parseFloat(document.getElementById("roi-time").value);

          const roi = calculateROI(initialInvestment, finalValue, time);
          showResult(
            "roi-result",
            `
            <div class="col">
               <p class="result-p"> <span class="bold">
                Return on Investment: </span> ${formatPercentage(roi)}</p><br>
               <p class="result-p"> <span class="bold">
                Absolute Return: </span>${formatCurrency(
                  finalValue - initialInvestment
                )}</p>
                </div>
            `
          );
        } catch (error) {
          showError("roi-result", "Invalid input values");
        }
      });
    }

    // for gst popup
    else if (btn.id.includes("gst")) {
      popupBox.innerHTML = `
         <!-- GST Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">GST Calculator</h2>
                <form class ="form" id="gst-form" class="calculator-form">
                    <div class="input-group">
                        <label for="gst-amount">Amount (₹)</label>
                        <input class = "inputs amount" type="number" id="gst-amount" required min="0" placeholder="Amount (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="gst-rate">GST Rate (%)</label>
                        <select class = "inputs" id="gst-rate">
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
        `;
        const amount = parseFloat(
          document.getElementById("gst-amount").value
        );
        inputs(amount)

      // GST Calculator
      document.getElementById("gst-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const amount = parseFloat(
            document.getElementById("gst-amount").getAttribute('data')
          );
          const rate = parseFloat(document.getElementById("gst-rate").value);

          const result = calculateGST(amount, rate);
          showResult(
            "gst-result",
            `
            <div class="col">
               <p class="result-p"> <span class="bold">
                GST Amount:</span> ${formatCurrency(result.gstAmount)}</p><br>
               <p class="result-p"> <span class="bold">
                Total Amount:</span> ${formatCurrency(result.total)}</p>
                </div>
            `
          );
        } catch (error) {
          showError("gst-result", "Invalid input values");
        }
      });
    }

    // for discount popup
    else if (btn.id.includes("discount")) {
      popupBox.innerHTML = `
            <!-- Discount Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">Discount Calculator</h2>
                <form class ="form" id="discount-form" class="calculator-form">
                    <div class="input-group">
                        <label for="discount-price">Original Price (₹)</label>
                        <input class = "inputs amount" type="number" id="discount-price" required min="0" placeholder="Original Price (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="discount-percentage">Discount (%)</label>
                        <input class = "inputs" type="number" id="discount-percentage" required min="0" max="100" placeholder="Discount (%)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="discount-result"></div>
                </form>
            </div>
        `;
        const price = parseFloat(
          document.getElementById("discount-price").value
        );
        inputs(price)
      // Discount Calculator
      document
        .getElementById("discount-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          try {
            const price = parseFloat(
              document.getElementById("discount-price").getAttribute('data')
            );
            const discountPercentage = parseFloat(
              document.getElementById("discount-percentage").value
            );

            const result = calculateDiscount(price, discountPercentage);
            showResult(
              "discount-result",
              `
              <div class="col">
               <p class="result-p"> <span class="bold">
                Discount Amount: </span>${formatCurrency(result.discountAmount)}</p><br>
                <p class="result-p"> <span class="bold">
                Final Price: </span>${formatCurrency(result.finalPrice)}</p>
                </div>
            `
            );
          } catch (error) {
            showError("discount-result", "Invalid input values");
          }
        });
    }

    // for emi popup
    else if (btn.id.includes("emi")) {
      popupBox.innerHTML = `
            <!-- EMI Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">EMI Calculator</h2>
                <form class ="form" id="emi-form" class="calculator-form">
                    <div class="input-group">
                        <label for="emi-principal">Loan Amount (₹)</label>
                        <input class = "inputs amount" type="number" id="emi-principal" required min="0" placeholder="Loan Amount (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="emi-rate">Interest Rate (% p.a.)</label>
                        <input class = "inputs" type="number" id="emi-rate" step="0.1" required min="0" placeholder="Interest Rate (% p.a.)">
                    </div>
                    <div class="input-group">
                        <label for="emi-time">Loan Tenure (Years)</label>
                        <input class = "inputs" type="number" id="emi-time" required min="0" placeholder="Loan Tenure (Years)" step="1">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="emi-result"></div>
                </form>
            </div>

        `;
        const principal = parseFloat(
          document.getElementById("emi-principal").value
        );
        inputs(principal)
      // EMI Calculator
      document.getElementById("emi-form").addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          const principal = parseFloat(
            document.getElementById("emi-principal").getAttribute('data')
          );
          const rate = parseFloat(document.getElementById("emi-rate").value);
          const time = parseFloat(document.getElementById("emi-time").value);

          const result = calculateEMI(principal, rate, time);
          showResult(
            "emi-result",
            `
            <div class="col">
               <p class="result-p"> <span class="bold">
                Monthly EMI: </span> ${formatCurrency(result.emi)}</p><br>
                <p class="result-p"> <span class="bold">
                Total Interest: </span>${formatCurrency(result.totalInterest)}</p><br>
                <p class="result-p"> <span class="bold">
                Total Amount: </span> ${formatCurrency(result.totalAmount)} </p>
                </div>
            `
          );
        } catch (error) {
          showError("emi-result", "Invalid input values");
        }
      });
    }

    // for downPayment popup
    else if (btn.id.includes("downPayment")) {
      popupBox.innerHTML = `
             <!-- Down Payment Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">Down Payment Calculator</h2>
                <form class ="form" id="down-payment-form" class="calculator-form">
                    <div class="input-group">
                        <label for="dp-price">Asset Price (₹)</label>
                        <input class = "inputs amount" type="number" id="dp-price" required min="0" placeholder="Asset Price (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="dp-percentage">Down Payment (%)</label>
                        <input class = "inputs"  type="number" id="dp-percentage" required min="0" max="100" placeholder = "Down Payment (%)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="down-payment-result"></div>
                </form>
            </div>
        `;
        const assetPrice = parseFloat(
          document.getElementById("dp-price").value
        );
        inputs(assetPrice)

      // Down Payment Calculator
      document
        .getElementById("down-payment-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          try {
            const assetPrice = parseFloat(
              document.getElementById("dp-price").getAttribute('data')
            );
            const downPaymentPercentage = parseFloat(
              document.getElementById("dp-percentage").value
            );

            const result = calculateDownPayment(
              assetPrice,
              downPaymentPercentage
            );
            showResult(
              "down-payment-result",
              `
              <div class="col">
               <p class="result-p"> <span class="bold">
              Down Payment Amount: </span>${formatCurrency(result.downPayment)}</p><br>
              <p class="result-p"> <span class="bold">
              Loan Amount Required: </span>${formatCurrency(result.loanAmount)}</p>
              </div>
          `
            );
          } catch (error) {
            showError("down-payment-result", "Invalid input values");
          }
        });
    }

    // for cagr calculator
    else if (btn.id.includes("cagr")) {
      popupBox.innerHTML = `
            <!-- CAGR Calculator -->
            <div class="calculator-tile none">
                <h2 class="popup-heading">CAGR Calculator</h2>
                <form class ="form" id="cagr-form" class="calculator-form">
                    <div class="input-group">
                        <label for="cagr-initial">Initial Value (₹)</label>
                        <input class = "inputs" type="number" id="cagr-initial" required min="0" placeholder="Initial Value (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="cagr-final">Final Value (₹)</label>
                        <input class = "inputs" type="number" id="cagr-final" required min="0" placeholder="Final Value (₹)" step="1">
                    </div>
                    <div class="input-group">
                        <label for="cagr-time">Time Period (Years)</label>
                        <input class = "inputs" type="number" id="cagr-time" step="0.1" required min="0" placeholder="Time Period (Years)">
                    </div>
                    <button type="submit">Calculate</button>
                    <div class="result" id="cagr-result"></div>
                </form>
            </div>
        `;
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
            <div class="col">
               <p class="result-p"> <span class="bold">
                CAGR: </span> ${formatPercentage(cagr)}</p><br>
                <p class="result-p"> <span class="bold">
                Absolute Growth: </span> ${formatCurrency(finalValue - initialValue)} </p>
                </div>
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

const resultSection = document.getElementById('si-result')
const showResultBox = ()=>{
  resultSection.style.display = "none"
}
const popbtn = document.getElementById('pop')
// popbtn.addEventListener('click', ()=>{
//   console.log("working")
//   resultSection.style.display = "hidden"

// })
