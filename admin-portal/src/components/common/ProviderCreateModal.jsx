import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  MenuItem,
  Typography,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const steps = ['Basic Info', 'Services Offered', 'Verification Docs'];

const categories = ['Plumbing', 'Electrician', 'Cleaning', 'Tutoring', 'Moving', 'Electronics'];

const ProviderCreateModal = ({ open, onClose, onSubmit, isSubmitting }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    location: '',
  });
  const [services, setServices] = useState([{ name: '', price: '' }]);

  const handleNext = () => {
    // Very basic validation blocker
    if (activeStep === 0 && (!formData.name || !formData.category)) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, services });
    // Reset state after slight delay to allow close animation
    setTimeout(() => {
      setActiveStep(0);
      setFormData({ name: '', email: '', phone: '', category: '', location: '' });
      setServices([{ name: '', price: '' }]);
    }, 500);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              label="Business/Provider Name" 
              fullWidth 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField 
                label="Email" 
                type="email"
                fullWidth 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <TextField 
                label="Phone Number" 
                fullWidth 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </Box>
            <TextField 
              select 
              label="Category" 
              fullWidth 
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField 
              label="Location / Area" 
              fullWidth 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Add the primary services this provider offers along with estimated price ranges.
            </Typography>
            {services.map((service, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField 
                  label="Service Name" 
                  fullWidth 
                  size="small"
                  value={service.name}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[index].name = e.target.value;
                    setServices(newServices);
                  }}
                />
                <TextField 
                  label="Price Range (ETB)" 
                  fullWidth 
                  size="small"
                  value={service.price}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[index].price = e.target.value;
                    setServices(newServices);
                  }}
                />
                <IconButton color="error" onClick={() => setServices(services.filter((_, i) => i !== index))}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" onClick={() => setServices([...services, { name: '', price: '' }])}>
              + Add Another Service
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Upload official documents to pre-verify this provider. As an admin, you can bypass this step.
            </Typography>
            <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ py: 4, borderStyle: 'dashed' }}>
              Upload Government ID or Trade License
              <input type="file" hidden multiple />
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: 'background.paper', backgroundImage: 'none', borderRadius: 2 } }}>
      <DialogTitle>Create New Provider</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent()}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} color="inherit" disabled={isSubmitting}>Cancel</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button disabled={activeStep === 0 || isSubmitting} onClick={handleBack} color="inherit">
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Provider'}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProviderCreateModal;
