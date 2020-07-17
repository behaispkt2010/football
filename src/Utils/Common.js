
export const setCurrentUser = (data) => {
  localStorage.setItem('userData', JSON.stringify(data));
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

