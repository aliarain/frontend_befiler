import { get, post, put, del } from './api_helpers'


// user API's
export const createUserAccount = data => post('/user/signup', data);
export const userAccountLogin = data => post('/user/login', data);
export const directLoginAPI = data => post('/user/directLogin', data);
export const verifyOTPAPI = data => post("/user/verifyOTP", data)
export const verifyUserAPI = data => get('/user/verify', data);
export const getAllUsersData = data => get('/user/get-all', data);
export const getAllAccountant = data => get('/user/getAllAccountant', data);
export const getTotalCount = data => get('/user/get-total-count', data);

export const getOneUserData = data => get('/user/get-one', data);
export const editUserAPI = (data, queryValue) => put('/user/edit', data, queryValue);

export const deleteUserAPI = data => del('/user/delete', data); // delUser
export const getRoleManagementAPI = data => get('/user/filter_role', data);
export const updateManyActionAPI = (data, queryValue) => put('/user/update-many', data, queryValue);

export const getUsersDataByRole = data => get('/user/get-all-by-role', data);
export const getAdminUserLoginModeData = data => get('/user/admin-login-mode', data);
export const userProfilePasswordChangeAPI = data => post('/user/passwordChange', data);
export const passwordChangeByAdminAPI = data => post('/user/passwordChangeByAdmin', data);
export const userPasswordResetEmailAPI = data => post('/user/sendUserPasswordResetEmail', data);
export const userPasswordResetAPI = data => post('/user/passwordReset', data);

export const emailSendToUserAPI = data => post('/contacts/create', data);
export const emailSendToSpecificUserAPI = data => post('/user/send-email-to-user', data);

// coupon code
export const couponCreateAPI = data => post('/coupon_code/create', data);
export const getAllCouponAPI = data => get('/coupon_code/get-all', data);
export const getOneCouponAPI = data => get('/coupon_code/get-one', data);
export const deleteCouponAPI = data => del('/coupon_code/delete', data);
export const CouponCodeUpdateAPI = (data, queryValue) => put('/coupon_code/update', data, queryValue);

export const postTransferFileBetweenAccountant = data => post('/taxfiles/transfer-between-accountant', data);

// Province
export const provinceCreateAPI = data => post('/province/create', data);
export const getAllProvinceAPI = data => get('/province/get-all', data);
export const getAllByUserRoleProvinceAPI = data => get('/province/get-all-according-to-user-role', data);
export const getOneProvinceAPI = data => get('/province/get-one', data);
export const deleteProvinceAPI = data => del('/province/delete', data);
export const updateProvinceAPI = (data, queryValue) => put('/province/update', data, queryValue);

// student form fields api
export const formFieldCreateAPI = data => post('/student_form_fields/create', data);
export const getAllFormFieldAPI = data => get('/student_form_fields/get-all', data);
export const getAllFielteredFormFieldAPI = data => get('/student_form_fields/get-all-fieltered-data', data);
export const getOneFormFieldAPI = data => get('/student_form_fields/get-one', data);
export const deleteFormFieldAPI = data => del('/student_form_fields/delete', data);
export const updateFormFieldAPI = (data, queryValue) => put('/student_form_fields/update', data, queryValue);

// role and permission
export const rolesCreateAPI = data => post('/roles/create', data);
export const getAllRolesAPI = data => get('/roles/get-all', data);
export const getOneRoleAPI = data => get('/roles/get-one', data);
export const getNumberOfFilteredRoleAPI = data => get('/roles/filter_role', data);
export const deleteRoleAPI = data => del('/roles/delete', data);
export const updateRoleAPI = (data, queryValue) => put('/roles/update', data, queryValue);

// faqs api
export const faqCreateAPI = data => post('/faqs/create', data);
export const getAllFaqAPI = data => get('/faqs/get-all', data);
export const getOneFaqAPI = data => get('/faqs/get-one', data);
export const deleteFaqAPI = data => del('/faqs/delete', data);
export const updateFaqAPI = (data, queryValue) => put('/faqs/update', data, queryValue);

// permissions api
export const permissionCreateAPI = data => post('/permissions/create', data);
export const getAllPermissionAPI = data => get('/permissions/get-all', data);
export const getOnePermissionAPI = data => get('/permissions/get-one', data);
export const deletePermissionAPI = data => del('/permissions/delete', data);
export const updatePermissionAPI = (data, queryValue) => put('/permissions/update', data, queryValue);

