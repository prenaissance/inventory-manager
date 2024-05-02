export const getUserId = () => {
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) {
    return storedUserId;
  }

  const userId = crypto.randomUUID();
  localStorage.setItem("userId", userId);
  return userId;
};
