import React, { useEffect, useState } from 'react';
import supabase from '../connector';
import Chance from 'chance';

const Table = ({ refresh, setRefresh }) => {
  const [dataMhs, setDataMhs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  let chance = new Chance();
  
  function generateData(){
    setLoading(true);
    let fakeData = [];
    for(let i = 0; i < 5; i++){
      let nama = chance.name();
      let nim  = chance.integer();
      let alamat = chance.address();
      let telepon = chance.phone(); 
      fakeData.push({
        nama,
        nim,
        alamat,
        telepon
      });
    }
    supabase.from("mahasiswa").insert(fakeData).then(() => {
      setRefresh(prev => !prev);
      setLoading(false);
    });
  }

  function handleDelete(id, nama) {
    let conf = window.confirm(`Yakin anda ingin menghapus data ${nama} ?`);
    if(!conf) return;
    supabase.from("mahasiswa").delete().eq("id", id).then(() => {
      setRefresh(prev => !prev);
    });
  }

  function handleSelectAll(e) {
    let checked = e.target.checked;
    if(checked){
      let allRows = dataMhs.map(val => val.id);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  }

  useEffect(() => {
    supabase.from("mahasiswa").select("*").then(res => {
      setDataMhs(res.data);
    });
  }, [refresh]);
  
  return (
    <div className="w-full overflow-x-auto mt-5">
      <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" onClick={generateData} disabled={loading}>
        Generate Data
      </button>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-blue-500 text-white uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">
              <label htmlFor="all">
                <input type="checkbox" name="" id="all" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" onChange={handleSelectAll} />
              </label>
            </th>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Nama Mahasiswa</th>
            <th className="py-3 px-6 text-left">NIM</th>
            <th className="py-3 px-6 text-left">Alamat</th>
            <th className="py-3 px-6 text-left">Nomor Telpon</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {dataMhs.map((e, index) => (
            <tr key={index} className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}>
              <td className="py-3 px-6 text-left">
                <label htmlFor={e.id}>
                  <input type="checkbox" name="" id={e.id} className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" checked={selectedRows.includes(e.id)}/>
                </label>
              </td>
              <td className="py-3 px-6 text-left">{e.id}</td>
              <td className="py-3 px-6 text-left">{e.nama}</td>
              <td className="py-3 px-6 text-left">{e.nim}</td>
              <td className="py-3 px-6 text-left">{e.alamat}</td>
              <td className="py-3 px-6 text-left">{e.telepon}</td>
              <td className="py-3 px-6 text-left flex gap-1 text-white">
                <button className='p-2 bg-green-500 rounded-lg'>Edit</button>
                <button className='p-1 bg-red-500 rounded-lg' onClick={() => handleDelete(e.id, e.nama)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
