import React, { useEffect, useState } from 'react';
import supabase from '../connector';

const EditMhs = ({onClose, onSubmit, refresh}) => {
  const [editMhs, setEditMhs] = useState(onSubmit)

  function handleChange(data){
    setEditMhs(prev => prev={
      ...prev,[data.target.id] : data.target.value
    })
  }

  function handleSubmit(data) {
    data.preventDefault()
    supabase.from("mahasiswa").update(editMhs).eq("id",editMhs.id).then(res=>{
      onClose()
      refresh()
    })
  }

  useEffect(()=>{
    console.log(editMhs);
    
  }, [editMhs])
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <form className="w-full max-w-sm md:max-w-md bg-white p-6 md:p-8 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 md:mb-8 text-gray-900 drop-shadow-lg" >Edit Mahasiswa</h1>
        <div className="mb-4 md:mb-5">
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Mahasiswa</label>
          <input type="text" id="nama" placeholder="John Lenon" className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" defaultValue={editMhs?.nama} onChange={handleChange}/>
        </div>
        <div className="mb-4 md:mb-5">
          <label htmlFor="nim" className="block text-sm font-medium text-gray-700">NIM</label>
          <input type="text" id="nim" placeholder="12220062" className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" defaultValue={editMhs?.nim} onChange={handleChange} />
        </div>
        <div className="mb-4 md:mb-5">
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
          <input type="text" id="alamat" placeholder="Kp.kelapa RT08 RW20 No 55" className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" defaultValue={editMhs?.alamat} onChange={handleChange}/>
        </div>
        <div className="mb-4 md:mb-5">
          <label htmlFor="telpon" className="block text-sm font-medium text-gray-700">No Telpon</label>
          <input type="text" id="telpon" placeholder="089561221326" className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"defaultValue={editMhs?.telepon} onChange={handleChange} />
        </div>
        <div className="flex justify-between mt-4">
          <button type="submit" className="w-5/12 py-2 md:py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 shadow-lg">
            Submit
          </button>
          <button type="button" className="w-5/12 py-2 md:py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 shadow-lg" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMhs;
