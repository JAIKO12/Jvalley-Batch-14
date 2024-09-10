import { Button, Form, Input, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import supabase from '../connector';

const ModalFormEdit = ({ isOpen, isCancel, isRefresh, editData }) => {
  const [editmhs, setEditMhs] = useState(editData);

  // triger data edit dari props
  useEffect(() => {
    setEditMhs(editData);
    console.log(editData);
    
  }, [editData]);

  function handleChange(e) {
  const{id, value} = e.target
    setEditMhs( prev => prev={
      ...prev,
      [id]: value,
    });
  }

  function handleSubmit() {
    supabase
      .from('mahasiswa')
      .update(editmhs)
      .eq('id', editmhs.id)
      .then((res) => {
        console.info(res);
        isCancel();
        isRefresh();
        alert('Data berhasil diubah');
      });
  }

  return (
    <Modal open={isOpen} footer={null} onCancel={isCancel}>
      <h1 className="text-center text-2xl font-bold mb-5">Edit Data Mahasiswa</h1>
      <Form
        layout="vertical"
        className="space-y-4"
        initialValues={editmhs}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nama Mahasiswa"
          name="nama"
          rules={[
            {
              required: true,
              message: 'Masukkan Nama anda',
            },
          ]}
        >
          <Input
            id="nama"
            value={editmhs?.nama}
            onChange={handleChange}
            autoComplete="off"
            className="rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
          label="NIM"
          name="nim"
          rules={[
            {
              required: true,
              message: 'Masukkan NIM anda dengan benar',
            },
          ]}
        >
          <Input
            id="nim"
            value={editmhs?.nim}
            onChange={handleChange}
            autoComplete="off"
            className="rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
          label="Alamat"
          name="alamat"
          rules={[
            {
              required: true,
              message: 'Masukkan Alamat anda',
            },
          ]}
        >
          <Input
            id="alamat"
            value={editmhs?.alamat}
            onChange={handleChange}
            autoComplete="off"
            className="rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
          label="Telepon"
          name="telepon"
          rules={[
            {
              required: true,
              message: 'Masukkan Nomor Telepon anda',
            },
          ]}
        >
          <Input
            id="telepon"
            value={editmhs?.telepon}
            onChange={handleChange}
            autoComplete="off"
            className="rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          Ubah Data
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalFormEdit;
