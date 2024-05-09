import json
import random
from datetime import datetime
import os

# Function to generate new prediction numbers
def generate_prediction(existing_numbers):
    prediction = []
    while len(prediction) < 6:
        new_number = random.randint(1, 49)
        if new_number not in existing_numbers and new_number not in prediction:
            prediction.append(new_number)
    return prediction

# Function to save prediction numbers to a file with dates
# Function to save prediction numbers to a single file with dates
def save_prediction(prediction, game_type):
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open('prediction_numbers.txt', 'a') as file:  # Open file in append mode
        file.write(f"Prediction for {game_type} generated on: {current_date}\n")
        file.write(f"Game Type: {game_type}\n")
        for number in prediction:
            file.write(str(number) + '\n')
        file.write("\n")  # Add a newline after each prediction


# Function to display prediction numbers
def display_prediction(prediction, game_type):
    print(f"New Prediction Numbers for {game_type}:")
    print(prediction)

def main():
    # Load lottery results from JSON file
    with open('lottery_results.json', 'r') as file:
        lottery_results = json.load(file)

    # Initialize dictionary to store existing numbers for each game type
    existing_numbers = {}

    # Extract existing numbers for each game type
    for game_type, results in lottery_results['results'].items():
        existing_numbers[game_type.lower()] = results['winning_numbers']

    # Analyze lottery results and generate new prediction for each game type
    for game_type, numbers in existing_numbers.items():
        new_prediction = generate_prediction(numbers)
        # Save prediction to file
        save_prediction(game_type, new_prediction)
        # Display prediction
        display_prediction(game_type, new_prediction)

if __name__ == "__main__":
    main()


