import os
import json

# Load the JSON file
def load_json_data(json_path):
    with open(json_path, 'r') as file:
        data = json.load(file)
    return data

# Update the 'image' entries in the JSON in alphabetical order of JPEG files
def update_json_images(directory, json_data):
    # Collect all JPG files in the directory and sort them alphabetically
    jpg_files = sorted([file for file in os.listdir(directory) if file.endswith('.png')])
    print("jpg files: ", jpg_files)


    jpg_file_iter = iter(jpg_files)  # Create an iterator for the JPG files
    print("jpg_file_iter", next(jpg_file_iter))
    updated = False
    for key in json_data.keys():
        try:
            print("changing: ", json_data[key]['image'])
            new_image_name = next(jpg_file_iter)  # Get the next JPEG file in alphabetical order
            print("new_image_name", new_image_name)
            new_image_path = os.path.join(directory, new_image_name)
            json_data[key]['image'] = new_image_path  # Update the JSON entry
            
            updated = True
            print(f"Updated image path for {key} to {new_image_path}")
        except StopIteration:
            print(f"No more JPG files available for updating {key}")
            break

    return json_data, updated

# Save the updated JSON data
def save_json_data(json_path, data):
    with open(json_path, 'w') as file:
        json.dump(data, file, indent=4)

# Main function to execute the script
def main():
    json_path = 'C:/Users/afoster/Desktop/Projects/NHL_Elo/nhl-elo-standings/public/nhl_teams.json'   # Path to the JSON file
    directory = 'C:/Users/afoster/Desktop/Projects/NHL_Elo/nhl-elo-standings/public/NHL_Logos'        # Directory containing the JPG files
    json_data = load_json_data(json_path)
    updated_data, updated = update_json_images(directory, json_data)
    if updated:
        save_json_data(json_path, updated_data)
        print("JSON file has been updated.")
    else:
        print("No updates were necessary.")

if __name__ == "__main__":
    main()
