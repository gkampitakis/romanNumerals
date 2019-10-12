import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { environment } from '../src/config/';
chai.use(chaiHttp);

const url = `http://localhost:${environment.port}`;

describe('GET /roman/:number', function() {
  it('Should return 10 = X', function(done) {
    chai
      .request(url)
      .get(`/roman/${10}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.not.to.be.empty;
        expect(res.body.inputValue).to.be.eq(10);
        expect(res.body.convertedValue).to.be.eq('X');
        done();
      });
  });

  it('Should return error', function(done) {
    chai
      .request(url)
      .get(`/roman/${-10}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.be.empty;
        done();
      });
  });

  it('Should 1250 = MCCL', function(done) {
    chai
      .request(url)
      .get(`/roman/${1250}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.not.to.be.empty;
        expect(res.body.inputValue).to.be.eq(1250);
        expect(res.body.convertedValue).to.be.eq('MCCL');
        done();
      });
  });

  it('Passing string as argument', function(done) {
    chai
      .request(url)
      .get(`/roman/${'MMMX'}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.be.empty;
        done();
      });
  });
});

describe('GET /arabic/:number', function() {
  it('Should return X = 10', function(done) {
    chai
      .request(url)
      .get(`/arabic/X`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.not.to.be.empty;
        expect(res.body.inputValue).to.be.eq('X');
        expect(res.body.convertedValue).to.be.eq(10);
        done();
      });
  });

  it('Should return error', function(done) {
    chai
      .request(url)
      .get(`/arabic/${-10}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.be.empty;
        done();
      });
  });

  it('Should MCCL = 1250', function(done) {
    chai
      .request(url)
      .get(`/arabic/${'MCCL'}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.not.to.be.empty;
        expect(res.body.inputValue).to.be.eq('MCCL');
        expect(res.body.convertedValue).to.be.eq(1250);
        done();
      });
  });

  it('Passing wrong string as argument', function(done) {
    chai
      .request(url)
      .get(`/arabic/${'MdsaMMX'}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.be.empty;
        done();
      });
  });
});

describe('GET /all/:numeralTypes', function() {
  it('Retrieve RoMaN', function(done) {
    chai
      .request(url)
      .get(`/all/RoMaN`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).not.to.be.empty;
        if (res.body.length) {
          expect(res.body[0].type).to.be.eq('roman');
          expect(res.body[0].value).to.be.string;
        }
        done();
      });
  });

  it('Retrieve Arabic', function(done) {
    chai
      .request(url)
      .get(`/all/arabic`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).not.to.be.empty;
        if (res.body.length) {
          expect(res.body[0].type).to.be.eq('arabic');
          expect(res.body[0].value).to.be.an('number');
        }
        done();
      });
  });

  it('Unknown type handle error', function(done) {
    chai
      .request(url)
      .get(`/all/test`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.be.empty;
        done();
      });
  });

  it('Pass number as input handle error', function(done) {
    chai
      .request(url)
      .get(`/all/test`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.be.empty;
        done();
      });
  });
});

describe('DELETE /remove/all', function() {
  it('Remove all data', function(done) {
    chai
      .request(url)
      .del(`/remove/all`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.be.empty;
        done();
      });
  });

  it('After removing all expect empty array', function(done) {
    chai
      .request(url)
      .get(`/all/arabic`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.be.empty;
        done();
      });
  });
});
