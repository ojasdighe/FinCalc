// script.js - Complete Implementation

// Utility Functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(amount);
};

const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
};

const showResult = (elementId, content) => {
    const resultElement = document.getElementById(elementId);
    resultElement.innerHTML = content;
    resultElement.classList.add('success');
    resultElement.classList.remove('error');
};

const showError = (elementId, message) => {
    const resultElement = document.getElementById(elementId);
    resultElement.innerHTML = `Error: ${message}`;
    resultElement.classList.add('error');
    resultElement.classList.remove('success');
};

// Calculator Functions
const calculateSimpleInterest = (principal, rate, time) => {
    const interest = (principal * rate * time) / 100;
    const total = principal + interest;
    return { interest, total };
};

const calculateCompoundInterest = (principal, rate, time, frequency) => {
    const amount = principal * Math.pow(1 + (rate / (100 * frequency)), frequency * time);
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
    return calculateCompoundInterest(yearlyContribution, returnRate, time, 12).amount;
};

const calculateRD = (monthlyDeposit, rate, time) => {
    const months = time * 12;
    const monthlyRate = rate / 12 / 100;
    return monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
};

const calculateFD = (principal, rate, time) => {
    return calculateCompoundInterest(principal, rate, time, 4).amount;
};

const calculateLTCG = (sellingPrice, costPrice, holdingPeriod) => {
    if (holdingPeriod >= 1) {
        const gain = sellingPrice - costPrice;
        const tax = Math.max(0, gain - 100000) * 0.10;
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
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
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
document.addEventListener('DOMContentLoaded', () => {
    // Simple Interest Calculator
    document.getElementById('simple-interest-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const principal = parseFloat(document.getElementById('si-principal').value);
            const rate = parseFloat(document.getElementById('si-rate').value);
            const time = parseFloat(document.getElementById('si-time').value);
            
            const result = calculateSimpleInterest(principal, rate, time);
            showResult('si-result', `
                Interest: ${formatCurrency(result.interest)}<br>
                Total Amount: ${formatCurrency(result.total)}
            `);
        } catch (error) {
            showError('si-result', 'Invalid input values');
        }
    });

    // Compound Interest Calculator
    document.getElementById('compound-interest-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const principal = parseFloat(document.getElementById('ci-principal').value);
            const rate = parseFloat(document.getElementById('ci-rate').value);
            const time = parseFloat(document.getElementById('ci-time').value);
            const frequency = parseInt(document.getElementById('ci-frequency').value);
            
            const result = calculateCompoundInterest(principal, rate, time, frequency);
            showResult('ci-result', `
                Interest Earned: ${formatCurrency(result.interest)}<br>
                Maturity Amount: ${formatCurrency(result.amount)}
            `);
        } catch (error) {
            showError('ci-result', 'Invalid input values');
        }
    });

    // Gratuity Calculator
    document.getElementById('gratuity-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const salary = parseFloat(document.getElementById('gratuity-salary').value);
            const years = parseFloat(document.getElementById('gratuity-years').value);
            
            const gratuity = calculateGratuity(salary, years);
            showResult('gratuity-result', `
                Gratuity Amount: ${formatCurrency(gratuity)}
            `);
        } catch (error) {
            showError('gratuity-result', 'Invalid input values');
        }
    });

    // PF Calculator
    document.getElementById('pf-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const salary = parseFloat(document.getElementById('pf-salary').value);
            const employerContribution = parseFloat(document.getElementById('pf-employer').value);
            const employeeContribution = parseFloat(document.getElementById('pf-employee').value);
            
            const result = calculatePF(salary, employerContribution, employeeContribution);
            showResult('pf-result', `
                Employer Contribution: ${formatCurrency(result.employer)}<br>
                Employee Contribution: ${formatCurrency(result.employee)}<br>
                Total Monthly PF: ${formatCurrency(result.total)}
            `);
        } catch (error) {
            showError('pf-result', 'Invalid input values');
        }
    });

    // Salary Calculator
    document.getElementById('salary-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const basic = parseFloat(document.getElementById('salary-basic').value);
            const hra = parseFloat(document.getElementById('salary-hra').value);
            const da = parseFloat(document.getElementById('salary-da').value);
            const allowances = parseFloat(document.getElementById('salary-allowances').value);
            const deductions = parseFloat(document.getElementById('salary-deductions').value);
            
            const result = calculateSalary(basic, hra, da, allowances, deductions);
            showResult('salary-result', `
                Gross Salary: ${formatCurrency(result.gross)}<br>
                Net Salary: ${formatCurrency(result.net)}
            `);
        } catch (error) {
            showError('salary-result', 'Invalid input values');
        }
    });

    // PPF Calculator
    document.getElementById('ppf-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const investment = parseFloat(document.getElementById('ppf-investment').value);
            const time = parseFloat(document.getElementById('ppf-time').value);
            
            const maturityAmount = calculatePPF(investment, time);
            const totalInvestment = investment * time;
            const interest = maturityAmount - totalInvestment;
            
            showResult('ppf-result', `
                Total Investment: ${formatCurrency(totalInvestment)}<br>
                Interest Earned: ${formatCurrency(interest)}<br>
                Maturity Amount: ${formatCurrency(maturityAmount)}
            `);
        } catch (error) {
            showError('ppf-result', 'Invalid input values');
        }
    });

    // NPS Calculator
    document.getElementById('nps-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const monthlyContribution = parseFloat(document.getElementById('nps-contribution').value);
            const returnRate = parseFloat(document.getElementById('nps-return').value);
            const time = parseFloat(document.getElementById('nps-time').value);
            
            const maturityAmount = calculateNPS(monthlyContribution, returnRate, time);
            const totalInvestment = monthlyContribution * 12 * time;
            const interest = maturityAmount - totalInvestment;
            
            showResult('nps-result', `
                Total Investment: ${formatCurrency(totalInvestment)}<br>
                Interest Earned: ${formatCurrency(interest)}<br>
                Maturity Amount: ${formatCurrency(maturityAmount)}
            `);
        } catch (error) {
            showError('nps-result', 'Invalid input values');
        }
    });

    // RD Calculator
    document.getElementById('rd-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const monthlyDeposit = parseFloat(document.getElementById('rd-deposit').value);
            const rate = parseFloat(document.getElementById('rd-rate').value);
            const time = parseFloat(document.getElementById('rd-time').value);
            
            const maturityAmount = calculateRD(monthlyDeposit, rate, time);
            const totalInvestment = monthlyDeposit * 12 * time;
            const interest = maturityAmount - totalInvestment;
            
            showResult('rd-result', `
                Total Investment: ${formatCurrency(totalInvestment)}<br>
                Interest Earned: ${formatCurrency(interest)}<br>
                Maturity Amount: ${formatCurrency(maturityAmount)}
            `);
        } catch (error) {
            showError('rd-result', 'Invalid input values');
        }
    });

    // FD Calculator
    document.getElementById('fd-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const principal = parseFloat(document.getElementById('fd-principal').value);
            const rate = parseFloat(document.getElementById('fd-rate').value);
            const time = parseFloat(document.getElementById('fd-time').value);
            
            const maturityAmount = calculateFD(principal, rate, time);
            const interest = maturityAmount - principal;
            
            showResult('fd-result', `
                Principal Amount: ${formatCurrency(principal)}<br>
                Interest Earned: ${formatCurrency(interest)}<br>
                Maturity Amount: ${formatCurrency(maturityAmount)}
            `);
        } catch (error) {
            showError('fd-result', 'Invalid input values');
        }
    });

    // LTCG Calculator
    document.getElementById('ltcg-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const sellingPrice = parseFloat(document.getElementById('ltcg-selling').value);
            const costPrice = parseFloat(document.getElementById('ltcg-cost').value);
            const holdingPeriod = parseFloat(document.getElementById('ltcg-period').value);
            
            const result = calculateLTCG(sellingPrice, costPrice, holdingPeriod);
            showResult('ltcg-result', `
                Capital Gains: ${formatCurrency(result.gain)}<br>
                Tax Amount: ${formatCurrency(result.tax)}
            `);
        } catch (error) {
            showError('ltcg-result', 'Invalid input values');
        }
    });

    // ROI Calculator
    document.getElementById('roi-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const initialInvestment = parseFloat(document.getElementById('roi-initial').value);
            const finalValue = parseFloat(document.getElementById('roi-final').value);
            const time = parseFloat(document.getElementById('roi-time').value);
            
            const roi = calculateROI(initialInvestment, finalValue, time);
            showResult('roi-result', `
                Return on Investment: ${formatPercentage(roi)}<br>
                Absolute Return: ${formatCurrency(finalValue - initialInvestment)}
            `);
        } catch (error) {
            showError('roi-result', 'Invalid input values');
        }
    });

    // GST Calculator
    document.getElementById('gst-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const amount = parseFloat(document.getElementById('gst-amount').value);
            const rate = parseFloat(document.getElementById('gst-rate').value);
            
            const result = calculateGST(amount, rate);
            showResult('gst-result', `
                GST Amount: ${formatCurrency(result.gstAmount)}<br>
                Total Amount: ${formatCurrency(result.total)}
            `);
        } catch (error) {
            showError('gst-result', 'Invalid input values');
        }
    });

    // Discount Calculator
    document.getElementById('discount-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const price = parseFloat(document.getElementById('discount-price').value);
            const discountPercentage = parseFloat(document.getElementById('discount-percentage').value);
            
            const result = calculateDiscount(price, discountPercentage);
            showResult('discount-result', `
                Discount Amount: ${formatCurrency(result.discountAmount)}<br>
                Final Price: ${formatCurrency(result.finalPrice)}
            `);
        } catch (error) {
            showError('discount-result', 'Invalid input values');
        }
    });

    // EMI Calculator
    document.getElementById('emi-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const principal = parseFloat(document.getElementById('emi-principal').value);
            const rate = parseFloat(document.getElementById('emi-rate').value);
            const time = parseFloat(document.getElementById('emi-time').value);
            
            const result = calculateEMI(principal, rate, time);
            showResult('emi-result', `
                Monthly EMI: ${formatCurrency(result.emi)}<br>
                Total Interest: ${formatCurrency(result.totalInterest)}<br>
                Total Amount: ${formatCurrency(result.totalAmount)}
            `);
        } catch (error) {
            showError('emi-result', 'Invalid input values');
        }
    });

    // Down Payment Calculator
    document.getElementById('down-payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const assetPrice = parseFloat(document.getElementById('dp-price').value);
            const downPaymentPercentage = parseFloat(document.getElementById('dp-percentage').value);
            
            const result = calculateDownPayment(assetPrice, downPaymentPercentage);
            showResult('down-payment-result', `
                Down Payment Amount: ${formatCurrency(result.downPayment)}<br>
                Loan Amount Required: ${formatCurrency(result.loanAmount)}
            `);
        } catch (error) {
            showError('down-payment-result', 'Invalid input values');
        }
    });

    // CAGR Calculator
    document.getElementById('cagr-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const initialValue = parseFloat(document.getElementById('cagr-initial').value);
            const finalValue = parseFloat(document.getElementById('cagr-final').value);
            const time = parseFloat(document.getElementById('cagr-time').value);
            
            const cagr = calculateCAGR(initialValue, finalValue, time);
            showResult('cagr-result', `
                CAGR: ${formatPercentage(cagr)}<br>
                Absolute Growth: ${formatCurrency(finalValue - initialValue)}
            `);
        } catch (error) {
            showError('cagr-result', 'Invalid input values');
        }
    });

    // Input Validation and Real-time Feedback
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.value < 0) {
                e.target.value = 0;
            }
        });
    });

    // Clear Results on Input Change
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const form = e.target.closest('form');
            const resultDiv = form.querySelector('.result');
            resultDiv.innerHTML = '';
            resultDiv.classList.remove('success', 'error');
        });
    });

    // Add Loading States
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const button = form.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Calculating...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 500);
        });
    });

    // Additional Helper Functions for Enhanced User Experience
    const addThousandsSeparator = (input) => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/,/g, '');
            if (value.length > 8) {
                e.target.value = Number(value).toLocaleString('en-IN');
            }
        });
    };

    // Apply thousands separator to all amount inputs
    const amountInputs = document.querySelectorAll('input[id*="principal"], input[id*="price"], input[id*="salary"]');
    amountInputs.forEach(addThousandsSeparator);

    // Initialize tooltips for help text
    const initializeTooltips = () => {
        const tooltips = document.querySelectorAll('[data-tooltip]');
        tooltips.forEach(tooltip => {
            tooltip.style.position = 'relative';
            tooltip.addEventListener('mouseover', (e) => {
                const tooltipText = document.createElement('div');
                tooltipText.className = 'tooltip';
                tooltipText.textContent = tooltip.dataset.tooltip;
                tooltip.appendChild(tooltipText);
            });
            tooltip.addEventListener('mouseout', (e) => {
                const tooltipText = tooltip.querySelector('.tooltip');
                if (tooltipText) {
                    tooltipText.remove();
                }
            });
        });
    };

    initializeTooltips();

    // Handle form reset
    forms.forEach(form => {
        form.addEventListener('reset', (e) => {
            const resultDiv = form.querySelector('.result');
            resultDiv.innerHTML = '';
            resultDiv.classList.remove('success', 'error');
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            const activeElement = document.activeElement;
            const form = activeElement.closest('form');
            if (form) {
                const submitEvent = new Event('submit');
                form.dispatchEvent(submitEvent);
            }
        }
    });
});