// tax-pricing
export const getAllTaxPricingAPI = data => get('/taxfile_price', data);
export const getAllTaxPricingFrontendAPI = data => get('/taxfile_price/get-all', data);
export const createTaxPricingAPI = data => post('/taxfile_price/create', data);
export const getOneTaxPricingAPI = data => get('/taxfile_price/get-one', data);
export const getSpecificTaxPricingAPI = data => get('/taxfile_price/specific_tax_price', data);
export const updateTaxPricingAPI = (data, queryValue) => put('/taxfile_price/update', data, queryValue);

// student tax file
export const createTaxFile = data => post('/taxfiles/create', data);
export const updateTaxFile = (data, queryValue) => put('/taxfiles/update', data, queryValue);
export const getAllTaxFilesAPI = data => get('/taxfiles/get-all', data);
export const fetchTaxFiles = data => get('/taxfiles', data);
export const fetchTaxFile = data => get('/taxfiles/file-data', data);
export const fetchTaxFileList = data => post('/taxfiles/list-for-excel', data);
export const getAllTaxFilesUserwiseAPI = data => get('/taxfiles/get-all-by-userwise', data);
export const fetchAccountantDashboardData = data => get('/taxfiles/accountant-dashboard', data);
export const getOneTaxFilesAPI = data => get('/taxfiles/get-one', data);
export const fetchTaxFileDetails = data => get('/taxfiles/details', data);
export const getSearchTaxFilesAPI = data => post('/taxfiles/get-search-values', data);
export const deleteTaxFilesAPI = data => del('/taxfiles/delete', data);
export const updateManyTaxFile = data => post('/taxfiles/update-many', data);


export const updateReviewAPI = (data, queryValue) => put('/taxfiles/update-review', data, queryValue);
export const getAllCompleteFileAPI = data => get('/taxfiles/complete-file-from-ac', data);


// make stripe payment
export const makePaymentStripeAPI = data => post('/payment/checkout', data);

// paypal-pay paypal
export const paypalPaymentStatus = data => post('/payment/paypal-verify', data);

// mollie payment
export const molliePayment = data => post('/payment/mollie-payment', data);

// payment verification
export const paymentVerification = data => get('/payment/payment-verification', data);

// environment data
export const environmentVariablesInfo = data => get('/env_variables/get-one', data);
export const environmentPubliclyAccessible = data => get('/env_variables/public', data);
export const createEnvironmentInfo = data => post('/env_variables/create', data);
export const updateEnvironmentInfo = (data, queryValue) => put('/env_variables/update', data, queryValue);
export const createEnvFile = data => post('/', data);

// feedbacks
export const createFeedback = data => post('/feedbacks/create', data);
export const getAllFeedbackAPI = data => get('/feedbacks/get-all', data);
export const getUserFeedbackAPI = data => get('/feedbacks/get-user-feedback', data);
export const deleteFeedbackAPI = data => del('/feedbacks/delete', data);

// Front Page
export const frontPageCreateAPI = data => post('/frontPage/create', data);
export const getAllFrontPageAPI = data => get('/frontPage/get-all', data);
export const getOneFrontPageAPI = data => get('/frontPage/get-one', data);
export const deleteFrontPageAPI = data => del('/frontPage/delete', data);
export const updateFrontPageAPI = (data, queryValue) => put('/frontPage/update', data, queryValue);

// Customer Query Page
export const CustomerQueryAPI = data => post('/contacts/create', data);
export const getAllCustomerQueryAPI = data => get('/contacts/get-all', data);
export const getOneCustomerQueryAPI = data => get('/contacts/get-one', data);
export const deleteCustomerQueryAPI = data => del('/contacts/delete', data);
export const updateCustomerQueryAPI = (data, queryValue) => put('/contacts/update', data, queryValue);

// AWS file handling api
export const AWSFileUploadAPI = data => post('/files/upload-aws', data);
export const postFileToAws = data => post('/files/aws', data);
export const fileUploadAC = data => post('/taxfiles/upload', data);

