export const useGetUserInfo = () => {
    const { name , profilePhoto, userID, isAuth,createdAt } = JSON.parse(localStorage.getItem("auth")) ||  {} ;

    return {name , profilePhoto, userID, isAuth,createdAt};
};