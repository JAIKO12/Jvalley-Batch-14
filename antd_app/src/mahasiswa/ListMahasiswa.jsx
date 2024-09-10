import { Button, Modal, Popconfirm, Table, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import supabase from '../connector';
import ModalForm from '../components/ModalForm';
import Chance from 'chance';
import ModalFormEdit from '../components/ModalFromEdit';
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { useQuery } from '@tanstack/react-query';
import { Alert, Flex, Spin } from 'antd';

const ListMahasiswa = () => {
  // State Management
  const [dataMhs, setDataMhs] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalFormOpen, setIsModalForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const chance = new Chance();
  const { confirm } = Modal;

  // Function: Data Manipulation
  const genFakeData = () => {
    confirm({
      title: 'Apakah anda yakin ingin menambahkan fake data?',
      onOk() {
        const fakeData = [];
        for (let i = 0; i <= 5; i++) {
          const nama = chance.name();
          const nim = chance.integer();
          const telepon = chance.phone();
          const alamat = chance.address();
          fakeData.push({ nama, nim, telepon, alamat });
        }

        supabase.from('mahasiswa').insert(fakeData).then((res) => {
          console.log(res);
        refetch() 
          alert('Anda berhasil menambahkan 5 data random');
        });
      },
    });
  };

  const handleSingleDelete = (id) => {
    supabase.from('mahasiswa').delete().eq('id', id).then((res) => {
      alert('Data berhasil dihapus');
      refetch()
    });
  };

  const handleMultipleDelete = () => {
    confirm({
      title: `Apakah anda ingin menghapus ${selectedRowKeys.length} data?`,
      onOk() {
        supabase.from('mahasiswa').delete().in('id', selectedRowKeys).then((res) => {
          console.log(res);
          alert(`Anda berhasil menghapus ${selectedRowKeys.length} data`);
          refetch()
          setSelectedRowKeys([]);
        });
      },
    });
  };

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // Function: Modal Management
  const handleOpenEdit = (data) => {
    setIsModalEdit(true);
    setDataEdit(data);
  };

  const cancelModal = () => setIsModalForm(false);
  const showModal = () => setIsModalForm(true);
  const cancelModalEdit = () => setIsModalEdit(false);

  // Function: Search Filter
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = dataMhs.filter((item) =>
    item.nama.toLowerCase().includes(searchText.toLowerCase())
  );

  // Effect: Data Fetching
  // useEffect(() => {
    // supabase.from('mahasiswa').select('*').then((res) => {
    //   const sortedData = res.data.sort((a, b) => a.id - b.id);
    //   setDataMhs(sortedData);
    // });
  // }, [refresh]);


  const {data,isError,isLoading,refetch} = useQuery({
    queryKey: ['mahasiswa'],
    queryFn: async () => {
     try {
      const respone = await supabase.from('mahasiswa').select('*').order('id', { ascending: false })
      console.log(respone.data);
      return respone.data
     
      
      // .then((res) => 
      //   {
      //   const sortedData = res.data.sort((a, b) => a.id - b.id)
      //   setDataMhs(sortedData);
        
      // })
     } catch (error) {
      console.error(error);
     }
    }
  })  

  // Table Column Definitions
  const columns = [
    { title: 'Id', dataIndex: 'id' },
    { title: 'Nama Mahasiswa', dataIndex: 'nama' },
    { title: 'NIM', dataIndex: 'nim' },
    { title: 'Alamat', dataIndex: 'alamat' },
    { title: 'Telepon', dataIndex: 'telepon' },
    {
      title: 'Action',
      render: (text, record) => (
        <div className="flex justify-center flex-row items-center gap-3">
          <Popconfirm
            title={`Apakah data ${record.nama} ingin dihapus?`}
            okText="Delete"
            onConfirm={() => handleSingleDelete(record.id)}
            cancelText="Cancel"
          >
            <Button type="primary" danger>
              <FaRegTrashAlt/> Delete
            </Button>
          </Popconfirm>
          <Popconfirm
            title={`Apakah data ${record.nama} ingin Di Edit?`}
            okText="Edit"
            onConfirm={() => handleOpenEdit(record)}
            cancelText="Cancel"
          >
            <Button type="primary" style={{ backgroundColor: "#2b8a3e", borderColor: "#2b8a3e" }}>
              <AiOutlineEdit/> Edit
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Row Selection Config
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      {isModalFormOpen && (
        <ModalForm isOpen={isModalFormOpen} isCancel={cancelModal} isRefresh={refetch} />
      )}

      {isModalEdit && (
        <ModalFormEdit isOpen={isModalEdit} editData={dataEdit} isCancel={cancelModalEdit} isRefresh={refetch} />
      )}

      {/* Area tombol dan input pencarian */}
      <div className="flex gap-4 mb-5 mt-5 justify-between items-center">
        <div className="flex gap-4">
          <Button type="primary" onClick={showModal} style={{ backgroundColor: "#4caf50", borderColor: "#4caf50" }}>
            <IoMdAdd /> Tambah Data
          </Button>
          <Button type="primary" onClick={genFakeData} style={{ backgroundColor: "#03a9f4", borderColor: "#03a9f4" }}>
            Tambah Fake Data
          </Button>
          <Button type="primary" danger onClick={handleMultipleDelete} disabled={selectedRowKeys.length === 0}>
            <FaRegTrashAlt/> Hapus {selectedRowKeys.length} data
          </Button>
        </div>
        <Input
          prefix={<AiOutlineSearch />}
          placeholder="Cari berdasarkan nama"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      {/* Tabel Data Mahasiswa */}
      <Table columns={columns} rowSelection={rowSelection} dataSource={data} rowKey="id" />
    </div>
  );
};

export default ListMahasiswa;