// site setting information
export const getSiteSettingInformationAPI = data => get('/site_settings/get-one', data);
export const postSetting = data => post('/site_settings/edit', data);
export const createSiteSettingInformationAPI = data => post('/site_settings/create', data);
export const updateSiteSettingInformationAPI = (data, queryValue) => put('/site_settings/update', data, queryValue);
export const deleteSiteSettingInformationAPI = data => del('/site_settings/delete', data);

// site about and content
export const getSiteContentAboutAPI = data => get('/site_contents_about/get-one', data);
export const createSiteContentAboutAPI = data => post('/site_contents_about/create', data);
export const updateSiteContentAboutAPI = (data, queryValue) => put('/site_contents_about/update', data, queryValue);
export const updateArrayContentAboutAPI = (data, queryValue) => put('/site_contents_about/update-array', data, queryValue);
export const updateDeleteArrayContentAboutAPI = (data, queryValue) => put('/site_contents_about/update-delete-content-about', data, queryValue);
export const deleteSiteContentAboutAPI = data => del('/site_contents_about/delete', data);

// site home blog Services
export const getSiteHomeServiceBlogsAPI = data => get('/site_service_blogs/get-one', data);
export const getSiteHomeAPI = data => get('/frontPage/home', data);
export const createSiteHomeServiceBlogsAPI = data => post('/site_service_blogs/create', data);
export const updateSiteHomeServiceBlogsAPI = (data, queryValue) => put('/site_service_blogs/update', data, queryValue);
export const updateArrayHomeServiceBlogsAPI = (data, queryValue) => put('/site_service_blogs/update-array', data, queryValue);
export const deleteSiteHomeServiceBlogsAPI = data => del('/site_service_blogs/delete', data);
export const deleteFromArrayHomeServiceBlogsAPI = data => del('/site_service_blogs/delete-from-array', data);

// User role manage user_roles
export const createNewUserRoleManageAPI = data => post('/user_roles/create', data);
export const getNewUserRoleManageAPI = data => get('/user_roles/get-one', data);
export const getAllNewUserRoleManageAPI = data => get('/user_roles/get-all', data);
export const getAllUserRoleExceptAdminAPI = data => get('/user_roles/get-all-except-admin', data);
export const updateNewUserRoleManageAPI = (data, queryValue) => put('/user_roles/update', data, queryValue);
export const deleteNewUserRoleManageAPI = data => del('/user_roles/delete', data);
export const getSpecificUserRoleAPI = data => get('/user_roles/get-one-user-role', data);
export const couponSetToUserRole = (data, queryValue) => put('/user_roles/coupon-assign', data, queryValue);


// user form controllers
export const createUserFormControllerAPI = data => post('/user_form_controller/create', data);
export const getUserFormControllerAPI = data => get('/user_form_controller/get-one', data);
export const getAllUserFormControllerAPI = data => get('/user_form_controller/get-all', data);
export const updateUserFormControllerAPI = (data, queryValue) => put('/user_form_controller/update', data, queryValue);
export const deleteUserFormControllerAPI = data => del('/user_form_controller/delete', data);
export const getSpecificUserRoleFormDataAPI = data => get('/user_form_controller/get-specific-role-data', data);


// pdf-excel data api
export const pdfExcelCreateAPI = data => post('/pdf_excel_data/create', data);
export const getAllPdfExcelAPI = data => get('/pdf_excel_data/get-all', data);
export const getOnePdfExcelAPI = data => get('/pdf_excel_data/get-one', data);
export const deletePdfExcelAPI = data => del('/pdf_excel_data/delete', data);
export const updatePdfExcelAPI = (data, queryValue) => put('/pdf_excel_data/update', data, queryValue);


export const feedBackCreateAPI = data => post('/feedbacks/create', data);
export const getAllfeedBackAPI = data => get('/feedbacks/get-all', data);
export const getOnefeedBackAPI = data => get('/feedbacks/get-one', data);
export const deletefeedBackAPI = data => del('/feedbacks/delete', data);
export const updatefeedBackAPI = (data, queryValue) => put('/feedbacks/update', data, queryValue);


//site setting
export const siteSettingCreateAPI = data => post('/site_settings/create', data);
export const getAllSiteSettingAPI = data => get('/site_settings/get-all', data);
export const getOneSiteSettingAPI = data => get('/site_settings/get-one', data);
export const deleteSiteSettingAPI = data => del('/site_settings/delete', data);
export const updateSiteSettingAPI = (data, queryValue) => put('/site_settings/update', data, queryValue);

