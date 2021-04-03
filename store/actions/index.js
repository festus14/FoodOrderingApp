// ui actions
export {
  uiStartLoading,
  uiStopLoading,
  userUiStartLoading,
  userUiStopLoading,
  vendorsUiStartLoading,
  vendorsUiStopLoading,
  vendorsMenuUiStartLoading,
  vendorsMenuUiStopLoading,
  cartUiStartLoading,
  cartUiStopLoading,
  ordersUiStartLoading,
  ordersUiStopLoading,
  promosUiStartLoading,
  promosUiStopLoading,
  reInitiateUiStartLoading,
  reInitiateUiStopLoading,
} from './ui';

// auth actions
export {
  logIn,
  signUp,
  authSetToken,
  logout,
  authRemoveAsyncData,
  authStoreAsyncData,
  getAuthToken,
  forgotPassword,
  resendVerifyToken,
  resetPassword,
  changePassword,
  verifyUser,
} from './auth';

// user actions
export {
  setUser,
  getUser,
  getUserId,
  updateUser,
  verifyAccount,
  getAllBanks,
  changeProfilePicture,
  signUpVendor,
  restaurantSignIn,
} from './user';

// vendor actions
export {
  getVendors,
  getVendorMenus,
  getMenus,
  likeVendor,
  addMenu,
  createVendorCategory,
  getVendorCategories,
} from './vendors';

// consumer cart actions
export {
  setCart,
  updateCart,
  deleteCart,
  resetCart,
  getCartSubtotal,
  setCheckoutInfo,
} from './cart';

// consumer orders actions
export {
  setOrders,
  postOrder,
  getOrders,
  cancelOrder,
  reInitiateOrder,
} from './orders';

// order chat actions
export {setOrderChat, getOrderChat, getChats} from './chats';

// promo codes actions
export {getPromoCodes, applyCode, generateCode} from './promos';

// branch actions
export {getBranches, deleteBranch} from './branches';

// reset app
export {resetApp} from './reset';
