const { deleteUserAPI, deleteProvinceAPI, deleteCouponAPI, deleteFaqAPI, deleteTaxFilesAPI } = require("../../../helpers/backend_helper");
import { message } from 'antd';


const deleteAction = async (id, role, cb) => {
  let data = null;

  if (role === 'admin') {
    data = await deleteUserAPI(id)
  }

  if(role === 'province') {
    data = await deleteProvinceAPI(id)
  }

  if(role === 'coupon') {
    data = await deleteCouponAPI(id)
  }

  if(role === 'faq') {
    data = await deleteFaqAPI(id)
  }

  if( role === 'accountant_rejection' ) {
    data = await deleteTaxFilesAPI(id)
  }

  // message and callback of setRefresh()
  if (data?.status === true) {
    message.success(data?.message);
    cb(data?.status)
  } else {
    message.warning(data?.message)
  }

}


export default deleteAction;
