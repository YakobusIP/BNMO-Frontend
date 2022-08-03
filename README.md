# BNMO-Frontend
## Description
Merupakan bagian frontend dari web application BNMO. Frontend menggunakan bahasa pemrograman Javascript dengan framework ReactJS. 

## Daftar Isi
* [Technology Stack](#technology-stack)
* [Requirements](#requirements)
* [Setup](#setup)
* [Pages](#pages)
* [Created By](#created-by)

## Technology Stack
* Bahasa Javascript dengan framework ReactJS
* Framework TailwindCSS yang digunakan untuk styling
* Library Axios untuk melakukan HTTP Requests

## Requirements
- [Node.js](https://nodejs.org/en/download/) **(Rekomendasi versi terbaru)**

## Setup
1. Download file ZIP dari repository ini atau clone repository ke dalam komputer Anda
2. Pastikan Node.js **sudah di-install** dan dapat dijalankan
3. Buka command prompt atau powershell dan pindahkan direktori ke folder tempat repository ini berada
4. Pindahkan direktori ke folder src
```
cd src
```
4. Jalankan command berikut untuk melakukan inisialisasi npm (node package manager)
```
npm install
```
5. Setelah npm telah selesai diinisialisasi, jalankan frontend dengan command
```
npm start
```
6. Apabila *Windows Defender Firewall* muncul, maka tekan `Allow Access` 
7. Bagian frontend telah berhasil dijalankan
8. Untuk menghentikan react-script, tekan `CTRL + C` pada keyboard Anda di command prompt atau powershell

## Pages
Terdapat 11 total page yang ada di dalam web application ini. Semua halaman dapat dilihat pada folder `pages` di dalam folder src.
* **Account Verification**
  
  Halaman ini digunakan oleh admin untuk melakukan verifikasi terhadap akun yang masih berstatus pending. Halaman akan menampilkan maksimal 5 akun pada setiap halaman dan masing - masing akun akan memiliki tombol accept dan reject beserta gambar yang sudah diupload.
* **Customer Data**
  
  Halaman ini digunakan oleh admin untuk melihat semua akun yang pernah melakukan registrasi dan sudah di verifikasi oleh admin. Tidak terdapat pagination pada halaman ini, tetapi user dapat melakukan search berdasarkan nama, username, tanggal registrasi, atau email.
* **Request History**
  
  Halaman ini digunakan oleh customer untuk melihat seluruh request history yang pernah dilakukan. Request yang berstatus pending akan berwarna kuning, status accepted akan berwarna hijau, dan status rejected akan berwarna merah. 
* **Transfer History**

  Halaman ini digunakan oleh customer untuk melihat seluruh transfer history yang pernah dilakukan. Transfer yang berstatus accepted akan berwarna hijau dan status rejected akan berwarna merah. 
* **Home**

  Halaman ini adalah landing page dari web application BNMO.
* **Login**
  
  Halaman ini digunakan ketika customer ingin melakukan login ke dalam akun mereka. Apabila akun belum diverifikasi oleh admin atau akun ditolak oleh admin, maka akan muncul pesan terkait.
* **Profile**
  
  Halaman ini digunakan ketika customer ingin melihat profile akun mereka. Profile ini berisi nama lengkap, email, username, saldo akun, dan gambar KTP. Gambar ini bisa diganti sesuai permintaan customer. Pada halaman profile juga bisa dilakukan logout.
* **Register**
  
  Halaman ini digunakan ketika customer ingin melakukan pembuatan akun. User harus mengisi seluruh form input yang sesuai dan melakukan upload gambar ke server.
* **Request**

  Halaman ini digunakan ketika customer ingin melakukan permintaan penambahan atau pengurangan saldo. Customer dapat memilih mata uang apa yang ingin mereka pakai. Saldo customer tidak akan langsung berubah, diperlukan verifikasi terlebih dahulu oleh admin.
* **Request Verification**

  Halaman ini digunakan oleh admin untuk melakukan verifikasi terhadap request yang masih berstatus pending. Halaman akan menampilkan maksimal 5 request pada setiap halaman dan masing - masing request akan memiliki tombol accept dan reject beserta jumlah saldo yang diminta.
* **Transfer**
  
  Halaman ini digunakan ketika customer ingin melakukan transfer ke akun lain. Customer dapat memilih mata uang apa yang ingin mereka pakai dan akun destinasi transfer. Apabila saldo customer tidak mencukupi, maka akan muncul pesan terkait. Transfer tidak memerlukan verifikasi oleh admin terlebih dahulu.

## Created By
Nama                      | NIM
----                      | ---
Yakobus Iryanto Prasethio | 13520104