//site about content setting
export const aboutContentCreateAPI = data => post('/site_contents_about/create', data);
export const getAllAboutContentAPI = data => get('/site_contents_about/get-all', data);
export const getOneAboutContentAPI = data => get('/site_contents_about/get-one', data);
export const deleteAboutContentAPI = data => del('/site_contents_about/delete', data);
export const updateAboutContentAPI = (data, queryValue) => put('/site_contents_about/update', data, queryValue);

// Tax situation
export const createTaxSituationAPI = data => post('/tax_situation/create', data);
export const getOneTaxSituationAPI = data => get('/tax_situation/get-one', data);
export const getAllTaxSituationAPI = data => get('/tax_situation/get-all', data);
export const updateTaxSituationAPI = (data, queryValue) => put('/tax_situation/update', data, queryValue);
export const deleteTaxSituationAPI = data => del('/tax_situation/delete', data);
export const deleteTaxSituationFromArrayAPI = (data, queryValue) => put('/tax_situation/delete-from-array', data, queryValue);


// payment methods
export const createPaymentMethodOptionAPI = data => post('/payment_method_option/create', data);
export const getAllPaymentMethodOptionAPI = data => get('/payment_method_option/get-all', data);
export const updatePaymentMethodOptionAPI = (data, queryValue) => put('/payment_method_option/update', data, queryValue);

// /user/payment/list
export const getAllPaymentHistoriesAPI = data => get('/user/payment/list', data);

// hrm
export const delUser = data => del('/user', data)
export const postEmployee = data => post('/user/employee-create', data);
export const fetchEmployee = data => get('/user/employee-list', data);
export const fetchEmployeeDepartment = data => get('/user/employee/roles', data);

// attendance
export const postAttendance = data => post('/attendance', data);
export const fetchAttendance = data => get('/attendance', data);
export const fetchAttendancePunch = data => get('/attendance/employee-punch', data);
export const fetchPunchInOut = data => get('/attendance/punch-in-out', data);
export const delAttendance = data => del('/attendance', data);
export const postAttendanceSettings = data => post('/attendance/setting', data);
export const fetchAttendanceSettings = data => get('/attendance/setting', data);
export const delAttendanceSettings = data => del('/attendance/setting', data);

// time sheet
export const postTimeSheet = data => post('/timeSheet', data);
export const fetchTimeSheet = data => get('/timeSheet', data);
export const delTimeSheet = data => del('/timeSheet', data);

// holiday
export const postHoliday = data => post('/holiday', data);
export const fetchHoliday = data => get('/holiday', data);
export const delHoliday = data => del('/holiday', data);

// leave
export const postLeaveSetting = data => post('/leave-setting', data);
export const fetchLeaveSetting = data => get('/leave-setting', data);
export const delLeaveSetting = data => del('/leave-setting', data);
export const postLeave = data => post('/leave', data);
export const fetchLeave = data => get('/leave', data);
export const delLeave = data => del('/leave', data);

// department
export const postDepartment = data => post('/department', data);
export const fetchDepartmentList = data => get('/department/list', data);
export const fetchDepartmentShortList = data => get('/department/elements', data);
export const fetchDepartment = data => get('/department', data);
export const delDepartment = data => del('/department', data);

// roles
export const fetchRoles = data => get('/role/list', data);
export const fetchDepartmentOrCategoryWise = data => get('/role/department-wise-list', data);
export const fetchRole = data => get('/role', data);
export const postRole = data => post('/role', data);
export const delRole = data => del('/role', data);

// role permissions api
export const postPermissions = data => post('/role/permissions', data);
export const fetchPermissions = data => get('/role/permissions', data);

// Payroll
export const postPayrollSalarySetting = data => post('/payroll/salary-setting', data);
export const fetchPayrollSalarySettings = data => get('/payroll/salary-setting', data);
export const fetchSalaries = data => get('/payroll/salary-list', data);
export const fetchSalary = data => post('/payroll/salary', data);
export const delSalary = data => del('/payroll/salary', data);
export const fetchSalaryElements = data => get('/payroll/salary-elements', data);
export const delPayrollSalarySetting = data => del('/payroll/salary-setting', data);

