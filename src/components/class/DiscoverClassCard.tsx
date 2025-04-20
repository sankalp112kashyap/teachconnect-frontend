import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip,
  Stack
} from '@mui/material';

interface DiscoverClassCardProps {
  classData: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    subject: string;
    level: string;
    imageUrl?: string;
    rating: number;
    reviewCount: number;
    price: number;
  };
  onViewDetails: (classId: string) => void;
}

const DiscoverClassCard: React.FC<DiscoverClassCardProps> = ({
  classData,
  onViewDetails
}) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {classData.imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={classData.imageUrl}
          alt={classData.title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {classData.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {classData.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Instructor:</strong> {classData.instructor}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip 
            label={classData.subject} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
          <Chip 
            label={classData.level} 
            size="small" 
            color="secondary" 
            variant="outlined"
          />
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            ★ {classData.rating.toFixed(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({classData.reviewCount} reviews)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${classData.price}
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => onViewDetails(classData.id)}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DiscoverClassCard; 