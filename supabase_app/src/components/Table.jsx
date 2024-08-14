import React, { useEffect, useState } from 'react';
import supabase from '../connector';
import Chance from 'chance';
import EditMhs from '../modal/EditMhs';
import { FaPencilAlt,
        FaRegTrashAlt,
        FaPlus
} from "react-icons/fa";

const Table = ({ refresh, setRefresh }) => {
  const [dataMhs, setDataMhs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false)
  const [dataEdit, setDataEdit] = useState({})


  function handleOpenEdit(data) {
    setOpenEditModal(true)
    setDataEdit(data)
  }

  function handleCloseEdit() {
    setOpenEditModal(false)
  }
  let chance = new Chance();

  function generateData() {
    alert('Data anda sudah masuk')
    setLoading(true);
    let fakeData = [];
    for (let i = 0; i < 5; i++) {
      let nama = chance.name();
      let nim = chance.integer();
      let alamat = chance.address();
      let telepon = chance.phone();
      fakeData.push({
        nama,
        nim,
        alamat,
        telepon,
      });
    }
    supabase.from('mahasiswa').insert(fakeData).then(() => {
      setRefresh((prev) => !prev);
      setLoading(false);
    });
  }

  function handleDelete(id, nama) {
    let conf = window.confirm(`Yakin anda ingin menghapus data ${nama} ?`);
    if (!conf) return;
    supabase.from('mahasiswa').delete().eq('id', id).then(() => {
      setRefresh((prev) => !prev);
    });
  }

  function handleSelectAll(e) {
    let checked = e.target.checked;
    if (checked) {
      let allRows = dataMhs.map((val) => val.id);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  }

  function handleDeleteAll() {
    let conf = window.confirm('Apakah Anda Yakin Menghapus Semua Data ?');
    if (!conf) return;
    supabase.from('mahasiswa').delete().in('id', selectedRows).then((res) => {
      setRefresh((prev) => !prev);
      setSelectedRows([]);
    });
  }

  function handleMultipleSelect(event) {
    let checked = event.target.checked;
    let id = parseInt(event.target.id);

    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      let filterId = selectedRows.filter((event) => event !== id);
      setSelectedRows(filterId);
    }
  }

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    supabase.from('mahasiswa').select('*').order('id',{ascending : true})
    .then((res) => {
      setDataMhs(res.data);
    });
  }, [refresh]);

  return (
    <div className="w-full overflow-x-auto mt-5">
      <div className="flex flex-row  gap-4">
    <button
       className="flex items-center gap-1 px-6 py-2  font-medium  text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      onClick={generateData}
      disabled={loading}
>
  <FaPlus /> Generate Data
</button>
        {selectedRows.length !== 0 && (
          <button
            className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            onClick={handleDeleteAll}
          >
           {
            selectedRows.length===dataMhs.length ? "Delete All Data" : `Delete ${selectedRows.length} Rows`
           }
          </button>
        )}
      </div>
      {openEditModal && <EditMhs onClose={handleCloseEdit} onSubmit={dataEdit} refresh={()=> setRefresh(prev=>prev=!prev)}/>}
      <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md rounded-lg mt-4">
        <thead className="bg-blue-500 text-white uppercase text-xs sm:text-sm md:text-base leading-normal">
          <tr>
            <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left w-12">
              <label htmlFor="all">
                <input
                  type="checkbox"
                  id="all"
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === dataMhs.length && selectedRows.length !== 0}
                />
              </label>
            </th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">ID</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">Nama Mahasiswa</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">NIM</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">Alamat</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">Nomor Telpon</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-xs sm:text-sm md:text-base font-light">
          {dataMhs.map((e, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}
            >
              <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">
                <label htmlFor={e.id}>
                  <input
                    type="checkbox"
                    id={e.id}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    checked={selectedRows.includes(e.id)}
                    onChange={handleMultipleSelect}
                  />
                </label>
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">{e.id}</td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">{e.nama}</td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">{e.nim}</td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">{e.alamat}</td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left">{e.telepon}</td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-left flex gap-1 text-white">
              <button className="p-1 sm:p-2 bg-green-500 rounded-lg text-xs md:text-sm flex items-center gap-1" 
                    onClick={() => handleOpenEdit(e)}>
                  <FaPencilAlt /> Edit
              </button>

                <button className=" flex items-center gap-1 p-1 sm:p-2 bg-red-500 rounded-lg text-xs md:text-sm" onClick={() => handleDelete(e.id, e.nama)}>
                <FaRegTrashAlt/> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
