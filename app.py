# app.py
from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

class FinancialCalculators:
    @staticmethod
    def simple_interest(principal, rate, time):
        """Calculate Simple Interest"""
        return (principal * rate * time) / 100

    @staticmethod
    def compound_interest(principal, rate, time, frequency=1):
        """Calculate Compound Interest"""
        return principal * (1 + rate/(100 * frequency))**(frequency * time) - principal

    @staticmethod
    def gratuity(salary, years):
        """Calculate Gratuity"""
        return (15 * salary * years) / 26

    @staticmethod
    def pf(basic_salary, employer_contribution=12, employee_contribution=12):
        """Calculate PF"""
        employer_amount = (basic_salary * employer_contribution) / 100
        employee_amount = (basic_salary * employee_contribution) / 100
        return employer_amount + employee_amount

    @staticmethod
    def salary(basic, hra, da, allowances, deductions):
        """Calculate Net Salary"""
        gross = basic + hra + da + allowances
        net = gross - deductions
        return {"gross": gross, "net": net}

    @staticmethod
    def ppf(yearly_investment, time):
        """Calculate PPF"""
        rate = 7.1  # Current PPF rate
        return FinancialCalculators.compound_interest(yearly_investment, rate, time)

    @staticmethod
    def nps(monthly_contribution, expected_return, time):
        """Calculate NPS"""
        yearly_contribution = monthly_contribution * 12
        return FinancialCalculators.compound_interest(yearly_contribution, expected_return, time, 12)

    @staticmethod
    def rd(monthly_deposit, rate, time):
        """Calculate RD Maturity Amount"""
        months = time * 12
        rate_monthly = rate / 12 / 100
        amount = monthly_deposit * ((1 + rate_monthly) * ((1 + rate_monthly)**months - 1) / rate_monthly)
        return amount

    @staticmethod
    def fd(principal, rate, time):
        """Calculate FD Maturity Amount"""
        return FinancialCalculators.compound_interest(principal, rate, time, 4)

    @staticmethod
    def ltcg(selling_price, cost_price, holding_period):
        """Calculate Long Term Capital Gains"""
        if holding_period >= 1:  # 1 year or more
            gain = selling_price - cost_price
            tax = 0.10 * max(0, gain - 100000)  # ₹1 lakh exemption
            return {"gain": gain, "tax": tax}
        return {"gain": 0, "tax": 0}

    @staticmethod
    def roi(initial_investment, final_value, time):
        """Calculate Return on Investment"""
        return ((final_value - initial_investment) / initial_investment) * 100

    @staticmethod
    def gst(amount, rate):
        """Calculate GST"""
        gst_amount = (amount * rate) / 100
        total = amount + gst_amount
        return {"gst_amount": gst_amount, "total": total}

    @staticmethod
    def discount(original_price, discount_percentage):
        """Calculate Discount"""
        discount_amount = (original_price * discount_percentage) / 100
        final_price = original_price - discount_amount
        return {"discount_amount": discount_amount, "final_price": final_price}

    @staticmethod
    def emi(principal, rate, time):
        """Calculate EMI"""
        rate_monthly = rate / (12 * 100)
        months = time * 12
        emi = principal * rate_monthly * (1 + rate_monthly)**months / ((1 + rate_monthly)**months - 1)
        return emi

    @staticmethod
    def down_payment(asset_price, down_payment_percentage):
        """Calculate Down Payment"""
        down_payment = (asset_price * down_payment_percentage) / 100
        loan_amount = asset_price - down_payment
        return {"down_payment": down_payment, "loan_amount": loan_amount}

    @staticmethod
    def cagr(initial_value, final_value, time):
        """Calculate CAGR"""
        return (((final_value / initial_value) ** (1 / time)) - 1) * 100

@app.route('/')
def index():
    return render_template('index2.html')

@app.route('/calculate/<calculator_type>', methods=['POST'])
def calculate(calculator_type):
    data = request.get_json()
    calc = FinancialCalculators()
    
    try:
        if calculator_type == 'simple_interest':
            result = calc.simple_interest(
                float(data['principal']),
                float(data['rate']),
                float(data['time'])
            )
        # Add similar handlers for other calculator types
        # ...

        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080, debug=True)
