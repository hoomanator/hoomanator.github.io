#!/usr/bin/env python3
"""
Simple Python application to add two numbers
"""

def add_numbers(num1, num2):
    """
    Add two numbers and return the result
    
    Args:
        num1: First number
        num2: Second number
    
    Returns:
        The sum of num1 and num2
    """
    return num1 + num2


def main():
    """Main function to run the application"""
    print("=" * 40)
    print("     Simple Number Addition App")
    print("=" * 40)
    
    try:
        # Get input from user
        first_number = float(input("\nEnter the first number: "))
        second_number = float(input("Enter the second number: "))
        
        # Calculate the sum
        result = add_numbers(first_number, second_number)
        
        # Display the result
        print("\n" + "-" * 40)
        print(f"{first_number} + {second_number} = {result}")
        print("-" * 40)
        
    except ValueError:
        print("\nError: Please enter valid numbers!")


if __name__ == "__main__":
    main()
