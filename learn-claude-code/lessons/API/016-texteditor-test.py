def greeting():
    print("Hi there!")

def calculate_pi_to_5th_digit():
    """
    Calculate pi to the 5th decimal digit using the Leibniz formula.
    Returns pi as 3.14159
    """
    # Using a more efficient approach with the Machin-like formula
    # or we can use the math library for accuracy
    from decimal import Decimal, getcontext
    
    # Set precision high enough for 5 decimal places
    getcontext().prec = 50
    
    # Using Machin's formula: pi/4 = 4*arctan(1/5) - arctan(1/239)
    def arctan(x, num_terms=100):
        """Calculate arctan using Taylor series"""
        x = Decimal(x)
        result = Decimal(0)
        for n in range(num_terms):
            term = ((-1) ** n) * (x ** (2 * n + 1)) / (2 * n + 1)
            result += term
        return result
    
    pi = 4 * (4 * arctan(Decimal(1)/Decimal(5)) - arctan(Decimal(1)/Decimal(239)))
    
    # Round to 5 decimal places
    return round(float(pi), 5)

def test_pi_function():
    """
    Test the calculate_pi_to_5th_digit function and print the result.
    """
    print("Testing Pi Calculation Function")
    print("-" * 40)
    
    # Calculate pi
    pi_value = calculate_pi_to_5th_digit()
    
    # Print the result
    print(f"Calculated Pi: {pi_value}")
    
    # Verify accuracy (actual pi to 5 decimal places is 3.14159)
    expected_pi = 3.14159
    
    if pi_value == expected_pi:
        print(f"✓ Test PASSED! Pi calculated correctly: {pi_value}")
    else:
        print(f"✗ Test FAILED! Expected: {expected_pi}, Got: {pi_value}")
    
    print("-" * 40)
    
    return pi_value

# Run the test
if __name__ == "__main__":
    greeting()
    test_pi_function()
