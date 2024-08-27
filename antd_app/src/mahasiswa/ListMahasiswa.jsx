  import { Button, Table } from 'antd'
  import React, { useEffect, useState } from 'react'
  import supabase from '../connector'
  import ModalForm from '../components/ModalForm'

  const ListMahasiswa = () => {
      
      const [dataMhs, setDataMhs] = useState([])
      const [selectedRowKeys, setSelectedRowKeys] = useState([]) //
      const [isModalFromOpen, setIsModalFromOpen] = useState(false)
      const column = [
          {
              title: 'Id',
              dataIndex: 'id',
            },
            {
              title: 'Nama Mahasiswa',
              dataIndex: 'nama',
            },
            {
              title: 'NIM',
              dataIndex: 'nim',
            },
            {
              title: "Alamat",
              dataIndex: 'alamat'
            },
            {
              title: "Telepon",
              dataIndex: "telepon"
            }
      ]

      useEffect(()=>{
          supabase.from("mahasiswa").select("*")
          .then(res=>{
            const sortedData = res.data.sort((a, b) => a.id - b.id)
            setDataMhs(sortedData)
              
          })
      },[])

      const rowSelection = {
        selectedRowKeys,
        onChange:(newSelectedRow) => {
          setSelectedRowKeys(newSelectedRow)
        }
      }

      //variable untuk  memunculkan dan menghilangkan modal 
      const cancelModal = ()=>{setIsModalFromOpen(false)}
      const showModal = ()=>{setIsModalFromOpen(true)}

    return (
      <div className='max-h-[80vh] overflow-y-auto'>
        {
          isModalFromOpen&&(
            <ModalForm isOpen={isModalFromOpen} isCancel={cancelModal}/>
          )
        }

        <Button type='primary' onClick={showModal}>
          Tambah Data
        </Button>
          <Table 
          columns={column}
          rowSelection={rowSelection}
          dataSource={dataMhs}
          rowKey="id"
          
          />
      </div>
    )
  }

  export default ListMahasiswa
 