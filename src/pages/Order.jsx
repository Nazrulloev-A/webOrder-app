import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  Container, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button, 
  Box 
} from '@mui/material';
import { supabase } from '../supabaseClient';

const Order = () => {
  const initialValues = {
    product: 'MyMoney',
    quantity: 0,
    pricePerUnit: 100,
    discount: 0,
    total: 0,
    customerName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    card: 'Visa',
    cardNumber: '',
    expireDate: ''
  };

  const validationSchema = Yup.object({
    product: Yup.string().required('Product is required'),
    quantity: Yup.number().min(0).required('Quantity is required'),
    pricePerUnit: Yup.number().min(0).required('Price per unit is required'),
    discount: Yup.number().min(0).max(100).required('Discount is required'),
    total: Yup.number().min(0),
    customerName: Yup.string().required('Customer name is required'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string(),
    zip: Yup.string().required('Zip is required'),
    card: Yup.string().required('Card type is required'),
    cardNumber: Yup.string()
      .matches(/^[0-9]{16}$/, 'Card number must be exactly 16 digits')
      .required('Card number is required'),
    expireDate: Yup.string()
      .matches(/^[0-1][0-9]\/[0-9]{2}$/, 'Expire date must be in MM/YY format')
      .required('Expire date is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Calculate total before saving
      const subtotal = values.quantity * values.pricePerUnit;
      const discountAmount = (subtotal * values.discount) / 100;
      const total = subtotal - discountAmount;

      // Prepare data for Supabase
      const orderData = {
        product: values.product,
        quantity: values.quantity,
        price_per_unit: values.pricePerUnit,
        discount: values.discount,
        total: total,
        customer_name: values.customerName,
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
        card_type: values.card,
        card_number: values.cardNumber,
        expire_date: values.expireDate
      };

      // POST (Insert) to Supabase
      const { data, error } = await supabase.from('orders').insert([orderData]);

      if (error) throw error;

      console.log('Order saved successfully:', data);
      alert('Order processed successfully!');
      resetForm();
    } catch (error) {
      console.error('Error saving order:', error.message);
      alert('Error processing order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{
      padding: { xs: '8px', sm: '24px' },
      marginTop: { xs: '8px', sm: '32px' },
    }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Product Information */}
            <Box>
              <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
                Product Information
              </Typography>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Product: *</InputLabel>
                <Select
                  name="product"
                  value={values.product}
                  onChange={(e) => setFieldValue('product', e.target.value)}
                  label="Product: *"
                >
                  <MenuItem value="MyMoney">MyMoney</MenuItem>
                  <MenuItem value="FamilyAlbum">FamilyAlbum</MenuItem>
                  <MenuItem value="ScreenSaver">ScreenSaver</MenuItem>
                </Select>
                <ErrorMessage name="product" component="div" style={{ color: 'red' }} />
              </FormControl>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="quantity"
                label="Quantity: *"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
              <ErrorMessage name="quantity" component="div" style={{ color: 'red' }} />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="pricePerUnit"
                label="Price per unit:"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              />
              <ErrorMessage name="pricePerUnit" component="div" style={{ color: 'red' }} />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="discount"
                label="Discount:"
                type="number"
                InputProps={{
                  inputProps: { min: 0, max: 100 },
                  endAdornment: '%'
                }}
              />
              <ErrorMessage name="discount" component="div" style={{ color: 'red' }} />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="total"
                label="Total:"
                type="number"
                InputProps={{ readOnly: true, inputProps: { min: 0 } }}
              />
              <ErrorMessage name="total" component="div" style={{ color: 'red' }} />
              <Button 
                variant="contained" 
                color="info" 
                onClick={() => {
                  const subtotal = values.quantity * values.pricePerUnit;
                  const discountAmount = (subtotal * values.discount) / 100;
                  const total = subtotal - discountAmount;
                  setFieldValue('total', total >= 0 ? total : 0);
                }}
                sx={{ mt: 2, backgroundColor: '#A9A9A9', '&:hover': { backgroundColor: '#808080' } }}
              >
                Calculate
              </Button>
            </Box>

            {/* Address Information */}
            <Box>
              <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
                Address Information
              </Typography>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="customerName"
                label="Customer name: *"
                required
              />
              <ErrorMessage name="customerName" component="div" style={{ color: 'red' }} />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="street"
                label="Street: *"
                required
              />
              <ErrorMessage name="street" component="div" style={{ color: 'red' }} />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="city"
                label="City: *"
                required
              />
              <ErrorMessage name="city" component="div" style={{ color: 'red' }} />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="state"
                label="State:"
              />
              <ErrorMessage name="state" component="div" style={{ color: 'red' }} />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="zip"
                label="Zip: *"
                required
              />
              <ErrorMessage name="zip" component="div" style={{ color: 'red' }} />
            </Box>

            {/* Payment Information */}
            <Box>
              <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
                Payment Information
              </Typography>
              <FormControl component="fieldset" margin="normal">
                <Typography>Card: *</Typography>
                <RadioGroup
                  row
                  name="card"
                  value={values.card}
                  onChange={(e) => setFieldValue('card', e.target.value)}
                >
                  <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
                  <FormControlLabel value="MasterCard" control={<Radio />} label="MasterCard" />
                  <FormControlLabel value="American Express" control={<Radio />} label="American Express" />
                </RadioGroup>
                <ErrorMessage name="card" component="div" style={{ color: 'red' }} />
              </FormControl>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="cardNumber"
                label="Card Nr: *"
                required
                InputProps={{ inputProps: { pattern: '[0-9]{16}' } }} // Ensure only numbers
              />
              <ErrorMessage name="cardNumber" component="div" style={{ color: 'red' }} />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="expireDate"
                label="Expire date (mm/yy): *"
                required
                placeholder="MM/YY"
              />
              <ErrorMessage name="expireDate" component="div" style={{ color: 'red' }} />
            </Box>

            {/* Process and Reset Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
              <Button 
                variant="contained" 
                type="submit"
                color="error" 
                disabled={isSubmitting}
                sx={{ backgroundColor: '#FF4500', '&:hover': { backgroundColor: '#FF6347' } }}
              >
                Process
              </Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  handleReset();
                  setFieldValue('total', 0); // Reset total as well
                }}
                color="info" 
                sx={{ backgroundColor: '#A9A9A9', '&:hover': { backgroundColor: '#808080' } }}
              >
                Reset
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Order;