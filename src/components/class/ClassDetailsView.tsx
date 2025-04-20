import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Button
} from '@mui/material';

interface ClassDetailsViewProps {
  classData: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    schedule: string;
    capacity: number;
    enrolled: number;
    subject: string;
    level: string;
    prerequisites?: string[];
    materials?: string[];
  };
  onEnroll?: () => void;
}

const ClassDetailsView: React.FC<ClassDetailsViewProps> = ({ classData, onEnroll }) => {
  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', my: 2 }}>
      <Typography variant="h4" gutterBottom>
        {classData.title}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            About this Class
          </Typography>
          <Typography paragraph>
            {classData.description}
          </Typography>
          
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" gutterBottom>
              Class Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Instructor" 
                  secondary={classData.instructor}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Schedule" 
                  secondary={classData.schedule}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Subject" 
                  secondary={classData.subject}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Level" 
                  secondary={classData.level}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Enrollment" 
                  secondary={`${classData.enrolled}/${classData.capacity} students`}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
            <Typography variant="h6" gutterBottom>
              Enrollment Status
            </Typography>
            <Typography variant="body1" paragraph>
              {classData.enrolled >= classData.capacity 
                ? 'Class is full' 
                : `${classData.capacity - classData.enrolled} spots remaining`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onEnroll}
              disabled={classData.enrolled >= classData.capacity}
            >
              {classData.enrolled >= classData.capacity ? 'Class Full' : 'Enroll Now'}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {classData.prerequisites && classData.prerequisites.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Prerequisites
          </Typography>
          <List>
            {classData.prerequisites.map((prereq, index) => (
              <ListItem key={index}>
                <ListItemText primary={prereq} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {classData.materials && classData.materials.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Required Materials
          </Typography>
          <List>
            {classData.materials.map((material, index) => (
              <ListItem key={index}>
                <ListItemText primary={material} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default ClassDetailsView; 