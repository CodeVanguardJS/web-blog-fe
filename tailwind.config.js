import daisyui from "daisyui"

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DB611D', // Oranye hangat untuk elemen utama
        secondary: '#FBC948', // Kuning cerah yang memberi kesan energik dan perhatian
        accent: '#A4C24F', // Hijau segar untuk aksen atau elemen pendukung
        backgroundlight: '#F6F6E3', // Warna putih krem untuk latar belakang terang
        backgrounddark: '#0D4949', // Hijau tua yang modern untuk latar belakang gelap
        highlightAction: '#FBC948', // Warna kuning cerah yang menarik untuk interaksi
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    daisyui,
  ],
}
