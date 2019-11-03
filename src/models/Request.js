const uuid = require('uuid');
const { Model } = require('objection');

class Request extends Model {
  static get tableName() {
    return 'requests';
  }

  static findOrCreate = async props => {
    const request = await this.query().findOne(props);

    if (request) return request;

    return await this.query().insertAndFetch({ ...props, id: uuid.v1() });
  };

  static ERROR = 'Error';
  static DONE = 'Done';
  static PENDING = 'Pending';
}

module.exports = { Request };
