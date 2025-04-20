import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface ClassCardProps {
  title: string;
  description: string;
  instructor: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  onEnroll?: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  description,
  instructor,
  schedule,
  capacity,
  enrolled,
  onEnroll
}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            <strong>Instructor:</strong> {instructor}
          </Typography>
          <Typography variant="body2">
            <strong>Schedule:</strong> {schedule}
          </Typography>
          <Typography variant="body2">
            <strong>Enrollment:</strong> {enrolled}/{capacity}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onEnroll}
          disabled={enrolled >= capacity}
        >
          {enrolled >= capacity ? 'Class Full' : 'Enroll Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClassCard; 