export const postPayrollAdvanceSalary = data => post('/payroll/advance-salary', data);
export const fetchPayrollAdvanceSalaries = data => get('/payroll/advance-salary', data);
export const delPayrollAdvanceSalary = data => del('/payroll/advance-salary', data);

// salary-sheet
export const fetchSalarySheet = data => get('/salary', data)
export const postSalaryGenerate = data => post('/salary-generate', data)
export const postSalarySheet = data => post('/salary', data)
export const delSalarySheet = data => del('/salary', data)

export const postPaySalary = data => post('/pay-salary', data)
export const fetchPaySalaryElements = data => get('/pay-salary-elements', data)
export const fetchPayslip = data => get('/payslip', data)

export const department = data => get('/user/department/elements', data)
export const DepartmentEmployees = data => get('/user/filtering-employees', data)


//ticket
export const postTicket = data => post('/ticket/', data)
export const featchTickets = data => get('/ticket/', data)
export const featchTicketsByUser = data => get('/ticket/by-user', data)
export const deltTicketSettings = data => del('/ticket/settings', data)
export const fetchTicketDepartment = data => get('/ticket/department', data)
export const fetchTicketType = data => get('/ticket/type', data)
export const getTicketPriorities = data => get('/ticket/priorities', data)
export const postTicketPriorities = data => post('/ticket/priorities', data)
export const deleteTicketPriorities = data => del('/ticket/priorities', data)
export const postTicketDepartment = data => post('/ticket/department', data);
export const postTicketMessage = data => post('/ticket/message', data);
export const postTicketNote = data => post('/ticket/note', data);
export const fetchTicketDepartments = data => get('/ticket/department-list', data);
export const fetchTicketEmployee = data => get('/ticket/employee-list', data);
export const delTicketDepartment = data => del('/ticket/department', data);
export const fetchTicketCategory = data => get('/ticket/department-list?category=true', data)
export const fetchTicketTypes = data => get('/ticket/type-list', data)
export const postTicketType = data => post('/ticket/type', data)
export const delTicketType = data => del('/ticket/type', data);


//Marketing Routes

//group CRUD routes
export const fetchMarketingGroups = data => get('/marketing/groups', data);
export const postMarketingGroup = data => post('/marketing/groups', data);
export const delMarketingGroup = data => del('/marketing/groups', data);
//get users by Group
export const fetchMarketingSubscribers = data => get('/marketing/subscriber', data);
export const postMarketingSubscribers = data => post('/marketing/subscriber', data);
export const fetchAllMarketingUsers = data => get('/marketing/users', data);
export const postMarketingUser = data => post('/marketing/users', data);
export const fetchAvailableSMSUsers = data => get('/marketing/available-user', data);
export const postSMSUsers = data => post('/marketing/available-user', data);
//email configuration & send Route
export const fetchMarketingSettings = data => get('/marketing', data)
export const postMarketingSettings = data => post('/marketing', data)
export const fetchAllMails = data => get('/marketing/all-mail', data);
export const fetchAllSMS = data => get('/marketing/all-sms', data);
export const deliverEmail = data => post('/marketing/deliver-email', data);
export const delMarketingEmail = data => del('/marketing/deliver-email', data);
export const deliverSMS = data => post('/marketing/deliver-sms', data);
export const delMarketingSMS = data => del('/marketing/deliver-sms', data);
//marketing whatsapp
export const fetchAllWhatsappMessage = data => get('/marketing/all-whatsapp-message', data);
export const postWhatsappMessage = data => post('/marketing/deliver-whatsapp-message', data);
export const delWhatsappMessage = data => del('/marketing/deliver-whatsapp-message', data);

// frontend data
export const fetchPage = data => get('/page', data);
export const fetchCustomPage = data => get('/page/custom-page', data);
export const postPage = data => post('/page', data);
export const delPage = data => del('/page', data);

//language
// export const fetchLanguages = data => get('/settings/languages', data)
// export const fetchAllLanguages = data => get('/settings/all-languages', data)
// export const postLanguage = data => post('/settings/language', data)
// export const delLanguage = data => del('/settings/language', data)

export const fetchLanguages = data => ()=>{data:{docs:{}}}
