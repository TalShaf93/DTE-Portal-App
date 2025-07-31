import React, { useEffect, useState } from 'react';
import { Table, Button } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../api/users';
import { API_ENDPOINTS } from '../../constants';
import { useAuth } from '../../auth/useAuth';

export default function UsersPage() {
  const { refreshUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'worker',
    station: '',
    full_name: '',
    email: '',
  });

  const loadUsers = async () => {
    try {
      const data = await api.get(API_ENDPOINTS.ADMIN.USERS);
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ username: '', password: '', role: 'worker', station: '', full_name: '', email: '' });
    setOpen(true);
  };

  const openEdit = (u) => {
    setEditing(u.id);
    setForm({ ...u, password: '' });
    setOpen(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await api.put(API_ENDPOINTS.ADMIN.USER(editing), form);
      } else {
        await api.post(API_ENDPOINTS.ADMIN.USERS, form);
      }
      setOpen(false);
      await loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete user?')) return;
    try {
      await api.delete(API_ENDPOINTS.ADMIN.USER(id));
      await loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const impersonate = async (id) => {
    try {
      await api.post(API_ENDPOINTS.ADMIN.IMPERSONATE(id));
      await refreshUser();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-brand-349 text-xl font-semibold">User Management</h2>
        <Button onClick={openNew}>New User</Button>
      </div>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Station</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((u) => (
            <Table.Row key={u.id}>
              <Table.Cell>{u.username}</Table.Cell>
              <Table.Cell className="capitalize">{u.role}</Table.Cell>
              <Table.Cell>{u.station || '-'}</Table.Cell>
              <Table.Cell>{u.email}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  <Button size="1" variant="soft" onClick={() => openEdit(u)}>
                    Edit
                  </Button>
                  <Button size="1" variant="soft" onClick={() => impersonate(u.id)}>
                    Impersonate
                  </Button>
                  <Button size="1" color="red" variant="soft" onClick={() => deleteUser(u.id)}>
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed p-4 bg-white shadow rounded-md top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3 w-80">
            <Dialog.Title className="text-lg font-medium">
              {editing ? 'Edit User' : 'New User'}
            </Dialog.Title>
            <div className="space-y-2">
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              {!editing && (
                <input
                  type="password"
                  className="w-full border rounded px-2 py-1 text-sm"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              )}
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="Full name"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <select
                className="w-full border rounded px-2 py-1 text-sm"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="admin">admin</option>
                <option value="worker">worker</option>
              </select>
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="Station"
                value={form.station || ''}
                onChange={(e) => setForm({ ...form, station: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="soft" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={save}>Save</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
