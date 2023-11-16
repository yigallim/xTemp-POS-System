import { colors } from "./src/config";

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: colors.primary,
            },
            fontFamily: {
              'poppins': ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
