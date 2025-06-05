import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Stack,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Item } from '../types/Item';
import { api } from '../services/api';

export const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [newItem, setNewItem] = useState<Item>({ 
    name: '', 
    description: '', 
    active: true 
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      const data = await api.getAllItems();
      setItems(data);
    } catch (error) {
      setError('Failed to load items');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSearch = async () => {
    try {
      if (searchTerm.trim()) {
        const data = await api.searchItems(searchTerm);
        setItems(data);
      } else {
        loadItems();
      }
    } catch (error) {
      setError('Failed to search items');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteItem(id);
      setSuccess('Item deleted successfully');
      loadItems();
    } catch (error) {
      setError('Failed to delete item');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editItem?.id) {
        console.log('Updating item:', editItem);
        await api.updateItem(editItem.id, editItem);
        setSuccess('Item updated successfully');
      } else {
        console.log('Creating new item:', newItem);
        const created = await api.createItem(newItem);
        console.log('Created item response:', created);
        setSuccess('Item created successfully');
      }
      setEditItem(null);
      setNewItem({ name: '', description: '', active: true });
      await loadItems();
    } catch (error: any) {
      console.error('Save error:', error);
      setError(error.response?.data?.message || 'Failed to save item');
    }
  };

  return (
    <Box>
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>

      <Stack spacing={3}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Search items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="Name"
                value={editItem?.name || newItem.name}
                onChange={(e) => 
                  editItem 
                    ? setEditItem({ ...editItem, name: e.target.value })
                    : setNewItem({ ...newItem, name: e.target.value })
                }
                size="small"
                required
                sx={{ flexGrow: 1 }}
              />
              <TextField
                label="Description"
                value={editItem?.description || newItem.description}
                onChange={(e) => 
                  editItem
                    ? setEditItem({ ...editItem, description: e.target.value })
                    : setNewItem({ ...newItem, description: e.target.value })
                }
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editItem?.active ?? newItem.active}
                    onChange={(e) =>
                      editItem
                        ? setEditItem({ ...editItem, active: e.target.checked })
                        : setNewItem({ ...newItem, active: e.target.checked })
                    }
                  />
                }
                label="Active"
              />
              <Button type="submit" variant="contained" color="primary">
                {editItem ? 'Update' : 'Create'} Item
              </Button>
              {editItem && (
                <Button
                  onClick={() => setEditItem(null)}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </form>
        </Paper>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.active ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      onClick={() => setEditItem(item)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => item.id && handleDelete(item.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}; 