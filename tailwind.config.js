/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "1.5xl": "1360px", // Define the minimum width for 1.5xl
        "2.5xl": "1600px", // Define the minimum width for 2.5xl
        "3xl": "1650px", // Define the minimum width for 3xl
        "3.5xl": "1750px", // Define the minimum width for 3.5xl
        "4xl": "1920px", // Define the minimum width for 4xl
      },
      boxShadow: {
        // Format: [x-offset] [y-offset] [blur-radius] [spread-radius] [color]
        "input-field": "0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
        //               ^   ^   ^   ^      ^
        //               |   |   |   |      └─ Shadow color (black with 15% opacity)
        //               |   |   |   └──────────── Spread radius (expands shadow size)
        //               |   |   └──────────────────────── Blur radius (softens the shadow)
        //               |   └─────────────────────────────── Y offset (moves shadow 2px down)
        //               └───────────────────────────────────── X offset (no horizontal movement)
        "input-field-light": "0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        "dropdown-field-light": "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
        "dropdown-field": "0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        div: "0 20rem 60rem 10rem rgba(0, 0, 0, 0.1)",
        tableHeader: "0rem 2rem 20rem 0rem rgba(0,0,0,0.08)",
        header: "0 0.2rem 1rem 0.2rem rgba(0,0,0,0.2)",
        video: "0 4rem 20rem 0 rgba(0, 0, 0, 0.04)",
        smgreen: "0.05rem 0.05rem 1rem 0 rgba(88, 176, 49, 0.3)",
        green: "2rem 6rem 10rem 0 rgba(88, 176, 49, 0.3)",
        datagrid:
          "0px 1.55px 4.65px 0px rgba(0, 0, 0, 0.10), 0px 1.55px 3.1px 0px rgba(0, 0, 0, 0.06);",
        modal: "0px 1px 20px 0px rgba(0, 0, 0, 0.25)",
        subscriptionShadow: "0rem 4rem 20rem 0rem rgba(0,0,0,0.04)",
      },
      padding: {
        "extra-bottom": "6rem", // Add extra bottom padding
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(to bottom, #F9F9F9 50%, white 50%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        stripes: "url('/src/assets/images/stripesbg.png')",
      },
      colors: {
        "primary-color": "#ED1A5C",
        "secondary-color": "#FFC6D8",
        "tertiary-color": "#FFF6FA",
        "dark-primary": "#C4033F",
        "dark-green": "#479e3c",
        textBoxGreen: "#58B031",
        "custom-light-green": "#F6FCF3",
        "badge-text-green": "#15803D",
        "dollar-green": "#C9E8C9",
        "badge-border-green": "rgba(22, 163, 74, 0.33)",
        "opacity-green": "rgba(88, 176, 49, 0.4)",
        "half-green": "rgba(88, 176, 49, 0.06)",
        "white-op": "rgba(256, 256, 256, 0.2)",
        "badge-green": "#F0FDF4",
        "custom-white": "#FFFFFF", // White color
        "main-bg-white": "#F9F9F9",
        "secondary-bg-white": "#FAFAFA",
        "column-header-text": "#9CA3AF",
        "box-brown": "rgba(255, 176, 80, 0.1)",
        "box-blue": "rgba(40, 103, 178, 0.1)",
        "box-green": "rgba(88, 176, 49, 0.1)",
        "border-green": "#58B031",
        error: "#dc3545",
        errorSecondary: "#d1293a",
        errorTertiary: "#DC4955",
        heartPink: "#E70074",
        "custom-yellow": "#FFB050",
        "yellow-secondary": "#F29727",
        "custom-black": "#0E0F0F",
        chipTextBlue: "#1677FF",
        chipBgBlue: "#E6F4FF",
        chipBorderBlue: "#91CAFF",
        hhGrayShades: {
          textGray: "#A1A1A1",
          borderGray: "#D9D9D9",
          tabHeader: "#6F6F6F",
          label: "#7A7A7A",
        },
        grayShades: {
          borderGray: "#92929D",
          imageBorder: "#e5e7eb",
          datagrid: "#374151",
          "datagrid-secondary": "#6B7280",
          borderLightGray: "#E6E6E6",
          "datagrid-border": "#EAECF0",
          customGray: "#6C6C6C",
          pencilGray: "#334253",
          pencilLightGray: "#67727E",
          dividerGray: "#DEDEDE",
          horizontalDividerGray: "#E9EBF0",
          disabledGray: "#F6F6F6",
          secondaryHoverGray: "#dfdede",
          disabledText: "#898989",
          dottedGray: "#D1D5DB",
          textGray: "#A0A0A0",
          textGraySecondary: "#8A9099",
          bgTooltip: "#343434",
          iconGray: "#6B6B6B",
          datagridHeaderGray: "#F5F5F5",
        },
      },
      textColor: {
        "custom-black": "#000000", // Black color
        "text-black": "#0E0F0F",
        filename: "#57534E",
        textBoxBrown: "#FFB050",
        textBoxBlue: "#2867B2",
        linkBlue: "#4285F4",
        textBoxGreen: "#58B031",
      },
      animation: {
        dangle: "dangle infinite 3s ease-in",
        dangle2: "dangle 0.5s ease-in",
        fadein: "fade-in 0.5s ease-in",
        blink: "blink infinite 1s ease-in-out",
        dropdown: "dropdown 0.25s ease-in-out",
        hideup: "hideup 0.25s ease-out",
        swing: "swing 0.35s ease-out",
        spin: "spin infinite 6s",
        loaderSpin: "spin 2s ease-in-out infinite",
        slide: "slide 0.25s ease-in-out",
        slideright: "slideright 0.25s ease-in-out",
        wavyflag: "wave-flag 2s infinite linear",
        // "fade-in: "fade-in 0.25s ease-in",
      },
      keyframes: {
        dangle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        blink: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        dropdown: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 100, transform: "translateY(0px)" },
        },
        dropup: {
          "0%": { opacity: 0, transform: "translateY(0px)" },
          "100%": { opacity: 100, transform: "translateY(-10px)" },
        },
        slide: {
          "0%": { opacity: 0, transform: "translateX(-50px)" },
          "100%": { opacity: 100, transform: "translateX(0px)" },
        },
        slideright: {
          "0%": { opacity: 0, transform: "translateX(50px)" },
          "100%": { opacity: 100, transform: "translateX(0px)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        hideup: {
          "0%": { opacity: 100, transform: "translateY(10px)" },
          "100%": { opacity: 0, transform: "translateY(0px)" },
        },
        swing: {
          "0%": { transform: "rotate(-90deg);" },
          "50%": { transform: "rotate(10deg);" },
          "100%": { transform: "rotate(0deg);" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "wave-flag": {
          "0%": {
            transform: "perspective(500px) rotateX(0deg) skewY(0deg) scaleX(1)",
          },
          "25%": {
            transform:
              "perspective(500px) rotateX(10deg) skewY(-5deg) scaleX(1.1)",
          },
          "50%": {
            transform: "perspective(500px) rotateX(0deg) skewY(0deg) scaleX(1)",
          },
          "75%": {
            transform:
              "perspective(500px) rotateX(-10deg) skewY(5deg) scaleX(0.9)",
          },
          "100%": {
            transform: "perspective(500px) rotateX(0deg) skewY(0deg) scaleX(1)",
          },
        },
      },
    },
    fontFamily: {
      inter: ["Inter"],
    },
    fontSize: {
      xs: [
        "0.75rem",
        {
          //12px
          lineHeight: "1rem",
          letterSpacing: "0em",
        },
      ],
      sm: [
        "0.875rem",
        {
          //14px
          lineHeight: "1.25rem",
          letterSpacing: "0em",
        },
      ],
      base: [
        "1rem",
        {
          //16px
          lineHeight: "1.25rem",
          letterSpacing: "-0.025em",
        },
      ],
      lg: [
        "1.125rem",
        {
          //18px
          lineHeight: "1.75rem",
          letterSpacing: "-0.025em",
        },
      ],
      xl: [
        "1.25rem",
        //20px
        {
          lineHeight: "1.75rem",
          letterSpacing: "-0.025em",
        },
      ],
      "2xl": [
        "1.5rem",
        //24px
        {
          lineHeight: "2rem",
          letterSpacing: "-0.025em",
        },
      ],
      "3xl": [
        "1.875rem",
        //30px
        {
          lineHeight: "2.25rem",
          letterSpacing: "-0.025em",
        },
      ],
      "4xl": [
        "2.25rem",
        //36px
        {
          lineHeight: "2.5rem",
          letterSpacing: "-0.025em",
        },
      ],
      "5xl": [
        "3rem",
        //48px
        {
          lineHeight: "2.8rem",
          letterSpacing: "-0.00em",
        },
      ],
      "6xl": [
        "3.75rem",
        //60px
        {
          lineHeight: "2.5rem",
          letterSpacing: "-0.025em",
        },
      ],
      "7xl": [
        "4.5rem",
        //72px
        {
          lineHeight: "2.5rem",
          letterSpacing: "-0.025em",
        },
      ],
      "8xl": [
        "6rem",
        //96px
        {
          lineHeight: "2.5rem",
          letterSpacing: "-0.025em",
        },
      ],
      "9xl": [
        "8rem",
        //128px
        {
          lineHeight: "2.5rem",
          letterSpacing: "-0.025em",
        },
      ],
    },
  },
  plugins: [],
};
