const db = require('../db')();
const ObjectId = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {

    const get = async (issueCount = null) => {
        if(!issueCount){
        const totalIssue = await db.get(COLLECTION);
        return totalIssue;
    }
    const uniqueIssue = await db.get(COLLECTION, {slugName : issueCount});
    return uniqueIssue;
    };

    const getByProjectId = async (issueCount) => {
        let expression = new RegExp(issueCount);
        const byProject = await db.get(COLLECTION, {slugName: expression});
        return byProject;

    }
    const add = async(slugName, title, description, status, project_id) => {
        const counter = await db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
            slugName:  `${slugName}-${counter + 1}`,
            title: title,
            description: description,
            status: status,
            project_id: new ObjectId(project_id),
            comments:[]
        });

        return results.result;
    };
  return {
      get,
      add,
      getByProjectId

};
};