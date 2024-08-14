import React, { useState } from 'react';
import supabase from '../connector';
import Table from './Table';
import EditMhs from '../modal/EditMhs';

const Form = () => {
  const [refresh, setRefresh] = useState(false);

  function handleSubmit(e){
    e.preventDefault();

    let nama = e.target.nama.value;
    let nim = e.target.nim.value;
    let alamat = e.target.alamat.value;
    let telepon = e.target.telpon.value;

    // Memasukkan data ke tabel mahasiswa di Supabase
    supabase.from("mahasiswa").insert([
      {
        nama: nama,
        nim: nim,
        alamat: alamat,
        telepon: telepon
      }
    ]).then((result) => {
      alert('Data berhasil disimpan');
      e.target.reset();
      setRefresh(prev => !prev); // Memicu refresh untuk mengambil data terbaru
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-slate-200 to-slate-300 p-4 sm:p-6 md:p-8">
      <form className="w-full max-w-sm md:max-w-md bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 md:mb-8 text-gray-900 drop-shadow-lg">Form Mahasiswa</h1>
        <div className="mb-3 sm:mb-4 md:mb-5">
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Mahasiswa</label>
          <input type="text" id="nama" placeholder="John Lenon" className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <div className="mb-3 sm:mb-4 md:mb-5">
          <label htmlFor="nim" className="block text-sm font-medium text-gray-700">NIM</label>
          <input type="text" id="nim" placeholder="12220062" className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <div className="mb-3 sm:mb-4 md:mb-5">
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
          <input type="text" id="alamat" placeholder="Kp.kelapa RT08 RW20 No 55" className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <div className="mb-3 sm:mb-4 md:mb-5">
          <label htmlFor="telpon" className="block text-sm font-medium text-gray-700">No Telpon</label>
          <input type="text" id="telpon" placeholder="089561221326" className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <button type="submit" className="w-full py-2 sm:py-3 mt-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 shadow-lg">
          Submit
        </button>
      </form>
      <Table refresh={refresh} setRefresh={setRefresh} />
    </main>
  );
};

export default Form;
