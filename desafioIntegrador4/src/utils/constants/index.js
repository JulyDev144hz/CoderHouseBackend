const statusModel = require("../../dao/mongo/status");
const roleModel = require("../../dao/mongo/role");

let status;
const STATUS = async () => {
  status = status || (await getStatus());
  return status;
}

const getStatus =  async (query = {}) => {
  const statuses = await statusModel.find(query);
  return buildConstantsObject(statuses);
}

let roles;
const ROLES = async () => {
  roles = roles || (await getRoles());
  return roles;
}

const getRoles =  async (query = {}) => {
  const role = await roleModel.find(query);
  return buildConstantsObject(role);
}


const buildConstantsObject = records => {
  let result = {};
  records.forEach(record => {
    result[`${record.name}`] = record._id;
  });
  return result;
}

module.exports = {
  STATUS,
  ROLES
}