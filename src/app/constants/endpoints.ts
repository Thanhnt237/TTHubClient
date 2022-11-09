export const endpoints = {
  base_url: 'http://localhost:8080/',

  //Auth
  login_api: 'api/public/auth/login',
  signUp_api: 'api/public/auth/signUp',

  //Users
  get_all_user_api: 'api/resources/users/getAllUsers',
  add_new_user_api: 'api/resources/users/addNewUser',
  update_user_api: 'api/resources/users/updateUser',

  //Class
  get_all_class_api: 'api/resources/class/getAllClass',
  add_new_class_api: 'api/resources/class/addNewClass',
  update_class_api: 'api/resources/class/updateClass/',
  get_semester_api: 'api/resources/class/getSemester',

  //Student Information
  get_all_student_information: 'api/resources/information/getAllStudentInformation',
  get_student_group_by_class_api: "api/resources/information/getStudentGroupByClass",
  add_new_student_information: 'api/resources/information/addNewStudentInformation',
  update_student_information: 'api/resources/information/updateStudentInformation',

  //Checkin
  get_all_checkin_api: "api/resources/checkin/student/getAll",
  student_checkin: "api/resources/checkin/student/checkin",

  //Bus Management
  get_all_bus_management_api: "api/resources/busManagement/getAll",
  register_new_bus_management_api: "api/resources/busManagement/register",
  update_bus_management_api: "api/resources/busManagement/update"
}