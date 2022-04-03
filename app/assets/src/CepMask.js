const cepMask = (field) => {
  field.value = field.value.replace(/\D/g, '');
  field.value = field.value.replace(/(\d{5})(\d)/, '$1-$2');
  field.value = field.value.replace(/(-\d{3})\d+?$/, '$1');
  return field.value;
};
