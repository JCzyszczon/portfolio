/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'none' },
        },
        bounceGallery: {
          '0%, 100%': { transform: 'translateY(-5%) translateX(-50%)' },
          '50%': { transform: 'translateY(0%) translateX(-50%)' },
        }
      },
      animation: {
        bounce: 'bounce 1.3s infinite',
        bounceGallery: 'bounceGallery 1.3s infinite',
      },
      fontFamily: {
        lato: ['"Lato"'],
        ptSans: ['"PT Sans"'],
      },
    },
    colors: {
      bgColor: '#001',
      textColor: '#fff',
      mainColor: '#ef476f',
    },
  },
}
