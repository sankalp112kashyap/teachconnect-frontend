import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid
} from '@mui/material';

interface ClassCreateFormProps {
  onSubmit: (classData: {
    title: string;
    description: string;
    schedule: string;
    capacity: number;
    subject: string;
    level: string;
  }) => void;
}

const ClassCreateForm: React.FC<ClassCreateFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    schedule: '',
    capacity: '',
    subject: '',
    level: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      capacity: Number(formData.capacity)
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Class
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Class Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="number"
            label="Capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Subject</InputLabel>
            <Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              label="Subject"
            >
              <MenuItem value="mathematics">Mathematics</MenuItem>
              <MenuItem value="science">Science</MenuItem>
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="history">History</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Level</InputLabel>
            <Select
              name="level"
              value={formData.level}
              onChange={handleChange}
              label="Level"
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Create Class
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassCreateForm; 