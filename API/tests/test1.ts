import request from 'supertest';
import { expect } from 'chai';
import { describe, it, before, after, beforeEach, afterEach } from 'mocha';
import { app } from '../src/index';

describe('hooks', () => {
  // before(() => {
  //   // käivitatakse ühe korra enne esimest testi selles blokis
  // });

  // after(() => {
  //   // käivitatakse ühe korra pärast viimast testi selles blokis
  // });

  // beforeEach(() => {
  //   // käivitatakse enne igat testi selles blokis
  // });

  // afterEach(() => {
  //   // käivitatakse peale igat testi selles blokis
  // });

  describe('Health controller', () => {
    describe('GET /api/v1/health', () => {
      it('responds with msg and returns 200', async () => {
        const response = await request(app).get('/api/v1/health');
  
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
      });
  
      // it('should check if text doesnt match', function() {
      //     assert.equal("test" !== "test", true);
      //   });
    });
  });

  describe('Users controller', () => {
    describe('GET /api/v1/users', () => {
      it('responds with error message and status 401 (on missing token)', async () => {
        const response = await request(app).get('/api/v1/users');

        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.equal('No token provided');
      });

      // it('responds with status 401 (on wrong token)', async () => {
      //   const response = await request(app).get('/api/v1/users').set({Authorization: "aaaAAAaaaAAAAAAAAAAA"});
        
      //   expect(response.body).to.be.a('object');
      //   expect(response.statusCode).to.equal(401);
      //   expect(response.body.success).to.be.false;
      //   expect(response.body.error).to.equal('Invalid token');
      // });
    });
  });
});
