export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};