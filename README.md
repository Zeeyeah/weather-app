# Weather App README

This project is a Weather App developed using Next.js, TypeScript, Tailwind CSS, and MobX State Tree. It utilizes the OpenWeatherMap API to display weather information, including current weather conditions and a 6-day forecast, for various cities. The aim of this project is to practice Next.js development while creating a functional and visually appealing weather application.

## Features

- **Infinite Scroll City List**: All cities are listed in an infinite scroll list, providing a seamless browsing experience.
- **City Page Navigation**: Clicking on a city name navigates the user to the weather page for that specific city.
- **New Tab Navigation**: Right-clicking on a city name and opening it in a new tab also directs the user to the weather page for the chosen city, but in a new tab.
- **OpenWeatherMap API Integration**: Utilizes the OpenWeatherMap free API to fetch weather data, including current weather conditions (temperature, weather description, humidity, wind speed, and atmospheric pressure) and 6-day forecast (temperature highs and lows, weather description, etc.).
- **Chart.js Integration**: Utilizes Chart.js to graphically display the temperature of the current date, enhancing the user's understanding of the weather forecast.
- **Dynamic Backgrounds**: Implements dynamic backgrounds based on the current weather conditions, enhancing the visual appeal of the application.
- **Weather Condition Representation**: Utilizes appropriate images or animations to represent different weather conditions (e.g., sunny, rainy, cloudy), providing a visually engaging user experience.
- **Unit Measurement Switch**: Provides options to switch between different units of measurement, such as Celsius/Fahrenheit and metric/imperial, catering to users with different preferences.
- **Deployment**: Deployed on Vercel for seamless accessibility and reliability.

## Technologies Used

- **Next.js**: Utilized as the frontend framework for its ease of use and efficient server-side rendering capabilities.
- **TypeScript**: Implemented for static typing and enhanced code readability and maintainability.
- **Tailwind CSS**: Utilized for styling the application, offering utility-first and responsive design principles.
- **MobX State Tree (MST)**: Used for state management, offering a scalable and efficient solution for managing application state.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies using `npm install` or `yarn install`.
4. Set up environment variables for the OpenWeatherMap API.
5. Run the development server using `npm run dev` or `yarn dev`.
6. Access the application in your browser at `http://localhost:3000`.

## Screenshots

![Desktop view Screenshot](/public/Screenshot-1.png)
![Desktop view Screenshot](/public/Screenshot-2.png)
![Tablet view Screenshot](/public/Screenshot-3.png)
![Mobile view Screenshot](/public/Screenshot-4.png)

## Credits

This project was created by [Your Name]. Special thanks to [OpenWeatherMap](https://openweathermap.org) for providing the weather data API.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for personal or commercial projects.
