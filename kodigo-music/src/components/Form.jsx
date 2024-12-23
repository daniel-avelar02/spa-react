import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: '', email: '' });
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className='container'>
      {submittedData ? (
        <div>
          <h2>Bienvenido, {submittedData.name}!</h2>
          <p>Tu correo electrónico es: {submittedData.email}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default Form;