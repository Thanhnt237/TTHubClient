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

  //Student Information
  get_all_student_information: 'api/resources/information/getAllStudentInformation',
  add_new_student_information: 'api/resources/information/addNewStudentInformation',
  update_student_information: 'api/resources/information/updateStudentInformation',
}