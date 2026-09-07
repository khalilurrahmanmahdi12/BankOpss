🏦 BankOps

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-111827)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

*BankOps* adalah aplikasi web untuk membantu monitoring operasional perbankan dalam satu dashboard terintegrasi, mulai dari transaksi, nasabah, rekening, fraud alert, approval, laporan, hingga audit aktivitas pengguna.

Project ini dikembangkan sebagai **prototype sistem internal perbankan** dengan pendekatan **Role-Based Access Control**, sehingga setiap pengguna hanya dapat mengakses fitur sesuai dengan perannya.

---

🚀 Live Demo

🌐 *Demo*
https://bank-opss.vercel.app/

💻 *Repository*  
https://github.com/khalilurrahmanmahdi12/BankOpss

---

✨ Fitur Utama

📊 Dashboard Monitoring

Menampilkan ringkasan kondisi operasional perbankan seperti:

- 💰 Volume transaksi
- 🔄 Jumlah transaksi
- 👥 Total nasabah
- 🚨 Fraud alert
- 📈 Grafik aktivitas transaksi
- 🧾 Transaksi terbaru
- 🛡️ Fraud alert terbaru
- ✅ Pending approval

Dashboard dirancang untuk memberikan gambaran cepat mengenai kondisi operasional dan aktivitas penting yang membutuhkan perhatian.

---

👥 Manajemen Nasabah

Administrator dan pengguna yang memiliki akses dapat melakukan monitoring data nasabah melalui fitur:

- 🔎 Pencarian nasabah
- 🎯 Filter status
- 👤 Detail nasabah
- 🏦 Informasi rekening
- 💵 Informasi saldo
- 📜 Riwayat transaksi

Halaman detail membantu pengguna melihat informasi nasabah secara lebih terstruktur dalam satu tempat.

---

🏦 Manajemen Rekening

Modul rekening digunakan untuk memantau informasi rekening nasabah seperti:

- 🔢 Nomor rekening
- 👤 Nama pemilik
- 💳 Jenis rekening
- 💰 Saldo
- 📌 Status rekening
- 🔒 Blokir rekening
- 🔓 Buka blokir rekening

Status rekening yang tersedia:

- 🟢 Aktif
- 🔴 Diblokir
- 🟡 Ditangguhkan

Fitur blokir dan buka blokir pada project ini digunakan sebagai simulasi workflow operasional.

---

💸 Monitoring Transaksi

Menampilkan seluruh aktivitas transaksi dengan informasi lengkap seperti:

- ID transaksi
- Nama nasabah
- Nomor rekening
- Jenis transaksi
- Nominal
- Tanggal dan waktu
- Channel transaksi
- Nomor referensi
- Status transaksi

Jenis transaksi meliputi:

- ⬇️ Transfer Masuk
- ⬆️ Transfer Keluar
- 🧾 Pembayaran
- 💳 Top Up

Status transaksi:

- ✅ Berhasil
- 🔍 Ditinjau
- ❌ Gagal

Tersedia juga fitur pencarian dan filter untuk membantu proses monitoring transaksi.

---

🔍 Detail Transaksi

Setiap transaksi dapat dibuka secara lebih detail untuk melihat informasi seperti:

- Identitas transaksi
- Nasabah terkait
- Nomor rekening
- Nominal
- Waktu transaksi
- Channel
- Referensi
- Status transaksi

Halaman ini membantu proses pemeriksaan terhadap transaksi tertentu.

---

🛡️ Fraud Monitoring

Modul Fraud Monitoring digunakan untuk memantau transaksi atau aktivitas yang terindikasi mencurigakan.

Informasi fraud alert meliputi:

- 🚨 ID fraud alert
- 🔗 Transaksi terkait
- 📊 Risk score
- ⚠️ Risk level
- 📝 Alasan indikasi fraud
- 🔍 Status pemeriksaan

Tindakan yang tersedia:

- 🔎 Tinjau
- ✅ Tandai Aman
- 🚨 Konfirmasi Fraud

Modul ini dirancang untuk mensimulasikan workflow pemeriksaan transaksi berisiko.

---

✅ Approval / Persetujuan

Digunakan untuk menangani transaksi atau aktivitas tertentu yang membutuhkan persetujuan.

Status approval:

- ⏳ Menunggu
- ✅ Disetujui
- ❌ Ditolak

Pengguna yang memiliki kewenangan dapat:

- Melihat detail pengajuan
- Memberikan keputusan
- Menambahkan alasan persetujuan
- Menambahkan alasan penolakan
- Mencatat pengguna yang memberikan keputusan

---

📑 Laporan Operasional

Modul laporan menyediakan informasi operasional dalam bentuk ringkasan dan tabel.

Fitur laporan meliputi:

- 📊 Ringkasan transaksi
- 💰 Total nilai transaksi
- 🔢 Jumlah transaksi
- 📌 Komposisi status transaksi
- 📅 Filter periode
- 🔎 Pencarian data
- 📋 Tabel laporan
- 📥 Export Excel

---

📗 Export Excel

Data laporan dapat diekspor ke format:

```text
.xlsx
````

Export dapat digunakan untuk kebutuhan:

* 📊 Rekapitulasi
* 🗂️ Dokumentasi
* 📈 Analisis data
* 🧾 Pelaporan
* 📁 Arsip operasional

---

📝 Audit Log

Audit Log digunakan untuk mencatat aktivitas penting pengguna di dalam sistem.

Aktivitas yang dapat dicatat meliputi:

* 🔄 Perubahan status
* 🔒 Pemblokiran rekening
* 🔓 Pembukaan blokir rekening
* ✅ Approval
* ❌ Penolakan
* 🛡️ Aktivitas fraud
* 👤 Aktivitas pengguna lainnya

Audit Log membantu proses monitoring, transparansi, serta pemeriksaan aktivitas internal.

---

🔔 Sistem Notifikasi

BankOps memiliki panel notifikasi untuk menampilkan aktivitas penting seperti:

* 🚨 Fraud alert baru
* 🔍 Transaksi perlu ditinjau
* ⏳ Pending approval
* 🏦 Perubahan status rekening
* ℹ️ Informasi sistem

Fitur notifikasi meliputi:

* 🔴 Badge jumlah notifikasi
* ✅ Tandai sebagai dibaca
* ✅ Tandai semua sebagai dibaca
* 🔗 Navigasi langsung ke halaman terkait

---

👤 Informasi Akun

Pengguna dapat melihat informasi akun seperti:

* Nama
* Email
* Role
* Status akun
* Hak akses

---

🔐 Role-Based Access Control

BankOps memiliki tiga role utama:

👑 Administrator

Administrator memiliki akses penuh ke:

* Dashboard
* Nasabah
* Rekening
* Transaksi
* Fraud Alert
* Persetujuan
* Laporan
* Audit Log
* Profil
* Pengaturan

---

🧑‍💼 Supervisor

Supervisor memiliki akses ke:

* Dashboard
* Nasabah
* Rekening
* Transaksi
* Persetujuan
* Laporan
* Profil
* Pengaturan

---

🕵️ Fraud Analyst

Fraud Analyst memiliki akses yang berfokus pada:

* Dashboard
* Transaksi
* Fraud Alert
* Pemeriksaan transaksi mencurigakan
* Profil
* Pengaturan

---

🔒 Keamanan Akses

BankOps dilengkapi dengan:

* 🔐 Sistem login
* 🛡️ Protected Route
* 👥 Role-Based Access Control
* 🚫 Halaman 403 Akses Ditolak
* 🔍 Halaman 404 Tidak Ditemukan
* 🚪 Logout
* 💾 Session berbasis LocalStorage untuk simulasi

Setiap pengguna akan diarahkan ke halaman yang sesuai dengan hak aksesnya.

---

📱 Responsive Design

BankOps dirancang agar dapat digunakan dengan nyaman pada berbagai ukuran perangkat:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Tablet
* 📲 Smartphone

Fitur responsive meliputi:

* ☰ Mobile Sidebar
* 📋 Responsive Table
* 🔔 Responsive Notification Panel
* 👤 Responsive Profile Dropdown
* 📊 Responsive Dashboard Cards
* 🔎 Responsive Filter
* 📱 Mobile-friendly Navigation

---

⏳ Loading & Skeleton

Sistem menggunakan **Skeleton Loading** untuk memberikan feedback visual saat halaman sedang dimuat.

Fitur ini membantu membuat pengalaman pengguna terasa lebih halus dan modern.

---

💾 LocalStorage

Project menggunakan `localStorage` untuk menyimpan data simulasi seperti:

* Session login
* Status akun
* Beberapa perubahan data
* Status transaksi
* Fraud alert
* Approval
* Preferensi pengguna

Dengan demikian, sebagian data demo dapat tetap tersedia setelah halaman direfresh.

---

🧪 Demo Account

👑 Administrator

```text
Email    : admin@bankops.id
Password : admin123
```

🧑‍💼 Supervisor

```text
Email    : supervisor@bankops.id
Password : supervisor123
```

🕵️ Fraud Analyst

```text
Email    : fraud@bankops.id
Password : fraud123
```

---

🛠️ Teknologi yang Digunakan

* ⚛️ React
* 🔷 TypeScript
* ⚡ Vite
* 🎨 Tailwind CSS
* 🧭 React Router
* 🐻 Zustand
* 📊 Recharts
* 🎯 Lucide React
* 📗 SheetJS / XLSX
* 💾 LocalStorage
* 🐙 GitHub
* ▲ Vercel

---

🚀 Menjalankan Project

Clone repository:

```bash
git clone https://github.com/khalilurrahmanmahdi12/BankOpss.git
```

Masuk ke folder project:

```bash
cd BankOpss
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

