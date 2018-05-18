import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseroute test', () => {

  it('should be json', () => {
    return chai.request(app).get('/')
      .then(res => {
        expect(res.type).to.eql('application/json');
      });
  });

  it('should have a body', () => {
    return chai.request(app).get('/')
      .then(res => {
        expect(res).to.not.null;
      });
  });

  it('should have a expected object', () => {
    return chai.request(app).get('/')
      .then(res => {
        var checkObj = {
          success: true,
          msg: 'Hello, World'
        }
        expect(res.body).to.eql(checkObj);
      });
  });

  it('should have a expected msg', () => {
    return chai.request(app).get('/')
      .then(res => {
        expect(res.body.msg).to.eql('Hello, World');
      });
  });

});