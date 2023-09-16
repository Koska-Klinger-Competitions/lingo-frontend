import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
            blue: {
                500: 'rgb(0, 127, 255)'
            }
        }
    },
  },
  plugins: [],
} satisfies Config;