---

🌐 Deployment

Project dideploy menggunakan *Vercel*.

Live application:

```text
https://bank-opss.vercel.app/
```

Setiap update yang dipush ke branch utama GitHub dapat digunakan untuk melakukan deployment ulang secara otomatis melalui Vercel.

---

📂 Struktur Utama Project

```text
src/
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── navigation/
│   ├── transactions/
│   └── ui/
│
├── data/
│
├── layouts/
│
├── pages/
│   ├── admin/
│   ├── supervisor/
│   └── fraud/
│
├── store/
├── types/
├── utils/
├── App.tsx
├── index.css
└── main.tsx
```

---

📌 Status Project

✅ Dashboard Monitoring
✅ Manajemen Nasabah
✅ Manajemen Rekening
✅ Monitoring Transaksi
✅ Detail Transaksi
✅ Fraud Monitoring
✅ Approval Workflow
✅ Laporan Operasional
✅ Export Excel
✅ Audit Log
✅ Sistem Notifikasi
✅ Role-Based Access Control
✅ Protected Route
✅ Halaman 403
✅ Halaman 404
✅ Responsive Design
✅ Skeleton Loading
✅ LocalStorage
✅ Deployment Vercel

---

🔮 Pengembangan Selanjutnya

BankOps masih dapat dikembangkan dengan:

* 🗄️ Backend REST API
* 🐬 MySQL / PostgreSQL
* 🔐 Server-side Authentication
* 📲 OTP / Multi-Factor Authentication
* 👥 Manajemen pengguna
* ⚡ Real-time Transaction Monitoring
* 🏦 Integrasi Core Banking
* 🤖 Fraud Detection Engine
* 📧 Email Notification
* 💬 WhatsApp Notification
* 📄 Export PDF
* 📊 Advanced Analytics Dashboard
* 🔐 Encryption & Security Hardening
* 📝 Centralized Audit Logging
* 🔔 Real-Time Notification

---

🎯 Tujuan Project

Project ini dibuat untuk menunjukkan kemampuan dalam membangun aplikasi dashboard bisnis dengan:

* Modern UI/UX
* Responsive Web Design
* State Management
* Client-side Routing
* Role-Based Access Control
* Data Visualization
* Fraud Monitoring Workflow
* Approval Workflow
* Reporting
* Export Data
* Audit Logging
* Deployment Production

---

⚠️ Catatan

*BankOps merupakan prototype/demo portfolio.*

Seluruh data yang digunakan merupakan **data simulasi**, bukan data nasabah, rekening, maupun transaksi perbankan asli.

Fitur autentikasi, fraud detection, approval, rekening, dan transaksi pada versi saat ini masih menggunakan simulasi frontend dan belum terhubung ke sistem perbankan production.

---

👨‍💻 Developer

*Khalilurrahman Mahdi*

Software Engineer / Full-Stack Developer

🔗 GitHub
[https://github.com/khalilurrahmanmahdi12](https://github.com/khalilurrahmanmahdi12)

---

⭐ Repository

Jika project ini menarik, jangan lupa kasih ⭐ pada repository.

🔗 *BankOps*
[https://github.com/khalilurrahmanmahdi12/BankOpss](https://github.com/khalilurrahmanmahdi12/BankOpss)

