📂 Struktur Folder Kompleks dengan Atomic Design di React

/src
  /assets              # Statis assets seperti gambar, ikon, font
    ├── images/
    ├── icons/
  
  /components          # Semua komponen berdasarkan Atomic Design
    /atoms             # Komponen UI terkecil
      ├── Button.jsx
      ├── Input.jsx
      ├── Label.jsx
      ├── Icon.jsx
    /molecules         # Gabungan beberapa atom
      ├── SearchBar.jsx
      ├── FormField.jsx
    /organisms         # Gabungan beberapa molecules
      ├── Navbar.jsx
      ├── Sidebar.jsx
      ├── ProductCard.jsx
    /templates         # Layout dasar halaman
      ├── DashboardTemplate.jsx
      ├── AuthTemplate.jsx
    /pages             # Halaman lengkap
      ├── HomePage.jsx
      ├── LoginPage.jsx
      ├── ProductPage.jsx
      ├── DashboardPage.jsx

  /hooks               # Custom Hooks
    ├── useAuth.js
    ├── useFetch.js
    ├── useTheme.js

  /context             # Global Context API
    ├── AuthContext.js
    ├── ThemeContext.js
  
  /services            # API Calls atau Interaksi dengan Backend
    ├── authService.js
    ├── productService.js

  /store               # Manajemen State (Redux / Zustand / Jotai)
    ├── authSlice.js
    ├── productSlice.js
    ├── store.js

  /routes              # Konfigurasi Routing React Router
    ├── routes.js
    ├── PrivateRoute.js
  
  /utils               # Helper Functions
    ├── formatDate.js
    ├── calculateDiscount.js

  /config              # Konfigurasi umum (misalnya API URL)
    ├── constants.js
    ├── env.js

  /styles              # Global Styles atau CSS Modules
    ├── global.css
    ├── themes.css

  /tests               # Unit & Integration Testing
    ├── components/
    ├── pages/
    ├── utils/

  /App.jsx             # Root Component
  /main.jsx            # Entry Point

📌 Penjelasan Tambahan

    /hooks → Menyimpan custom hooks untuk kode yang bisa digunakan ulang (misal useAuth, useFetch).
    /context → Jika menggunakan React Context API, simpan di sini (misal AuthContext.js).
    /services → File untuk komunikasi dengan API, misalnya authService.js untuk autentikasi dan productService.js untuk produk.
    /store → Manajemen state global seperti Redux, Zustand, atau Jotai.
    /routes → Berisi semua rute aplikasi dengan React Router dan pengamanan rute (PrivateRoute.js).
    /utils → Helper functions yang sering digunakan (misal formatDate.js untuk format tanggal).
    /config → Menyimpan variabel konfigurasi seperti API URL, token, dll.
    /styles → Menyimpan CSS global, SCSS, atau Tailwind config.
    /tests → Untuk unit dan integration testing menggunakan Jest atau React Testing Library.